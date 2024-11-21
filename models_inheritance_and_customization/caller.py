import os
import django

# Set up Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "orm_skeleton.settings")
django.setup()
from main_app.models import UserProfile, Message, Student

# student1 = Student(name="Alice", student_id=45.23)
# student1.full_clean()
# student1.save()
# retrieved_student1 = Student.objects.filter(name="Alice").first()

# # Print the saved ID of the student1
# print(retrieved_student1.student_id)

# # Try to parse zero as ID and expect ValueError
# try:
#     student2 = Student(name="Bob", student_id="0")
#     student2.full_clean()
#     student2.save()
# except ValueError as error:
#     print(error)




