from django.views import generic as views

from frutipediaApp.fruits.models import Fruit


class DashboardView(views.ListView):
    model = Fruit
    template_name = 'dashboard/dashboard.html'
