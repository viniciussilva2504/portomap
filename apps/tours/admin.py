"""Tours admin."""
from django.contrib import admin
from .models import GuidedTour, TourDate, TourBooking


class TourDateInline(admin.TabularInline):
    model = TourDate
    extra = 1


@admin.register(GuidedTour)
class GuidedTourAdmin(admin.ModelAdmin):
    list_display = ["name", "duration_hours", "price_per_person", "is_active", "featured"]
    list_filter = ["is_active", "featured"]
    list_editable = ["is_active", "featured"]
    prepopulated_fields = {"slug": ("name",)}
    inlines = [TourDateInline]


@admin.register(TourDate)
class TourDateAdmin(admin.ModelAdmin):
    list_display = ["tour", "date", "time", "spots_remaining", "status"]
    list_filter = ["tour", "status", "date"]
    list_editable = ["spots_remaining", "status"]
    ordering = ["date", "time"]


@admin.register(TourBooking)
class TourBookingAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "tour_date", "participants", "status", "created_at"]
    list_filter = ["status", "created_at"]
    list_editable = ["status"]
    readonly_fields = ["created_at"]
    ordering = ["-created_at"]
