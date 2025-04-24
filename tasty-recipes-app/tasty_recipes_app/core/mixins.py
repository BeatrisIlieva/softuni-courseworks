class CapitalizeLabelsMixin:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.capitalize_labels()

    def capitalize_labels(self):
        for field_name, field in self.fields.items():
            words = field_name.split('_')

            field.label = ' '.join(
                word.upper() if word == 'url' else word.capitalize() for word in words)


class AddPlaceholdersMixin:
    placeholders = {}

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.add_placeholders()

    def add_placeholders(self):
        for field_name, text in self.placeholders.items():
            if field_name in self.fields.keys():
                self.fields[field_name].widget.attrs['placeholder'] = text


class DisableFieldsMixin:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        self.disable_fields()
        
    def disable_fields(self):
        for field in self.fields.values():
            field.widget.attrs['readonly'] = 'readonly'
            field.widget.attrs['disabled'] = 'disabled'