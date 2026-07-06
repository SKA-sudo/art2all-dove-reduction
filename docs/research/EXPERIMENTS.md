################################################################
# Art2all – EXPERIMENTD
################################################################


Experiments

Version: 1.0

Status: Living Document

Repository: art2all-dove-reduction


Autor:
Stephan Kästner
mit Unterstützung von ChatGPT


################################################################
################################################################

################################################################
Experiment R4.4.1 – Body Center
################################################################

Question

Can the Bounding Box Center serve as a stable first landmark?

Implementation

Bounding Box Center

Observation

The landmark remained stable during the wing animation.

Result

Validated as a baseline.


---------------------------------------------------------------

################################################################
Experiment R4.5.1 – Face Normals
################################################################

Question

Can face normals explain perceptual flow?

Implementation

FlowExtractor V1

Observation

The rendered normals produced a chaotic field.

Result

Rejected.

Conclusion

Face normals describe geometry.
They do not describe perceptual flow.