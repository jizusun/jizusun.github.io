---
layout: post
title:  "Mock不是Stub（译）"
---

* 英文原文：[Martin Fowler: Mocks Aren't Stubs](https://martinfowler.com/articles/mocksArentStubs.html)
* 中文翻译：[众成翻译](http://www.zcfy.cc/original/mocks-arent-stubs-4708.html)
* 译者：[孙继祖](https://www.linkedin.com/in/jizusun/)


_The term 'Mock Objects' has become a popular one to describe special case objects that mimic real objects for testing. Most language environments now have frameworks that make it easy to create mock objects. What's often not realized, however, is that mock objects are but one form of special case test object, one that enables a different style of testing. In this article I'll explain how mock objects work, how they encourage testing based on behavior verification, and how the community around them uses them to develop a different style of testing._

_' Mock 对象'这一术语，已经被广泛用来描述那些在测试中用来模拟真实对象的特殊对象。大多数语言环境现在都有框架可以很容易地创建 mock 对象。然而，通常未被得到关注的是，mock 对象不仅是一种特殊的测试对象，还能形成不同的测试风格。在这篇文章里，我会解释 mock 对象是如何工作的，他们如何促进了一种基于行为验证( behavior verification )的测试，以及相关社区是如何使用他们从而形成了一种不同的测试风格。_

02 January 2007

2007年1月2日



## Translations （翻译） 
[French](http://bruno-orsier.developpez.com/mocks-arent-stubs) · [Italian](http://docs.google.com/View?docid=dg4p5693_7wf689b) · [Spanish](http://carlosble.com/traducciones/mocksArentStubs.html) · [Portuguese](http://www.infoq.com/br/articles/mocks-Arent-Stubs) · [Korean](https://sites.google.com/a/jabberstory.net/testing/mocksArentStubs)



## Contents （目录）

*   [Regular Tests](https://martinfowler.com/articles/mocksArentStubs.html#RegularTests)
*   [Tests with Mock Objects](https://martinfowler.com/articles/mocksArentStubs.html#TestsWithMockObjects)
    *   [Using EasyMock](https://martinfowler.com/articles/mocksArentStubs.html#UsingEasymock)
*   [The Difference Between Mocks and Stubs](https://martinfowler.com/articles/mocksArentStubs.html#TheDifferenceBetweenMocksAndStubs)
*   [Classical and Mockist Testing](https://martinfowler.com/articles/mocksArentStubs.html#ClassicalAndMockistTesting)
*   [Choosing Between the Differences](https://martinfowler.com/articles/mocksArentStubs.html#ChoosingBetweenTheDifferences)
    *   [Driving TDD](https://martinfowler.com/articles/mocksArentStubs.html#DrivingTdd)
    *   [Fixture Setup](https://martinfowler.com/articles/mocksArentStubs.html#FixtureSetup)
    *   [Test Isolation](https://martinfowler.com/articles/mocksArentStubs.html#TestIsolation)
    *   [Coupling Tests to Implementations](https://martinfowler.com/articles/mocksArentStubs.html#CouplingTestsToImplementations)
    *   [Design Style](https://martinfowler.com/articles/mocksArentStubs.html#DesignStyle)
*   [So should I be a classicist or a mockist?](https://martinfowler.com/articles/mocksArentStubs.html#SoShouldIBeAClassicistOrAMockist)
*   [Final Thoughts](https://martinfowler.com/articles/mocksArentStubs.html#FinalThoughts)

I first came across the term "mock object" a few years ago in the [Extreme Programming](https://martinfowler.com/bliki/ExtremeProgramming.html)(XP) community. Since then I've run into mock objects more and more. Partly this is because many of the leading developers of mock objects have been colleagues of mine at ThoughtWorks at various times. Partly it's because I see them more and more in the XP-influenced testing literature.

几年前，我在极限编程([Extreme Programming](https://martinfowler.com/bliki/ExtremeProgramming.html), XP)的社区中第一次遇到"mock 对象"这个术语。从那以后，我越来越多地接触到 mock 对象。一方面是因为 mock 对象的很多主要开发人员都曾是我在 ThoughtWorks 的同事，另一方面，也是因为我发现，受极限编程思想所影响的测试论著越来越多地提及这一概念。

But as often as not I see mock objects described poorly. In particular I see them often confused with stubs - a common helper to testing environments. I understand this confusion - I saw them as similar for a while too, but conversations with the mock developers have steadily allowed a little mock understanding to penetrate my tortoiseshell cranium.

但是我发现，关于 mock 对象的解释通常都很糟糕。特别是，我发现他们通常和 stub （一个测试环境的常用 helper）这一概念相混淆。，我能辨别他们的不同（尽管我也曾经觉得他们差不多），但通过跟 mock 开发者的一些交流，让我似乎对他们有越来越深刻的认识。

This difference is actually two separate differences. On the one hand there is a difference in how test results are verified: a distinction between state verification and behavior verification. On the other hand is a whole different philosophy to the way testing and design play together, which I term here as the classical and mockist styles of [Test Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html).

这种区别其实是一种截然不同的区别。一方面，差异在于测试结果是如何被验证的：是状态验证还是行为验证。另外一方面，是关于测试和设计如何相辅相成的完全不同哲学，我把他们叫做TDD（[Test Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html)）中的传统风格和 mockist 风格。


* * *

## Regular Tests （常规测试）

I'll begin by illustrating the two styles with a simple example. (The example is in Java, but the principles make sense with any object-oriented language.) We want to take an order object and fill it from a warehouse object. The order is very simple, with only one product and a quantity. The warehouse holds inventories of different products. When we ask an order to fill itself from a warehouse there are two possible responses. If there's enough product in the warehouse to fill the order, the order becomes filled and the warehouse's amount of the product is reduced by the appropriate amount. If there isn't enough product in the warehouse then the order isn't filled and nothing happens in the warehouse.

我将以一个简单的例子来说明这种风格。（这个例子是Java写的，但这些原则对于任何面向对象的语言都是通用的。）我们有一个 `order` （订单）对象，并使用一个 `warehouse` （仓库）对象对其填充。`order` 很简单，只有一个 `product`（商品） 和  一个`quantity`（数量）。`warehouse` 包含了不同商品的库存。当我们想要用一个仓库的库存去填充订单时，会有两种可能的结果。如果仓库里有足够的商品去填充这个订单时，那么订单就会被填满，并且仓库的商品数量会相应减少。如果仓库没有足够的商品，那么订单就不会被填充，同时仓库也不会发生什么。

These two behaviors imply a couple of tests, these look like pretty conventional JUnit tests.

这两种行为对应着一些测试，这些测试看起来就是很传统的 JUnit 测试。

```java
public class OrderStateTester extends TestCase {
  private static String TALISKER = "Talisker";
  private static String HIGHLAND_PARK = "Highland Park";
  private Warehouse warehouse = new WarehouseImpl();

  protected void setUp() throws Exception {
    warehouse.add(TALISKER, 50);
    warehouse.add(HIGHLAND_PARK, 25
  }
  public void testOrderIsFilledIfEnoughInWarehouse() {
    Order order = new Order(TALISKER, 50);
    order.fill(warehouse);
    assertTrue(order.isFilled());
    assertEquals(0, warehouse.getInventory(TALISKER));
  }
  public void testOrderDoesNotRemoveIfNotEnough() {
    Order order = new Order(TALISKER, 51);
    order.fill(warehouse);
    assertFalse(order.isFilled());
    assertEquals(50, warehouse.getInventory(TALISKER));
  }
```

xUnit tests follow a typical four phase sequence: setup, exercise, verify, teardown. In this case the setup phase is done partly in the setUp method (setting up the warehouse) and partly in the test method (setting up the order). The call to `order.fill` is the exercise phase. This is where the object is prodded to do the thing that we want to test. The assert statements are then the verification stage, checking to see if the exercised method carried out its task correctly. In this case there's no explicit teardown phase, the garbage collector does this for us implicitly.

xUnit 测试遵循典型的四步法：准备（setup）, 执行（exercise），验证（verify）和清理（teardown）。在这个例子中，准备阶段的工作一部分在 `setUp` 方法中（准备仓库），剩下的在测试方法中（准备订单）。对 `order.fill` 的调用是执行阶段，这时对象被调用去做我们想要测试的部分。断言（assert）语句是验证阶段，检查被执行的方法是否正确执行了它的任务。在这个例子中，没有明显的清理步骤，垃圾清理器（garbage collector）隐式地替我们做了。（译者注：如果想理解得更有“味道”，或许你可以理解成：烹饪四部曲——准备食材锅碗瓢盆，做饭，尝尝味道，洗碗洗锅）

During setup there are two kinds of object that we are putting together. Order is the class that we are testing, but for `Order.fill` to work we also need an instance of Warehouse. In this situation Order is the object that we are focused on testing. Testing-oriented people like to use terms like object-under-test or system-under-test to name such a thing. Either term is an ugly mouthful to say, but as it's a widely accepted term I'll hold my nose and use it. Following Meszaros I'll use System Under Test, or rather the abbreviation SUT.

在准备阶段，有两种对象被放到了一起。`Order` 是我们正在测试的类，但是 为了让 `Order.fill`  工作，我们还需要一个 `Warehouse` 的实例（instance）。这样的话，`Order` 是我们关注的测试对象。面向测试的人（testing-oriented people）喜欢使用类似被测对象 （object-under-test）或者被测系统（system-under-test）这样的术语。每个术语其实都不贴切，但是因为它们是广泛接受的术语，所以我还是不得不这么叫它们。按照 Meszaros的说法，我会使用 被测系统（System Under Test），或简称 SUT 。（译者注： Gerard Meszaros 是经典著作 xUnit Test Patterns 的作者）

So for this test I need the SUT (`Order`) and one collaborator (`warehouse`). I need the warehouse for two reasons: one is to get the tested behavior to work at all (since`Order.fill` calls warehouse's methods) and secondly I need it for verification (since one of the results of Order.fill is a potential change to the state of the warehouse). As we explore this topic further you'll see there we'll make a lot of the distinction between SUT and collaborators. (In the earlier version of this article I referred to the SUT as the "p imary object" and collaborators as "secondary objects")

所以对于这个测试，我需要被测对象 `Order` 和一个合作者（collaborator） `warehouse`。我需要`warehouse`有两个原因：一是因为要让测试行为完全发生（因为`Order.fill` 调用了 `warehouse` 的方法），其次是因为我们需要进行验证（因为 `Order.fill` 的一个后果是可能改变 `warehouse` 的状态）。当我们进一步探讨这个话题的时候，你会发现我们对“被测系统” 和“合作者”做了很多辨析。（而在本文的之前版本，我把“被测系统”叫做“主要对象”，把“合作者”叫做“次要对象”）

This style of testing uses **state verification**: which means that we determine whether the exercised method worked correctly by examining the state of the SUT and its collaborators after the method was exercised. As we'll see, mock objects enable a different approach to verification.

这种测试的风格其实是“状态验证”（state verification）：这意味着我们通过检查被测系统以及合作者在方法执行之后的状态，来确定被执行方法是否正确工作。我们将看到，mock 对象使得一种截然不同的验证方法变得可行

* * *

## Tests with Mock Objects （使用 mock 对象进行测试）

Now I'll take the same behavior and use mock objects. For this code I'm using the jMock library for defining mocks. jMock is a java mock object library. There are other mock object libraries out there, but this one is an up to date library written by the originators of the technique, so it makes a good one to start with.

现在，我将做同样的事情，但使用 mock 对象。对于这段代码，我将使用 jMock 库来定义 mock对象。jMock 是一个 Java 的 mock 对象库。还要其他一些 mock 对象库，但这个库是该方法的提出者写的一个最新的库，所以这是一个很好的起点。


```java
public class OrderInteractionTester extends MockObjectTestCase {
  private static String TALISKER = "Talisker";

  public void testFillingRemovesInventoryIfInStock() {
    //setup - data
    Order order = new Order(TALISKER, 50);
    Mock warehouseMock = new Mock(Warehouse.class);

    //setup - expectations
    warehouseMock.expects(once()).method("hasInventory")
      .with(eq(TALISKER),eq(50))
      .will(returnValue(true));
    warehouseMock.expects(once()).method("remove")
      .with(eq(TALISKER), eq(50))
      .after("hasInventory");

    //exercise
    order.fill((Warehouse) warehouseMock.proxy());

    //verify
    warehouseMock.verify();
    assertTrue(order.isFilled());
  }

  public void testFillingDoesNotRemoveIfNotEnoughInStock() {
    Order order = new Order(TALISKER, 51);
    Mock warehouse = mock(Warehouse.class);

    warehouse.expects(once()).method("hasInventory")
      .withAnyArguments()
      .will(returnValue(false));

    order.fill((Warehouse) warehouse.proxy());

    asser False(order.isFilled());
  }
```

Concentrate on `testFillingRemovesInventoryIfInStock` first, as I've taken a couple of shortcuts with the later test.

首先关注  `testFillingRemovesInventoryIfInStock` ，因为我在后面的测试中采取了同样的一些技巧。

To begin with, the setup phase is very different. For a start it's divided into two parts: data and expectations. The data part sets up the objects we are interested in working with, in that sense it's similar to the traditional setup. The difference is in the objects that are created. The SUT is the same - an order. However the collaborator isn't a wa ehouse object, instead it's a mock warehouse - technically an instance of the class `Mock`.

首先，准备阶段就很不一样。一开始，它就被分为两部分：数据（data）和期望（expectations）。数据部分都要准备我们要用的对象，这和传统的步骤差不多，但区别是被实际创建的对象不一样。被测系统是一样的——一个`order`对象，然而合作者并不是一个 `warehouse` 对象，而是一个 mock的 `warehouse` ——技术上讲是 `Mock` 类的一个实例。

The second part of the setup creates expectations on the mock object.The expectations indicate which methods should be called on the mocks when the SUT is exercised.

准备阶段的第二部分创建了 mock 对象的期望。期望表明，当被测系统被执行时，mock 对象上的哪个方法应该被调用。

Once all the expectations are in place I exercise the SUT. After the exercise I then do verification, which has two aspects. I run asserts against the SUT - much as before. However I also verify the mocks - checking that they were called according to their expectations.

一旦所有的期望都就位，我就执行被测系统。执行以后，我再做验证，包括两部分。我对被测系统运行断言（assert）——这和以前一样。然而我还验证了 mock 对象——检查它们是否如期望一样被调用。

The key difference here is how we verify that the order did the right thing in its interaction with the warehouse. With state verification we do this by asserts against the warehouse's state. Mocks use **behavior verification**, where we instead check to see if the order made the correct calls on the warehouse. We do this check by telling the mock what to expect during setup and asking the mock to verify itself during verification. Only the order is checked using asserts, and if the the method doesn't change the state of the order there's no asserts at all.

关键的区别在于，我们如何验证 `order` 在它与 `warehouse` 的交互中做了正确的事情。使用状态验证，我们可以针对性地检查 `warehouse` 的状态来做到这一点。  Mock对象 使用“行为验证（Behavior verification）”，即我们检查 `order` 是否对 `warehouse` 进行了正确的调用——我们通过在准备阶段定义 mock 对象的期望，以及在验证阶段要求 mock 对象进行自我验证，来进行检查。只有 `order` 被使用断言来检查，如果该方法不改变 `warehouse` 的任何状态，就根本没有针对 `warehouse` 的断言。

In the second test I do a couple of different things. Firstly I create the mock differently, using the `mock` method in MockObjectTestCase rather than the constructor. This is a convenience method in the jMock library that means that I don't need to explicitly call verify later on, any mock created with the convenience method is automatically verified at the end of the test. I could have done this in the first test too, but I wanted to show the verification more explicitly to show how testing with mocks works.

在第二个测试当中，我做了几件不同的事情。首先，我们用不同的方法创建了 mock 对象，使用 `MockObjectTestCase`  中的 `mock` 方法而不是 Mock 类的构造函数。这是 jMock 库中的一个方便写法，也就是说，我不需要在后面显式地调用 `verify`，但任何使用这个方便写法创建的 mock 对象都会在测试结束的时候被自动验证。我也可以在第一个测试中就这么写，但我主要是想跟明确地展示如何验证，以展示 如何使用 mock 对象进行测试。

The second different thing in the second test case is that I've relaxed the constraints on the expectation by using `withAnyArguments`. The reason for this is that the first test checks that the number is passed to the warehouse, so the second test need not repeat that element of the test. If the logic of the order needs to be changed later, then only one test will fail, easing the  effort of migrating the tests. As it turns out I could have left`withAnyArguments` out entirely, as that is the default.

第二个不同是，第二个单元测试中，我使用 `withAnyArguments` 放宽了对期望的约束。这样做的原因是，第一个测试已经检查了传给 `warehouse` 的数值，所以第二个就不需要再重复测试这部分了。如果以后需要改订单的逻辑，那么只有一个测试会执行失败，减少迁移测试的工作量。事实上，我可以完全不写`withAnyArguments`，因为这是默认设置。

### Using EasyMock （使用 EasyMock ）

There are a number of mock object libraries out there. One that I come across a fair bit is EasyMock, both in its java and .NET versions. EasyMock also enable behavior verification, but has a couple of differences in style with jMock which are worth discussing. Here are the familiar tests again:

有很多 mock 对象库可供使用，我比较喜欢的一个是 `EasyMock`，有 Java 和 .NET 版本。 EasyMock 也能进行行为验证，但是与 jMock 有一些风格差异，值得讨论。如下是我们前面已经很熟悉的测试：

```java
public class OrderEasyTester extends TestCase {
  private static String TALISKER = "Talisker";

  private MockControl warehouseControl;
  private Warehouse warehouseMock;

  public void setUp() {
    warehouseControl = MockControl.createControl(Warehouse.class);
    warehouseMock = (Warehouse) warehouseControl.getMock();
  }

  public void testFillingRemovesInventoryIfInStock() {
    //setup - data
    Order order = new Order(TALISKER, 50);

    //setup - expectations
    warehouseMock.hasInventory(TALISKER, 50);
    warehouseControl.setReturnValue(true);
    warehouseMock.remove(TALISKER, 50);
    warehouseControl.replay();

    //exercise
    order.fill(warehouseMock);

    //verify
    warehouseControl.verify();
    assertTrue(order.isFilled());
  }

  public void testFillingDoesNotRemoveIfNotEnoughInStock() {
    Order order = new Order(TALISKER, 51);

    warehouseMock.hasInventory(TALISKER, 51);
    warehouseControl.setReturnValue(false);
    warehouseControl.replay();

    order.fill((Warehouse) warehouseMock);

    assertFalse(order.isFilled());
    warehouseControl.verify();
  }
}
```

EasyMock uses a record/replay metaphor for setting expectations. For each object you wish to mock you create a control and mock object. The mock satisfies the interface of the secondary object, the control gives you additional features. To indicate an expectation you call the method, with the arguments you expect on the mock. You follow this with a call to the control if you want a return value. Once you've finished setting expectations you call replay on the control - at which point the mock finishes the recording and is ready to respond to the primary object. Once done you call verify on the control.

EasyMock 使用“记录-回放”的隐喻（record/replay metaphor）来设置期望。对于每个你要 mock 的对象，你都要创建一个控件（control） 和一个 mock 对象。mock 对象能满足次要对象（译者注：根据上文的注，此处次要对象应为合作者）的接口，控件能给你其他的功能。为了达到期望，你应当使用你在 mock 对象上设置的预期的参数，进行调用。

It seems that while people are often fazed at first sight by the record/replay metaphor, they quickly get used to it. It has an advantage over the constraints of jMock in that you are making actual method calls to the mock rather than specifying method names in strings. This means you get to use code-completion in your IDE and any refactoring of method names will automatically update the tests. The downside is that you can't have the looser constraints.

尽管人们乍一看到“记录-回放”隐喻的时候感觉很难适应，但他们很快就会习惯的。它比 jMock 有一个好处，就是你是在对 mock 对象进行实际的方法调用，而不是在字符串中指定方法名字。这意味着你可以在 IDE 中使用代码补全，以及重构任何方法名的时候都会自动更新测试。缺点是你无法使用更宽松的限制（looser constraints）。

The developers of jMock are working on a new version which will use other techniques to allow you use actual method calls.

jMock 的开发者正在开发一个新版本，它将使用其他技术来允许你进行真实的方法调用。


* * *

## The Difference Between Mocks and Stubs （Mock 和 Stub 的区别）

When they were first introduced, many people easily confused mock objects with the common testing notion of using stubs. Since then it seems people have better understood the differences (and I hope the earlier version of this paper helped). However to fully understand the way people use mocks it is important to understand mocks and other kinds of test doubles. ("doubles"? Don't worry if this is a new term to you, wait a few paragraphs and all will be clear.)

当这两个概念刚被提出来的时候，很多人分不请 mock 对象和使用 stub 的常用测试概念。从那时起，人们逐渐开始了解它们之间的差异（我希望本文的早期版本能对此有所帮助）。然而，要充分理解 mock 的使用，重要的是理解 mock 和其他测试替身（test double）的不同。（“替身”？如果这个词对你而言是个新术语，请不必担心，等几个段落以后，你就都明白了。）

When you're doing testing like this, you're focusing on one element of the software at a time -hence the common term unit testing. The problem is that to make a single unit work, you often need other units - hence the need for some kind of warehouse in our example.

当你这样做测试的时候，你一次只关注软件的一个元素——即一般我们所说的”单元测试“。问题是，为了让一个单元工作，你通常需要其他单元——即需要类似我们例子中的`warehouse`。

In the two styles of testing I've shown above, the first case uses a real warehouse object and the second case uses a mock warehouse, which of course isn't a real warehouse object. Using mocks is one way to not use a real warehouse in the test, but there are other forms of unreal objects used in testing like this.

在前面我展示的两种风格的测试中，第一种情况下，我用了真正的 `warehouse` 对象，而在第二中情况下，我用了一个 mock了的  `warehouse` ，这当然不是一个真正的 `warehouse` 对象。使用 mock 是在测试中不使用真的 `warehouse` 对象的一个办法，但在测试中也有诸如此类的、其他形式的非真实对象（unreal objects）。

The vocabulary for talking about this soon gets messy - all sorts of words are used: stub, mock, fake, dummy. For this article I'm going to follow the vocabulary of Gerard Meszaros's book. It's not what everyone uses, but I think it's a good vocabulary and since it's my essay I get to pick which words to use.

谈论这个问题的词汇会很快变得一团糟——各种各样的词被拿来使用：stub、mock、fake和dummy。在本文中，我将遵循 Gerard Meszaros 书中的词汇。不是所有人都是这么叫的，但我认为这些词汇还不错，而且我总得决定要用什么词吧。

Meszaros uses the term **Test Double** as the generic term for any kind of pretend object used in place of a real object for testing purposes. The name comes from the notion of a Stunt Double in movies. (One of his aims was to avoid using any name that was already widely used.) Meszaros then defined four particular kinds of double:

Meszaros 使用 **测试替身** 的这个术语，用来统称用于测试目的的、任何用来替代真实对象的伪装对象。名字来源于电影中“特技替身（Stunt Double）”的概念。（他的意图之一是避免使用任何已经被广泛使用的名字。）Meszaros 然后定义了如下4种特定类型的 double：

*   **Dummy** objects are passed around but never actually used. Usually they are just used to fill parameter lists.
*   **Fake** objects actually have working implementations, but usually take some shortcut which makes them not suitable for production. (an [in memory database](https://martinfowler.com/bliki/InMemoryTestDatabase.html) is a good example).
*   **Stubs** provide canned answers to calls made during the test, usually not responding at all to anything outside what's programmed in for the test.
*   **Spies** are stubs that also record some information based on how they were called. One form of this might be an email service that records how many messages it was sent.
*   **Mocks** are what we are talking about here: objects pre-programmed with expectations which form a specification of the calls they are expected to receive.

* **Dummy** 对象被传递，但从未被实际使用。通常它们只是用来填充参数列表的。
* **Fake** 对象实际上有可执行的代码实现，但通常采取了某些快捷办法，所以不适合用于生产环境（[内存数据库](https://martinfowler.com/bliki/InMemoryTestDatabase.html)就是一个好的例子）。
* **Stub** 为测试中的调用提供了固定的答案（canned answers），通常对于测试以外的任何内容都没有响应。
* **Spies** 属于 Stub，并根据被调用的情况而记录一些信息。一种形式可以是一个电子邮件服务，它可以记录发送的邮件数量。
* **Mocks** 是我们这里要讨论的对象：这些对象被提前设定了期望（expections），这些期望规定了它们所预期得到的调用。

Of these kinds of doubles, only mocks insist upon behavior verification. The other doubles can, and usually do, use state verification. Mocks actually do behave like other doubles during the exercise phase, as they need to make the SUT believe it's talking with its real collaborators - but mocks differ in the setup and the verification phases.

在这些测试替身当中，只有 mock 使用行为验证。其他的测试替身可以，通常使用状态验证。 Mock 一般在执行阶段和其他测试替身相同，因为它们需要让被测系统认为它在跟真实的合作者进行互动——但是 mock 在准备阶段和验证阶段有所不同。

To explore test doubles a bit more, we need to extend our example. Many people only use a test double if the real object is awkward to work with. A more common case for a test double would be if we said that we wanted to send an email message if we failed to fill an order. The problem is that we don't want to send actual email messages out to customers during testing. So instead we create a test double of our email system, one that we can control and manipulate.

为了进一步探索测试替身，我们需要扩展我们的例子。许多人只有在真实对象很难调用时，才使用测试替身。一个使用测试替身的更常见场景是，我们需要在填充订单失败的时候，发送一封电子邮件。问题是，我们并不想在测试的时候真的把电子邮件发给客户。所以我们给我们的邮件系统创建一个测试替身，然后我们可以控制和操纵它。

Here we can begin to see the difference between mocks and stubs. If we were writing a test for this mailing behavior, we might write a simple stub like this.

到这里，我们开始发现 mock 和 stub 的不同。如果我们想要为发邮件的行为写一个测试，我们可能需要一个这样简单的 stub ：


```java
public interface MailService {
  public void send (Message msg);
}

public class MailServiceStub implements MailService {
  private List<Message> messages = new ArrayList<Message>();
  public void send (Message msg) {
    messages.add(msg);
  }
  public int numberSent() {
    return messages.size();
  }
}
```

We can then use state verification on the stub like this.

之后我们就可以对这个 stub 进行状态验证：

```java
class OrderStateTester...

  public void testOrderSendsMailIfUnfilled() {
    Order order = new Order(TALISKER, 51);
    MailServiceStub mailer = new MailServiceStub();
    order.setMailer(mailer);
    order.fill(warehouse);
    assertEquals(1, mailer.numberSent());
  }
```


Of course this is a very simple test - only that a message has been sent. We've not tested it was sent to the right person, or with the right contents, but it will do to illustrate the point.

当然这是一个非常简单的测试——只发送了一条消息。我们还没测试它是否被发给了正确的人，带有正确的内容，但它足以说明问题。

Using mocks this test would look quite different.

使用 mock 进行测试，则大不相同：

```java
class OrderInteractionTester...

  public void testOrderSendsMailIfUnfilled() {
    Order order = new Order(TALISKER, 51);
    Mock warehouse = mock(Warehouse.class);
    Mock mailer = mock(MailService.class);
    order.setMailer((MailService) mailer.proxy());

    mailer.expects(once()).method("send");
    warehouse.expects(once()).method("hasInventory")
      .withAnyArguments()
      .will(returnValue(false));

    order.fill((Warehouse) warehouse.proxy());
  }
}
```

In both cases I'm using a test double instead of the real mail service. There is a difference in that the stub uses state verification while the mock uses behavior verification.

在这两种情况下，我都使用了测试替身而不是真的邮件服务。区别在于：stub 使用状态验证，而 mock 使用行为验证。

In order to use state verification on the stub, I need to make some extra methods  on the stub to help with verification. As a result the stub implements `MailService` but adds extra test methods.

为了对 stub 进行状态验证，我需要在stub上添加另外几个方法来帮助验证。结果是，stub实现了 `MailService` ，但添加了几个额外的测试方法。

Mock objects always use behavior verification, a stub can go either way. Meszaros refers to stubs that use behavior verification as a Test Spy. The difference is in how exactly the double runs and verifies and I'll leave that for you to explore on your own.

Mock 对象总是使用行为验证，而 stub 则两种风格都可以。 Meszaros 将使用行为验证的 stub 叫做 Test Spy。区别是替身是如何运行和进行验证的，我将留给你自己去探索。

* * *

## Classical and Mockist Testing（经典测试和 Mockist 测试）

Now I'm at the point where I can explore the second dichotomy: that between classical and mockist TDD. The big issue here is _when_ to use a mock (or other double).

现在我们正处于第二个概念分叉（dichotomy）的地方，即经典的和 mockist 的测试驱动的开发（TDD）。最大的问题是，_什么_ 时候使用 mock （或其他测试替身）。

The **classical TDD** style is to use real objects if possible and a double if it's awkward to use the real thing. So a classical TDDer would use a real warehouse and a double for the mail service. The kind of double doesn't really matter that much.

**经典TDD** 风格，会尽可能地使用真实的对象，有时真实的对象很难处理的时候也使用测试替身。所以一个经典TDD的实践者会使用一个真实的 `warehouse` 和一个替身的 `mail` 服务。测试替身的类型并不重要。

A **mockist TDD** practitioner, however, will always use a mock for any object with interesting behavior. In this case for both the warehouse and the mail service.

然而，**mockist TDD** 的实践者则对于相关的任何对象总是使用 mock。在此情形下，`warehouse` 和 `mail` 服务都使用 mock 对象。

Although the various mock frameworks were designed with mockist testing in mind, many classicists find them useful for creating doubles.

尽管不同的 mock 框架都是在 mockist 测试的基础上设计的，但很多经典TDD的实践者也觉得它们对于创建测试替身很有用。

An important offshoot of the mockist style is that of [Behavior Driven Development](http://dannorth.net/introducing-bdd/) (BDD). BDD was originally developed by my colleague Dan North as a technique to better help people learn Test Driven Development by focusing on how TDD operates as a design technique. This led to renaming tests as behaviors to better explore where TDD helps with thinking about what an object needs to do. BDD takes a mockist approach, but it expands on this, both with its naming styles, and with its desire to integrate analysis within its technique. I won't go into this more here, as the only relevance to this article is that BDD is another variation on TDD that tends to use mockist testing. I'll leave it to you to follow the link for more information.

mockist风格的一个重要分支是 [行为驱动的开发](http://dannorth.net/introducing-bdd/) (Behavior Driven Development，BDD)。BDD最初是我的同事 Dan North 提出来的，它作为一项技巧，主要通过关注TDD是如何作为一个设计技术来起作用，来帮助人们学习TDD。这使得“测试”被改名为“行为”，从而更好地探究TDD在何处帮助我们思考——一个对象到底需要做什么。BDD 使用 mockist 的办法，但扩展了它的命名风格，并希望将分析集成到它的技术中。我不会在这里进一步讨论这个问题，因为本文唯一相关的是，BDD是TDD的另一个变体，它倾向于使用 mockist 测试。剩下的就交给你了，你可以访问链接来获得更多信息。

You sometimes see "Detroit" style used for "classical" and "London" for "mockist". This alludes to the fact that XP was originally developed with the C3 project in Detroit and the mockist style was developed by early XP adopters in London. I should also mention that many mockist TDDers dislike that term, and indeed any terminology that implies a different style between classical and mockist testing. They don't consider that there is a useful distinction to be made between the two styles.

你有时看到，“经典”风格又被叫做“底特律”风格，“mockist”风格又被叫做“伦敦”风格。这暗示了，极限编程（XP）最初是在底特律的C3项目中提出的，而 mockist 风格是由伦敦的早期极限编程采纳者提出的。我也应该指出，有些mockist TDD 开发者并不喜欢这个术语，但任何术语都暗示了古典和 mockist测试的不同风格。他们不认为在这两个风格之间做区分有什么用处。

* * *

## Choosing Between the Differences（如何在差异中选择）

In this article I've explained a pair of differences: state or behavior verification / classic or mockist TDD. What are the arguments to bear in mind when making the choices between them? I'll begin with the state versus behavior verification choice.

在这篇文章中，我解释了一些差异：状态或行为验证、经典或 mockist 的测试驱动开发。当在它们之间要作出选择时，你应该注意些什么？我将从状态与行为验证的差异选择开始。

The first thing to consider is the context. Are we thinking about an easy collaboration, such as order and warehouse, or an awkward one, such as order and mail service?

首先要考虑的是上下文。我们要处理的是一个简单的合作关系，比如`order`和`warehouse`，还是一个复杂的合作关系？

If it's an easy collaboration then the choice is simple. If I'm a classic TDDer I don't use a mock, stub or any kind of double. I use a real object and state verification. If I'm a mockist TDDer I use a mock and behavior verification. No decisions at all.

如果是一个简单的合作关系，那么选择就很简单。如果我是一个传统的测试驱动开发者，我不使用mock，stub或任何测试替身。我使用真实的对象和状态验证。如果我是一个 mockist 测试驱动开发者，我使用 mock 和行为验证。根本无需做决定。

If it's an awkward collaboration, then there's no decision if I'm a mockist - I just use mocks and behavior verification. If I'm a classicist then I do have a choice, but it's not a big deal which one to use. Usually classicists will decide on a case by case basis, using the easiest route for each situation.

如果这是一个复杂的（awkward）合作关系，而且我是一个 mockist 测试风格者，那么无需选择——我用 mock 和行为验证就可以了。如果我是一个经典测试风格者，那么我需要作出选择，但不是什么大不了的选择。通常，经典测试风格者会根据具体情况决定，使用最简单的路径。

So as we see, state versus behavior verification is mostly not a big decision. The real issue is between classic and mockist TDD. As it turns out the characteristics of state and behavior verification do affect that discussion, and that's where I'll focus most of my energy.

正如我们所看到的，状态和行为验证在大多数情况下并不是什么大的决定。真正的问题在于，选择经典主义的，还是 mockist 风格的测试驱动开发。事实证明，状态验证和行为验证的特点确实影响了我们的讨论，这正式我们要集中精力讨论的。

But before I do, let me throw in an edge case. Occasionally you do run into things that are really hard to use state verification on, even if they aren't awkward collaborations. A great example of this is a cache. The whole point of a cache is that you can't tell from its state whether the cache hit or missed - this is a case where behavior verification would be the wise choice for even a hard core classical TDDer. I'm sure there are other exceptions in both directions.

在我开始前，请让我举一个极端的例子。有的时候，你可能发现，确实很难进行状态验证，即使他们之间的交互不是很麻烦。一个好的例子是缓存（cache）。缓存的问题是，你很难从状态来判断读取的是缓存，或是反之——这是一个例子，此时即使对于一个铁杆的经典TDD开发者，行为验证也是更明智的选择。我相信在这两个方向上都有其他的例外情况。

As we delve into the classic/mockist choice, there's lots of factors to consider, so I've broken them out into rough groups.

当我们深入到经典和 mockist 风格的选择时，有很多因素需要被考虑，所以我将他们粗略地分成几组。

### Driving TDD （如何驱动 TDD）

Mock objects came out of the XP community, and one of the principal features of XP is its emphasis on Test Driven Development - where a system design is evolved through iteration driven by writing tests.

Mock 对象来自于极限编程社区，极限编程的一个主要特点是强调测试驱动开发（TDD）——系统的设计是通过编写测试来迭代的。

Thus it's no surprise that the mockists particularly talk about the effect of mockist testing on a design. In particular they advocate a style called need-driven development. With this style  you begin developing a [user story](https://martinfowler.com/bliki/UserStory.html) by writing your first test for the outside of your system, making some interface object your SUT. By thinking through the expectations upon the collaborators, you explore the interaction between the SUT and its neighbors - effectively designing the outbound interface of the SUT.

因此，mock 主义者特别喜欢讨论 mockist 风格的测试对于设计的影响就不奇怪了。特别是，他们提倡一种叫做需求驱动开发的风格。有了这个风格，你就通过为系统外围编写第一个测试，将你的接口对象作为你的被测系统，开始开发一个[用户故事](https://martinfowler.com/bliki/UserStory.html)。通过思考合作者（collaborator）的期望，你将探索被测系统和它的邻居之间的交互行为——有效地设计被测系统的外围接口。

Once you have your first test running, the expectations on the mocks provide a specification for the next step and a starting point for the tests. You turn each expectation into a test on a collaborator and repeat the process working your way into the system one SUT at a time. This style is also referred to as outside-in, which is a very descriptive name for it. It works well with layered systems. You first start by programming the UI using mock layers underneath. Then you write tests for the lower layer, gradually stepping through the system one layer at a time. This is a very structured and controlled approach, one that many people believe is helpful to guide newcomers to OO and TDD.

一旦你的第一个测试运行，mock 上的期望就为你提供了下一步的规范（specification）和测试的起点。你将每个期望都转化为与合作者的测试，然后重复这个流程，每次一个被测系统，逐步测试整个系统。这个风格叫“由外而内的测试”，意思显而易见。她适合分层的系统。你首先下面的 mock 层开发界面，然后你为下层编写测试，一次一层地逐层深入。这是一个非常有组织和可控的方法，很多人认为这有助于引导新人进行面向对象的编程，以及进行测试驱动开发。

Classic TDD doesn't provide quite the same guidance. You can do a similar stepping approach, using stubbed methods instead of mocks. To do this, whenever you need something from a collaborator you just hard-code exactly the response the test requires to make the SUT work. Then once you're green with that you replace the hard coded response with a proper code.

经典主义的TDD却不提供完全相同的指导。你可以使用 stub 过的方法，而不是 mock ，来达到相同的步进效果。要做到这一点，如果你需要从合作者哪里获得什么，您只需对测试所需的响应进行硬编码，以使被测系统正常工作。然后一旦测试通过，你就用适当的代码替换硬编码的响应。

But classic TDD can do other things too. A common style is middle-out. In this style you take a feature and decide what you need in the domain for this feature to work. You get the domain objects to do what you need and once they are working you layer the UI on top. Doing this you might never need to fake anything. A lot of people like this because it focuses attention on the domain model first, which helps keep domain logic from leaking into the UI.

但是经典主义的 TDD 也可以做其他事情。一个常见的风格是“由中间而外”。在这个风格中，你可以选择一项功能，并决定你在这个领域（domain）里需要什么，从而使这个功能可以工作。你得到一个领域对象（domain object），来完成你需要的。一旦他们可以工作了，你就在上面叠加 UI 层。这样做，你可能永远不需要伪造任何东西。很多人喜欢这样做，因为它首先关注领域模型，这有助于避免领域逻辑渗透到界面中。

I should stress that both mockists and classicists do this one story at a time. There is a school of thought that builds applications layer by layer, not starting one layer until another is complete. Both classicists and mockists tend to have an agile background and prefer fine-grained iterations. As a result they work feature by feature rather than layer by layer.

我需要强调的是，mockist风格者和经典主义者都一次只做一个用户故事。有一种思想流派，提倡逐层构建应用程序，直到另一层完成才开始另外一层。经典主义者和mock 主义者都倾向于拥有敏捷的背景，喜欢更细粒度的迭代。因此，他们喜欢逐个功能地，而不是逐层地迭代。

### Fixture Setup （Fixture 的准备）

With classic TDD, you have to create not just the SUT but also all the collaborators that the SUT needs in response to the test. While the example only had a couple of objects, real tests often involve a large amount of secondary objects. Usually these objects are created and torn down with each run of the tests.

使用经典主义的 TDD，你不仅需要创建被测系统，还需要创建被测系统所需的所有合作者以响应测试。尽管例子中只有几个对象，但真正的测试通常会牵扯到大量的次要对象。通常这些对象随每个测试的运行被创建和清理。

Mockist tests, however, only need to create the SUT and mocks for its immediate neighbors. This can avoid some of the involved work in building up complex fixtures (At least in theory. I've come across tales of pretty complex mock setups, but that may be due to not using the tools well.)

然而，mockist 风格的测试，只需要创建被测对象，和最临近的合作者的 mock。这样做可以避免创建复杂的 fixture。（至少在理论上，我已经遇到过非常复杂的 mock 准备，但也有可能是因为我没有用好工具）

In practice, classic testers tend to reuse complex fixtures as much as possible. In the simplest way you do this by putting fixture setup code into the xUnit setup method. More complicated fixtures need to be used by several test classes, so in this case you create special fixture generation classes. I usually call these [Object Mothers](https://martinfowler.com/bliki/ObjectMother.html), based on a naming convention used on an early ThoughtWorks XP project. Using mothers is essential in larger classic testing, but the mothers are additional code that need to be maintained and any changes to the mothers can have significant ripple effects through the tests. There also may be a performance cost in setting up the fixture - although I haven't heard this to be a serious problem when done properly. Most fixture objects are cheap to create, those that aren't are usually doubled.

在实践中，经典的测试人员倾向于尽可能地重用复杂的 fixture。最简单的办法是，在你可以将准备 fixture 的代码放到 xUnit 的准备（setup） 方法中。更复杂的 fixture 会被多个测试类使用，所以在这种情形下，你需要创建一个特殊的 fixture 生成类。根据我在 ThoughtWorks 的一个早期极限编程项目的命名约定，我通常把他们叫做[对象母类（Object Mothers）](https://martinfowler.com/bliki/ObjectMother.html)。使用母类在较大规模的经典测试中是必不可少的，但是母类是要额外维护的代码，而且母类的任何改变将会在测试中造成显著的连锁反映。在 fixture 准备时也可能有性能成本——虽然我没听过会有什么严重的问题，如果你做得好的话。大多数的 fixture 都很容易创建，所以不需要再写个母类。

As a result I've heard both styles accuse the other of being too much work. Mockists say that creating the fixtures is a lot of effort, but classicists say that this is reused but you have to create mocks with every test.

所以，我听说两种风格都指责对方做了太多工作。Mockist风格者说创建 fixture 要费很大的劲，但是经典主义者说这是可重用的，但你却在每个测试里都创建 mock。

### Test Isolation（测试隔离）

If you introduce a bug to a system with mockist testing, it will usually cause only tests whose SUT contains the bug to fail. With the classic approach, however, any tests of client objects can also fail, which leads to failures where the buggy object is used as a collaborator in another object's test. As a result a failure in a highly used object causes a ripple of failing tests all across the system.

如果你向使用 mockist 测试的系统引入一个bug，那么他只会导致含这个bug的被测系统的相关测试失败。但是，如果使用经典主义的测试方法，客户端对象的任何测试也可能失败，这导致将含 bug 的对象作为合作者的另一个对象的测试也会失败。因此，高度使用的对象如果出现故障会导致整个系统的测试失败。

Mockist testers consider this to be a major issue; it results in a lot of debugging in order to find the root of the error and fix it. However classicists don't express this as a source of problems. Usually the culprit is relatively easy to spot by looking at which tests fail and the developers can tell that other failures are derived from the root fault. Furthermore if you are testing regularly (as you should) then you know the breakage was caused by what you last edited, so it's not difficult to find the fault.

Mockist 风格开发者认为，这是一个重大问题：需要大量的调试才能找到错误的根源并修复它。然而，古典风格者并不觉得这是问题的所在。通常，通过查看哪个测试失败了就能较容易地找到根源，而且开发人员可以知道其他故障是由根源故障所导致的。进一步，如果你经常运行测试（你也应该这么做），那么你就知道这个故障是由你上次的编辑导致的，所以找到故障并不难。

One factor that may be significant here is the granularity of the tests. Since classic tests exercise multiple real objects, you often find a single test as the primary test for a cluster of objects, rather than just one. If that cluster spans many objects, then it can be much harder to find the real source of a bug. What's happening here is that the tests are too coarse grained.

这里一个可能很重要的因素是测试的粒度。因为经典主义的测试往往涉及到几个真实的对象，因此你会发现一个测试是针对许多一组对象，而不是针对一个对象的测试。如果该组测试横跨了多个对象，那么找到一个 bug 的根源就会困难得多。这里的问题是，可能测试的粒度过于粗糙了。

It's quite likely that mockist tests are less likely to suffer from this problem, because the convention is to mock out all objects beyond the primary, which makes it clear that finer grained tests are needed for collaborators. That said, it's also true that using overly coarse grained tests isn't necessarily a failure of classic testing as a technique, rather a failure to do classic testing properly. A good rule of thumb is to ensure that you separate fine-grained tests for every class. While clusters are sometimes reasonable, they should be limited to only very few objects - no more than half a dozen. In addition, if you find yourself with a debugging problem due to overly coarse-grained tests, you should debug in a test driven way, creating finer grained tests as you go.

Mockist 风格测试者可能不太会受到这个问题的困扰，因为约定是， mock 掉主体对象以外的所有对象，这就使得合作者需要更精细的测试。也就是说，过于粗粒度的测试，并不一定是经典主义测试的失败之处，而是没有正确使用经典测试的表现。尽管对象之间聚合成簇（cluster）有时是合理的，但这样的情况应仅限于极少的对象——不超过五六个。另外，如果你发现因为过于粗粒度的测试而 调试，那么你应该以测试驱动的方式进行调试，随时创建更细粒度的测试。

In essence classic xunit tests are not just unit tests, but also mini-integration tests. As a result many people like the fact that client tests may catch errors that the main tests for an object may have missed, particularly probing areas where classes interact. Mockist tests lose that quality. In addition you also run the risk that expectations on mockist tests can be incorrect, resulting in unit tests that run green but mask inherent errors.

本质上，经典的 xUnit 测试不只是单元测试，还包括微型的集成测试（mini-integration tests）。所以，很多人发现一个事实，即客户端测试能检测到一些错误，而这个对象的主要测试却没能发现，特别是探测类之间的交互区域。 Mockist 测试失去了一定的质量。另外，你可能冒着这样的风险，即 mockist 风格的测试期望并不一定正确，导致单元测试都是通过的，但掩盖了内在的错误。

It's at this point that I should stress that whichever style of test you use, you must combine it with coarser grained acceptance tests that operate across the system as a whole. I've often come across projects which were late in using acceptance tests and regretted it.

在这一点上，我应该强调，不管你用什么风格测试，你都必须结合更粗粒度的验收测试（acceptance tests）来将系统作为一个整体来运行。我常常见到有的项目很晚才开始使用验收测试，并为此感到遗憾。

### Coupling Tests to Implementations （测试与实现之间的耦合）

When you write a mockist test, you are testing the outbound calls of the SUT to ensure it talks properly to its suppliers. A classic test only cares about the final state - not how that state was derived. Mockist tests are thus more coupled to the implementation of a method. Changing the nature of calls to collaborators usually cause a mockist test to break.

当你写一个 mockist 风格的测试时，你在测试被测系统的边界调用，已确保他能与合作者能正常对话。一个经典测试只关心最终的状态——而不是关注状态是如何产生的。Mockist 风格的测试因此更耦合到方法的实现。变更对合作者的调用本质，通常会导致 mockist 风格的测试失败。

This coupling leads to a couple of concerns. The most important one is the effect on Test Driven Development. With mockist testing, writing the test makes you think about the implementation of the behavior - indeed mockist testers see this as an advantage. Classicists, however, think that it's important to only think about what happens from the external interface and to leave all consideration of implementation until after you're done writing the test.

这种耦合导致了一些问题。最重要的是对于测试驱动开发的影响。使用 mockist 风格的测试，写测试的时候你会想到这个行为的实现——实际上，mockist 风格的测试者认为这是一个优势。经典主义的测试者，却认为应该只考虑从外部接口发生了什么，并且在写测试前不要考虑具体的实现。

Coupling to the implementation also interferes with refactoring, since implementation changes are much more likely to break tests than with classic testing.

与实现像耦合也会干扰重构，因为与传统风格的测试相比，实现的改变更有可能破坏之前的测试。

This can be worsened by the nature of mock toolkits. Often mock tools specify very specific method calls and parameter matches, even when they aren't relevant to this particular test. One of the aims of the jMock toolkit is to be more flexible in its specification of the expectations to allow expectations to be looser in areas where it doesn't matter, at the cost of using strings that can make refactoring more tricky.

这可能会因 mock 工具集的性质而变得更糟糕。通常， mock 工具规定了非常具体的方法调用和参数匹配，即使它们与这个特定的测试无关。jMock 工具集的目标之一就是在预期的范围中更加灵活，从而允许在不重要的领域放宽测试期望，而这是使用字符串却使重构变得更加棘手的代价。

### Design Style（设计风格）

One of the most fascinating aspects of these testing styles to me is how they affect design decisions. As I've talked with both types of tester I've become aware of a few differences between the designs that the styles encourage, but I'm sure I'm barely scratching the surface.

对我来说，这些测试风格中最令人着迷的方面，就是它们如何影响设计决策。我通过和者两类不同风格的开发者交谈，我逐渐意识到不同风格所鼓励的设计之间的一些差异，但我敢肯定，我了解得还很肤浅。

I've already mentioned a difference in tackling layers. Mockist testing supports an outside-in approach while developers who prefer a domain model out style tend to prefer classic testing.

我已经提到了在处理分层问题上的不同。 Mockist 风格的测试鼓励从内而外（outside-in）的方法，而更偏好领域模型（domain model）的开发人员则更倾向于经典主义的测试。 

On a smaller level I noticed that mockist testers tend to ease away from methods that return values, in favor of methods that act upon a collecting object. Take the example of the behavior of gathering information from a group of objects to create a report string. A common way to do this is to have the reporting method call string returning methods on the various objects and assemble the resulting string in a temporary variable. A mockist tester would be more likely to pass a string buffer into the various objects and get them to add the various strings to the buffer - treating the string buffer as a collecting parameter.

在一个更小的层面上，我发现，mockist 风格的测试者倾向于使用一个对象来收集信息，并将诸方法作用于其上，而不是采用带有返回值的方法。举个例子，要想从一组对象中收集信息，并创建一个字符串来报告结果。一个通常的做法是，让报告函数去调用每个对象的字符串返回的方法，并将得到的字符串组装并存入一个临时的变量。一个 mockist 风格的开发者则会将一个字符串缓冲区（string buffer）传给每个对象，并让它们将各种字符串添加到缓冲区中——将字符串缓冲区视为收集参数。

Mockist testers do talk more about avoiding 'train wrecks' - method chains of style of`getThis().getThat().getTheOther()`. Avoiding method chains is also known as following the Law of Demeter. While method chains are a smell, the opposite problem of middle men objects bloated with forwarding methods is also a smell. (I've always felt I'd be more comfortable with the Law of Demeter if it were called the Suggestion of Demeter.)

Mockist 风格的开发者更多地讨论如何避免“火车残骸”——类似 `getThis().getThat().getTheOther()` 之类的方法调用链。避免使用方法调用链，也被称作遵循“德米特法则（the Law of Demeter）”。尽管方法论调用是一种气味（smell），但与之相反的，中间人的对象与转发方法间臃肿的问题也是一种气味。（我一直觉得更喜欢把它叫做德米特的建议，而不是德米特的法则）

One of the hardest things for people to understand in OO design is the ["Tell Don't Ask" principle](https://martinfowler.com/bliki/TellDontAsk.html), which encourages you to tell an object to do something rather than rip data out of an object to do it in client code. Mockists say that using mockist testing helps promote this and avoid the getter confetti that pervades too much of code these days. Classicists argue that there are plenty of other ways to do this.

人们在面向对象设计中最难理解的事情之一是“不要问原则” （["Tell Don't Ask" principle](https://martinfowler.com/bliki/TellDontAsk.html)）。它鼓励你告诉一个对象要做什么事情，而不是将数据将对象中剥离出来，然后在客户端代码中执行。 mock 主义者指出，使用 mockist 风格的测试会促进这个做法，避免当下目前普遍存在的 getter 过多的情况。古典风格者则认为还有很多其他方法可以做到这一点。

An acknowledged issue with state-based verification is that it can lead to creating query methods only to support verification. It's never comfortable to add methods to the API of an object purely for testing, using behavior verification avoids that problem. The counter-argument to this is that such modifications are usually minor in practice.

基于状态验证的一个公认的问题是，它可能导致创建一些查询方法，却仅用于支持验证。向对象的API里添加纯粹用来测试的方法肯定是不舒服的，而使用行为验证可以避免这个问题。对此的反驳则是，这种修改在实践中通常不多见。

 Mockists favor [role interfaces](https://martinfowler.com/bliki/RoleInterface.html) and assert that using this style of testing encourages more role interfaces, since each collaboration is mocked separately and is thus more likely to be turned into a role interface. So in my example above using a string buffer for generating a report, a mockist would be more likely to invent a particular role that makes sense in that domain, which _may_ be implemented by a string buffer.

mock 主义者喜欢角色界面（[role interfaces](https://martinfowler.com/bliki/RoleInterface.html) ），并认定这种测试风格会鼓励写更多的角色界面，因为每一个协作都被单独 mock，因此很有可能变成角色界面。所以在我上面的例子中，使用字符串缓冲区来生成一个报告，mock 主义者可能会创建一个新的特殊角色以适合那个领域，而这个决策 _可能_ 使用一个字符串缓冲区来实现。

It's important to remember that this difference in design style is a key motivator for most mockists. TDD's origins were a desire to get strong automatic regression testing that supported evolutionary design. Along the way its practitioners discovered that writing tests first made a significant improvement to the design process. Mockists have a strong idea of what kind of design is a good design and have developed mock libraries primarily to help people develop this design style.

重要的是要记住，设计风格上的差异是大多数 mock 主义者的关键动力。TDD的初衷是希望获得健壮的自动化回归测试，来支撑不断演化的设计。实践者后来不断发现，先编写测试对于设计过程有至关重要的提升。mock 主义者对于什么样的设计是好的设计有强烈的想法，并开发了 mock 库主要为了帮助人们培养这种设计风格。

* * *

## So should I be a classicist or a mockist?（我应该成为一个古典主义者还是一个 mockist主义者）

I find this a difficult question to answer with confidence. Personally I've always been a old fashioned classic TDDer and thus far I don't see any reason to change. I don't see any compelling benefits for mockist TDD, and am concerned about the consequences of coupling tests to implementation.

这是一个相当难回答的问题。个人而言，我一直是一个老式的、古典主义的TDD开发者，因此我没有任何理由去改变。我没有看到任何 mockist TDD的令人信服的好处，并且担心将测试与实现耦合的后果。

This has particularly struck me when I've observed a mockist programmer. I really like the fact that while writing the test you focus on the result of the behavior, not how it's done. A mockist is constantly thinking about how the SUT is going to be implemented in order to write the expectations. This feels really unnatural to me.

当我观察了 mock 主义的程序员之后，我尤其感到震惊。我特别喜欢那种情况，就是在你写测试的时候，你集中于你行为的结果，而不是它如何完成的。一个 mock 主义者会不断考虑被测系统是如何被实现的，才能写出来测试期望。这对我来说太不自然了。

I also suffer from the disadvantage of not trying mockist TDD on anything more than toys. As I've learned from Test Driven Development itself, it's often hard to judge a technique without trying it seriously. I do know many good developers who are very happy and convinced mockists. So although I'm still a convinced classicist, I'd rather present both arguments as fairly as I can so you can make your own mind up.

我也感到不安，因为我只是想摆弄玩具一样试了试 mockist TDD。从我自己对TDD本身的理解而言，如果你没有认真尝试它，你很难对某个技巧做判断。我认识很多优秀的程序员，他们对 mockist 的做法很乐观，也很信服。所以，尽管我是一个经典主义者，我还是尽量如实地呈现各方观点，以便于你可以自己拿主意。

So if mockist testing sounds appealing to you, I'd suggest giving it a try. It's particularly worth trying if you are having problems in some of the areas that mockist TDD is intended to improve. I see two main areas here. One is if you're spending a lot of time debugging when tests fail because they aren't breaking cleanly and telling you where the problem is. (You could also improve this by using classic TDD on finer-grained clusters.) The second area is if your objects don't contain enough behavior, mockist testing may encourage the development team to create more behavior rich objects.

所以如果 mockist 测试对你来说很有吸引力，那么我建议你去试试。如果你在某些方面遇到了困难，而 mockist  TDD似乎可能对此有所改善，那么这非常值得尝试。我发现有两个主要的领域：一是如果你在测试出问题时花了很久的时间去调试，因为他们出问题的时候，并不是清晰地告诉你问题在哪里（你也可以在更细粒度的集群上，用经典主义的TDD去改善这个问题）。第二个领域是，如果你的对象并没有足够多的行为，mockist 测试会鼓励开发团队创建更多行为丰富的对象。

* * *

## Final Thoughts （最后的思考）

As interest in unit testing, the xunit frameworks and Test Driven Development has grown, more and more people are running into mock objects. A lot of the time people learn a bit about the mock object frameworks, without fully understanding the mockist/classical divide that underpins them. Whichever side of that divide you lean on, I think it's useful to understand this difference in views. While you don't have to be a mockist to find the mock frameworks handy, it is useful to understand the thinking that guides many of the design decisions of the software.

作为单元测试的兴趣（？？），xunit 框架和测试驱动开发一直不断发展，越来越多的人开始使用 mock 对象。很多时候，人们对 mock 对象的框架有一点了解，但没有完全理解 mockist 和 经典测试背后真正的鸿沟。无论你倾向于哪一方，我认为理解他们在观点上的差异都是很有用的。尽管你不需要成为一个 mock 主义者去寻找自己觉得顺手的框架，但理解那些软件设计决策的指导思想是很有用的。

The purpose of this article was, and is, to point out these differences and to lay out the trade-offs between them. There is more to mockist thinking than I've had time to go into, particularly its consequences on design style. I hope that in the next few years we'll see more written on this and that will deepen our understanding of the fascinating consequences of writing tests before the code.

本文的目的是，指出他们的差异，并在它们之间进行权衡。还有很多关于 mockist 思想的内容是我没有深入涉及到的，尤其是它对于设计风格的影响。我希望在接下来的几年里，我们可以看到更多关于这方面的内容，并能加深我们对于在编写代码之前就编写测试的有趣影响的理解。

* * *



## Further Reading

For a thorough overview of xunit testing practice, keep an eye out for Gerard Meszaros's forthcoming book (disclaimer: it's in my series). He also maintains a [web site](http://xunitpatterns.com/) with the patterns from the book.

为了全面了解 xunit 测试的实践，请留意 Gerard Meszaros 即将出版的书籍（声明：这是我的系列丛书）。他也维护了一个[网站](http://xunitpatterns.com/)来介绍书里的模式。

To find out more about TDD, the first place to look is [Kent's book](https://www.amazon.com/gp/product/0321146530%20?ie=UTF8&tag=martinfowlerc-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0321146530)

要了解 TDD 的更多内容，首先建议看 [Kent的书](https://www.amazon.com/gp/product/0321146530%20?ie=UTF8&tag=martinfowlerc-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0321146530)

To find out more about the mockist style of testing, the best overall resource is [Freeman & Pryce](https://www.amazon.com/gp/product/0321503627?ie=UTF8&tag=martinfowlerc-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0321503627). The authors look after [mockobjects.com](http://www.mockobjects.com/). In particular read the [excellent OOPSLA paper](http://www.mockobjects.com/files/mockrolesnotobjects.pdf). For more on Behavior Driven Development, a different offshoot of TDD that is very mockist in style, start with Dan North's [introduction](http://dannorth.net/introducing-bdd/).

要了解更多关于 mock 主义的测试，最好的资源是[Freeman & Pryce](https://www.amazon.com/gp/product/0321503627?ie=UTF8&tag=martinfowlerc-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0321503627)。作者也维护了[mockobjects.com](http://www.mockobjects.com/)。特别要读一下[优秀的 OOPSLA paper](http://www.mockobjects.com/files/mockrolesnotobjects.pdf)。关于行为驱动的开发，一个特别具有 mock 主义风格的、TDD的一个不同分支，你可以从Dan North的 [介绍](http://dannorth.net/introducing-bdd/)开始。

You can also find out more about these techniques by looking at the tool websites for [jMock](http://www.jmock.org/), [nMock](http://www.nmock.org/), [EasyMock](http://www.easymock.org/), and the [.NET EasyMock](http://sourceforge.net/projects/easymocknet/). (There are other mock tools out there, don't consider this list to be complete.)

你也可以通过浏览如下工具的网站来了解更多这方面的技巧，比如 [jMock](http://www.jmock.org/), [nMock](http://www.nmock.org/), [EasyMock](http://www.easymock.org/), and the [.NET EasyMock](http://sourceforge.net/projects/easymocknet/). (还有其他的 mock 工具，这个列表并不全)

XP2000 saw the [original mock objects paper](http://www.mockobjects.com/files/endotesting.pdf), but it's rather outdated now.

mock 对象的[最初论文](http://www.mockobjects.com/files/endotesting.pdf)发表于 XP2000会议，但现在已经很过时了。
（译者注：原文链接已失效，可以使用 [Internet Archive](https://web.archive.org/web/20120831221207/http://static.mockobjects.com/files/endotesting.pdf)访问）


## Significant Revisions

_02 January 2007:_ Split the original distinction of state-based versus interaction-based testing into two: state versus behavior verification and classic versus mockist TDD. I also made various vocabulary changes  o bring it into line with Gerard Meszaros's book of xunit patterns.

_08 July 2004:_ First published

## 译者注

### 其他中文翻译版本

* http://www.predatorray.me/Mock并非Stub-翻译/
* http://rhetty.github.io/2016/10/27/【翻译】Mock不是Stub
* http://www.cnblogs.com/anf/archive/2006/03/27/360248.html
* http://tracylihui.github.io/2015/07/12/Mocks%20Aren%E2%80%99t%20Stubs/

### 相关中文阅读
* [如何理解软件测试中的stub和mock? - 知乎](https://www.zhihu.com/question/28225706)
* [ 测试中 Fakes、Mocks 以及 Stubs 概念明晰 - 王下邀月熊](https://zhuanlan.zhihu.com/p/26942686)

### 其他

* 本文使用的 Markdown 编辑器为开源软件 [Vnote](https://github.com/tamlok/vnote)
* 本文使用的输入法为开源软件[Rime输入法](http://rime.im/) ，辅以[小鹤双拼](http://www.flypy.com/pin.html) 方案