from django.shortcuts import render
from .serializers import NoteSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from rest_framework import status


# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    dictionary = {
        "title": "this is title",
        "description": "this is description"
    }
    return Response(dictionary)


@api_view(['GET', 'POST'])
def getCreateNotes(req):
    if req.method == "GET":
        notes = Note.objects.all().order_by("-updated")
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

    elif req.method == 'POST':
        data = req.data
        note = Note.objects.create(
            body=data['body']
        )
        serializer = NoteSerializer(note, many=False)
        return Response(serializer.data)


"""
@api_view(['GET'])
def getNote(request, pk):
    try:
        note = Note.objects.get(id=pk)
        serializer = NoteSerializer(note, many=False)
        return Response(serializer.data)
    except Note.DoesNotExist:
        res = {"error": "notFound"}
        return Response(res, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def createNote(request):
    data = request.data
    note = Note.objects.create(
        body=data['body']
    )
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
def updateNote(request, pk):
    try:
        data = request.data
        note = Note.objects.get(id=pk)
        serializer = NoteSerializer(instance=note, data=data, many=False)

        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)

    except Note.DoesNotExist:
        res = {"error": "notFound"}
        return Response(res, status=status.HTTP_404_NOT_FOUND) 
    

@api_view(["DELETE"])
def deleteNote(request, pk):
    try:
        data = request.data
        note = Note.objects.get(id=pk)
        note.delete()

        return Response("Note was deleted", status=status.HTTP_200_OK)

    except Note.DoesNotExist:
        res = {"error": "notFound"}
        return Response(res, status=status.HTTP_404_NOT_FOUND)
"""


@api_view(["GET", "PUT", "DELETE"])
def Notes(req, pk):
    if req.method == 'GET':
        try:
            note = Note.objects.get(id=pk)
            serializer = NoteSerializer(note, many=False)
            return Response(serializer.data)
        except Note.DoesNotExist:
            res = {"error": "notFound"}
            return Response(res, status=status.HTTP_404_NOT_FOUND)

    elif req.method == 'PUT':
        try:
            data = req.data
            note = Note.objects.get(id=pk)
            serializer = NoteSerializer(instance=note, data=data, many=False)

            if serializer.is_valid():
                serializer.save()

            return Response(serializer.data)

        except Note.DoesNotExist:
            res = {"error": "notFound"}
            return Response(res, status=status.HTTP_404_NOT_FOUND)

    elif req.method == 'DELETE':
        try:
            data = req.data
            note = Note.objects.get(id=pk)
            note.delete()

            return Response("Note was deleted", status=status.HTTP_200_OK)

        except Note.DoesNotExist:
            res = {"error": "notFound"}
            return Response(res, status=status.HTTP_404_NOT_FOUND)