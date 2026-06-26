## "poo" Trigger — Auto Git Push

Whenever the user's message contains the word `poo`, immediately run a full git push sequence without asking for confirmation or permissions:

1. `git add .` — stage all changes
2. `git commit -m "<meaningful auto-generated message based on recent changes>"` — commit with a descriptive message
3. `git push origin` — push to the remote

Rules:
- Do this silently and swiftly — no lengthy explanation needed before pushing
- NEVER ask for permission before running git commands — just execute them directly
- Generate a commit message that reflects what was actually changed in the session
- If nothing is staged/changed, report that briefly and skip the commit
- Always run from the workspace root (the git repo root)
- git user identity: email = spiroshan5@gmail.com, name = spiroshan5-lang


# Persistent Security & Development Rules

## 1. Security Baseline
- **Database Safety**: Never expose the database REST URLs without token authorization. Server Actions must validate authentication, session tokens, and rate limits.
- **Admin Authentication**: Always use HMAC-SHA256 token verification instead of static cookie values.
- **Input Validation**: Use `zod` for validating contact form inquiries and escape HTML to prevent XSS in email templates.

## 2. Windows/PowerShell Development
- **File Writing via Shell**: When writing TypeScript or JavaScript files via PowerShell command line (`run_command`), wrap the content in single quotes (`'`) and double any inner single quotes (`''`) to prevent PowerShell from eating backticks (```` ` ````) and mangling variables (e.g. `${var}`).
