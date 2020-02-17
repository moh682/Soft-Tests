package test.src.main.java.test;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import test.src.main.java.test.Bank;

public class Mocker implements InvocationHandler {

  public static Object mock(Class klass) {
    ClassLoader loader = ClassLoader.getSystemClassLoader();
    return Proxy.newProxyInstance(loader, new Class[] { klass }, new Mocker());
  }

  @Override
  public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
    System.out.println("You called" + method.getName());
    return null;
  }

  public static void main(String[] args) {
    Bank bank = (Bank) Mocker.mock(Bank.class);
    bank.getName();
  }
}