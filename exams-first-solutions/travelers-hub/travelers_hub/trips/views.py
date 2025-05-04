from django.views import generic as views
from django.urls import reverse_lazy

from travelers_hub.trips.models import Trip
from travelers_hub.trips.forms import TripCreateForm, TripUpdateForm, TripDeleteForm
from travelers_hub.core.utils import get_profile_object


class TripCreateView(views.CreateView):
    model = Trip
    form_class = TripCreateForm
    template_name = 'trips/create-trip.html'
    success_url = reverse_lazy('trip-list')

    def form_valid(self, form):
        trip = form.instance
        profile = get_profile_object()

        trip.traveler = profile

        return super().form_valid(form)


class TripDetailView(views.DetailView):
    model = Trip
    template_name = 'trips/details-trip.html'
    pk_url_kwarg = 'trip_pk'


class TripUpdateView(views.UpdateView):
    model = Trip
    template_name = 'trips/edit-trip.html'
    pk_url_kwarg = 'trip_pk'
    form_class = TripUpdateForm
    success_url = reverse_lazy('trip-list')


class TripDeleteView(views.DeleteView, views.FormView):
    model = Trip
    template_name = 'trips/delete-trip.html'
    pk_url_kwarg = 'trip_pk'
    form_class = TripDeleteForm
    success_url = reverse_lazy('trip-list')

    def get_initial(self):
        return self.object.__dict__

    def form_invalid(self, form):
        return self.form_valid(form)
