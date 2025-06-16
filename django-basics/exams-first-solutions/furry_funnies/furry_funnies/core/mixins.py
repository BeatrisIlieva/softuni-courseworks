class AddPlaceholderMixin:
    placeholders = {}

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.add_placeholders()

    def add_placeholders(self):
        for field_name, text in self.placeholders.items():
            if field_name in self.fields.keys():
                self.fields[field_name].widget.attrs['placeholder'] = text


class CapitalizeLabelsWordsMixin:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.capitalize_labels_words()

    def capitalize_labels_words(self):
        for field_name, field in self.fields.items():
            words = field_name.split('_')

            capitalized_label = ' '.join(
                w.upper() if w == 'url' else w.capitalize() for w in words
            )

            field.label = capitalized_label


class DisableFieldsMixin:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.disable_fields()

    def disable_fields(self):
        for field in self.fields.values():
            field.widget.attrs['readonly'] = 'readonly'
