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
    ).order_by("author_id")

    for el in queryset:
        print(f"{el['author__name']} has written - {el['books']}!")


def delete_all_authors_without_books():
    Author.objects.filter(book__isnull=True).delete()


# author1 = Author.objects.create(name="J.K. Rowling")
# author2 = Author.objects.create(name="George Orwell")
# author3 = Author.objects.create(name="Harper Lee")
# author4 = Author.objects.create(name="Mark Twain") 
# book1 = Book.objects.create(title="Harry Potter and the Philosopher's Stone",price=19.99,author=author1)
# book2 = Book.objects.create(title="1984",price=14.99,author=author2)
# book3 = Book.objects.create(title="To Kill a Mockingbird",price=12.99,author=author3)
authors_with_books = show_all_authors_with_their_books()
print(authors_with_books)
delete_all_authors_without_books()
print(Author.objects.count())

