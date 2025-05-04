from django.urls import reverse_lazy
from django.views import generic as views


from frutipediaApp.fruits.models import Fruit
from frutipediaApp.fruits.forms import FruitCreateForm, FruitEditForm, FruitDeleteForm
from frutipediaApp.core.utils import get_profile_object


class FruitCreateView(views.CreateView):

    model = Fruit
    template_name = 'fruits/create-fruit.html'
    form_class = FruitCreateForm
    success_url = reverse_lazy('dashboard')

    def form_valid(self, form):
        fruit = form.instance

        profile = get_profile_object()

        fruit.owner = profile

        return super().form_valid(form)


class FruitDetailsView(views.DetailView):
    model = Fruit
    template_name = 'fruits/details-fruit.html'
    pk_url_kwarg = 'fruitId'


class FruitEditView(views.UpdateView):
    model = Fruit
    template_name = 'fruits/edit-fruit.html'
    form_class = FruitEditForm
    pk_url_kwarg = 'fruitId'
    success_url = reverse_lazy('dashboard')


class FruitDeleteView(views.DeleteView):
    model = Fruit 
    template_name = 'fruits/delete-fruit.html'
    form_class = FruitDeleteForm
    pk_url_kwarg = 'fruitId'
    success_url = reverse_lazy('dashboard')
    
    def get_initial(self):
        return self.object.__dict__
    
    def form_invalid(self, form):
        return self.form_valid(form)
