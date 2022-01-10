from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('notes/', views.getCreateNotes, name="notes"),
    path('note/<int:pk>/', views.Notes, name='note')
]