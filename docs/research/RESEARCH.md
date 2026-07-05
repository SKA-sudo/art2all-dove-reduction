################################################################
# Art2all – ## RESEARCH
################################################################


Research 


Version: 1.0

Status: Living Document

Repository: art2all-dove-reduction


Autor:
Stephan Kästner
mit Unterstützung von ChatGPT


################################################################
################################################################



## Research Note – Perception Landmarks (Sprint R4.3)

### New Hypothesis

The Primary Axis should **not** be the first perceptual structure.

Instead, perception begins by identifying a small set of stable semantic landmarks.
All higher-level perception structures are derived from these landmarks.

Current hypothesis for a dove:

- Head
- Beak
- Neck Base
- Body Center
- Left Wing Root
- Right Wing Root
- Tail Center

### Perceptual Importance

Landmarks are **species-dependent**.

Example:

Peace Dove
- Body ★★★★★
- Wings ★★★★★
- Tail ★★★★☆
- Head ★★★★☆
- Beak ★★★☆☆
- Feet ★☆☆☆☆

Eagle
- Beak ★★★★★
- Eyes ★★★★★
- Claws ★★★★★
- Wings ★★★★★
- Tail ★★★☆☆

Therefore the perception engine should not only detect landmarks,
but also assign perceptual importance depending on the species.

### Proposed Architecture

Target Image

↓

Perception Landmarks

↓

Perception Structures
(Primary Axis, Dove Space, Wing Space, Gesture, Flow, ...)

↓

Construction Engine