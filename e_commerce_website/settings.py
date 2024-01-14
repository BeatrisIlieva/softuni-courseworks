from datetime import timedelta
from pathlib import Path

from django.urls import reverse_lazy

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-@tpe6(=9#u#$&&vw%#0(^4)p*=d-ib4vvpfm*!4u+8(gv4n-&*'

DEBUG = True

ALLOWED_HOSTS = []

SESSION_COOKIE_AGE = 3600
SESSION_SAVE_EVERY_REQUEST = True

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'django_celery_beat',
    'django_countries',
    'e_commerce_website.jewelry',
    'e_commerce_website.common',
    'e_commerce_website.shopping_cart',
    'e_commerce_website.accounts',
    'e_commerce_website.core',
    'e_commerce_website.order',
    'e_commerce_website.profiles',
    'e_commerce_website.inventory',
    'e_commerce_website.wishlist',
]

MIDDLEWARE = [
    'e_commerce_website.middlewares.middlewares.measure_execution_time_middleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # 'e_commerce_website.common.middlewares.show_last_viewed_jewelries_middleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

]

ROOT_URLCONF = 'e_commerce_website.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'e_commerce_website.wsgi.application'

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "django_e_commerce_website_db",
        "USER": "postgres",
        "PASSWORD": "S@3ana3a",
        "HOST": "127.0.0.1",
        "PORT": "5432",
    }
}

CACHES = {
    'default': {
        'BACKEND':
            'django.core.cache.backends.redis.RedisCache',
        'LOCATION':
            'redis://127.0.0.1:6379',
    },
}

# CACHES = {
#     'default': {
#         'BACKEND':
#             'django.core.cache.backends.dummy.DummyCache'
#             if DEBUG
#             else 'django.core.cache.backends.redis.RedisCache',
#         'LOCATION':
#             'redis://127.0.0.1:6379',
#     },
# }


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = '/static/'

STATICFILES_DIRS = (
    BASE_DIR / 'staticfiles',
)

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Default URL to redirect to after successful login
LOGIN_REDIRECT_URL = reverse_lazy('index_page')
LOGOUT_REDIRECT_URL = reverse_lazy('login_user')
# Default URL to redirect to for login
LOGIN_URL = reverse_lazy('login_user')

AUTH_USER_MODEL = 'accounts.AccountUser'

COUNTRIES_COMMON_NAMES = False

CELERY_BROKER_URL = 'redis://localhost:6379'
CELERY_RESULT_BACKEND = 'redis://localhost:6379'
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = TIME_ZONE


