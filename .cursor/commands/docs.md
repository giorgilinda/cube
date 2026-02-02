# MISSION: SYNCHRONIZE DOCUMENTATION

Scope: {FILES_OR_FOLDERS_TO_DOCUMENT}

Compare the current code implementation with existing documentation (.md files, JSDoc, and comments).

1. AUDIT:

   - Identify outdated descriptions of functions or props.
   - Find new features, environment variables, or logic blocks that lack explanation.
   - Check if `README.md` or `ARCHITECTURE.md` needs updating based on recent changes.

2. EXECUTION:

   - Update JSDoc for all exported Arrow Functions/Components.
   - Fix "Lies": Remove comments that no longer match what the code actually does.
   - If a new architectural pattern was used, document it in `CONVENTIONS.md`.

3. OUTPUT:
   - A summary of which files were updated and why.
