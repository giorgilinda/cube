# MISSION: ARCHITECTURAL MODERNIZATION & REFACTORING

Scope: {FILES_OR_FOLDERS_TO_UPGRADE}

As a Senior Tech Lead, audit the specified code for "Legacy" patterns and "Technical Debt."

1. AUDIT PHASE:

   - Compare the current code against the standards in `architecture-evolution.mdc`.
   - Identify "Older" libraries, manual state handling, or deep nesting.
   - Look for "Code Smells" (long functions, tight coupling).

2. PROPOSAL PHASE:

   - List the top 3 high-impact modernization changes.
   - For each, explain:
     - **Current State**: (What is there now)
     - **Modern Standard**: (What it should be)
     - **Benefit**: (Performance, Readability, or Type Safety)

3. EXECUTION:

   - If the change is localized (e.g., adding Guard Clauses or converting to Arrow Functions), apply it immediately.
   - If the change is architectural (e.g., migrating to TanStack Query or Zod), wait for user confirmation before proceeding.

4. VERIFICATION & CLEANUP (MANDATORY):

   - **Lint & Format**: Run `npm run lint` and `npm run format` (or equivalent) to ensure the new code meets project standards.
   - **Test**: Run relevant unit tests. If no tests exist for the logic changed, create a basic test to verify the "Happy Path."
   - **Self-Audit**: Perform a final comparison between the old logic and new logic to ensure no functionality was accidentally dropped (e.g., specific edge cases or error logging).
   - **Dead Code**: Ensure the old libraries/functions are fully removed and not just commented out.

5. REPORT:
   - Provide a summary of changes with ✅/⚠️ status markers.
   - List any new dependencies added or old ones that can now be uninstalled.
