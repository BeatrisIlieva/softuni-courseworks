from django.views import generic as views

from furry_funnies.posts.models import Post


class DashboardView(views.ListView):
    model = Post
    template_name = 'dashboard/dashboard.html'
