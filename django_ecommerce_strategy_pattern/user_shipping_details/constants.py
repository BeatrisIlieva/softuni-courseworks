NAME_RULES = {
    "max_length": 255,
    "min_length": 2,
    "pattern": "(^[A-Za-z]{2,}$)|(^[A-Za-z]{1,}[\s\-]?[A-Za-z]{1,}$)",
    "pattern_error_message": "This field can only contain letters, spaces, hyphens, and apostrophes, and must start and end with a letter",
}


# "This field can only contain letters, spaces, hyphens, apostrophes, and periods, and must start and end with a letter"