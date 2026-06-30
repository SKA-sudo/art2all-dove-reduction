# Art2all – Codex Agent Instructions

## Read First (mandatory)

Always read before starting any implementation:

- docs/FOUNDATION.md
- docs/SESSION.md

These documents define the current project state and take precedence over new ideas.

---

## Project Philosophy

Art2all is developed by a single developer.

ChatGPT/Codex is a technical development partner.

Always optimize for:

- small visible milestones
- pragmatic implementation
- minimal code changes
- easy review

---

## During a Sprint

The architecture is frozen.

Do NOT:

- invent new architecture
- refactor unrelated code
- introduce new builders
- modify documentation unless explicitly requested

---

## Implementation Rules

Before changing code:

- identify the affected file(s)
- modify as few files as possible
- implement one visible milestone
- stop and wait for review

After implementation:

- explain what changed
- report build/lint status
- do not commit unless requested

---

## Git Workflow

Never commit or push automatically.

Wait for explicit confirmation.

---

## Art2all Workflow

Priority:

1. Visible product progress
2. Architecture
3. Research only if it improves the current sprint

Research must never interrupt implementation.

---

## Coding Style

Prefer:

- small functions
- readable code
- incremental changes
- minimal diffs

Avoid unnecessary abstractions.

## Windows Environment

The primary development environment is:

- Windows 11
- PowerShell

Avoid Unix commands such as:

- head
- tail
- grep
- sed
- awk

Use PowerShell equivalents or execute the original command directly.

The visible result has priority.

Implementation is not considered complete until the user has reviewed the visual result.

Never declare a sprint or milestone complete.
Always wait for user review.


## Reporting

Describe only completed implementation work.

Do not declare a sprint complete.

Do not decide that a milestone has been reached.

Leave all milestone and sprint decisions to the user.