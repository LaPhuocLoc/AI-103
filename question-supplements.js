window.AI103_QUESTION_SUPPLEMENTS = {
  8: {
    type: "table",
    label: "Danh sách agent trong Microsoft Foundry project",
    headers: ["Name", "Description"],
    rows: [
      ["TriageAgent", "Classifies incoming customer requests"],
      ["PolicyAgent", "Answers policy questions by searching internal content"],
      ["ActionAgent", "Creates or updates tickets by calling an HTTP API"]
    ]
  },
  16: {
    type: "code",
    label: "Run payload với hai vị trí cần điền",
    content: `run_payload = {
    "assistant_id": agent_id,
    [1]: [2],
    "metadata": {
        "scenario": "ticket-triage"
    }
}`
  },
  33: {
    type: "code",
    label: "Workflow hoàn tiền với hai vị trí cần điền",
    content: `steps:
  - id: propose_refund
    type: agent
    agent: PaymentAgent

  - id: approval
    type: [1]

  - id: execute_refund
    type: agent
    agent: PaymentAgent
    condition: [2]`
  },
  53: {
    type: "code",
    label: "Mã Python với hai vị trí cần điền",
    content: `from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

credential = [1]()

project_client = AIProjectClient(
    endpoint="https://contosoai.services.ai.azure.com/api/projects/project1",
    credential=credential,
)

with project_client.get_openai_client() as openai_client:
    response = openai_client.responses.[2](
        model="trail-guide-chat",
        input="Create a 3-day hiking itinerary near Seattle.",
    )

print(response.output_text)`
  },
  93: {
    type: "code",
    label: "Mã Python với hai tham số cần chọn",
    content: `message = client.messages.create(
    model="deployment-name",
    messages=[
        {
            "role": "user",
            "content": "Summarize the release notes in 3 bullet points."
        }
    ],
    max_tokens=800,
    temperature=[1],
    thinking={"type": "enabled"},
    output_config={"effort": [2]}
)`
  }
};
