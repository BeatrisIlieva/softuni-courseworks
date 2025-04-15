from django.db import models
from django.db.models import Max, Avg

class RealEstateListingManager(models.Manager):

    def by_property_type(self, property_type: str):
        return self.filter(property_type=property_type)
    
class VideoGameManager(models.Manager):
    def games_by_genre(self, genre: str):
        return self.filter(genre=genre)
    
    def recently_released_games(self, year: int):
        return self.filter(release_year__gte=year)
    
    def highest_rated_game(self):
        return self.order_by('-rating').first()
    
    def lowest_rated_game(self):
        return self.order_by('rating').first()
    
    def average_rating(self):
        result = self.aggregate(average_rating=Avg('rating'))
        
        return f'{result['average_rating']:.1f}'