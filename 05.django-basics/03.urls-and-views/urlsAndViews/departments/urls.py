from django.urls import path, re_path, include

from urlsAndViews.departments import views


urlpatterns = [
    path("", views.index, name='home'),
    path('softuni/', views.redirect_to_softuni),
    path('redirect-to-view/', views.redirect_to_view, name='redirect-view'),
    path(
        "numbers/",
        include(
            [
                path("<int:pk>/", views.view_with_pk),
                path("<int:pk>/<slug:slug>/", views.view_with_slug),
            ]
        ),
    ),
    re_path(r"^archive/(?P<archive_year>202[0-3])/$", views.show_archive),
    path("<param>/", views.view_with_name),
    path("<path:param>", views.view_with_name),
    # path('<uuid:id>', some_view),
]
