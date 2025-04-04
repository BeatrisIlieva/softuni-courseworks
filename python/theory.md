## Fundamentals

### Data Types and Variables

#### Data Type

Data type is a classification that specify which type of value a variable has and what type of operations can be applied to it.

#### Data Types in Python

1. int -> immutable
2. float -> immutable
3. string -> immutable
4. boolean
5. list
6. dictionary -> ordered
7. tuple -> immutable, ordered
8. set -> unique values, unordered

#### Dynamic Language

Python is a dynamic language which means that variables are not associated with a value type and can be reassigned new values.

### Functions

A function is a named piece of code

#### Lambda

Anonymous function.

### Lists

A list a collection which is indexed and mutable. A list can hold different data types. List literal is written with square brackets.

#### Comprehension

1. input sequence `nums`
2. variable `x`
3. optional predicate `if x % 2 != 0`
4. output expression `x ** 2`

```
[x ** 2 for x in nums if x % 2 != 0]
```

#### `sort()` method modifies the array

#### `sorted()` function creates a new array

### Dictionaries

Ordered collection. It consists of key-value pairs. Values can be of any type and can repeat. Keys must be unique and their value must me immutable. Dictionary is a mutable collection. If a key already exists its value get's updated otherwise a new key-value pair is added.

### Database

A database is a collection of organized data, that can be accessed and managed.

#### Database Management System (DBMS)

`DBMS` is a software that allows us to store data and execute queries so as to apply CRUD operations.

There are two types of databases:

1. Relational / SQL (Structured Query language) database (PostgreSQL)

-   holds data into tables
-   there are relations between the tables
-   we use SQL language to apply CRUD operations
-   each column in the table has a type
-   each column is one of the many characteristics that a `record` has
-   each row in the table is called a `record`

2. Non-Relational / NoSQL database (MongoDB)

-   hols data into documents or key-value pairs

### Bitwise Operations

#### Bit

-   A the smallest memory unit. It can take one of two values - 0 or 1
-   0 and 1 are called `state`
-   a Bit stores anything with two states:

1. true/false
2. +/-
3. on/off

-   A Bit cannot exist separately -> Bits exist in a group of 8 -> Byte

#### Byte

-   The smallest memory unit that **can have an address**
-   One Byte consists of 8 Bits

#### Kilobyte

1 KB = 1024 Bytes

#### Megabyte

1 MG = 1024 Kilobytes

#### Gigabyte

1 GB = 1024 Megabytes

#### Terabyte

1 TB = 1024 Gigabytes

#### Binary (двоична) system

Binary system is used in computer systems. Its alphabet consists of `0` and `1`

### Lists as Stacks and Queues

#### Big O notation

Big O notation represents an algorithm's worst case complexity.

O(n) -> `n` is the number of elements in the collection

Using stack we have a constant complexity of 1 `O(1)` because we only remove the last element and the rest of the elements do not change their indices. The same is when we append.

`append()` -> O(1)
`pop()` -> O(1)
`insert()` -> O(n)

#### Deque

Deque is a double-linked list. The elements are spread at different locations in memory. Each element in a deque knows only about the address in memory of the element before it and after it. The first element left pointer is Null and the last element right pointer is Null. When we remove the first or last element from a deque the only thing that happens is that the first or respectively the last element's pointer starts pointing to Null.

When working with a deque the only methods that we use are `append()` and `popleft()`

`append()` -> O(1)
`appendleft()` -> O(1)
`popleft()` -> O(1)

### Tuples and Sets

#### Tuples

1. immutable (but the objects inside are mutable)
2. has only two available methods - `count()` and `index()`
3. tuple `unpacking` allows to extract elements and assign them to variables

#### Sets

1. unordered
2. each element is unique
3. mutable
4. set has methods:

-   union
-   intersection
-   symmetric difference
-   difference
-   issubset
-   issuperset

▪ Tuples are immutable
▪ Tuples can hold nonunique elements
▪ Tuples are ordered collections

▪ Sets are mutable
▪ Sets hold unique elements
▪ Sets are unordered collections

## OOP

### Scopes:

1. Built-in
2. Global
3. Enclosed
4. Local

### Class

A class is a template that describes what an object would be when it is instantiated. In python everything is an object -> there are no primitive data types.

### **init** method

In the **init** method we describe what properties and object will have when it is instantiated. When we instantiate an object of a given class, the object gets automatically passed to the constructor. `self` refers to the object itself.

### Characteristics of an object

1. An object has a `state` -> properties
2. An object has `behavior` -> methods

### Attributes

1. data attributes

-   instance attributes
    -   unique for every instance
-   class attributes
    -   shared between all instances

2. methods

-   we can access attributes using methods

-   we can change the attributes of an object using methods

▪ Instance objects are individual objects of
a class
▪ Methods are functions that belong to
an object
▪ Instance variables are unique to
each instance
▪ Class Variables are shared by all instances

1. Inheritance:

Allows us to reuse code. This makes it easier for us because our code becomes much easier to read and navigate and we write less. It also allows us to add new features without modifying the existing ones.
We can apply inheritance only if we know that all the attributes - properties and methods
are valid for the descendant.

2. Encapsulation:

