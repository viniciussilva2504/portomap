"""Tours URL patterns."""
from django.urls import path
from . import views

urlpatterns = [
    path("", views.tours_list, name="tours_list"),
    path("<slug:slug>/", views.tour_detail, name="tour_detail"),
    path("book/<int:date_pk>/", views.book_tour, name="book_tour"),
]
