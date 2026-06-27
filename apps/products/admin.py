"""Walking Routes admin."""
from django.contrib import admin
from .models import WalkingRoute


@admin.register(WalkingRoute)
class WalkingRouteAdmin(admin.ModelAdmin):
    list_display = [
        "title", "neighbourhood", "distance_km", "duration_hours",
        "difficulty", "price", "is_active", "featured",
    ]
    list_filter = ["difficulty", "is_active", "featured"]
    list_editable = ["is_active", "featured", "price"]
    prepopulated_fields = {"slug": ("title",)}
    ordering = ["order", "-created_at"]
