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

-   we inherit a class but some of the attributes in the parent class are not valid for the child
-   we override a method from the parent by leaving it empty
-   the base class starts depending on its descendants

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
Iterator is an object that can be iterated. Iterator object must implement the iterator protocol by implementing two methods **iter**() and **next**(). The **iter**() method casts an object to an iterator. When we pass through all the elements in an itterator it gets exausted.

### Generator

Generators we implement in functions.
If a function contains the keyword `yield` it becomes a generator. Both `yield` and `return` returns value from a function. The difference between `yield` and `return` is that `return` terminates the exectuion of a function. `yield` pauses the function and keeps its state.
The generator is a function. A simpler way to create an iterator. A generator uses the keyword 'yield'. The generators, instead of us, keep the state and raise `StopIterationError`. `yield` tells python that the object is iterable and raises StopIterationError.

### Decorators

Closure - nested function access the scope of an eclosing function

Decorators allows us to modify the behaviour of a function or a class.

## Django ORM

**ORM** maps django models to database table.

**A model** is a class that inherits the base Django model. Thus the ORM knows to map the model to a database table.

**Afield** in a model repressents a column in the table. A field in a model is a class attribute.
Each field has a type.

**Benefits of using models instead of row SQL**:

-   Allows us to write code only in Python instead of Python together with SQL
-   Allows us to reuse queries
-   Limits the chance for an SQL Injection

**Migartions** follow for changes in our models. In order to apply a change into the databse we need to create a migrations. The migration reflects the changes.

By running the command `makemigrations` the ORM checks if there are any changes in the models and if there are such a migration file gets cerated. With the command `migrate` we apply the change into the database.

**psycopg** is the connection between the Django ORM and postgres.

**DBMS** allows us to perporfm CRUD and to protect the data.

**Postgres** relational database managment system.

1. The ORM converts the python code into SQL
2. Psycopg sends the SQL to Postgres

Django generates the primary key as GENERATED ALWAYS AS IDENTITY

**Migration** allows us to keep history of the databse states and to revert to a previous state if needed.

**First Noemal Form**
Tables must contain unique records.

**Second Normal Form**
We achive the first normal form using primary keys.

**Third Normal Form**
We comply with the first and the second normal form by seperating data into different tables.

**Fourth Normal Form**

We comply with the first, the second normal and the third normal form. Even if each row in a table is unique by itself it still may consists duplicate data. Thus we comply with the fourth normal form by seperating the table into more tables.

We comply with the first, second, and third normal forms. However, even if each row is unique, a table can still contain independent multivalued data, leading to redundancy. To achieve Fourth Normal Form, we separate such data into multiple related tables, ensuring that each table contains information about one independent fact.

**Fifth Normal Form**
It should not be necessary to join a second table in order to associate data from the first and third tables.

**The two main purposes of normal forms** are to store less data and to change only at one place when a change is needed.

## Django

### What is a Framework?

1. A framework is a structured foundation with rules and constraints that we follow when building an application. It provides ready-made solutions and built-in functionalities, helping us speed up the development process.

2. In contrast, a library does not impose restrictions—it simply offers additional functionalities that we can use when needed.

### What is Django?

Django is a high-level Python Web Framework. It is know for it:

1. Speed:

-   Developers don’t need to build everything from scratch

-   It generates a fully functional admin panel automatically

-   Allows developers to interact with databases using Python code instead of SQL

2. Security:

-   Django includes built-in protections against common security threats such as SQL injection and XSS attacks

3. Scalability:

-   Django is scalable because it can grow with our application. If more people start using our app, Django can handle the extra work by adding more servers

-   With the introduction of async views in newer Django versions, it can handle asynchronous tasks, improving performance under heavy workloads

-   Django can scale Horizontally by adding more servers to handle increased traffic

-   Django can scale Vertically by upgrading hardware (physically installing additional memory chips into the machine)

4. Open source:

-   One of the key benefits is that if we're unsure how something works, we can access and debug the Django code directly to better understand its behavior.

### What is MVT(Model View Template)?

MVT is a design pattern that separates the business logic from the user interface. In Django:

1. Model handles the data.

2. View contains the business logic. A View receives an HTTP request and returns an HTTP response.

3. Template defines presentational logic (what the user sees). In Django templates are HTML files. They support Django Template Language.

### What is manage.py file?

The manage.py file helps manage tasks in a Django project, like running the server, applying database migrations, and creating new apps.

### What is a middleware?

Code that executes before or after every request.

### What is a Django App?

An app is part of the project that does something particular (Single Responsibility).

### What is a Django Project?

A collection of configurations and apps.

### What is Psycopg?

