# MISSION: TEST SUITE REPAIR & EXPANSION

Scope: {TARGET_FILES_OR_FOLDERS}

Ensure the test suite is robust, green, and covers all edge cases.

1. FIX PHASE:

   - Run the existing test suite (`npm test` or equivalent).
   - If errors exist, perform a Root Cause Analysis (RCA) and fix the test code or the source code.

2. EXPANSION PHASE:

   - Identify "Happy Paths" and "Edge Cases" (especially Guard Clauses) that are not covered.
   - Add new tests using the project's preferred framework (Vitest/Jest/Playwright).
   - Ensure mocks and stubs follow current TypeScript interfaces.

3. VERIFICATION:
   - Run all tests again to ensure 100% pass rate.
   - Output: A report of "Fixed Tests" and "Newly Added Tests."
