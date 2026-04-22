class Course {
  constructor(code, title, instructorId, gradingStrategy) {
    if (!code || !title) {
      throw new Error("Course must have both code and title.");
    }

    if (!instructorId) {
      throw new Error("Course must have an instructor ID.");
    }

    if (!gradingStrategy) {
      throw new Error("Course must have a grading strategy.");
    }

    if (typeof code !== "string" || code.trim() === "") {
      throw new Error("Course code must be a non-empty string.");
    }

    if (typeof title !== "string" || title.trim() === "") {
      throw new Error("Course title must be a non-empty string.");
    }

    if (typeof instructorId !== "string" || instructorId.trim() === "") {
      throw new Error("Course must have a valid instructor ID.");
    }

    if (
      !gradingStrategy ||
      typeof gradingStrategy.calculateFinalResult !== "function" ||
      typeof gradingStrategy.getStrategyName !== "function"
    ) {
      throw new Error("Course must have a valid grading strategy.");
    }

    this._code = code.trim();
    this._title = title.trim();
    this._instructorId = instructorId.trim();
    this._gradingStrategy = gradingStrategy;
    this._assessments = [];
  }

  get code() {
    return this._code;
  }

  get title() {
    return this._title;
  }

  get instructorId() {
    return this._instructorId;
  }

  get gradingStrategy() {
    return this._gradingStrategy;
  }

  get assessments() {
    return [...this._assessments];
  }

  addAssessment(assessment) {
    if (!assessment) {
      throw new Error("Assessment is required.");
    }

    if (
      !assessment ||
      typeof assessment.name !== "string" ||
      typeof assessment.getDetails !== "function"
    ) {
      throw new Error("Invalid assessment.");
    }

    const normalizedName = assessment.name.trim().toLowerCase();

    const alreadyExists = this._assessments.some(
      (existingAssessment) =>
        existingAssessment.name.trim().toLowerCase() === normalizedName,
    );

    if (alreadyExists) {
      throw new Error(
        `Assessment with name "${assessment.name}" already exists in this course.`,
      );
    }

    this._assessments.push(assessment);
  }

  getAssessmentByName(name) {
    if (typeof name !== "string") {
      return null;
    }

    const normalizedName = name.trim().toLowerCase();

    return (
      this._assessments.find(
        (assessment) => assessment.name.trim().toLowerCase() === normalizedName,
      ) || null
    );
  }

  calculateResult(enrollmentRecord) {
    if (!enrollmentRecord) {
      throw new Error("Enrollment record is required.");
    }

    return this._gradingStrategy.calculateFinalResult(
      enrollmentRecord,
      this._assessments,
    );
  }

  getDetails() {
    return {
      code: this.code,
      title: this.title,
      instructorId: this.instructorId,
      gradingStrategy: this.gradingStrategy.getStrategyName(),
      assessments: this.assessments.map((assessment) =>
        assessment.getDetails(),
      ),
    };
  }
}

export default Course;
