// Parent class
class Person {
  constructor(id, name) {
    if (!id || !name) {
      throw new Error("Person must have both id and name.");
    }

    // Internal properties
    this._id = id;
    this._name = name;
  }

  // Getters to access properties
  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  // Method
  getDetails() {
    return {
      id: this._id,
      name: this._name,
      role: this.getRole(),
    };
  }

  getRole() {
    throw new Error("Subclasses must implement getRole()");
  }
}

export default Person;
