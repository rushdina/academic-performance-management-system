import GradingStrategy from "./GradingStrategy.js";

class PassFailGradingStrategy extends GradingStrategy {
  constructor(passingScore = 50) {
    super();

    if (passingScore < 0 || passingScore > 100) {
      throw new Error("Passing score must be between 0 and 100.");
    }

    this._passingScore = passingScore;
  }

  get passingScore() {
    return this._passingScore;
  }

  calculateFinalResult(enrollmentRecord, assessments) {
    // Same validations as WeightedGradingStrategy
    // Check the record exists
    if (!enrollmentRecord) {
      throw new Error("Enrollment record is required.");
    }

    // Check the assessments array is valid
    if (!Array.isArray(assessments) || assessments.length === 0) {
      throw new Error("Assessments must be a non-empty array.");
    }

    // Check the total weight is 100
    const totalWeight = assessments.reduce(
      (sum, assessment) => sum + assessment.weight,
      0,
    );

    if (totalWeight !== 100) {
      throw new Error("Total assessment weight must equal 100.");
    }

    let finalScore = 0;

    for (const assessment of assessments) {
      const rawScore = enrollmentRecord.getScore(assessment.name);

      // Check no score is missing
      if (rawScore === null) {
        throw new Error(`Missing score for assessment: ${assessment.name}`);
      }

      const normalizedScore = (rawScore / assessment.maxScore) * 100;
      finalScore += normalizedScore * (assessment.weight / 100);
    }

    // This strategy converts raw grading data into categorical academic result
    return finalScore >= this._passingScore ? "Pass" : "Fail";
  }
}

export default PassFailGradingStrategy;
