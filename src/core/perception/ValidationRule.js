export default class ValidationRule {
  validate(_observations = []) {
    throw new Error(
      `${this.constructor.name} must implement validate(observations)`
    );
  }
}