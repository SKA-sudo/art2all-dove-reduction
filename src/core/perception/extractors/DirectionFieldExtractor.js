export class DirectionFieldExtractor {
  extract({ faces, longitudinalAxisObservation }) {
    const axis =
      longitudinalAxisObservation?.value;

    const origin =
      axis?.headReference?.center;

    const direction =
      axis?.direction
        ?.clone()
        .normalize();

    if (
      !Array.isArray(faces) ||
      faces.length === 0 ||
      !origin ||
      !direction ||
      !Number.isFinite(origin.x) ||
      !Number.isFinite(origin.y) ||
      !Number.isFinite(origin.z) ||
      !Number.isFinite(direction.x) ||
      !Number.isFinite(direction.y) ||
      !Number.isFinite(direction.z) ||
      direction.lengthSq() <= Number.EPSILON
    ) {
      console.error(
        "[DirectionFieldExtractor] Invalid input.",
        {
          faces,
          axis,
          origin,
          direction,
        }
      );

      return {
        subject: "Dove",
        predicate: "HAS_DIRECTION_FIELD",
        value: [],
      };
    }

    const values = faces.map((face) => {
      const offset = face.center
        .clone()
        .sub(origin);

      const score =
        offset.dot(direction);

      return {
        face,
        score,
      };
    });

    const validScores = values
      .map((value) => value.score)
      .filter((score) =>
        Number.isFinite(score)
      );

    if (validScores.length === 0) {
      console.error(
        "[DirectionFieldExtractor] No finite direction scores could be calculated."
      );

      return {
        subject: "Dove",
        predicate: "HAS_DIRECTION_FIELD",
        value: [],
      };
    }

    const min = Math.min(...validScores);
    const max = Math.max(...validScores);
    const range = max - min;

    values.forEach((value) => {
      value.normalized =
        range <= Number.EPSILON
          ? 0
          : (
              (value.score - min) /
              range
            ) *
              2 -
            1;
    });

    return {
      subject: "Dove",
      predicate: "HAS_DIRECTION_FIELD",
      value: values,
    };
  }
}