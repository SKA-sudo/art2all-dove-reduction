export class DirectionFieldExtractor {
  extract({ faces, longitudinalAxisObservation }) {
    const axis = longitudinalAxisObservation.value;

    const origin = axis.headReference;
    const direction = axis.direction.clone().normalize();

    const values = faces.map((face) => {
      const offset = face.center.clone().sub(origin);

      const score = offset.dot(direction);

      return {
        face,
        score,
      };
    });

    const scores = values.map((v) => v.score);

    const min = Math.min(...scores);
    const max = Math.max(...scores);

    values.forEach((v) => {
      v.normalized =
        max - min === 0
          ? 0
          : ((v.score - min) / (max - min)) * 2 - 1;
    });

    return {
      subject: "Dove",
      predicate: "HAS_DIRECTION_FIELD",
      value: values,
    };
  }
}