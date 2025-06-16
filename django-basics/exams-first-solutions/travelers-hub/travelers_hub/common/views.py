from django.views import generic as views

from travelers_hub.trips.models import Trip


class IndexView(views.TemplateView):
    template_name = 'common/index.html'


class TripListView(views.ListView):
    model = Trip
    template_name = 'common/all-trips.html'

    def get_queryset(self):
        queryset = self.model.objects.order_by('-start_date')

        return queryset
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['trips_count'] = self.model.objects.count()
        
        return context
    
