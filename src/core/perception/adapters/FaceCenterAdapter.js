export default class FaceCenterAdapter {
  extract({ faces }) {
    return faces
      .map((face, index) => ({
        id: `face-center-${index}`,
        position: face.center,
      }))
      .filter((faceCenter) => faceCenter.position);
  }
}