Psycopg is a PostgreSQL adapter for Python. It allows us to connect to a PostgreSQL database, execute queries, and retrieve data within our Python applications

### What is a View?

A view is a function or a class that receives an HTTP request and returns an HTTP response. Along with the request, a view can receive other parameters as well. A view implements the business logic that needs to be executed when a given url is reached.

### How is a view called?

In the project’s urls.py file we configure which function or class to be called when reaching a given url.
In Django, URLs are defined in the project's urls.py file, which acts as a central place for managing routes. To include the URLs for individual apps, we reference each app’s urls.py in the project’s urls.py using the `include()` function. Django then checks the requested URL against the URL patterns defined in the urls.py files. These patterns are created using the `path()` function. When a match is found, Django calls the corresponding view function, passing the HTTP request to it. The view processes the request and returns an HTTP response.

### What is a Django Template

It is a text file written in special syntax that allows dynamic generation of HTML. It plays a crucial role in separating the presentation layer from the business logic in the MVT architecture. It uses markup language know as Django Template Language (DTL).

### `render()`

It accepts as parameters the request, the template name and context. Using the Django Template Engine it generates HTML. It returns an HTTP response with the generated HTML, the content type (by default HTML) and the status.

### Url

A URL is a path to a resource.

```
https://softuni.bg/trainings/4713/django-basics-september-2024#lesson-77812
```

A URL contains of:

1. Protocol `https`
2. Domain `softuni.bg`
    - domain is a human readable representation of the IP address of a server
3. Path `trainings/4713/django-basics-september-2024#lesson-77812`

    1. Name of the resource `trainings`
    2. Unique identifier `4713`
    3. Slug `django-basics-september-2024`
        - a slug is a representation of the object
        - slug can contain ASCII letters, numbers and hyphens
        - slug is used for SEO
    4. Fragment `#lesson-77812`
        - When an element in the DOM has an `href` value that equals to the fragment then the page will be scrolled to that element

    - A Path can be:
        1. Static `trainings` -> it does not contain information related to a specific resource / object
        2. Dynamic `trainings/4713` -> it contains information that dynamically changes according to the requested resource; the dynamic path is different for each resource
        3. The information in the dynamic path like the `id` we pass to the view responsible to handle that url so the server gets from the database the object with the given id and returns the information about it

    5. Query parameters

To find the matching url, Django iterates through all the urls in the project `urls.py` file. It stops when it finds the first match.

### App in Django

An app is Django is a sub application responsible for a single unit of the entire application.
We need to register each app in the `settings.py` file and to create its own `urls.py` file.

### `path()`

The path function in Django is used to define URL patterns in the urls.py file. It maps a specific URL to a corresponding view.

1. First argument: The URL pattern.

2. Second argument: The view.

3. Optional name argument: A unique identifier for referencing the URL.

### `include()`

We use the `include()` function in the main `urls.py` file to tell Django to include the urls defined in the `urls.py` file of a given app.

### `render()`

Accepts as parameters request, template name, context etc. Uses the Django Template Engine and populates the context into the provided template name. Thus generates content which is of type HTML and returns it together with the content type and status.

### `redirect()`

Two types of redirect:

1. absolute -> redirect to another website/web application

2. relative -> redirect to another page in our application (redirecting to home page after successful login)

Code `302` - for redirect to another website/web application
Code `301` - moved permanently

### `reverse()` vs `reverse_lazy()`

1. reverse() -> Resolves the URL right away when the code is executed

2. reverse_lazy() -> Does not resolve the URL immediately. Instead, it waits until the URL is actually needed. At that point all the apps are already loaded so it does not throw an error.

### Templates

Templates allows us to separate the business logic from the presentational logic. Unlike plain HTML, templates allows us to use variables, filters and tags.

### Filters

A filter is used to modify variable before it is displayed. To apply a filter to a variable we use the symbol pipe '|' followed by the filter name.

### Tags

To define a tag we use `{% %}`. Tags can be used to insert HTMl or to execute logic.

-   There are self-closing tags; tags can accepts parameters

```
{% include 'nav.html' %} -> this tag includes HTML
```

-   There are tags that we need to close explicitly:

```
{% if %}
{% else %}
{% endif %} -> this tag executes logic
```

### CSRF attack

The action in which someone else sends a POST request on our behalf without us being aware.

CSRF token is placed in forms that have as a method POST.
CSRF token is a random string that Django generates on every requests and sends it with the response. It expects to receive it on the next request. It throws and error if the same CSRF token is not sent with the next request. This is done by the CSRF middleware.

We place the CSRF token tag in the form. It is present in the form as an input with type hidden.

On every refresh of the page a new CSRF token is returned by the server and set as a cookie. The CSRF token is valid until a new one is generated.

### Widget

