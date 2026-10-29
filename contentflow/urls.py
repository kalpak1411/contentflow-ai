from django.urls import path, include

urlpatterns = [
    path('', include('demo.urls')),
]

handler404 = 'demo.views.custom_404_view'

