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

####  Big O notation 

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
- union
- intersection
- symmetric difference 
- difference
- issubset
- issuperset

▪ Tuples are immutable
▪ Tuples can hold nonunique elements
▪ Tuples are ordered collections

▪ Sets are mutable
▪ Sets hold unique elements
▪ Sets are unordered collections


