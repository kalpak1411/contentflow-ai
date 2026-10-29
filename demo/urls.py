from django.urls import path
from . import views

urlpatterns = [
    path('', views.landing_view, name='landing'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('dashboard/', views.dashboard_view, name='dashboard'),
    path('sources/', views.sources_view, name='sources'),
    path('create/', views.create_content_view, name='create_content'),
    path('content/<str:content_id>/', views.workspace_view, name='workspace'),
    path('content/<str:content_id>/evidence/', views.evidence_view, name='evidence'),
    path('brand-settings/', views.brand_settings_view, name='brand_settings'),
    path('history/', views.history_view, name='history'),
    path('exports/', views.exports_view, name='exports'),
    path('settings/', views.settings_view, name='settings'),
]

