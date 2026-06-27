"""Core views: Home, About, Contact."""
from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings

from .models import SiteSettings, ContactMessage
from .forms import ContactForm
from apps.art.models import ArtPiece
from apps.tours.models import GuidedTour, TourDate
from apps.products.models import WalkingRoute


def home(request):
    site = SiteSettings.load()
    featured_art = ArtPiece.objects.filter(featured=True).select_related("collection")[:6]
    featured_tours = GuidedTour.objects.filter(is_active=True, featured=True)[:3]
    featured_routes = WalkingRoute.objects.filter(is_active=True, featured=True)[:3]
    upcoming_dates = (
        TourDate.objects.filter(status="available")
        .select_related("tour")
        .order_by("date", "time")[:5]
    )
    context = {
        "site": site,
        "featured_art": featured_art,
        "featured_tours": featured_tours,
        "featured_routes": featured_routes,
        "upcoming_dates": upcoming_dates,
    }
    return render(request, "pages/home.html", context)


def about(request):
    site = SiteSettings.load()
    return render(request, "pages/about.html", {"site": site})


def contact(request):
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            msg = form.save()
            _send_contact_notification(msg)
            messages.success(
                request,
                "Thank you for getting in touch! Sharon will reply soon.",
            )
            return redirect("contact")
    else:
        form = ContactForm()
    return render(request, "pages/contact.html", {"form": form})


def _send_contact_notification(msg: ContactMessage) -> None:
    try:
        send_mail(
            subject=f"[The Porto Map] New message: {msg.subject}",
            message=(
                f"From: {msg.name} <{msg.email}>\n\n{msg.message}"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.CONTACT_EMAIL],
            fail_silently=True,
        )
    except Exception:
        pass
