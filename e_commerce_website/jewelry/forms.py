from django import forms
from django.shortcuts import render

from e_commerce_website.jewelry.models import JewelryDetails, Style

class JewelryForm(forms.Form):
    styles = Style.TitleChoices.choices
    
    style = forms.ChoiceField(
        choices=styles,
        required=False,
        widget=forms.CheckboxSelectMultiple(),
    )


# def index_page(request):
    
#     if request.method == 'get':
#         form = JewelryForm()
        
#     else:
#         form = JewelryForm(request.POST)
        
#     context = {
#         'form': form,
#     }
    
#     return render(request, 'common/index-page.html', context)