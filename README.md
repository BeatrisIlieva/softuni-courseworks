<p align="center" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 200px;">
  <img src="https://res.cloudinary.com/deztgvefu/image/upload/v1706426486/template_images/cute-little-pink-cat-watercolor-png_2_kxmwtq.webp" alt="Project Logo" width="200">
</p>

# <p align="center">*DjangoE-commerceWebsite*</p>

<a name="built-with"></a>

<p align="center">
  <a href="#introduction">Introduction</a> ·
  <a href="#built-with">Built With</a> ·
  <a href="#features">Features</a> ·
  <a href="#contributing">Entity Relationship Diagram</a> ·
  <a href="#installation">Installation</a> ·
  <a href="#usage">Usage</a> ·
  <a href="#license">License</a>
</p>

## Introduction
*Welcome to our Online Jewelry Store built with Django! This web application serves as a platform for showcasing and selling a stunning collection of exquisite jewelry. With a user-friendly interface and seamless navigation, customers can explore, select, and purchase their favorite pieces effortlessly..* 

[back to top](#djangoe-commercewebsite)



## Built With
<p align="center">
  <img alt="AWS" width="100px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"/>
  
  <img alt="Dj" width="100px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain-wordmark.svg"/>    
  
  <img alt="PostgreSQL" width="100px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg"/>
  
  <img alt="Docker" width="100px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original-wordmark.svg" />

  <img alt="Redis" width="100px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original-wordmark.svg" />
          
</p>
          
          
[back to top](#djangoe-commercewebsite)


## Features 
1. Deployment:
- Hosted on Amazon Web Services (AWS)
2. Databases:
- PostgreSQL: Optimized CRUD operations, pre-fetched data, and dynamic filtration.
- Redis: Enhanced performance through caching. Implemented sessions for non-registered users to add products to their shopping carts and temporarily store customer wishlist.
3. Backend:
- Followed Django Model View Template (MVT) architecture.
4. Frontend:
- Styled the user interface with CSS for an intuitive shopping experience tailored for desktop users.
5. User Models:
- Implemented two distinct user models: one for logging credentials and another for personal details.
6. Asynchronous Operations:
- Utilized Celery for background tasks, specifically for cleaning expired shopping carts and managing inventory updates.
7. OOP & SOLID:
- Applied Object-Oriented Programming principles and SOLID for modular and maintainable code.

[back to top](#djangoe-commercewebsite)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/BeatrisIlieve/DjangoE-commerceWebsite.git
    cd DjangoE-commerceWebsite
    ```

2. Install Docker:

    Follow the [official Docker installation guide](https://docs.docker.com/get-docker/) to install Docker on your machine.

3. Build and start the Docker container for PostgreSQL:

    Follow the [official guide on how to use the Postgres Docker Official Image](https://hub.docker.com/_/postgres) to run the PostgreSQL Docker Container.


4. Build and start the Docker container for Redis:

    Follow the [official guide on how to use the Redis Docker Official Image](https://hub.docker.com/_/redis) to run the Redis Docker Container.

5. Install the project dependencies using [pip](https://pip.pypa.io/en/stable/):

    ```bash
    pip install -r requirements.txt
    ```

6. Apply database migrations:

    ```bash
    python manage.py migrate
    ```

7. Run Celery worker:

    ```bash
    celery -A e_commerce_website worker -l info
    ```

8. Run Celery Beat in a separate terminal:

    ```bash
    celery -A e_commerce_website beat -l info
    ```
9. Run [populate_base_tables.py](populate_base_tables.py)

10. Run [populate_jewelries.py](populate_jewelries.py)

11. Run the development server:

    ```bash
    python manage.py runserver
    ```
  
12. Visit [localhost:8000](http://localhost:8000) in your web browser to access the Django application.

[Go back to the top](#djangoe-commercewebsite)

## Entity Relationship Diagram:
![accounts_accountuser](https://github.com/BeatrisIlieve/DjangoE-commerceWebsite/assets/122045435/9be83e6b-b8f3-410c-bed4-495924d5409c)

[Go back to the top](#djangoe-commercewebsite)

## Usage
1. Run the development server...
2. Visit [localhost:8000](http://localhost:8000)...

[Go back to the top](#djangoe-commercewebsite)

## Contributing
We welcome contributions!...

[back to top](#djangoe-commercewebsite)

## License
This project is licensed under the [MIT License](LICENSE).

[back to top](#djangoe-commercewebsite)
