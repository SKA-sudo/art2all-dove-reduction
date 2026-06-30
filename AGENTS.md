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

Bei jedem neuen Builder beginnt der Debug mit genau einem primitiven Element (eine Linie oder ein Punkt). Erst wenn dieses sichtbar und verifiziert ist, wird die nächste primitive Struktur hinzugefügt.