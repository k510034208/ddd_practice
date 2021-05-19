class LowChoesion {
  constructor(
    private val1: number,
    private val2: number,
    private val3: number,
    private val4: number
  ) { }

  methodA() {
    return this.val1 + this.val2
  }

  methodB() {
    return this.val3 + this.val4
  }
}

class HighChoesion1 {
  constructor(
    private val1: number,
    private val2: number,
  ) { }

  methodA() {
    return this.val1 + this.val2
  }
}

class HighChoesion2 {
  constructor(
    private val3: number,
    private val4: number
  ) { }

  methodB() {
    return this.val3 + this.val4
  }
}

