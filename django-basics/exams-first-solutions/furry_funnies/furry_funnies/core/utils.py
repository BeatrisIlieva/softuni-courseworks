from furry_funnies.authors.models import Author


def get_profile_object():
    return Author.objects.first()
