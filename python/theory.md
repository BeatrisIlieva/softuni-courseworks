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

