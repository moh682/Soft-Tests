# Exam questions

## 1.1 We have looked at some static analysis tools like StyleCop, PMD, FindBugs and SonarLint. Explain how static analysis can improve code quality. Explain how it helped you or could have helped you in your project.

Static testing is checking for defects in software without execution of program.

StyleCop, PMD, FindBugs and solarLint. 
- Finde potentielle concret problemer
- Har en stor database der ved hvordan problemer opstår og giver en advarsel på hvad der burde måske blive kigget på.

static testing is code reviews and pair programming we implemented. 
static analysis we used linters to help os make more optimizable, improveble and maintainable code.  

types: 
- Manual examinations -> Manually meaning done by a human, (Testing Reviews)
- Automated analysis using tools -> analysis done by tools automatically. (Linters)

Manuals
- **Informal reviews**
- **Walkthroughs** 
- **Technical reviews** 
- **Inspections** 
- **Management Review**
- **Audit**

**Informal reviews**
- objective: Grammar, spelling, structure, code content.
- No proccedure
- pariticipants: Authors choosing 1-2 reviewers.

**Walkthrough**
- In a meeting
- Author present document step-by-step
- Primary objective: Find defects
- Secondary objective: knowladge sharing, is my understanding right?
- paricipants: 3-7 

**Technical Reviews**
- In a meeting
- Primary Objective: Find defects
- Secondary Objective: Make techincal decisions, reach concensus
- Manager should not be present
- Report is writen, an summarizing conclusions

**Inspections**
- Primary goal: Product Improvement
- Secondary goal: Process improvement
- Long process

**Management Review**
**Audit**

Automation tools like
- tslint and eslint used for typescript/javascript

why Static Testing?
- Early defects detection and correction
- Reduced development timescales
- Reduced testing cost and time
- For improvement of development productivity
- To get fewer defect at a later stage of testing

## Explain test levels, and what characterizes the infividual levels. Then, relate to your own project.

#### Static Testing
**characteristics**
- Test will be done before the execution of the program.
- Test both code and associated documentation. 
- Helps detects errors before code executions

**two categories**
- Manual -> reviews, pairprogramming
- Automatic -> tools, linters

**pros**
- Find possible errors early on in the process.
- Better code quality, and application Quality. 
	- Maintainability
	- Good Solutions
**cons**
- Manual processes takes a lot of time.
- Require everyones interraction to get the best output. 
- Automated tools only scan for code

#### Unit testing
Unit testing is under the category of dynamic testing, which require the code to be executed to test it. 

High Cohesion/Low Coupling

Low coupling -> how much your class depend on other modules
High Cohesion -> How much 

- individual units/components tests
- Require execution of program

We are using unit testing for crucial units like token creation and validation. which is essesial for the security aspect of the application.

First verification than validation

**Verification** 
- Checking documents, design, code and program.
- Does not include execution of program
- Is mostly static testing
- Find bugs early in the process

**Validation**
- Dynamic checking of the actual program
- Include execution of the program
- Is not static testing but dynamic testing
- Find bugs after the verification.

#### Integration Testing
Integration is where we combine multiple units and tested at once. 

Some approaches
- Big bang -> we take all or most and test them at once

we used integration testing to test routes executions. Meaning accessing all layers of the application in one test. That is called integration testing.

#### System Testing

System testing is after the whole program is finished, we test if it has any bugs as the whole system. The execute of such a function would the some users, that use th eprogram for some small amount of time. It is important that the person executing the test, that he or she should know what the program is intended to do.

Based on what system is being developed, the suitable user should be selected. 

#### Load Testing

Load test are used to check weither the application can handle the amount of stress expected from it. 
stress testing are used to find the breaking point of the application

I used Jmeter to check for load performance. Since we are the one who are going to controll the values

#### Acceptance Testing
Acceptance testing er den sidste del af test processen, hvor nogle specifike business krav bliver testet.

Unit tests can blive implementeret til at udføre acceptance test, check for functionalitet. 

methods 
- BBT -> black box testing

We used Selenium IDE to test the website. 
we could have implemented mocha to do unittests on the DOM. 

who performs the tests?
- Internal acceptance testers
	- Product owners
- External acceptance teseters
	- Customers


