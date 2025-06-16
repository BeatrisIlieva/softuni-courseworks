from django.views import generic as views
from django.urls import reverse_lazy

from worldOfSpeedApp.profiles.models import Profile
from worldOfSpeedApp.profiles.forms import ProfileCreateForm, ProfileUpdateForm

from worldOfSpeedApp.core.utils import get_profile_object

from django.db.models import Sum


class ProfileCreateView(views.CreateView):
    model = Profile
    form_class = ProfileCreateForm
    template_name = 'profiles/profile-create.html'
    success_url = reverse_lazy('car-list')


class ProfileDetailView(views.DetailView):
    model = Profile
    template_name = 'profiles/profile-details.html'

    def get_object(self, queryset=None):
        return get_profile_object()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        profile = get_profile_object()

        cars_total_price = profile.car_set.aggregate(total_sum=Sum('price'))
        print(cars_total_price)
        context['cars_total_price'] = cars_total_price['total_sum']

        return context


class ProfileUpdateView(views.UpdateView):
    model = Profile
    form_class = ProfileUpdateForm
    template_name = 'profiles/profile-edit.html'
    success_url = reverse_lazy('profile-detail')
    
    def get_object(self, queryset=None):
        return get_profile_object()


class ProfileDeleteView(views.DeleteView):
    model = Profile
    success_url = reverse_lazy('index')
    template_name = 'profiles/profile-delete.html'
    
    def get_object(self, queryset = ...):
        return get_profile_object()
