# What is a url?

A url is a path to a given resource.

https://softuni.bg/trainings/4713/django-basics-september-2024#lesson-77812

1. protocol

2. domain name -> human readable replacer of the ip of the server

3. the path of the resource

    1. resource
    2. unique identifier
    3. slug -> human readable representation of the unique identifier used for SEO
    4. fragment -> #lesson-77812 -> it searches for an element in the HTML that has that id

## Static vs Dynamic path

1. static -> https://softuni.bg/trainings -> it does not change

2. dynamic -> https://softuni.bg/trainings/4713/django-basics-september-2024#lesson-77812 -> the id and the slug change according to the required course

When the dynamic url is reached a request to the server is send, the view responsible to handle the request is making a call to the DB to receive the data about the course with that id.

## urls.py in the project

Django iterates through all of the urls in the urls.py array/tuple until it finds a match/

## Slug

Matches any ASCII letters, numbers, hyphens and underscores

## Function based view

It receives as a first parameter `request`, it may accept other parameters as well and returns an `HTTP response`

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
