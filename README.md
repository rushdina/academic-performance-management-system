# 🎓 Academic Performance Management System

A JavaScript console application that models an academic performance management system using **Object-Oriented Programming (OOP)** principles. The system manages students, instructors, courses, assessments, enrollments, grading, and course rankings while demonstrating modular software design, data structures, and interchangeable grading strategies.

## ✨ Features

* Manage students, instructors, courses, and assessments
* Enroll students into courses
* Assign courses to instructors
* Record and validate assessment scores
* Calculate weighted numerical grades
* Support Pass/Fail grading with configurable passing scores
* Use different grading strategies for different courses
* Rank students based on their academic performance
* Apply final exam scores as a ranking tie-breaker
* Retrieve the top-performing students in a course
* Prevent duplicate students, instructors, courses, assessments, and enrollments
* Validate assessment weights, scores, and required data
* Store and retrieve data efficiently using JavaScript `Map` and `Set`

## 🛠️ Technologies Used

* **JavaScript (ES6+)** — application logic, classes, inheritance, modules, and data structures
* **Node.js** — runtime environment for executing the console application
* **ES Modules** — modular code organization using `import` and `export`
* **npm** — project management and application scripts

## 📁 Project Structure

```text
academic-performance-management-system/
├── package.json
└── src/
    ├── app.js
    │
    ├── models/
    │   ├── Assessment.js
    │   ├── Course.js
    │   ├── EnrollmentRecord.js
    │   ├── Instructor.js
    │   ├── Person.js
    │   └── Student.js
    │
    ├── services/
    │   └── AcademicPerformanceSystem.js
    │
    └── strategies/
        ├── GradingStrategy.js
        ├── PassFailGradingStrategy.js
        └── WeightedGradingStrategy.js
```

### Models

The `models` directory contains the main domain entities used by the academic system.

* `Person` — parent class containing common person properties and behaviour
* `Student` — represents a student and their enrolled courses
* `Instructor` — represents an instructor, department, and assigned courses
* `Course` — represents a course, its instructor, assessments, and grading strategy
* `Assessment` — represents an assessment with a name, weight, and maximum score
* `EnrollmentRecord` — connects a student to a course and stores the student's assessment scores

### Services

`AcademicPerformanceSystem` acts as the main service layer and coordinates operations across the different models.

It handles:

* Student and instructor registration
* Course creation
* Student enrollment
* Assessment score recording
* Result calculation
* Course rankings
* Top-student retrieval

### Grading Strategies

The `strategies` directory separates grading algorithms from the `Course` model.

Two grading strategies are implemented:

**Weighted Grading**

Calculates a numerical final score based on each assessment's normalized score and weight.

For example:

```text
Quiz 1      20%
Midterm     30%
Final Exam  50%
----------------
Total       100%
```

Each score is normalised according to its maximum possible score before its weighted contribution is calculated.

**Pass/Fail Grading**

Calculates the same weighted performance but converts the final result into either:

```text
Pass
```

or:

```text
Fail
```

based on a configurable passing score.

## 🧩 Object-Oriented Programming Principles

The project applies several key Object-Oriented Programming concepts.

### Encapsulation

Classes manage their own internal state through properties, getters, and methods.

For example, students cannot be enrolled simply by directly modifying the returned enrolled-course array. Enrollment is handled through the `enroll()` method, which also validates duplicate enrollment.

Internal collections are also returned as copies where appropriate to reduce unintended external modification.

### Inheritance

`Student` and `Instructor` inherit common properties and behaviour from the `Person` parent class.

```text
             Person
            /      \
       Student    Instructor
```

The grading strategies use another inheritance hierarchy:

```text
                GradingStrategy
                /             \
    WeightedGrading       PassFailGrading
       Strategy               Strategy
```

This reduces duplicated behaviour and establishes common interfaces between related classes.

### Polymorphism

Different classes can provide their own implementation of the same method.

For example, both `Student` and `Instructor` implement:

```js
getRole()
```

but return different roles.

Polymorphism is also used by the grading system. A `Course` calls:

```js
gradingStrategy.calculateFinalResult()
```

without needing to know whether the course uses weighted or Pass/Fail grading.

### Abstraction

Higher-level operations hide lower-level implementation details.

For example:

```js
system.calculateStudentResult(studentId, courseCode);
```

allows the caller to calculate a result without manually retrieving enrollment records, assessments, scores, weights, and grading algorithms.

`GradingStrategy` also establishes the expected interface for concrete grading strategies.

## 🔄 Strategy Design Pattern

