# MISSION: SECURITY AUDIT & THREAT MODELING

Target: {FILES_OR_FOLDERS_TO_AUDIT}

Analyze the target code for vulnerabilities using the OWASP Top 10 (2026 Edition).

1. VULNERABILITY SCAN:

   - **Injections**: Look for unsanitized inputs, raw SQL/NoSQL queries, or eval() calls.
   - **Broken Auth**: Check for weak session management or missing permission checks in `use server` actions.
   - **Data Exposure**: Identify sensitive data (PII) being logged or sent to the client.
   - **Dependency Audit**: Scan for outdated or "hallucinated" packages.

2. LOGIC AUDIT:

   - Check if error messages leak system info (stack traces).
   - Verify that file/OS operations are safe from path traversal.

3. REPORT:

   - 🚨 **High Risk**: Direct exploitable vulnerabilities (XSS, SQLi, RCE).
   - ⚠️ **Medium Risk**: Insecure defaults or missing headers.
   - ℹ️ **Best Practice**: General improvements (e.g., "Use a more secure hashing algorithm").

4. REMEDIATION:
   - Propose the "Most Secure" fix for each issue found.
