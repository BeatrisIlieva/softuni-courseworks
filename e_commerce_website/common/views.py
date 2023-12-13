from django.shortcuts import render

from e_commerce_website.jewelry.models import Category, Metal, StoneType

def index_page(request):
    
    categories = Category.TitleChoices.choices
    
    metals = Metal.TitleChoices.choices
    
    stones = StoneType.TitleChoices.choices
    
    filtered_stones =  filter(lambda stone: stone[1] in ['Ruby', 'Pearl', 'Sapphire', 'Emerald', 'Diamond'], stones)
    
    
    context = {
        'categories': categories,
        'metals': metals,
        'stones': filtered_stones,
    }
    return render(request, 'common/index-page.html', context)
