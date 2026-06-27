"""Walking Routes views."""
from django.shortcuts import render, get_object_or_404
from .models import WalkingRoute


def routes_list(request):
    routes = WalkingRoute.objects.filter(is_active=True)
    return render(request, "pages/walking_routes.html", {"routes": routes})


def route_detail(request, slug):
    route = get_object_or_404(WalkingRoute, slug=slug, is_active=True)
    related = WalkingRoute.objects.filter(is_active=True).exclude(pk=route.pk)[:3]
    return render(request, "pages/route_detail.html", {
        "route": route, "related": related
    })
