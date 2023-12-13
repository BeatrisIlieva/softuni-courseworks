def calculate_max_choices_length(value):
    return max(len(choice.value) for choice in value)