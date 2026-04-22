class EnrollmentRecord {
  constructor(studentId, courseCode) {
    if (!studentId || !courseCode) {
      throw new Error("Enrollment must have studentId and courseCode.");
    }

    if (typeof studentId !== "string" || studentId.trim() === "") {
      throw new Error("Enrollment must have a valid studentId.");
    }

    if (typeof courseCode !== "string" || courseCode.trim() === "") {
      throw new Error("Enrollment must have a valid courseCode.");
    }

    this._studentId = studentId.trim();
    this._courseCode = courseCode.trim();

    // KEY DATA STRUCTURE
    this._scores = new Map();
  }

  get studentId() {
    return this._studentId;
  }

  get courseCode() {
    return this._courseCode;
  }

  addScore(assessmentName, score) {
    if (
      typeof assessmentName !== "string" ||
      assessmentName.trim() === "" ||
      !assessmentName
    ) {
      throw new Error("Assessment name is required.");
    }

    if (typeof score !== "number" || Number.isNaN(score) || score < 0) {
      throw new Error("Score must be a valid non-negative number.");
    }

    this._scores.set(assessmentName.trim(), score);
  }

  getScore(assessmentName) {
    if (typeof assessmentName !== "string" || assessmentName.trim() === "") {
      return null;
    }

    const normalizedName = assessmentName.trim();

    return this._scores.has(normalizedName)
      ? this._scores.get(normalizedName)
      : null;
  }

  getAllScores() {
    return Object.fromEntries(this._scores);
  }
}

export default EnrollmentRecord;
