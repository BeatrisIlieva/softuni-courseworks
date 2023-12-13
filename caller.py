import os
import django


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "e_commerce_website.settings")
django.setup()


from e_commerce_website.jewelry.models import (
    Category, 
    CustomerGender, 
    GoldCaratWeight,
    Jewelry,
    JewelryDetails, 
    Metal, 
    Size, 
    StoneColor, 
    StoneType,
    Style, 
    Title
)


categories = Category.objects.all()
titles = Title.objects.all()
sizes = Size.objects.all()
styles = Style.objects.all()
metals = Metal.objects.all()
gold_carats = GoldCaratWeight.objects.all()
customer_genders = CustomerGender.objects.all()
jewelries = Jewelry.objects.all()
jewelries_by_details = JewelryDetails.objects.all()
stone_types = StoneType.objects.all()
stone_colors = StoneColor.objects.all()

categories_choices = [x[1] for x in Category.TitleChoices.choices]

print(categories_choices)

categories_by_choices = {}

index = 0

for category in categories:
    categories_by_choices[category] = categories_choices[index]
    index += 1
    
print(categories_by_choices)
        