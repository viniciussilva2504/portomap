"""Tours views."""
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone

from .models import GuidedTour, TourDate, TourBooking
from .forms import BookingForm


def tours_list(request):
    tours = GuidedTour.objects.filter(is_active=True)
    upcoming = (
        TourDate.objects.filter(status="available", date__gte=timezone.now().date())
        .select_related("tour")
        .order_by("date", "time")
    )
    return render(request, "pages/tours.html", {"tours": tours, "upcoming": upcoming})


def tour_detail(request, slug):
    tour = get_object_or_404(GuidedTour, slug=slug, is_active=True)
    dates = TourDate.objects.filter(
        tour=tour, status="available", date__gte=timezone.now().date()
    ).order_by("date", "time")
    form = BookingForm()
    return render(request, "pages/tour_detail.html", {
        "tour": tour, "dates": dates, "form": form
    })


def book_tour(request, date_pk):
    tour_date = get_object_or_404(TourDate, pk=date_pk, status="available")
    if request.method == "POST":
        form = BookingForm(request.POST)
        if form.is_valid():
            booking = form.save(commit=False)
            booking.tour_date = tour_date
            booking.save()
            _send_booking_notification(booking)
            messages.success(
                request,
                "Your booking request has been sent! Sharon will confirm shortly.",
            )
            return redirect("tours_list")
    else:
        form = BookingForm()
    return render(request, "pages/book_tour.html", {
        "tour_date": tour_date, "form": form
    })


def _send_booking_notification(booking: TourBooking) -> None:
    try:
        send_mail(
            subject=f"[The Porto Map] New booking: {booking.tour_date.tour.name}",
            message=(
                f"Name: {booking.name}\n"
                f"Email: {booking.email}\n"
                f"Phone: {booking.phone or 'N/A'}\n"
                f"Tour: {booking.tour_date.tour.name}\n"
                f"Date: {booking.tour_date.date} {booking.tour_date.time}\n"
                f"Participants: {booking.participants}\n\n"
                f"Message: {booking.message or 'None'}"
            ),
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.CONTACT_EMAIL],
            fail_silently=True,
        )
    except Exception:
        pass
