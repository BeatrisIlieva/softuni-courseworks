from travelers_hub.travelers.models import Traveler


def get_profile_object():
    return Traveler.objects.first()
