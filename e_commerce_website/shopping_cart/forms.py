from django import forms


class QuantityUpdateForm(forms.Form):
    quantity = forms.IntegerField(
        min_value=0
    )

    jewelry_id = forms.IntegerField(
        widget=forms.HiddenInput()
    )
