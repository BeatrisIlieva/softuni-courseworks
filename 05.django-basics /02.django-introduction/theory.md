## What is a Framework?

1. A framework is a structured foundation with rules and constraints that we follow when building an application. It provides ready-made solutions and built-in functionalities, helping us speed up the development process.

2. In contrast, a library does not impose restrictions—it simply offers additional functionalities that we can use when needed.

## What is Django?

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

## What is MVT(Model View Template)?

MVT is a design pattern that separates the business logic from the user interface. In Django:

1. Model handles the data.

2. View contains the business logic. A View receives an HTTP request and returns an HTTP response.

3. Template defines presentational logic (what the user sees). In Django templates are HTML files. They support Django Template Language.

## What is manage.py file?

The manage.py file helps manage tasks in a Django project, like running the server, applying database migrations, and creating new apps.

## What is a middleware?

Code that executes before or after every request.

## What is a Django App?

An app is part of the project that does something particular (Single Responsibility).

## What is a Django Project?

A collection of configurations and apps.

## What is Psycopg>

Psycopg is a PostgreSQL adapter for Python. It allows us to connect to a PostgreSQL database, execute queries, and retrieve data within our Python applications