The project uses the **Strategy Design Pattern** to make grading behaviour interchangeable.

A course receives a grading strategy when it is created:

```js
const weightedStrategy = new WeightedGradingStrategy();

const course = new Course(
  "CS101",
  "Programming Fundamentals",
  "I001",
  weightedStrategy,
);
```

Another course can use a completely different grading strategy:

```js
const passFailStrategy = new PassFailGradingStrategy(50);
```

The `Course` class does not need separate conditional logic for every possible grading system. Instead, it delegates result calculation to the assigned strategy.

This makes the system easier to extend with additional grading strategies in the future.

## 🗃️ Data Structures

The project uses different JavaScript data structures based on their intended purpose.

### Map

`Map` is used for key-value relationships and efficient lookups, including:

* Students by student ID
* Instructors by instructor ID
* Courses by course code
* Enrollment records by student/course combination
* Assessment scores by assessment name

### Set

`Set` is used where duplicate values should not occur, including:

* Courses enrolled by a student
* Courses assigned to an instructor

### Array

Arrays are used for ordered collections such as course assessments and ranking results.

## 🏆 Student Ranking

Students in numerically graded courses can be ranked based on their calculated final results.

The ranking algorithm sorts students using:

1. Overall result — highest first
2. Final Exam score — used as a tie-breaker
3. Student name — alphabetical ordering when the previous values are equal

Students with the same overall result and final exam score receive the same rank.

For example:

```text
Rank  Student  Result
1     Alice    83.50
2     Ben      83.00
2     Chloe    83.00
4     Daniel   73.50
```

Pass/Fail results are not included in numerical course rankings because they produce categorical rather than numerical results.

## ✅ Validation and Error Handling

The system includes validation for common invalid operations, including:

* Missing student or instructor information
* Duplicate students, instructors, and courses
* Duplicate course enrollment
* Duplicate assessments within a course
* Invalid assessment weights
* Assessment weights that do not total 100%
* Invalid or negative scores
* Scores exceeding an assessment's maximum score
* Missing assessment scores
* Non-existent students, courses, or assessments
* Invalid grading strategies

Errors are handled using JavaScript exceptions and a `try...catch` block in the application entry point.

## 🚀 Getting Started

### Prerequisites

Make sure **Node.js** and **npm** are installed.

Check your installation:

```bash
node --version
npm --version
```

### Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project directory:

```bash
cd academic-performance-management-system
```

Install the project dependencies:

```bash
npm install
```

The current project does not require external runtime dependencies, but running `npm install` initialises the project based on its `package.json`.

## ▶️ Running the Application

Run:

```bash
npm start
```

This executes:

```bash
node src/app.js
```

The application will create sample students, instructors, courses, assessments, enrollments, and scores before displaying the generated academic results and rankings in the terminal.

## 💡 Example Usage

Create a student and instructor:

```js
const student = new Student("S001", "Alice");
const instructor = new Instructor(
  "I001",
  "Dr. Tan",
  "Computer Science",
);

system.addStudent(student);
system.addInstructor(instructor);
```

Create a course using weighted grading:

```js
const weightedStrategy = new WeightedGradingStrategy();

const course = new Course(
  "CS101",
  "Programming Fundamentals",
  "I001",
  weightedStrategy,
);

system.addCourse(course);
```

Add assessments:

```js
course.addAssessment(new Assessment("Quiz 1", 20, 100));
course.addAssessment(new Assessment("Midterm", 30, 100));
course.addAssessment(new Assessment("Final Exam", 50, 100));
```

Enroll a student and record scores:

```js
system.enrollStudent("S001", "CS101");

system.recordAssessmentScore("S001", "CS101", "Quiz 1", 80);
system.recordAssessmentScore("S001", "CS101", "Midterm", 75);
system.recordAssessmentScore("S001", "CS101", "Final Exam", 90);
```

Calculate the student's result:

```js
system.calculateStudentResult("S001", "CS101");
```

Retrieve course rankings:

```js
system.getCourseRankings("CS101");
```

Retrieve the top three students:

```js
system.getTopStudents("CS101", 3);
```

## 📚 Key Learnings

Through this project, I strengthened my understanding of:

* Object-Oriented Programming in JavaScript
* Encapsulation, inheritance, abstraction, and polymorphism
* Class relationships and composition
* Strategy Design Pattern
* Modular application architecture
* ES Modules
* JavaScript `Map`, `Set`, and arrays
* Multi-criteria sorting and ranking algorithms
* Input validation and error handling
* Separation of concerns between models, business logic, and algorithms
