from myMusicApp.profiles.models import Profile


def is_user_authenticated():
    return Profile.objects.exists()