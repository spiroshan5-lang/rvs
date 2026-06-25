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