Each form input has a corresponding default widget. For example, `CharField` uses `TextInput` widget by default. We can set a different widget using the widget argument on a field

### `@deconstructible`

Serializes and deserializes a validator class so the validator class can be recreated from a migration file.

### filters vs tags

Both filters and tags in Django are functions. Filters modify existing value, tags can generate new content (tags) or modify existing tags.

There are self-closing tags (include) and tags that need to be closed (if - endif). Self closing tags can receive parameters.

## DRF

ACCESS TOKEN -> used to login; valid for 5/10/15 minutes

REFRESH TOKEN -> used to get new Access Token; valid for 1day/1week/2weeks

1. We login both access and refresh token
2. The access token is valid for a few minutes. After it expires we cannot make new requests.
3. The client asks the server if the refresh token is still valid and if it is the server sends us a new access token
4. After the refresh token also expires, we neeed to login again

When we login we receive both access token and a refresh token. They are a random string.
We log in via the Access Token.
When the Access Token expires, the frontend sends a request with the refresh token so as to receive a new access token.

The Access Token contains the Secret Key.

WRITE-ONLY - the data is not returned in the response
READ-ONLY - the data cannot be sent

## Django Basics

Internet is a network of mkultiple devices that can connect and exchange information. This can happen owing to for example fiber optics, satellites, cell phone network

## Forms

In `form.cleaned_data.get('some_filed')` stays the data after validations (form validations, model validations). It is the same as `full_clean` in models.

In the forms all data comes as a string and upon `form.is_valid()` they are being casted to the data types specified in the form fields (`IntegerField`, `CharField` etc.).

The `widget` says as what type the input to be visualized as. For example a `CharField` may be visualized as `IntegerField`.

## Templates

filters are functions that can accept one argument; filters can be chained

to use custome filters or tags we need to create a directory with the name `templatetags`. to use it in a template we need to load it using the name of the file.

As a first value the filter accepts the value that it is applied at in the template. as a second parameter it may accept an argument that is passed in the template using `:`.

To use a filter we need to register it in the Library. Then to use a decorator

the `url` tag is a simple tag because it returns the url as a string to which we need to redirect.

`simple tag` can accept as many parameteres as we need.

`inclusion tag` returns context and renders it into html. In the decorator as a first paarmeter we say what the name of the template is. If we want to get the entire context, we can say `takes_context=true` in the decorator. Then as a first parameter in the fictuion we need to accept the context

`tag` (just tag) always accepts parser and a token and it returns a queryset. tags mignt be both self-closing andf tags that we need to close.

`custom tags` accept at leat two arguments - a parse and a token, Django uses the parser to go throug each element of the template so as to parse it. The token contains information where the tag starts and where it ends.

`@deconstructible` turns a python object - validator into a serializable structure -> tuple that has 3 elements -> the path to the validator, arguments and key-word arguments. We need `deconstructible` because validators are part of the migration files. So it turns a python object into a tuple and then from tuple into a python object.

`Mixins` - are classes that we should not initialize.

When we use on forms the method `forms.is_valid()`, the `is_valid()` method acces the `errors` property that calls the method `full_clean` (it cleans the fields and the form).The we can call `clean` method. `clean` method comes from `BaseModelForm`. It does not have implementation. It just returns `cleaned_data`. We use it to validate data if the validation includes two or more fields.

We can clean a specific field by using `clean_fieldname`. However the validation is goign to be only applied on the form level - not the model.

is_valid -> self.errors -> full_clean -> \_clean_fileds
The `_clean_fileds` checks if we have used `clean_fieldname` and if we have it ut calls it

`modelform_factory` is a function that helps us to create dynamic forms (for example the form to include certain fields if a user is admin or a regular user)

`modelformset_factory` is a function that allows us to generate multiple forms.

`crispy forms` we mainly use to achieve better stilization.

`view` is a callable, that accepts at least one parameter - the request and retirns an https response.

the class `View` is the base class for all views.

The `View` class has an `as_view` method. Owing to the `as_view` method a CBV is callable. Inside the `as_view` method is the `view` function.
The `as_view` method returns the `view` function. The `view` function returns the `dispath` method.
The `dispath` method checks if the http method in the request is present in the allowed http methods. 
If we haven't defined the requested method in our CBV the `dispatch` method returns `http_method_not_allowed`.
The `dispatch` mthod returns `handler` if e have defined a method with the request name. The handler is our method. 

We use CBV because they allows us inheritence, allows us to skip wirting the common logic and concetrate only on the business logic. In CBV we use a declarative way to only say for example is the template, what is the form, what is the success url to redirect to. 

`mixins` implement common functionalitiy. We should not initialize mixins. Ather classes inherit mixins. 