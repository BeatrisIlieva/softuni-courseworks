class AddPlaceholderMixin:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.add_placeholders()

    def add_placeholders(self):
        for field_name, field in self.fields.items():

            split_field_name = field_name.split('_')
            placeholder = ' '.join(
                word.capitalize()
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


class ReadOnlyMixin:
    read_only_fields = []
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.make_field_read_only()

    def make_field_read_only(self):
        for field_name in self.read_only_fields:
            if field_name in self.fields:
                self.fields[field_name].widget.attrs['readonly'] = 'readonly'
                self.fields[field_name].widget.attrs['disabled'] = 'disabled'
