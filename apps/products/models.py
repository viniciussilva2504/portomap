"""Walking Routes (digital products) models."""
from django.db import models
from django.utils.text import slugify


class WalkingRoute(models.Model):
    """A self-guided walking route script — the main digital product."""

    DIFFICULTY_CHOICES = [
        ("easy", "Easy"),
        ("moderate", "Moderate"),
        ("challenging", "Challenging"),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    subtitle = models.CharField(max_length=300, blank=True)
    description = models.TextField()
    distance_km = models.DecimalField(max_digits=4, decimal_places=1)
    duration_hours = models.DecimalField(max_digits=3, decimal_places=1)
    difficulty = models.CharField(
        max_length=20, choices=DIFFICULTY_CHOICES, default="easy"
    )
    neighbourhood = models.CharField(max_length=100, blank=True)
    cover_image = models.ImageField(upload_to="routes/", blank=True)
    preview_image = models.ImageField(upload_to="routes/previews/", blank=True)
    etsy_listing_url = models.URLField(
        help_text="Link to purchase on Etsy",
        blank=True,
    )
    price = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    is_active = models.BooleanField(default=True)
    featured = models.BooleanField(default=False)
    order = models.PositiveSmallIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "-created_at"]
        verbose_name = "Walking Route"
        verbose_name_plural = "Walking Routes"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
