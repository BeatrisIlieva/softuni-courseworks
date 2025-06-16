from django.views import generic as views
from django.urls import reverse_lazy


from worldOfSpeedApp.cars.models import Car
from worldOfSpeedApp.cars.forms import (
    CarCreateForm,
    CarUpdateForm,
    CarDeleteForm,
)

from worldOfSpeedApp.core.utils import get_profile_object


class CarListView(views.ListView):
    model = Car
    template_name = 'cars/catalogue.html'
    
    def get_context_data(self, **kwargs):
        context =  super().get_context_data(**kwargs)
        
        cars_count = Car.objects.count()
        
        context['cars_count'] = cars_count
        
        return context


class CarCreateView(views.CreateView):
    model = Car
    template_name = 'cars/car-create.html'
    form_class = CarCreateForm
    success_url = reverse_lazy('car-list')

    def form_valid(self, form):
        car = form.instance
        owner = get_profile_object()
        car.owner = owner

        return super().form_valid(form)


class CarDetailView(views.DetailView):
    model = Car
    template_name = 'cars/car-details.html'
    pk_url_kwarg = 'id'


class CarUpdateView(views.UpdateView):
    model = Car
    form_class = CarUpdateForm
    template_name = 'cars/car-edit.html'
    pk_url_kwarg = 'id'
    success_url = reverse_lazy('car-list')


class CarDeleteView(views.DeleteView):
    model = Car
    form_class = CarDeleteForm
    template_name = 'cars/car-delete.html'
    pk_url_kwarg = 'id'
    success_url = reverse_lazy('car-list')
    
    def get_initial(self, queryset=None):
        return self.object.__dict__
    
    def form_invalid(self, form):
        return self.form_valid(form)
