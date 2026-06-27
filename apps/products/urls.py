"""Walking Routes URL patterns."""
from django.urls import path
from . import views

urlpatterns = [
    path("", views.routes_list, name="routes_list"),
    path("<slug:slug>/", views.route_detail, name="route_detail"),
]
