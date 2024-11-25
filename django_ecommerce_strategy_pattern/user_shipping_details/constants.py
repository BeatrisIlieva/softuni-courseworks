FIRST_NAME_RULES = {
    "min_length": 2,
    "max_length": 255,
    "regex": "^[A-Za-z]+$",
    "error_messages": {
        "blank": "Please enter your First Name",
        "min_length": "First Name must be at least 2 characters long",
        "max_length": "First Name cannot exceed 255 characters",
        "regex": "First Name must contain only letters",
    },
}

