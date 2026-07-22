# Art2all – Codex Agent Instructions

## Read First (mandatory)

Always read before starting any implementation:

- art2all/docs/FOUNDATION.md

These document define the current project state and take precedence over new ideas.

---


Create docs/AI_CLIENTS.md in the art2all repository.

Content:

## AI Client Instructions

# Art2all uses a hierarchical documentation model.


Für AI connector https://raw.githubusercontent.com/SKA-sudo/art2all-dove-reduction/tree/dev/ 

Read documentation in this order:

1. art2all-dove-reduction/docs/FOUNDATION.md
2. art2all-dove-reduction/docs/SESSION.md
3. art2all-dove-reduction/docs/PERCEPTION_ENGINE.md
4. art2all-dove-reduction/docs/DEVELOPMENT_STRATEGY.md
5. art2all-dove-reduction/docs/ARCHITECTURE.md
6. art2all-dove-reduction/docs/DECISIONS.md
7. art2all-dove-reduction/docs/RESEARCH - 2.0.md
8. art2all-dove-reduction/docs/validation/*.md 

After reading:

- summarize completed validations
- summarize running validations
- identify rejected validations
- avoid repeating completed experiments

Rules:

- FOUNDATION.md is the highest-level source of truth.
- art2all/docs/SESSION.md contains the global project state.
- Each repository-specific SESSION.md only contains local repository state.
- Repository SESSION files extend the global documentation.
- They do not override FOUNDATION.md or the global SESSION.md.
- Do not duplicate global decisions in research repositories.
- Do not introduce new architecture during implementation.
- Keep tasks small enough for one human developer with AI support.

Repository roles:

- art2all = product repository
- art2all-dove-observation = observation lab
- art2all-dove-reduction = reduction lab

Branch rules:

- art2all uses dev for active product development and main for stable state.
- research repositories may work directly on main unless explicitly changed.

AI workflow:

Before starting work:
1. Read the required documentation.
2. Identify the current repository.
3. State the active scope.
4. Work only inside that scope.
5. Do not mix product code and research code.

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