import os
import django
import time
from django.db.models import Avg
# Set up Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "orm_skeleton.settings")
django.setup()

from main_app.models import Author, Book, Artist, Song, Product, Review

# Import your models here

# Create queries within functions

def show_all_authors_with_their_books():       
    authors_with_books = Author.objects.prefetch_related('book_set').filter(book__isnull=False).values('name', 'book__title')
    
    result = {}
    
    for item in authors_with_books:
        author = item['name']
        book = item['book__title']
        
        if author not in result:
            result[author] = []
            
        result[author].append(book)
        
    return '\n'.join({f"{key} has written - {', '.join(value)}!" for key, value in result.items()})
    
    # authors = Author.objects.all()
    
    # result = []
    
    # for author in authors:
    #     books = Book.objects.filter(author=author)
        
    #     if not books:
    #         continue
        
    #     book_titles = ', '.join(b.title for b in books)
        
    #     result.append(f'{author.name} has written - {book_titles}!')
    
    # return '\n'.join(result)

def delete_all_authors_without_books():
    Author.objects.filter(book__isnull=True).delete()


# start = time.time()
# authors_with_books = show_all_authors_with_their_books() 
# print(authors_with_books)
# end = time.time()

# print(end - start)

# 0.1446058750152588
# 0.1112051010131836

def add_song_to_artist(artist_name: str, song_title: str):
    artist = Artist.objects.get(name=artist_name)
    song = Song.objects.get(title=song_title)
    
    artist.songs.add(song)
    
def get_songs_by_artist(artist_name: str):
    songs = Song.objects.prefetch_related('artists').filter(artists__name=artist_name).order_by('-pk')
    return songs

def remove_song_from_artist(artist_name: str, song_title: str):
    """
    DELETE FROM
        main_app_artist_songs
    WHERE
        artist_id = (
            SELECT 
                id
            FROM
                main_app_artist
            WHERE
                name = 'Indila'
        )
            AND
        song_id = (
            SELECT
                id
            FROM
                main_app_song
            WHERE
                title = 'Tourner Dans Le Vide'
        )
    """
    Artist.songs.through.objects.filter(
        artist__name=artist_name,
        song__title=song_title
    ).delete()
    
    
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


# remove_song_from_artist("Daniel Di Angelo", "Loyalty")


def calculate_average_rating_for_product_by_name(product_name: str):
    result = Product.objects.filter(name=product_name).annotate(avg_rating=Avg('reviews__rating')).first()
    return result.avg_rating

def get_products_with_no_reviews():
    return Product.objects.filter(reviews__rating__isnull=True).order_by('-name')


def delete_products_without_reviews():
    Product.objects.filter(reviews__rating__isnull=True).delete()
    
# product1 = Product.objects.create(name="Laptop")

# product2 = Product.objects.create(name="Smartphone")

# product3 = Product.objects.create(name="Headphones")

# product4 = Product.objects.create(name="PlayStation 5")

# review1 = Review.objects.create(description="Great laptop!", rating=5,

# product=product1)

# review2 = Review.objects.create(description="The laptop is slow!", rating=2,

# product=product1)

# review3 = Review.objects.create(description="Awesome smartphone!", rating=5,

# product=product2)
    
# print(calculate_average_rating_for_product_by_name("Laptop"))

# delete_products_without_reviews()
# print(get_products_with_no_reviews())