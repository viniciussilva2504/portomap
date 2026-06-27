"""Booking form."""
from django import forms
from .models import TourBooking


class BookingForm(forms.ModelForm):
    class Meta:
        model = TourBooking
        fields = ["name", "email", "phone", "participants", "message"]
        widgets = {
            "name": forms.TextInput(attrs={"placeholder": "Your full name"}),
            "email": forms.EmailInput(attrs={"placeholder": "Your email address"}),
            "phone": forms.TextInput(attrs={"placeholder": "Phone number (optional)"}),
            "participants": forms.NumberInput(attrs={"min": 1, "max": 8}),
            "message": forms.Textarea(
                attrs={"placeholder": "Any questions or special requests?", "rows": 4}
            ),
        }
