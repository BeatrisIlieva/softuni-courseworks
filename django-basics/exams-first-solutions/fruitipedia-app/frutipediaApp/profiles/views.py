from django.urls import reverse_lazy
from django.views import generic as views

from frutipediaApp.profiles.models import Profile
from frutipediaApp.profiles.forms import ProfileCreateForm, ProfileEditForm
from frutipediaApp.core.utils import get_profile_object

class ProfileCreateView(views.CreateView):
    model = Profile
    template_name = 'profiles/create-profile.html'
    form_class = ProfileCreateForm
    success_url = reverse_lazy('index')


class ProfileDetailsView(views.DetailView):
    template_name = 'profiles/details-profile.html'
    
    def get_object(self, queryset=None):
        profile = get_profile_object()
        
        return profile

    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        
        posts_count = self.get_object().fruit_set.count()
        
        context['posts_count'] = posts_count
        
        return context



class ProfileEditView(views.UpdateView):
    template_name = 'profiles/edit-profile.html'
    form_class = ProfileEditForm
    success_url = reverse_lazy('profile-details')
    
    def get_object(self, queryset=None):
        return get_profile_object()


class ProfileDeleteView(views.DeleteView):
    template_name = 'profiles/delete-profile.html'
    success_url = reverse_lazy('index')
    
    def get_object(self, queryset =None):
        return get_profile_object()
