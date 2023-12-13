# from django import forms
# from .models import JewelryDetails

# class JewelryDetailsForm(forms.ModelForm):
#     class Meta:
#         model = JewelryDetails
        
#         fields = [
#             'jewelry__style__title',
#             'metals',
#             'stone_types',
#             'stone_colors',
#             ]
        
#         widgets = {
#             'jewelry__style__title': forms.CheckboxSelectMultiple,
#             'metals': forms.CheckboxSelectMultiple,
#             'stone_colors': forms.CheckboxSelectMultiple,
#             'stone_types': forms.CheckboxSelectMultiple,
#         }