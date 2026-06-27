"""Art admin."""
from django.contrib import admin
from .models import Collection, ArtPiece


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ["name", "order"]
    prepopulated_fields = {"slug": ("name",)}
    ordering = ["order"]


@admin.register(ArtPiece)
class ArtPieceAdmin(admin.ModelAdmin):
    list_display = ["title", "collection", "medium", "is_available", "featured", "order"]
    list_filter = ["collection", "medium", "is_available", "featured"]
    list_editable = ["is_available", "featured", "order"]
    prepopulated_fields = {"slug": ("title",)}
    ordering = ["order", "-created_at"]
