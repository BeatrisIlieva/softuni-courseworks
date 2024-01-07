from django import forms

from e_commerce_website.shopping_cart.models import ShoppingCart


class QuantityUpdateForm(forms.Form):
    quantity = forms.IntegerField(min_value=0)
    jewelry_id = forms.IntegerField(widget=forms.HiddenInput())
#
#
# class AddToShoppingCartForm(forms.Form):
#     quantity = forms.IntegerField(min_value=1)
#     jewelry_id = forms.IntegerField(widget=forms.HiddenInput())

# class ShoppingCartForm(forms.ModelForm):
#     class Meta:
#         model = ShoppingCart
#         fields = ['quantity']




