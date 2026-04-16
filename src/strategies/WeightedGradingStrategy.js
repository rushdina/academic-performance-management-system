import GradingStrategy from "./GradingStrategy.js";

class WeightedGradingStrategy extends GradingStrategy {
  // constructor(...args) {
  //   super(...args);
  // }

  calculateFinalResult(enrollmentRecord, assessments) {
    if (!enrollmentRecord) {
      throw new Error("Enrollment record is required.");
    }

    if (!Array.isArray(assessments) || assessments.length === 0) {
      throw new Error("Assessments must be a non-empty array.");
    }

    /* 
    Calculate total assessment weight 100
    E.g
    - Quiz 1 = 20
    - Midterm = 30
    - Final = 50
    Total = 100
    */
    const totalWeight = assessments.reduce(
      (sum, assessment) => sum + assessment.weight,
      0,
    );

    // If the total is not 100, the grading setup is broken.
    if (totalWeight !== 100) {
      throw new Error("Total assessment weight must equal 100.");
    }

    let finalScore = 0; // to accumulate weighted contributions from each assessment

    /*
    For each assessment,
    - get student's raw score
    - normalize it to a percentage
    - multiply by asssessment weight
    - add it to final total
    */
    for (const assessment of assessments) {
      const rawScore = enrollmentRecord.getScore(assessment.name);

      // Check this because if one assessment has no recorded score, the final result should not be silently calculated using incomplete data
      if (rawScore === null) {
        throw new Error(`Missing score for assessment: ${assessment.name}`);
      }

      // Normalizing score because not all assessments must have the same max score
      /* E.g:
      - Quiz out of 20
      - Midterm out of 50
      - Final out of 100

      To combine them fairly, convert each raw score into a percentage first. E.g for Quiz:
      - raw score = 16
      - max score = 20
      - normalized score = 80
      */
      const normalizedScore = (rawScore / assessment.maxScore) * 100;

      finalScore += normalizedScore * (assessment.weight / 100);
    }

    return Number(finalScore.toFixed(2));
  }
}

export default WeightedGradingStrategy;
