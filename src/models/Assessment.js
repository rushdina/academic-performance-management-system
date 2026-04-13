class Assessment {
  constructor(name, weight, maxScore = 100) {
    if (!name) {
      throw new Error("Assessment must have a name.");
    }

    if (weight <= 0 || weight > 100) {
      throw new Error("Weight must be between 1 and 100.");
    }

    if (maxScore <= 0) {
      throw new Error("Max score must be greater than 0.");
    }

    // Internal properties
    this._name = name;
    this._weight = weight;
    this._maxScore = maxScore;
  }

  // Controlled access to properties via getters
  get name() {
    return this._name;
  }

  get weight() {
    return this._weight;
  }

  get maxScore() {
    return this._maxScore;
  }

  getDetails() {
    return {
      name: this._name,
      weight: this._weight,
      maxScore: this._maxScore,
    };
  }
}

export default Assessment;
