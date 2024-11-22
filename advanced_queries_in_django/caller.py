import os
import django

# Set up Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "orm_skeleton.settings")
django.setup()

from main_app.models import RealEstateListing


# RealEstateListing.objects.create(    property_type='House',    price=100000.00,    bedrooms=3,    location='Los Angeles')
# RealEstateListing.objects.create(    property_type='Flat',    price=75000.00,    bedrooms=2,    location='New York City')
# RealEstateListing.objects.create(    property_type='Villa',    price=250000.00,    bedrooms=4,    location='Los Angeles')
# RealEstateListing.objects.create(    property_type='House',    price=120000.00,    bedrooms=3,    location='San Francisco')

# house_listings = RealEstateListing.objects.by_property_type('House')
# print("House listings:")
# for listing in house_listings:    
#     print(f"- {listing.property_type} in {listing.location}")

# affordable_listings = RealEstateListing.objects.in_price_range(75000.00, 120000.00)
# print("Price in range listings:")
# for listing in affordable_listings:    
#     print(f"- {listing.property_type} in {listing.location}")

# two_bedroom_listings = RealEstateListing.objects.with_bedrooms(2)
# print("Two-bedroom listings:")
# for listing in two_bedroom_listings:    
#     print(f"- {listing.property_type} in {listing.location}")

popular_locations = RealEstateListing.objects.popular_locations()

for el in popular_locations:
    print(f"{el['location']}: Listing: {el['visit_count']}")