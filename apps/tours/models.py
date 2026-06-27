"""Guided tours models: GuidedTour, TourDate, TourBooking."""
from django.db import models
from django.utils.text import slugify


class GuidedTour(models.Model):
    """A guided tour experience offered by Sharon."""

    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    tagline = models.CharField(max_length=300, blank=True)
    description = models.TextField()
    duration_hours = models.DecimalField(max_digits=3, decimal_places=1, default=2.0)
    max_participants = models.PositiveSmallIntegerField(default=8)
    price_per_person = models.DecimalField(max_digits=6, decimal_places=2)
    meeting_point = models.CharField(max_length=300)
    cover_image = models.ImageField(upload_to="tours/", blank=True)
    is_active = models.BooleanField(default=True)
    featured = models.BooleanField(default=False)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]
        verbose_name = "Guided Tour"
        verbose_name_plural = "Guided Tours"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class TourDate(models.Model):
    """A scheduled occurrence of a guided tour."""

    STATUS_CHOICES = [
        ("available", "Available"),
        ("full", "Fully Booked"),
        ("cancelled", "Cancelled"),
    ]

    tour = models.ForeignKey(GuidedTour, on_delete=models.CASCADE, related_name="dates")
    date = models.DateField()
    time = models.TimeField()
    spots_remaining = models.PositiveSmallIntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="available")
    notes = models.CharField(max_length=300, blank=True)

    class Meta:
        ordering = ["date", "time"]
        verbose_name = "Tour Date"
        verbose_name_plural = "Tour Dates"

    def __str__(self):
        return f"{self.tour.name} — {self.date:%d %b %Y} {self.time:%H:%M}"

    @property
    def is_bookable(self):
        return self.status == "available" and self.spots_remaining > 0


class TourBooking(models.Model):
    """A booking request for a specific tour date."""

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("cancelled", "Cancelled"),
    ]

    tour_date = models.ForeignKey(TourDate, on_delete=models.CASCADE, related_name="bookings")
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    participants = models.PositiveSmallIntegerField(default=1)
    message = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Tour Booking"
        verbose_name_plural = "Tour Bookings"

    def __str__(self):
        return f"{self.name} — {self.tour_date}"
