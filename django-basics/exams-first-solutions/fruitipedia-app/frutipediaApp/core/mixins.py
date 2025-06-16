class AddPlaceholderMixin:
    def __init__(self,  *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.add_placeholders()

    def add_placeholders(self):
        for field_name, field in self.fields.items():

            split_field_name = field_name.split('_')
            
            prefix = getattr(self, 'placeholder_prefix', None)

            if prefix:
                split_field_name.insert(0, self.placeholder_prefix)

            placeholder = ' '.join(
                word.upper() if word == 'url' else word.capitalize()
                for word in split_field_name
            )

            field.widget.attrs['placeholder'] = placeholder


class RemoveLabelMixin:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.remove_labels()

    def remove_labels(self):
        for field in self.fields.values():
            field.label = ''


class DisableFieldsMixin:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        self.disable_fields()
        
    def disable_fields(self):
        for field in self.fields.values():
            field.widget.attrs['disabled'] = 'disabled'