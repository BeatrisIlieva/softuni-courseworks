import os
import django

# Set up Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "orm_skeleton.settings")
django.setup()

from main_app.models import Author, Book, Artist, Song
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
    
    return "\n".join(
        [
            f"{el['author__name']} has written - {el['books']}!"
            for el in queryset
        ]
    )


def delete_all_authors_without_books():
    Author.objects.filter(book__isnull=True).delete()


def add_song_to_artist(artist_name: str, song_title: str):
    artist = Artist.objects.get(name=artist_name)
    song = Song.objects.get(title=song_title)
    artist.songs.add(song)
    
def get_songs_by_artist(artist_name: str):
    return Song.objects.prefetch_related("artists").filter(artists__name=artist_name).order_by("id")

def remove_song_from_artist(artist_name: str, song_title: str):
    Song.objects.prefetch_related("artists").filter(artists__name=artist_name, title=song_title).delete()
    
