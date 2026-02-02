# MISSION: GENERATE GIT COMMIT MESSAGE

Context: Analyze the current diff/staged changes.

Write a professional Git commit message following the **Conventional Commits** standard (e.g., `feat:`, `fix:`, `refactor:`, `docs:`).

1. STRUCTURE:

   - **Header**: A concise summary (max 50 chars) in the imperative mood (e.g., "add auth guard").
   - **Body**: If the change is complex, use bullet points to explain the "Why" and the "What."
   - **Footer**: Reference any relevant rules applied (e.g., "Applied typescript-logic guard clauses").

2. RULES:
   - Be specific. Instead of "update styles," use "refactor login button to use Tailwind utility classes."
   - If the `/upgrade` command was used, mention the modernization performed.

Output the message in a code block so I can easily copy it.
