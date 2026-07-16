import importlib.util
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("extract_pdf", ROOT / "tools" / "extract_pdf.py")
module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(module)


def test_extracts_all_ai103_questions_in_order():
    questions = module.extract_questions(Path(r"C:\Users\Admin\Downloads\Certs\pdf\AI-103.pdf"))
    assert [q["id"] for q in questions] == list(range(1, 108))


def test_each_question_has_source_pages_and_reviewable_answer_content():
    questions = module.extract_questions(Path(r"C:\Users\Admin\Downloads\Certs\pdf\AI-103.pdf"))
    assert all(q["sourcePages"] for q in questions)
    assert all(q["stem"] or q["rawQuestion"] for q in questions)
    assert all(q["answer"] or q["explanation"] for q in questions)


def test_parsed_answers_exclude_explanation_and_incorrect_answer_sections():
    questions = module.extract_questions(Path(r"C:\Users\Admin\Downloads\Certs\pdf\AI-103.pdf"))
    section_heading = re.compile(r"(?m)^(?:Explanation:?|Incorrect Answers:)\s*$")
    assert all(not section_heading.search(q["answer"]) for q in questions)


def test_correct_labels_are_unique_and_belong_to_the_question_choices():
    questions = module.extract_questions(Path(r"C:\Users\Admin\Downloads\Certs\pdf\AI-103.pdf"))
    for question in questions:
        choice_labels = {choice["label"] for choice in question["choices"]}
        assert len(question["correct"]) == len(set(question["correct"]))
        assert set(question["correct"]) <= choice_labels


def test_multiple_flag_uses_the_distinct_correct_label_count():
    questions = module.extract_questions(Path(r"C:\Users\Admin\Downloads\Certs\pdf\AI-103.pdf"))
    assert all(
        q["multiple"] == (len(set(q["correct"])) > 1)
        for q in questions
    )


def test_gradable_records_have_clean_parsed_answer_data():
    questions = module.extract_questions(Path(r"C:\Users\Admin\Downloads\Certs\pdf\AI-103.pdf"))
    section_heading = re.compile(r"(?m)^(?:Explanation:?|Incorrect Answers:)\s*$")
    for question in questions:
        if question["gradable"]:
            assert question["choices"]
            assert question["correct"]
            assert question["answer"]
            assert not section_heading.search(question["answer"])


def test_clean_preserves_real_bullet_characters():
    assert module.clean("before\u2022after") == "before\u2022after"
