"""Art gallery models: Collection and ArtPiece."""
from django.db import models
from django.utils.text import slugify


class Collection(models.Model):
    """A themed collection of artworks, e.g. 'Porto Landmarks', 'Ribeira Scenes'."""

    name = models.CharField(max_length=120)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]
        verbose_name = "Collection"
        verbose_name_plural = "Collections"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class ArtPiece(models.Model):
    """A single hand-drawn artwork by Sharon."""

    MEDIUM_CHOICES = [
        ("ink", "Ink on Paper"),
        ("watercolour", "Watercolour"),
        ("mixed", "Mixed Media"),
    ]

    collection = models.ForeignKey(
        Collection,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="pieces",
    )
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True)
    medium = models.CharField(max_length=20, choices=MEDIUM_CHOICES, default="ink")
    image = models.ImageField(upload_to="art/", blank=True)
    is_available = models.BooleanField(default=True)
    etsy_listing_url = models.URLField(blank=True)
    featured = models.BooleanField(default=False)
    order = models.PositiveSmallIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "-created_at"]
        verbose_name = "Art Piece"
        verbose_name_plural = "Art Pieces"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
