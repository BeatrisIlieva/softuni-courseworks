import os
import django

# Set up Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "orm_skeleton.settings")
django.setup()
from main_app.models import UserProfile, Message

# user1 = UserProfile.objects.create(username="user3", email="email3@icloud.com")
# user2 = UserProfile.objects.create(username="user4", email="email4@icloud.com")

# message = Message.objects.create(sender=user1, receiver=user2, content="some content")

# message = Message.objects.get(pk=1)

# message.reply_to_message("some content2")

# user7 = UserProfile.objects.create(username="user7", email="email7@icloud.com")
# message.forward_message(user7)
