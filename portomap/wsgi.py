"""WSGI config for The Porto Map."""
import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "portomap.settings.production")
application = get_wsgi_application()

app = application
