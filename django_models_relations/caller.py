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
    return Song.objects.prefetch_related("artists").filter(artists__name=artist_name).order_by("-id")

def remove_song_from_artist(artist_name: str, song_title: str):

    artist = Artist.objects.get(name=artist_name)
    song = Song.objects.get(title=song_title)
    
    artist.songs.remove(song)

# artist1 = Artist.objects.create(name="Daniel Di Angelo")
# artist2 = Artist.objects.create(name="Indila")
# song1 = Song.objects.create(title="Lose Face")
# song2 = Song.objects.create(title="Tourner Dans Le Vide")
# song3 = Song.objects.create(title="Loyalty")
# add_song_to_artist("Daniel Di Angelo", "Lose Face")
# add_song_to_artist("Daniel Di Angelo", "Loyalty")
# add_song_to_artist("Indila", "Tourner Dans Le Vide")
# songs = get_songs_by_artist("Daniel Di Angelo")
# for song in songs:    
#     print(f"Daniel Di Angelo: {song.title}")
# songs = get_songs_by_artist("Indila")
# for song in songs:    
#     print(f"Indila: {song.title}")
remove_song_from_artist("Daniel Di Angelo", "Loyalty")
# songs = get_songs_by_artist("Daniel Di Angelo")
# for song in songs:    
#     print(f"Songs by Daniel Di Angelo after removal: {song.title}")