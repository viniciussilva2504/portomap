"""Core models: SiteSettings and ContactMessage."""
from django.db import models


class SiteSettings(models.Model):
    """Singleton model for global site configuration managed by Sharon via Admin."""

    tagline = models.CharField(
        max_length=200,
        default="Hand-drawn maps & guided walks through Porto's soul.",
    )
    hero_subtitle = models.TextField(
        default=(
            "Original ink illustrations, self-guided walking routes and "
            "intimate guided tours — all created by one artist who lives, "
            "breathes and draws this city."
        ),
    )
    etsy_shop_url = models.URLField(
        default="https://www.etsy.com/shop/SharonJemimaArt",
        blank=True,
    )
    instagram_url = models.URLField(blank=True, default="")
    facebook_url = models.URLField(blank=True, default="")

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"

    def __str__(self):
        return "Site Settings"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class ContactMessage(models.Model):
    """Messages sent via the contact form."""

    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=250)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"

    def __str__(self):
        return f"{self.name} — {self.subject} ({self.created_at:%d %b %Y})"
