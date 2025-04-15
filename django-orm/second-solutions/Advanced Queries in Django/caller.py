import os
import django
from django.forms import ValidationError



# Set up Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "orm_skeleton.settings")
django.setup()

# Import your models here

# Run and print your queries

from main_app.models import Programmer, Project, Technology


# # Use get_programmers_with_technologies
specific_project = Project.objects.filter(name="Web App Project").first()
programmers_with_technologies = specific_project.get_programmers_with_technologies()

print("Programmers working on Web App Project and their technologies:")
for programmer in programmers_with_technologies:
    print(f"Programmer: {programmer.name}")
    for technology in programmer.projects.get(name="Web App Project").technologies_used.all():
        print(f"- Technology: {technology.name}")

# # Use get_projects_with_technologies
# specific_programmer = Programmer.objects.get(name="Alice")
# projects_with_technologies = specific_programmer.get_projects_with_technologies()

# print(f"\nProjects and technologies for {specific_programmer.name}:")
# for project in projects_with_technologies:
#     print(f"Project: {project.name}")
#     for technology in project.technologies_used.all():
#         print(f"- Technology: {technology.name}")









