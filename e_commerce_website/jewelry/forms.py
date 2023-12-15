from django import forms
from django.shortcuts import render

from e_commerce_website.jewelry.models import JewelryDetails, Style, Metal, Jewelry


# class JewelryForm(forms.ModelForm):
#     # styles = Style.TitleChoices.choices
#     #
#     # style = forms.ChoiceField(
#     #     choices=styles,
#     #     required=False,
#     #     widget=forms.CheckboxSelectMultiple(),
#     # )
#     # class Meta:
#         # model = JewelryDetails
#         # fields = ('jewelry', 'metals')
#         # widgets = {
#         #     'jewelry': forms.CheckboxSelectMultiple(),
#         #     'metals': forms.CheckboxSelectMultiple(),
#         # }
#
#     metals = forms.ChoiceField(
#         choices=[(metal.id, metal.title) for metal in Metal.objects.all()],
#         required=False,
#         label='Choose Metal',
#         widget=forms.Select(attrs={'class': 'form-control'})  # You can add additional attributes here if needed
#     )
#
#     class Meta:
#         model = JewelryDetails
#         # fields = ('jewelry', 'metals')
#         fields = ('metals',)



# def index_page(request):
    
#     if request.method == 'get':
#         form = JewelryForm()
        
#     else:
#         form = JewelryForm(request.POST)
        
#     context = {
#         'form': form,
#     }
    
#     return render(request, 'common/index-page.html', context)

class StyleForm(forms.Form):

    STYLE_CHOICES = Style.TitleChoices.choices

    style_choices = forms.MultipleChoiceField(
        choices=STYLE_CHOICES,
        required=False,
        widget=forms.CheckboxSelectMultiple,
    )

class MetalForm(forms.Form):

    METAL_CHOICES = Metal.TitleChoices.choices

    metal_choices = forms.MultipleChoiceField(
        choices=METAL_CHOICES,
        required=False,
        widget=forms.CheckboxSelectMultiple,
    )


    # METALS = Metal.TitleChoices.choices
    #
    # metals = forms.ChoiceField(
    #     choices=METALS,
    #     required=False,
    # )
    #
    # JEWELRIES = Jewelry



