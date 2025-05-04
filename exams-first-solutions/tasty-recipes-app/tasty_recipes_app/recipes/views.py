from django.views import generic as views
from django.urls import reverse_lazy


from tasty_recipes_app.recipes.models import Recipe
from tasty_recipes_app.recipes.forms import (
    RecipeCreateForm,
    RecipeEditForm,
    RecipeDeleteForm
)


from tasty_recipes_app.core.utils import get_profile_object


class RecipeListView(views.ListView):
    model = Recipe
    template_name = 'recipes/catalogue.html'


class RecipeCreateView(views.CreateView):
    model = Recipe
    template_name = 'recipes/create-recipe.html'
    form_class = RecipeCreateForm
    success_url = reverse_lazy('recipe-list')

    def form_valid(self, form):
        author = get_profile_object()
        recipe = form.instance
        recipe.author = author

        return super().form_valid(form)


class RecipeDetailView(views.DetailView):
    model = Recipe
    template_name = 'recipes/details-recipe.html'
    pk_url_kwarg = 'recipe_id'


class RecipeUpdateView(views.UpdateView):
    model = Recipe
    template_name = 'recipes/edit-recipe.html'
    pk_url_kwarg = 'recipe_id'
    form_class = RecipeEditForm
    success_url = reverse_lazy('recipe-list')


class RecipeDeleteView(views.DeleteView, views.FormView):
    model = Recipe
    template_name = 'recipes/delete-recipe.html'
    pk_url_kwarg = 'recipe_id'
    form_class = RecipeDeleteForm
    success_url = reverse_lazy('recipe-list')

    def get_initial(self):
        return self.object.__dict__

    def form_invalid(self, form):
        return self.form_valid(form)
