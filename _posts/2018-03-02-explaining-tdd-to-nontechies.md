---
layout: post
title:  "Explaining TDD to Nontechies"
categories: drafts
---

Source: [
Modern C++ Programming with Test-Driven Development: Code Better, Sleep Better](https://www.amazon.com/Modern-Programming-Test-Driven-Development-Better/dp/1937785483)

Q.: What’s TDD?
<br/>
A.: It’s a software development technique used by programmers to incrementally design their system.

Q.: What does it look like?
<br/>
A.: Programmers break their work down into small chunks, or units. For each small chunk, they write a small test that provides an example of how that code should behave. They then write a small chunk of code that makes the test pass. Once they get the test passing, they make sure they clean up any design or coding deficiencies that they just introduced in the small chunk of code.

Q.: So they’re just writing unit tests?
<br/>
A.: They are using a unit test framework to help specify how every small bit of added code should behave. So yes, they’re writing unit tests, but the tests also double as documentation on what the system does.

Q.: So they’re just writing unit tests.
<br/>
A.: They are using unit tests as a way of incrementally designing the system. The

tests get written first.

Q.: I’m not seeing how this is any different from unit testing. So what if you write the tests first?
<br/>
A.: You get different results. Writing tests after doesn’t change anything. They might help the programmer find a few problems, but unit testing alone don’t other- wise compel programmers to change the design and quality of the codebase.

Q.: But TDD does change the design and quality?
<br/>
A.: A few studies (see Research on TDD, on page 303) demonstrate that there are fewer defects when applying TDD. Further, doing TDD allows programmers to continually change the code and design for the better.

Q.: How does TDD allow programmers to change the code any more than they did before?
<br/>
A.: Every small chunk of code a programmer adds to the system comes into exis- tence only once a test exists to demonstrate its behavior. That means all of the code in the system gets tested. Having tests for everything means that a programmer can make constant small changes as needed to keep the code clean. Without suffi- cient tests, the old adage of “If it ain’t broke, don’t fix it” is reality.

Q.: So what? Can’t we save time by not worrying about how clean the code is?
<br/>
A.: Some studies show that 80 percent of software efforts are expended on maintaining (not fixing) the software.2 In a codebase growing to a large size over time, things that might have taken a couple hours to accomplish can bloat to taking several days. Even a simple question—“What does the software do in this case?”—can require a several-hour foray into a complex codebase on the part of the programmer.

Q.: Doesn’t that say something about the quality of programmers? Can’t they just write clean code in the first place?
<br/>
A.: Think of programming like writing. Even good writers continually rework their sentences and paragraphs to improve understanding. And they still get presented with numerous problems by editors who review their work. It’s enough of a challenge to write code that simply provides expected behaviors, so step 1 is to put the correct code in place. Step 2 is to improve the code by making sure it’s part of a maintainable design.

Q.: I’m still not understanding why you couldn’t achieve the same results with just writing a few unit tests after the code gets completed.
<br/>
A.: For human reasons, it doesn’t happen. First, once most programmers write the code, they think they’re done with the “real” work. They have high confidence in their capability to write the correct code and are often satisfied by a simple manual test or two. So, they have little interest in writing additional unit tests to prove what they already know. They also feel they crafted the code well enough and less frequently take advantage of the tests to clean up their code. Programmers, in general, do as little as needed to get past what they view as management man- dates. Second, time schedule pressures often dominate. Anything done after the fact—after the code gets built—gets short shrift.

Q.: Shouldn’t we allow programmers to use their own professional judgment about what code should be tested? Isn’t some code so simple that it doesn’t really need that level of testing? Aren’t they wasting time by this rigid insistence on testing everything?
<br/>
A.: Most systems don’t really have all that much code that’s so simple it can’t break, so there’s not much testing effort to be saved here. I’m also no longer surprised by how many defects programmers uncover in areas of the system that look innocuous and perfect. Defects are very costly in many ways, and having fewer by virtue of practicing TDD provides great savings. You’ll also waste far less time on the seemingly simple challenge of figuring out how the existing system behaves. Every programmer who’s gone back and tried to write unit tests against a large, existing codebase reports that it’s very difficult. The primary reason is that the codebase wasn’t structured with testing in mind, and as a result it’s much harder to hook tests into the system. The typical programmer punts when faced with such challenges.

Q.: I’ve heard some programmers say that you really only need 70 percent of your system unit-tested and that you can cover the rest with functional tests.
<br/>
A.: Are you comfortable with 30 percent of your system not being covered with tests that provide fast feedback? If there are defects in that near-third of your sys- tem, you’ll find out about them much later. If you need to rework that portion of the system to accommodate new features, it will be a considerably slower effort. You’ll either need to add unit tests (which is harder with existing code) or use slower functional tests to make sure you don’t break things.

Q.: Having fast tests for all logic makes sense. But don’t you end up with a lot more code, in the form of tests, that you have to maintain?
<br/>
A.: No. Most systems are probably double the size they need to be, if not more. Part of that is a by-product of the inability to safely remove redundant chunks of code as programmers add them. Anecdotal evidence suggests that yes, the amount of unit testing code might be equivalent, or even a little larger than, a production codebase. But a codebase created entirely by following TDD will likely be half the size. So, it comes out in the wash, plus you get all of the other side benefits of TDD.

Q.: I’ve heard that TDD doesn’t really catch a lot of bugs. Doesn’t this suggest that it’s all a waste of time?
<br/>
A.: TDD prevents you from integrating defects into the system in the first place. You always write a test, you always get it to pass, and if it doesn’t pass, you fix it before committing the code. It seems like a better approach than checking in code and finding out only much later that it doesn’t work or breaks something else.

Q.: You’re making TDD sound like it’s a silver bullet.
<br/>
A.: TDD is a great tool, but it is only one tool in what needs to be a good-sized toolbox. TDD is insufficient. Proving that small units of code work in isolation doesn’t prove that you can string them together in order to produce a desired functional need. You need also acceptance tests, which might also include performance tests, load tests, other forms of integration tests, and perhaps some level of exploratory testing.