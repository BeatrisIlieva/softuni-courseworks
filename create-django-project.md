1. Create a project:

```python
python3 -m venv .venv
```

```python
source .venv/bin/activate
```

```python
python -m pip install --upgrade pip
```

```python
python -m pip install django
```

```python
django-admin startproject projectName .
```

2. Create an app

```python
python manage.py startapp app_name
```

3. Add the app to installed apps

4. Replace DB settings with Postgres DB settings

5. Enter credentials

6. Install Psycopg2

```python
pip install psycopg2-binary
```

7. Create database

8. Migrate

```python
python manage.py migrate
```

9. Start the server

```python
python manage.py runserver
```
