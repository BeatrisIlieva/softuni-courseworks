import os
import django
from django.db.models import Q

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
    Title, JewelryMetal
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

# categories_choices = [x[1] for x in Category.TitleChoices.choices]

# print(categories_choices)

# categories_by_choices = {}

# index = 0

# for category in categories:
#     categories_by_choices[category] = categories_choices[index]
#     index += 1
    
# print(categories_by_choices)
        
# jewelry = JewelryDetails.objects.filter(pk=1).get()
# customer_gender = jewelry.jewelry.customer_gender.pk
# print(customer_gender)

# style_names = Style.objects.filter(title__in=['ST', 'EN'])
# style_ids = [s.pk for s in style_names]
# print(style_ids)

# jewelries = JewelryDetails.objects.filter(Q(jewelry__customer_gender=1),
#                                           Q(jewelry__category=1))
#
# # jewelries = jewelries.prefetch_related('metals__metals__jewelry').filter(metals__title='YG')
# jewelries = jewelries.prefetch_related('metals__metals__jewelry').filter(jewelry__style__in=[2])
# jewelries = jewelries.filter(jewelry__style__in=[2])
# # metals = JewelryMetal.objects.prefetch_related('jewelry').filter(jewelry__jewelry__style__in=[2]).select_related('metal')
# metals = JewelryMetal.objects.prefetch_related('jewelry').filter(jewelry__jewelry__style__in=[2]).select_related('metal')
#
# print(metals)
# # metal_choice = Metal.TitleChoices.labels['WG']
# # print(metal_choice)
# print(metals.values_list('metal__title', flat=True))



# Fetch all the metals from the database
# metals = JewelryMetal.objects.filter(metal__title='WG').select_related('metal')
# metal_choices = [(metal.metal.TitleChoices.choices) for metal in metals][0]


# metal_field = forms.ChoiceField(choices=metal_choices)


# metals = JewelryDetails.objects.filter(jewelry__style=1).prefetch_related('metals')
# # metal_choices = [(metal.title, metal.get_title_display()) for metal in metals]
# metal_choices = [(metal.metal.TitleChoices.choices) for metal in metals][0]
# print(metals)
# print(metal_choices)

# metals = Metal.objects.prefetch_related('metals__jewelry__metals')
# metal_choices = [(metal.title, metal.get_title_display()) for metal in metals]
# print(metal_choices)
# # print(metal_choices)
#
# metals = JewelryMetal.objects.filter(jewelry__jewelry__style=2).select_related('metal')
# metal_choices = [(metal.metal, metal.get_metal_display()) for metal in metals]
# print(metal_choices)

# styles = Style.objects.filter(category=1).select_related('category')
# style_choices = [(style.title, style.get_title_display()) for style in styles]
# # style_choices = [(style.TitleChoices.choices) for style in styles][0]
# print(style_choices)
# print(styles)

# styles = Jewelry.objects.select_related('style').filter(category=1)
# style_choices = [(style.style.TitleChoices.choices) for style in styles][0]
# print(style_choices)
# print(styles)


# metals = Style.objects.filter(category=category_pk).select_related('category')
# style_choices = [(style.title, style.get_title_display()) for style in styles]

# metals = JewelryMetal.objects.filter(jewelry__jewelry__style=2).select_related('metal')
# metal_choices = [(metal.metal.title, metal.metal.get_title_display()) for metal in metals]
# print(metals)
# print(metal_choices)



jewelries = JewelryDetails.objects.filter(
    Q(jewelry__customer_gender=1),
    Q(jewelry__category=1),
    Q(jewelry_metals__metal_id__in=[1])).select_related('jewelry__style')



# style_names = Style.objects.filter(title__in=search_pattern_styles)
# # Getting the pks of the style objects
# style_ids = [s.pk for s in style_names]

styles = Style.objects.prefetch_related('style__jewelry__jewelry_metals').filter(style__jewelry__metals__in=[1, 3])

style_choices = [(style.title, style.get_title_display()) for style in styles]
print(style_choices)