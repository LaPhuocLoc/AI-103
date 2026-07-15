import json
import re
import shutil
from pathlib import Path

import pdfplumber


ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(r"C:\Users\Admin\Downloads\AB-100.pdf")
PUBLIC_PDF = ROOT / "AB-100.pdf"
OUTPUT = ROOT / "questions.js"

HEADER = "AB-100: Agentic AI Business Solutions Architect - Practice Questions and Answers"
FOOTER = "Cloud and AI Hub"


def clean(text: str) -> str:
    text = text.replace(HEADER, "").replace(FOOTER, "")
    text = text.replace("\u2022", "•").replace("\u2019", "'")
    text = re.sub(r"[ \t]+\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def parse_choices(question: str):
    matches = list(re.finditer(r"(?m)^([A-H])\.\s+", question))
    if len(matches) < 2:
        return [], question.strip()

    first = matches[0].start()
    stem = question[:first].strip()
    choices = []
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(question)
        label = match.group(1)
        value = re.sub(r"\s*\n\s*", " ", question[match.end():end]).strip()
        choices.append({"label": label, "text": value})
    return choices, stem


def answer_letters(answer: str, choices):
    if not answer or not choices:
        return []
    labels = {choice["label"] for choice in choices}
    found = re.findall(r"(?m)^([A-H])\.\s+", answer)
    return [label for label in found if label in labels]


def correct_answer_summary(answer: str, explanation: str) -> str:
    if answer.strip():
        return answer.strip()
    match = re.search(
        r"Correct Answers:\s*(.*?)(?=\nIncorrect Answers:|\Z)",
        explanation,
        flags=re.S,
    )
    if not match:
        return "Xem phần giải thích chi tiết bên dưới."
    block = match.group(1).strip()
    headings = re.findall(
        r"(?m)^([^\n]{2,240})\nThis (?:option )?is correct because",
        block,
    )
    if headings:
        return "\n".join(dict.fromkeys(item.strip() for item in headings))
    first_line = next((line.strip() for line in block.splitlines() if line.strip()), "")
    return first_line or "Xem phần giải thích chi tiết bên dưới."


def main():
    if not SOURCE.exists():
        raise FileNotFoundError(SOURCE)

    page_texts = []
    with pdfplumber.open(SOURCE) as pdf:
        for page_number, page in enumerate(pdf.pages, 1):
            page_texts.append((page_number, clean(page.extract_text() or "")))

    full_text = "\n".join(text for _, text in page_texts)
    matches = list(re.finditer(r"(?m)^Q(\d+)\.\s+", full_text))
    questions = []

    page_offsets = []
    cursor = 0
    for page_number, text in page_texts:
        page_offsets.append((cursor, cursor + len(text), page_number))
        cursor += len(text) + 1

    for idx, match in enumerate(matches):
        number = int(match.group(1))
        end = matches[idx + 1].start() if idx + 1 < len(matches) else len(full_text)
        block = full_text[match.end():end].strip()
        question_part, answer_part = (block.split("Answer:", 1) + [""])[:2]
        raw_answer, explanation = (answer_part.split("Explanation:", 1) + [""])[:2]
        question_part = question_part.strip()
        raw_answer = raw_answer.strip()
        explanation = explanation.strip()
        choices, stem = parse_choices(question_part)
        letters = answer_letters(raw_answer, choices)

        start_page = next(
            (page for start, finish, page in page_offsets if start <= match.start() <= finish),
            1,
        )
        end_position = max(match.start(), end - 1)
        end_page = next(
            (page for start, finish, page in page_offsets if start <= end_position <= finish),
            start_page,
        )

        questions.append(
            {
                "id": number,
                "stem": stem,
                "rawQuestion": question_part,
                "choices": choices,
                "correct": letters,
                "answer": correct_answer_summary(raw_answer, explanation),
                "explanation": explanation,
                "sourcePages": list(range(start_page, end_page + 1)),
                "gradable": bool(choices and letters),
                "multiple": len(letters) > 1,
            }
        )

    if [q["id"] for q in questions] != list(range(1, len(questions) + 1)):
        raise ValueError("Question numbering is not continuous")

    OUTPUT.write_text(
        "window.AB100_QUESTIONS = "
        + json.dumps(questions, ensure_ascii=False, separators=(",", ":"))
        + ";\n",
        encoding="utf-8",
    )
    shutil.copy2(SOURCE, PUBLIC_PDF)
    print(f"Generated {len(questions)} questions -> {OUTPUT}")


if __name__ == "__main__":
    main()
