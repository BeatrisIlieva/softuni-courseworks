from django.urls import path, include

from frutipediaApp.fruits.views import (
    FruitCreateView,
    FruitDetailsView,
    FruitEditView,
    FruitDeleteView,
)

urlpatterns = [
    path('create/', FruitCreateView.as_view(), name='fruit-create'),
    path('<int:fruitId>/', include([
        path('details/', FruitDetailsView.as_view(), name='fruit-details'),
        path('edit/', FruitEditView.as_view(), name='fruit-edit'),
        path('delete/', FruitDeleteView.as_view(), name='fruit-delete'),
    ]))
]
