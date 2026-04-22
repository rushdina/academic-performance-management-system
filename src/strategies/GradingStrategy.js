class GradingStrategy {
  calculateFinalResult(enrollmentRecord, assessments) {
    throw new Error(
      `${this.constructor.name} must implement calculateFinalResult()`,
    );
  }

  getStrategyName() {
    return this.constructor.name;
  }
}

export default GradingStrategy;
