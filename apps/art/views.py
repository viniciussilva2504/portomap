"""Art gallery views."""
from django.shortcuts import render, get_object_or_404
from .models import Collection, ArtPiece


def gallery(request):
    collections = Collection.objects.prefetch_related("pieces")
    all_pieces = ArtPiece.objects.select_related("collection")
    active_collection = request.GET.get("collection")
    if active_collection:
        all_pieces = all_pieces.filter(collection__slug=active_collection)
    context = {
        "collections": collections,
        "pieces": all_pieces,
        "active_collection": active_collection,
    }
    return render(request, "pages/art.html", context)


def art_detail(request, slug):
    piece = get_object_or_404(ArtPiece, slug=slug)
    related = (
        ArtPiece.objects.filter(collection=piece.collection)
        .exclude(pk=piece.pk)[:4]
    )
    return render(request, "pages/art_detail.html", {"piece": piece, "related": related})
