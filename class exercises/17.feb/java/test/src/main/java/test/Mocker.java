package test.src.main.java.test;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.HashMap;
import java.util.Map;

import javax.management.RuntimeErrorException;

import test.src.main.java.test.Bank;

public class Mocker implements InvocationHandler {
  public static Map<String, Object> expectation;
  public static Mocker mockerInvoked = null;
  private static Method methodInvoked = null;

  public static Object mock(Class klass) {
    ClassLoader loader = ClassLoader.getSystemClassLoader();
    return Proxy.newProxyInstance(loader, new Class[] { klass }, new Mocker());
  }

  @Override
  public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
    String key = keyOf(method);
    if (expectation.containsKey(key)) {
      return expectation.get(key);
    }
    mockerInvoked = this;
    methodInvoked = method;
    System.out.println("You called" + method.getName() + "without expectation");
    return null;
  }

  public static void when(Object value, Object result) {
    if (mockerInvoked == null || methodInvoked == null)
      throw new RuntimeException("hovsa");
    String key = keyOf(methodInvoked);
    mockerInvoked.expectation.put(key, result);
    mockerInvoked = null;
    methodInvoked = null;
  }

  private static String keyOf(Method method) {
    return method.toString()+":"+
    Arrays.stream(method.getParameterTypes())
    .map( paramType -> paramType.toString())
    
  }

  public static void main(String[] args) {
    Bank bank = (Bank) Mocker.mock(Bank.class);
    Mocker.when(bank.getName(), "KurtsBank");

    for (Method method : Bank.class.getMethods()) {
      // System.out.println(keyOf());
    }

  }

}