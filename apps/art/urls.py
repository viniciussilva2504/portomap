"""Art URL patterns."""
from django.urls import path
from . import views

urlpatterns = [
    path("", views.gallery, name="art_gallery"),
    path("<slug:slug>/", views.art_detail, name="art_detail"),
]
