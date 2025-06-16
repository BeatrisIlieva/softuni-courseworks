from django.views import generic as views
from django.urls import reverse_lazy

from travelers_hub.travelers.models import Traveler
from travelers_hub.travelers.forms import TravelerCreateForm, TravelerUpdateForm
from travelers_hub.core.utils import get_profile_object


class TravelerCreateView(views.CreateView):
    model = Traveler
    form_class = TravelerCreateForm
    template_name = 'travelers/create-traveler.html'
    success_url = reverse_lazy('trip-list')


class TravelerDetailView(views.DetailView):
    template_name = 'travelers/details-traveler.html'
    
    def get_object(self, queryset = ...):
        return get_profile_object()
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['shared_trips'] = self.object.trip_set.order_by('-start_date')
        
        return context
    


class TravelerUpdateView(views.UpdateView):
    template_name = 'travelers/edit-traveler.html'
    form_class = TravelerUpdateForm
    success_url = reverse_lazy('traveler-detail')
    
    def get_object(self, queryset = ...):
        return get_profile_object()


class TravelerDeleteView(views.DeleteView):
    template_name = 'travelers/delete-traveler.html'
    success_url = reverse_lazy('index')
    
    def get_object(self, queryset = ...):
        return get_profile_object()
    
