from tasty_recipes_app.profiles.models import Profile


def get_profile_object():
    return Profile.objects.first()
