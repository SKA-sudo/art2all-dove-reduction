export function buildPaperPlacement(
    perceptionState,
    candidates
) {
    if (!perceptionState) return [];

    const bodyRegion =
        perceptionState.semanticObservations.find(
            observation =>
                observation.predicate ===
                "HAS_BODY_REGION"
        )?.value;

    if (!bodyRegion) return [];

    /*
     * R7.0
     *
     * Erste Version:
     *
     * Noch keine Optimierung.
     * Noch keine Flügel.
     * Noch kein Schwanz.
     */

    return candidates;
}