## 1.3 Explain what kinds of test can be carried out without running any code. Explain how it can be used on non-code documents as well.

### Before writing code 
- **Technical Reviews** 
- **Informal Reviews**
- **Acceptance tests**

### While writing code
- **Linters**

## 1.4 Explain test activities, and how they are related to each other. Then explain the test activities you carried out in your project.

All tests are there to insure:
- that the software meets agreed requirements and design
- that the application works as expected
- the application doesnt container serious bugs
- meets its intended use as per user expectation.

- **Unit testing**
We implements unit tests through TDD. Where we start by creating a test 
- **Integration testing** 

value analysis
- **white-box: Code** We implemented this.
- **black-box: Specifications** 

- **Refactoring**
- **Maintenance**
- **Continuous Integration**
- **Code reviews**

## 1.5 Testing is related to ensuring higher code quality. Elaborate on what characterizes high code quality, and what makes code testable.

- **Testable code**
- **Names of tests**
- **“sufficient” tests of a method or class**
- **Assertions, defensive programming**
assertions and defensive programming, is checking the possibilites of most inputs and find solutions and fallbacks.
- **Dependency injection**
Dependancy injections are a somewhat fine solutions for seperating code, which will make it easier to test code. because we have seperated it from the rest making it as much low coupled as possible.

## 1.6 Explain the concept of maintainable code, and how it’s related to test. Explain how to find out if a code base is maintainable.

- **Maintainability**
- **Product quality**
- **Temporal coupling**

- **Continuous Integration**
- **Static Analysis**
- **Dependency injection, inversion of control**
code up to interfaces instead of objects. 
- **Low coupling, high cohesion**
- **Cyclomatic code complexity**

## 1.7 Explain unit testing, and what characterizes it in contrast to other types of test.

- **What and why**
- **Unit Under Test _ System Under Test_**
- **Unit test lifecycle(BeforeAll, AfterAll _ SetUp, TearDown)_**
- **Test doubles (mock, fake, stub, spy)**
- **Matchers(Hamcrest)**
- **Test Driven Development**
- **Dependency Injection**
- **Equivalence classes, boundary value analysis, equivalence partitions**

## 1.8 Explain test driven development, and how it affects the development process and code quality.

- **Red, Green, Refactor**
- **Testable code**
- **Maintainable code**
- **Equivalence partitions**
- **Positive, negative tests**

## 1.9 Explain about test doubles. Explain how and why mocking is useful, and in what test areas.

- **JMock, mocks, spies, stubs, fakes, dummies**
- **Dependency injection**
- **Interfaces, contracts**
- **Black-box vs white-box**

## 1.10 Characterize high quality software. Explain how writing tests can increase code quality.

- **Defensive programming**
Always check the preconditions trust nobody!
 Check your postconditions, doubt yourself !
 Check your invariants, 
Remember the ACID rules Atomicy Consistency Isolation Durability 
	
- **Black-box development**
	- When we dont know what is in our unit/component/
- **Interfaces, contracts**
- **Inversion of control**
- **Dependency Injection**
- **Components**

## 1.11 Elaborate on dependencies in software, and how it’s related to the subject of test.

- **Dependencies between layers**
- **System resources**
- **Relations between objects**
- **Dependency inversion, Inversion of Control, Dependency Injection**
- **Spies**

- **Mocks**


## 1.12 Explain problems in test automation, and how a continuous integration tool can help.

- **What is continuous integration?**
	- merge developers work into a single workplace
	- build
	- test
	- deploy
- **How can a CI help regarding tests?**
- **What is a regression?**
- **What test levels can be covered by a CI system?**

## 1.13 Explain specification-based testing, and how you can be more confident that you have written a sufficient amount of tests.

This type of test require the tester to have knowladge of the code. If you want to that we have written sufficient amount of tests, than 

- **Equivalence partitioning**
- **Positive negative tests**
- **Boundary value analysis**
- **Edge cases**
	- Only happens in extreme conditions, like when min/max have been hit.
- **Decision tables**
	 - possible combinationer
	 - n*m
- **Code coverage**

# Extra
**positive testing**: Doing what the function is sopposed to do.
**negative testing**: Doing what the fucntion is not sopossed to do.

