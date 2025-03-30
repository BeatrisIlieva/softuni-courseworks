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

## What is Psycopg?

Psycopg is a PostgreSQL adapter for Python. It allows us to connect to a PostgreSQL database, execute queries, and retrieve data within our Python applications

## What is a View?

A view is a function or a class that receives an HTTP request and returns an HTTP response. Along with the request, a view can receive other parameters as well. A view implements the business logic that needs to be executed when a given url is reached.

## How is a view called?

In the project’s urls.py file we configure which function or class to be called when reaching a given url.
In Django, URLs are defined in the project's urls.py file, which acts as a central place for managing routes. To include the URLs for individual apps, we reference each app’s urls.py in the project’s urls.py using the `include()` function. Django then checks the requested URL against the URL patterns defined in the urls.py files. These patterns are created using the `path()` function. When a match is found, Django calls the corresponding view function, passing the HTTP request to it. The view processes the request and returns an HTTP response.

## What is a Django Template

It is a text file written in special syntax that allows dynamic generation of HTML. It plays a crucial role in separating the presentation layer from the business logic in the MVT architecture. It uses markup language know as Django Template Language (DTL).

## `render()`

It accepts as parameters the request, the template name and context. Using the Django Template Engine it generates HTML. It returns an HTTP response with the generated HTML, the content type (by default HTML) and the status.

## Url

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

## App in Django

An app is Django is a sub application responsible for a single unit of the entire application.
We need to register each app in the `settings.py` file and to create its own `urls.py` file.

## `path()`

The path function in Django is used to define URL patterns in the urls.py file. It maps a specific URL to a corresponding view. 

1. First argument: The URL pattern.

2. Second argument: The view.

3. Optional name argument: A unique identifier for referencing the URL.

## `include()`

We use the `include()` function in the main `urls.py` file to tell Django to include the urls defined in the `urls.py` file of a given app.

## `render()`

Accepts as parameters request, template name, context etc. Uses the Django Template Engine and populates the context into the provided template name. Thus generates content which is of type HTML and returns it together with the content type and status.

## `redirect()`

Two types of redirect:

1. absolute -> redirect to another website/web application

2. relative -> redirect to another page in our application (redirecting to home page after successful login)

Code `302` - for redirect to another website/web application
Code `301` - moved permanently

## `reverse()` vs `reverse_lazy()`

1. reverse() -> Resolves the URL right away when the code is executed 

2. reverse_lazy() -> Does not resolve the URL immediately. Instead, it waits until the URL is actually needed. At that point all the apps are already loaded so it does not throw an error. 
