import os
import django

# Set up Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "orm_skeleton.settings")
django.setup()

from main_app.models import Author, Book
from django.contrib.postgres.aggregates import StringAgg


def show_all_authors_with_their_books():
    # select
    #     a.name,
    #     STRING_AGG(b.title, ', ')
    # from
    #     main_app_book as b
    # join
    #     main_app_author as a
    # on
    #     a.id = b.author_id
    # group by
    #     a.name

    queryset = Book.objects.values("author__name").annotate(
        books=StringAgg("title", delimiter=", ")
    )

    for el in queryset:
        print(f"{el['author__name']} has written - {el['books']}!")


def delete_all_authors_without_books():
    Author.objects.filter(book__isnull=True).delete()

