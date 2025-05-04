from worldOfSpeedApp.profiles.models import Profile


def get_profile_object():
    return Profile.objects.first()