Encapsulation give us to features. The first one is that it allows us to protect sensitive data attributes. The second one is validation. We can protect sensitive data attributes by turning them from public to protected or private. We can do that by using single and respectively double underscore before the attribute name. If an attribute is protected we should not access it outside the class or its descendants. If an attribute is private, it should be accessed only within the class it is defined it. However, encapsulation in python is just a convention. This means that if an attribute is protected we can access it from everywhere. If an attribute is private we can access it from every where by the formula \_TheNameOfTheClass\_\_the_name_of_the_variable. The right way to get or set protected or private attributes is by using getters and setters. The validation part of the encapsulation is done within the setters where we can set an attribute only after the provided value pass a validation.

3. Static methods:
   Static methods can be placed outside the class and work the same way because they do not need to have knowledge about the class ot its instances. The data they need comes from outside. However we place static methods inside the classes when their action is logically related to the class.

4. Class methods:
   The main application of class methods is to create an instance of a given class in a controlled manner. We also use class method when we only need to access the class attributes but do not need access to the instance attributes.

5. Polymorphism:

All descendants rewrite a method that their parent class implement in order to change the implementation of the method according to its own needs.
This allows us not make checking when we invoke the method on a specific instance owing to the fact that the method has one and the same name for all instances - classes.

6. Abstraction:

When a class is abstract this means that would cannot make instances of this class. For a class to become abstract it needs to inherit the ABC module and to have at least one abstract method. All the descendants of an abstract class must implement all the abstract methods in the parent class.
The parent class becomes a template for the children. The abstract class does not have its own implementation of the methods it just forces the children to implement the abstract methods.

The difference between polymorphism and duck typing is that with duck typing there is no inheritance. In duck typing the classes do not have anything in common. They just have methods with the same name.

### Solid

1. Single Responsibility:

A class should be responsible for only one thing. This does not mean having only one method but having methods related to one and the same context.
This helps to achieve `loose coupling` which means that the separate components of the application are weakly related. This allows us to easily extend them.

2. Open-Closed principle:

Classes are closed for modification but are open for extension.
This means that we do not add elif if we need to add a new feature but inherit the existing
class and extends its functionality within a new class.

3. Liskov Substitution

We go against the Liskov Substitution principle if:
- we inherit a class but some of the attributes in the parent class are not valid for the child
- we override a method from the parent by leaving it empty
- the base class starts depending on its descendants

4. Interface Segregation

We comply with the Interface segregation by using mixins and multiple inheritance. By separating the different functionalities into mixins and inheriting these mixins in the subclasses that need the specific functionality we resolve the problem with overwriting attributes that are not valid for the subclasses. 

5. Dependency Inversion

Dependency Inversion principle says that we should not instantiate a class if we need its instance in another class but pass it from outside and thus to inject it. 


1. Single Responsibility

Всеки клас трябва да е съдържа атрибути, които са логически свързани само в един определен контекст.

2. Open Closed Principle

Класовете трябва да бъдат затворени за модофикация, но отворени за разширение. Това означава, да че ако имаме нужда да добавим нова функционалност следва да създадем нов клас, който да наследява съществуващия и да разшири неговата функционалност, вместо да използваме проверки чрез който да сравняваме от какъв тип е дадената инстанция. За да следваме този принцип бихме могли да приложим абстракцкия, да дефинираме метод в бащиния клас и да имплементираме конкретната за всеки наследник логика в абтрактния метод, който те наследяват от абстракния клас.

3. Liskov Substitution

Бихме спазили принципа ако спазваме принципите за наследяване според които един клас може да бъде наследник само ако всички атрибути в бащиния клас са валидни и за наследника. Бихме нарушили приципа ако заобикаляме правилата за наследяване като например сложим pass на наследения метод.

4. Interface Segragation

За да спазим принципа отново следваме правилата за наследяваме. Постигаме спазването за наследяване използвайки миксини и множествено наследяване. Т.е. разпределяме отделните функционалности в миксини и ги наследяваме където се нуждаем оттях вместо да държим всички функционалности в един клас вместо да нарушаваме и Liskov Substituion принципа като пренапишем методите от които нямаме нужда в наследниците.

5. Dependency Inversion

Нарушаваме принципа ако създадем инстанция от даден клас в текущия клас. Спазваме принципа ако подаваме инстанцията отвън. 

## Iterators and generators

### Iterator
Iterators we implement in classes using the dunders methods iter and next. We keep the state in an attribute in the init method. 
Iterator is an object that can be iterated. Iterator object must implement the iterator protocol by implementing two methods __iter__() and __next__(). The __iter__() method casts an object to an iterator. When we pass through all the elements in an itterator it gets exausted. 

### Generator
Generators we implement in functions. 
If a function contains the keyword `yield` it becomes a generator. Both `yield` and `return` returns value from a function. The difference between `yield` and `return` is that `return` terminates the exectuion of a function. `yield` pauses the function and keeps its state. 
The generator is a function. A simpler way to create an iterator. A generator uses the keyword 'yield'. The generators, instead of us, keep the state and raise `StopIterationError`. `yield` tells python that the object is iterable and raises StopIterationError. 

### Decorators

Closure - nested function access the scope of an eclosing function

Decorators allows us to modify the behaviour of a function or a class. 