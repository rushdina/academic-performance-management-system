import EnrollmentRecord from "../models/EnrollmentRecord.js";

class AcademicPerformanceSystem {
  constructor() {
    this._students = new Map();
    this._instructors = new Map();
    this._courses = new Map();
    this._enrollmentRecords = new Map();
  }

  addStudent(student) {
    if (!student) {
      throw new Error("Student is required.");
    }

    if (this._students.has(student.id)) {
      throw new Error(`Student with ID "${student.id}" already exists.`);
    }

    this._students.set(student.id, student);
  }

  addInstructor(instructor) {
    if (!instructor) {
      throw new Error("Instructor is required.");
    }

    if (this._instructors.has(instructor.id)) {
      throw new Error(`Instructor with ID "${instructor.id}" already exists.`);
    }

    this._instructors.set(instructor.id, instructor);
  }

  addCourse(course) {
    if (!course) {
      throw new Error("Course is required.");
    }

    if (this._courses.has(course.code)) {
      throw new Error(`Course with code "${course.code}" already exists.`);
    }

    if (!this._instructors.has(course.instructorId)) {
      throw new Error(
        `Instructor with ID "${course.instructorId}" does not exist.`,
      );
    }

    this._courses.set(course.code, course);

    const instructor = this._instructors.get(course.instructorId);
    instructor.assignCourse(course.code);
  }

  _buildEnrollmentKey(studentId, courseCode) {
    return `${studentId}::${courseCode}`;
  }

  enrollStudent(studentId, courseCode) {
    const student = this._students.get(studentId);
    const course = this._courses.get(courseCode);

    if (!student) {
      throw new Error(`Student with ID "${studentId}" does not exist.`);
    }

    if (!course) {
      throw new Error(`Course with code "${courseCode}" does not exist.`);
    }

    const enrollmentKey = this._buildEnrollmentKey(studentId, courseCode);

    if (this._enrollmentRecords.has(enrollmentKey)) {
      throw new Error(
        `Student "${studentId}" is already enrolled in course "${courseCode}".`,
      );
    }

    student.enroll(courseCode);

    const record = new EnrollmentRecord(studentId, courseCode);
    this._enrollmentRecords.set(enrollmentKey, record);
  }

  getEnrollmentRecord(studentId, courseCode) {
    const enrollmentKey = this._buildEnrollmentKey(studentId, courseCode);
    return this._enrollmentRecords.get(enrollmentKey) || null;
  }

  recordAssessmentScore(studentId, courseCode, assessmentName, score) {
    const student = this._students.get(studentId);
    const course = this._courses.get(courseCode);

    if (!student) {
      throw new Error(`Student with ID "${studentId}" does not exist.`);
    }

    if (!course) {
      throw new Error(`Course with code "${courseCode}" does not exist.`);
    }

    const record = this.getEnrollmentRecord(studentId, courseCode);

    if (!record) {
      throw new Error(
        `No enrollment record found for student "${studentId}" in course "${courseCode}".`,
      );
    }

    const assessment = course.getAssessmentByName(assessmentName);

    if (!assessment) {
      throw new Error(
        `Assessment "${assessmentName}" does not exist in course "${courseCode}".`,
      );
    }

    if (score > assessment.maxScore) {
      throw new Error(
        `Score cannot exceed max score of ${assessment.maxScore} for assessment "${assessmentName}".`,
      );
    }

    record.addScore(assessmentName, score);
  }

  calculateStudentResult(studentId, courseCode) {
    const course = this._courses.get(courseCode);
    const record = this.getEnrollmentRecord(studentId, courseCode);

    if (!course) {
      throw new Error(`Course with code "${courseCode}" does not exist.`);
    }

    if (!record) {
      throw new Error(
        `No enrollment record found for student "${studentId}" in course "${courseCode}".`,
      );
    }

    return course.calculateResult(record);
  }

  getCourseRankings(courseCode) {
    const course = this._courses.get(courseCode);

    if (!course) {
      throw new Error(`Course with code "${courseCode}" does not exist.`);
    }

    const courseRecords = [];

    for (const record of this._enrollmentRecords.values()) {
      if (record.courseCode === courseCode) {
        const student = this._students.get(record.studentId);

        const result = course.calculateResult(record);

        if (typeof result !== "number") {
          continue;
        }

        const finalAssessment = course.getAssessmentByName("Final Exam");
        const finalExamScore = finalAssessment
          ? (record.getScore(finalAssessment.name) ?? -1)
          : -1;

        courseRecords.push({
          studentId: student.id,
          studentName: student.name,
          result,
          finalExamScore,
        });
      }
    }

    courseRecords.sort((a, b) => {
      if (b.result !== a.result) {
        return b.result - a.result;
      }

      if (b.finalExamScore !== a.finalExamScore) {
        return b.finalExamScore - a.finalExamScore;
      }

      return a.studentName.localeCompare(b.studentName);
    });

    let currentRank = 1;

    for (let i = 0; i < courseRecords.length; i++) {
      if (
        i > 0 &&
        (courseRecords[i].result !== courseRecords[i - 1].result ||
          courseRecords[i].finalExamScore !==
            courseRecords[i - 1].finalExamScore)
      ) {
        currentRank = i + 1;
      }

      courseRecords[i].rank = currentRank;
    }

    return courseRecords;
  }

  getTopStudents(courseCode, topN = 3) {
    if (!Number.isInteger(topN) || topN <= 0) {
      throw new Error("topN must be a positive integer.");
    }

    return this.getCourseRankings(courseCode).slice(0, topN);
  }

  getStudentById(studentId) {
    return this._students.get(studentId) || null;
  }

  getInstructorById(instructorId) {
    return this._instructors.get(instructorId) || null;
  }

  getCourseByCode(courseCode) {
    return this._courses.get(courseCode) || null;
  }
}

export default AcademicPerformanceSystem;
