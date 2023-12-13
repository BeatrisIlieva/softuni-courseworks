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



# {% extends 'base/base.html' %}
# {% load static %}
# {% block page_content %}
# {%for earring in earrings%}
#     <h1>Title</h1>
#     <div>
#         {{earring.jewelry.title.content}}
#     </div>

#     <h1>Images</h1>

#    <ul >
#         <img width="400" height="600" src="{{ earring.first_image_url }}" alt="img8">
#    </ul>

#     <ul >
#         <img  width="400" height="600"  src="{{ earring.second_image_url }}" alt="img8">
#     </ul> 

#     <h1>Metals</h1>
#     <div>
#         {% for metal in earring.metals.all %}
#             <li>{{ metal.name }}</li>
#             {% for gold_carat in earring.gold_carats.all %}
#                 <li>{{ gold_carat.weight }}K</li>
#             {%endfor%}
#         {% endfor %}
#     </div>

#     <h1>Stones</h1>
#     <div>
#         {% for stone_type in earring.stone_types.all %}
#             <li>{{ stone_type.name }} </li>
#             {% for stone_color in earring.stone_colors.all %}
#                 <li>{{ stone_color.name }} </li>
#             {% endfor %}
#         {% endfor %}
#     </div>

#     <h1>Style</h1>
#     <ul>
#         {{earring.jewelry.style.name}}
#     </ul>

#     <h1>Quantity</h1>
#     <div>
#         {{ earring.quantity }}
#     </div>

# {%endfor%}

# {% endblock %}


