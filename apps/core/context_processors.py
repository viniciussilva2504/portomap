"""Context processor to inject SiteSettings into every template."""
from .models import SiteSettings


def site_settings(request):
    return {"site_settings": SiteSettings.load()}
