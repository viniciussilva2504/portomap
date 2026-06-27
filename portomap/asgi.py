"""ASGI config for The Porto Map."""
import os
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "portomap.settings.production")
application = get_asgi_application()
