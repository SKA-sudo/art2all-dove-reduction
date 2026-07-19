/**
 * VisualFieldAnalyzer
 *
 * Analysiert die numerischen Werte eines Visual Fields.
 *
 * Verantwortung:
 * - statistische Verteilung
 * - Histogramm
 * - Wertebereiche
 * - Zuordnung der Field-Einträge zu Histogramm-Bins
 *
 * Keine Verantwortung:
 * - keine semantische Interpretation
 * - keine Regionserkennung
 * - keine Rendering-Logik
 */
export default class VisualFieldAnalyzer {
  constructor({ binCount = 10 } = {}) {
    this.binCount = Math.max(1, Math.floor(binCount));
  }

  analyze(fieldValues) {
    const validValues = this.#getValidValues(fieldValues);

    if (validValues.length === 0) {
      return this.#createEmptyResult();
    }

    const normalizedValues = validValues.map(
      (entry) => entry.normalized
    );

    const min = Math.min(...normalizedValues);
    const max = Math.max(...normalizedValues);

    const sum = normalizedValues.reduce(
      (total, value) => total + value,
      0
    );

    const mean = sum / normalizedValues.length;

    const variance =
      normalizedValues.reduce((total, value) => {
        const difference = value - mean;

        return total + difference * difference;
      }, 0) / normalizedValues.length;

    const standardDeviation = Math.sqrt(variance);

    const histogram = this.#createHistogram({
      values: validValues,
      min,
      max,
    });

    return {
      fieldType: "direction",
      sampleCount: validValues.length,

      statistics: {
        min,
        max,
        mean,
        variance,
        standardDeviation,
      },

      histogram,
    };
  }

  #getValidValues(fieldValues) {
  if (!Array.isArray(fieldValues)) {
    console.warn(
      "[VisualFieldAnalyzer] fieldValues is not an array:",
      fieldValues
    );

    return [];
  }

  const validation = {
    total: fieldValues.length,
    missingEntry: 0,
    missingFace: 0,
    missingCenter: 0,
    invalidNormalized: 0,
    valid: 0,
  };

  const validValues = fieldValues.filter((entry) => {
    if (!entry) {
      validation.missingEntry += 1;
      return false;
    }

    if (!entry.face) {
      validation.missingFace += 1;
      return false;
    }

    if (!entry.face.center) {
      validation.missingCenter += 1;
      return false;
    }

    if (!Number.isFinite(entry.normalized)) {
      validation.invalidNormalized += 1;
      return false;
    }

    validation.valid += 1;
    return true;
  });

  console.table(validation);

  if (fieldValues.length > 0) {
    console.log(
      "[VisualFieldAnalyzer] first raw entry:",
      fieldValues[0]
    );

    console.log(
      "[VisualFieldAnalyzer] first raw entry keys:",
      Object.keys(fieldValues[0] ?? {})
    );

    console.log(
      "[VisualFieldAnalyzer] first face:",
      fieldValues[0]?.face
    );

    console.log(
      "[VisualFieldAnalyzer] first normalized:",
      fieldValues[0]?.normalized
    );
  }

  return validValues;
}

  #createHistogram({ values, min, max }) {
    const range = max - min;

    const binSize =
      range === 0 ? 1 : range / this.binCount;

    const bins = Array.from(
      { length: this.binCount },
      (_, index) => {
        const start =
          range === 0
            ? min
            : min + index * binSize;

        const end =
          index === this.binCount - 1
            ? max
            : start + binSize;

        return {
          index,
          start,
          end,
          count: 0,
          ratio: 0,
          entries: [],
        };
      }
    );

    values.forEach((entry) => {
      let binIndex;

      if (range === 0) {
        binIndex = 0;
      } else {
        const relativePosition =
          (entry.normalized - min) / range;

        binIndex = Math.floor(
          relativePosition * this.binCount
        );

        binIndex = Math.min(
          this.binCount - 1,
          Math.max(0, binIndex)
        );
      }

      const bin = bins[binIndex];

      bin.count += 1;
      bin.entries.push(entry);
    });

    bins.forEach((bin) => {
      bin.ratio =
        values.length === 0
          ? 0
          : bin.count / values.length;
    });

    return {
      binCount: this.binCount,
      binSize,
      bins,
    };
  }

  #createEmptyResult() {
    return {
      fieldType: "direction",
      sampleCount: 0,

      statistics: {
        min: 0,
        max: 0,
        mean: 0,
        variance: 0,
        standardDeviation: 0,
      },

      histogram: {
        binCount: this.binCount,
        binSize: 0,
        bins: [],
      },
    };
  }
}