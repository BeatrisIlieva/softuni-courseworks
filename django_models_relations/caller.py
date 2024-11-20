import os
import django

# Set up Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "orm_skeleton.settings")
django.setup()

from main_app.models import Author, Book, Artist, Song, Product, Review, Driver, DrivingLicense
from django.contrib.postgres.aggregates import StringAgg
from django.db.models import Avg, F
from datetime import timedelta, date

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

def calculate_average_rating_for_product_by_name(product_name: str):
    product = Product.objects.filter(name=product_name).annotate(avg_rating=Avg("reviews__rating")).first()
    
    return product.avg_rating

def get_reviews_with_high_ratings(threshold: int):
    return Review.objects.filter(rating__gte=threshold)

def get_products_with_no_reviews():
    return Product.objects.filter(reviews__isnull=True).order_by("-name")

def delete_products_without_reviews():
    Product.objects.filter(reviews__isnull=True).delete()
    
def calculate_licenses_expiration_dates():
    licenses = DrivingLicense.objects.annotate(exp_date=F("issue_date") + timedelta(days=365)).order_by("-license_number")
    
    return "\n".join(
        [
            f"License with number: {l.license_number} expires on {l.exp_date}!"
            for l in licenses
        ]
    )
    
def get_drivers_with_expired_licenses(due_date: date):
    drivers = Driver.objects.select_related("license").annotate(exp_date=(F("license__issue_date") + timedelta(days=365))).filter(exp_date__gt=due_date)
    
    return drivers
# driver1 = Driver.objects.create(first_name="Tanya", last_name="Petrova")
# driver2 = Driver.objects.create(first_name="Ivan", last_name="Yordanov")
# license1 = DrivingLicense.objects.create(license_number="123", issue_date=date(2022, 10, 6), driver=driver1)
# license2 = DrivingLicense.objects.create(license_number="456", issue_date=date(2022, 1, 1), driver=driver2)
# expiration_dates = calculate_licenses_expiration_dates()
# print(expiration_dates)

# drivers_with_expired_licenses = get_drivers_with_expired_licenses(date(2023, 1, 1))
# for driver in drivers_with_expired_licenses:   
#     print(f"{driver.first_name} {driver.last_name} has to renew their driving license!")