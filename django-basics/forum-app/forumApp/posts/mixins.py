from django import forms


class DisableFieldsMixin(forms.Form):
    
    disabled_fields = ()
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for field_name, field in self.fields.items():
            if field_name in self.disabled_fields:
                
                field.disabled = True
