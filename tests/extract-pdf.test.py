import importlib.util
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
