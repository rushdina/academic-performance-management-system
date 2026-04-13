import Person from "./Person.js";

// Inheritance: Student class automatically has id, name, getDetails()
class Student extends Person {
  constructor(id, name) {
    super(id, name); // calls Person constructor
    this._enrolledCourses = new Set();
  }

  // Method to enroll student to a course
  enroll(courseCode) {
    if (!courseCode) {
      throw new Error("Course code is required for enrollment.");
    }

    if (this._enrolledCourses.has(courseCode)) {
      throw new Error("Student is already enrolled in this course.");
    }

    this._enrolledCourses.add(courseCode);
  }

  // Method to check if student is already in a course
  isEnrolled(courseCode) {
    return this._enrolledCourses.has(courseCode);
  }

  // Getter to access all enrolled courses
  get enrolledCourses() {
    return [...this._enrolledCourses]; // convert set to array for output
  }

  getRole() {
    return "Student";
  }

  getDetails() {
    return {
      ...super.getDetails(),
      enrolledCourses: this.enrolledCourses,
    };
  }
}

export default Student;
