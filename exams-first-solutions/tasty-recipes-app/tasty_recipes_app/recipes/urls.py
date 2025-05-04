from django.urls import path, include

from tasty_recipes_app.recipes.views import (
    RecipeListView,
    RecipeCreateView,
    RecipeDetailView,
    RecipeUpdateView,
    RecipeDeleteView,
)

urlpatterns = [
    path('catalogue/', RecipeListView.as_view(), name='recipe-list'),
    path('create/', RecipeCreateView.as_view(), name='recipe-create'),
    path('<int:recipe_id>/', include([
        path('details/', RecipeDetailView.as_view(), name='recipe-detail'),
        path('edit/', RecipeUpdateView.as_view(), name='recipe-update'),
        path('delete/', RecipeDeleteView.as_view(), name='recipe-delete'),
    ])),
]
