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

```python
pip install psycopg2-binary
```

```python
python manage.py startapp app_name
```

```
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "departments_db",
        "USER": "postgres",
        "PASSWORD": "S@3ana3a",
        "HOST": "127.0.0.1",
        "PORT": "5432",
    }
}
```

```
# DEBUG = False
# ALLOWED_HOSTS = ['127.0.0.1']
# # python manage.py runserver --insecure
```

```
BASE_DIR / 'templates'
```

```
STATICFILES_DIRS = (
    BASE_DIR / 'static',
)
```

```
MEDIA_URL = 'media/'

MEDIA_ROOT = BASE_DIR / 'mediafiles/'
```

```
def get_profile_object():
    return Profile.objects.first()
```

```
from django import template

from myMusicApp.common.utils import get_profile_object

register = template.Library()

@register.simple_tag
def has_profiles():
    return get_profile_object()
```

```
{% has_profiles as profiles_exist %}

{% if profiles_exist %}
    ...
{% endif %}
```
