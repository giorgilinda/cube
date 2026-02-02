# MISSION: CODE REVIEW
Scope: {FILES_OR_FOLDERS_TO_REVIEW}

Act as a Senior Peer Reviewer. Analyze the code against the project's `.cursor/rules/` and `CONVENTIONS.md`.

1. ANALYSIS:
   - Check for violations of the **Guard Clause** pattern or **Arrow Function** standards.
   - Look for architectural "smells" (tight coupling, logic in UI components).
   - Evaluate Type Safety (are there `any` types that could be specific?).

2. FEEDBACK CATEGORIES:
   - 🔴 **Critical**: Bugs, security risks, or major rule violations.
   - 🟡 **Suggestion**: Modernization (from `architecture-evolution.mdc`) or readability improvements.
   - 🟢 **Praise**: Good implementation of patterns.

3. OUTPUT:
   - Provide a concise list of actionable feedback. 
   - DO NOT apply changes unless I specifically ask you to "Fix these issues" afterward.