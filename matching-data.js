window.AI103_MATCHING = {
  3: [
    { prompt: "Prompt shields action", options: ["Set action to block", "Set action to annotate", "Disable the shield"], correct: "Set action to block" },
    { prompt: "Additional mitigation", options: ["Enable Spotlighting", "Create a custom blocklist", "Use OCR first"], correct: "Enable Spotlighting" }
  ],
  6: [
    { prompt: "Access up-to-date information from public websites", options: ["Code interpreter", "Computer use", "File search", "Grounding with Bing Search", "Microsoft Fabric"], correct: "Grounding with Bing Search" },
    { prompt: "Perform calculations during conversations", options: ["Code interpreter", "Computer use", "File search", "Grounding with Bing Search", "Microsoft Fabric"], correct: "Code interpreter" },
    { prompt: "Retrieve information from documents uploaded directly to the agent", options: ["Code interpreter", "Computer use", "File search", "Grounding with Bing Search", "Microsoft Fabric"], correct: "File search" }
  ],
  9: [
    { prompt: "Evaluation comparison", options: ["Compare against the latest approved baseline", "Compare against the previous workflow run", "Compare against the production deployment logs", "Compare against the repository default branch"], correct: "Compare against the latest approved baseline" },
    { prompt: "If evaluation regression exceeds the configured tolerance", options: ["Continue deployment and send an alert", "Fail the workflow", "Retry the evaluation automatically", "Lock the target branch"], correct: "Fail the workflow" }
  ],
  10: [
    { prompt: "The LangChain service will appear in Traces without configuring a tracer.", options: ["Yes", "No"], correct: "No" },
    { prompt: "Setting different OTEL_SERVICE_NAME values separates the services in Application Insights.", options: ["Yes", "No"], correct: "Yes" },
    { prompt: "When using enable_content_recording=False, prompts and tool data will be captured in the telemetry.", options: ["Yes", "No"], correct: "No" }
  ],
  13: [
    { prompt: "Set tool_choice to", options: ["auto", "none", "required"], correct: "required" },
    { prompt: "Configure the tool to authenticate by", options: ["Storing API keys in prompts", "Using the shared project agent identity", "Using a distinct agent identity bound to the client application"], correct: "Using a distinct agent identity bound to the client application" }
  ],
  16: [
    { prompt: "First blank", options: ["\"auto\"", "\"required\"", "\"response_format\"", "\"tool_choice\"", "\"tools\"", "\"type\""], correct: "\"tool_choice\"" },
    { prompt: "Second blank", options: ["\"auto\"", "\"required\"", "\"response_format\"", "\"tool_choice\"", "\"tools\"", "\"type\""], correct: "\"required\"" }
  ],
  19: [
    { prompt: "Evaluation to execute", options: ["Groundedness evaluation", "Fluency evaluation", "Similarity evaluation", "Content Safety evaluation"], correct: "Groundedness evaluation" },
    { prompt: "Pull request policy", options: ["Require the evaluation workflow to succeed before merging", "Automatically rerun failed evaluations until they pass", "Notify reviewers when evaluations fail", "Allow the merge and run evaluations after deployment"], correct: "Require the evaluation workflow to succeed before merging" }
  ],
  23: [
    { prompt: "Metrics to enable", options: ["Model Availability Rate and Provisioned Utilization", "Only Tokens Cache Match Rate", "Only Total Requests filtered to status code 200", "Time To Response and Total Tokens"], correct: "Model Availability Rate and Provisioned Utilization" },
    { prompt: "Diagnostic log to collect", options: ["AllMetrics", "audit", "RequestResponse", "trace"], correct: "RequestResponse" }
  ],
  26: [
    { prompt: "Unsupported responses", options: ["Groundedness evaluation metrics", "Latency breakdown traces", "Risk and safety metrics", "Token usage analytics"], correct: "Groundedness evaluation metrics" },
    { prompt: "Policy violations", options: ["Groundedness evaluation metrics", "Latency breakdown traces", "Risk and safety metrics", "Token usage analytics"], correct: "Risk and safety metrics" }
  ],
  29: [
    { prompt: "To retain user preferences across conversations, use", options: ["Agent memory that uses persistent storage", "Conversation history", "Orchestration-managed session context"], correct: "Agent memory that uses persistent storage" },
    { prompt: "To enable users to provide contextual grounding during chats, use the", options: ["Azure AI Search tool", "Code interpreter tool", "File search tool"], correct: "File search tool" }
  ],
  33: [
    { prompt: "Approval step type", options: ["ask_question", "basic_chat", "data_transformation"], correct: "ask_question" },
    { prompt: "Execute refund condition", options: ["approval == \"approved\"", "propose_refund.output != null", "true"], correct: "approval == \"approved\"" }
  ],
  36: [
    { prompt: "Pipeline1", options: ["Multi-file task in pro mode", "Multi-file task in standard mode", "Single-file task in pro mode", "Single-file task in standard mode"], correct: "Single-file task in standard mode" },
    { prompt: "Pipeline2", options: ["Multi-file task in pro mode", "Multi-file task in standard mode", "Single-file task in pro mode", "Single-file task in standard mode"], correct: "Multi-file task in pro mode" }
  ],
  43: [
    { prompt: "If/else condition expression", options: ["IsBlank(Local.Var01)", "IsEmpty(Local.Var01)", "Not(IsBlank(Local.Var01))"], correct: "Not(IsBlank(Local.Var01))" },
    { prompt: "Send message expression", options: ["{Local.Var01}", "{Upper(Local.Var01)}", "{Upper(Var01)}"], correct: "{Upper(Local.Var01)}" }
  ],
  46: [
    { prompt: "Pipeline1", options: ["Multi-file task in pro mode", "Multi-file task in standard mode", "Single-file task in pro mode", "Single-file task in standard mode"], correct: "Single-file task in standard mode" },
    { prompt: "Pipeline2", options: ["Multi-file task in pro mode", "Multi-file task in standard mode", "Single-file task in pro mode", "Single-file task in standard mode"], correct: "Multi-file task in pro mode" }
  ],
  49: [
    { prompt: "Authentication method", options: ["A personal access token (PAT)", "A user-assigned managed identity", "An Azure Login action that uses OpenID Connect (OIDC)"], correct: "An Azure Login action that uses OpenID Connect (OIDC)" },
    { prompt: "If the evaluation results are NOT met, configure the workflow to", options: ["Lock the target branch", "Send an alert", "Fail"], correct: "Fail" }
  ],
  53: [
    { prompt: "Credential class", options: ["AzureKeyCredential", "ClientSecretCredential", "DefaultAzureCredential"], correct: "DefaultAzureCredential" },
    { prompt: "Responses API method", options: ["compact", "create", "retrieve"], correct: "create" }
  ],
  56: [
    { prompt: "Increased response time", options: ["Groundedness evaluation metrics", "Latency breakdown traces", "Risk and safety metrics", "Token usage analytics"], correct: "Latency breakdown traces" },
    { prompt: "Increased inference costs", options: ["Groundedness evaluation metrics", "Latency breakdown traces", "Risk and safety metrics", "Token usage analytics"], correct: "Token usage analytics" }
  ],
  59: [
    { prompt: "Authentication", options: ["Storage account access keys", "Shared Access Signature (SAS)", "System-assigned managed identity", "User-assigned managed identity"], correct: "System-assigned managed identity" },
    { prompt: "Azure RBAC role", options: ["Storage Blob Data Reader", "Storage Blob Data Contributor", "Storage Queue Data Contributor", "Owner"], correct: "Storage Blob Data Reader" }
  ],
  63: [
    { prompt: "Guardrails", options: ["Select Tool call and set Action to Block.", "Select User input and Output and set Action to Annotate.", "Select User input and Tool response and set Action to Annotate.", "Select User input, Output, Tool response, and Tool call and set Action to Block."], correct: "Select User input, Output, Tool response, and Tool call and set Action to Block." },
    { prompt: "Storage access", options: ["Storage account access keys", "A user-assigned identity that is assigned the Storage Queue Data Contributor role", "A system-assigned managed identity that is assigned the Storage Blob Data Reader role", "A system-assigned managed identity that is assigned the Storage Blob Data Contributor role"], correct: "A system-assigned managed identity that is assigned the Storage Blob Data Reader role" }
  ],
  66: [
    { prompt: "Answers do not address the user's question", options: ["Relevance Evaluation", "Completion token analytics", "Groundedness evaluation", "Prompt traces", "Latency timeline"], correct: "Relevance Evaluation" },
    { prompt: "Responses are longer than expected", options: ["Relevance Evaluation", "Completion token analytics", "Groundedness evaluation", "Prompt traces", "Latency timeline"], correct: "Completion token analytics" }
  ],
  69: [
    { prompt: "Evaluation metric", options: ["Coherence", "Fluency", "Groundedness", "Similarity"], correct: "Groundedness" },
    { prompt: "Recommended configuration", options: ["Increase the model temperature.", "Reject responses that do not meet the groundedness threshold.", "Increase the maximum completion tokens.", "Fine-tune the model by using the retrieved documents."], correct: "Reject responses that do not meet the groundedness threshold." }
  ],
  73: [
    { prompt: "To retain attorney preferences across conversations, use", options: ["Agent memory that uses persistent storage", "Conversation history", "Orchestration-managed session context", "Prompt cache"], correct: "Agent memory that uses persistent storage" },
    { prompt: "To retrieve uploaded documents, use", options: ["File search tool", "Code interpreter tool", "Computer use tool", "Azure AI Translator"], correct: "File search tool" }
  ],
  76: [
    { prompt: "Analyze uploaded spreadsheets and generate charts", options: ["Code Interpreter", "Computer Use", "File Search", "Grounding with Bing Search", "Microsoft Fabric"], correct: "Code Interpreter" },
    { prompt: "Interact with the legacy claims management website", options: ["Code Interpreter", "Computer Use", "File Search", "Grounding with Bing Search", "Microsoft Fabric"], correct: "Computer Use" },
    { prompt: "Retrieve information from uploaded policy documents", options: ["Code Interpreter", "Computer Use", "File Search", "Grounding with Bing Search", "Microsoft Fabric"], correct: "File Search" }
  ],
  79: [
    { prompt: "To analyze uploaded spreadsheets, use", options: ["Code Interpreter Tool", "File Search Tool", "Computer Use Tool", "Azure AI Search Tool"], correct: "Code Interpreter Tool" },
    { prompt: "To retrieve current weather information, use", options: ["Grounding with Bing Search", "File Search Tool", "Computer Use Tool", "Microsoft Fabric tool"], correct: "Grounding with Bing Search" }
  ],
  83: [
    { prompt: "To answer questions from uploaded contracts, use", options: ["File Search Tool", "Code Interpreter Tool", "Grounding with Bing Search", "Computer Use Tool"], correct: "File Search Tool" },
    { prompt: "To generate charts from Excel workbooks, use", options: ["Code Interpreter Tool", "File Search Tool", "Azure AI Search Tool", "Microsoft Fabric Tool"], correct: "Code Interpreter Tool" }
  ],
  86: [
    { prompt: "Research recent court decisions", options: ["Code Interpreter", "Computer Use", "File Search", "Grounding with Bing Search", "Microsoft Fabric"], correct: "Grounding with Bing Search" },
    { prompt: "Search uploaded contracts", options: ["Code Interpreter", "Computer Use", "File Search", "Grounding with Bing Search", "Microsoft Fabric"], correct: "File Search" },
    { prompt: "Download evidence from the compliance portal", options: ["Code Interpreter", "Computer Use", "File Search", "Grounding with Bing Search", "Microsoft Fabric"], correct: "Computer Use" }
  ],
  89: [
    { prompt: "Authentication method", options: ["Azure Login action that uses OpenID Connect (OIDC)", "Personal access token (PAT)", "Storage account access key", "Publish Profile"], correct: "Azure Login action that uses OpenID Connect (OIDC)" },
    { prompt: "Credential management", options: ["Store credentials as GitHub repository secrets", "Configure workload identity federation", "Rotate PAT every 30 days", "Use a shared administrator account"], correct: "Configure workload identity federation" }
  ],
  93: [
    { prompt: "Temperature", options: ["0", "1", "2"], correct: "0" },
    { prompt: "Output effort", options: ["\"high\"", "\"low\"", "\"medium\""], correct: "\"high\"" }
  ],
  101: [
    { prompt: "Deployment type", options: ["Standard", "Global Standard", "Global Provisioned"], correct: "Standard" },
    { prompt: "Version update policy", options: ["Once the current version expires", "Opt out of automatic model version upgrades", "Upgrade once a new default version becomes available"], correct: "Opt out of automatic model version upgrades" }
  ]
};
