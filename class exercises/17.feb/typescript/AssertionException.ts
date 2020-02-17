export class AssertionException extends Error {

  private actual: Object;
  private expected: Object;

  public constructor(actual: Object, expected: Object, message: string) {
    super(message);
    this.actual = actual;
    this.expected = expected;
    this.message = `Message: ${this.message}\nActual: ${this.actual} Expected: ${this.expected}`
    this.name = "AssertionException";
  }

}