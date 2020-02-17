package test.src.main.java.test;

public class AssertionException extends RuntimeException {
  /**
   *
   */
  private static final long serialVersionUID = 1L;
  private Object actual;
  private Object expected;

  public AssertionException(String message, Object actual, Object expected) {
    super(message);
    this.actual = actual;
    this.expected = expected;
  }

  public Object getActual() {
    return actual;
  }

  public Object getExpected() {
    return expected;
  }
}