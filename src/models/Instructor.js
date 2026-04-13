import Person from "./Person.js";

// Instructor inherits id, name, getDetails(), getRole()
class Instructor extends Person {
  constructor(id, name, department) {
    super(id, name); // calls Person constructor

    if (!department) {
      throw new Error("Instructor must have a department.");
    }

    this._department = department;
    this._assignedCourses = new Set();
  }

  get department() {
    return this._department;
  }

  // Method safely adds a course to the instructor’s assigned list
  assignCourse(courseCode) {
    if (!courseCode) {
      throw new Error("Course code is required.");
    }
    this._assignedCourses.add(courseCode);
  }

  // Checks whether the instructor is assigned to a given course
  isAssignedTo(courseCode) {
    return this._assignedCourses.has(courseCode);
  }

  get assignedCourses() {
    return [...this._assignedCourses]; // convert set to array
  }

  getRole() {
    return "Instructor";
  }

  getDetails() {
    return {
      ...super.getDetails(),
      department: this._department,
      assignedCourses: this.assignedCourses,
    };
  }
}

export default Instructor;
