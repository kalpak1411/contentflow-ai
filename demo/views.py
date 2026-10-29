from django.shortcuts import render

def landing_view(request):
    return render(request, 'landing.html')

def login_view(request):
    return render(request, 'auth/login.html')

def register_view(request):
    return render(request, 'auth/register.html')

def dashboard_view(request):
    return render(request, 'dashboard/dashboard.html')

def sources_view(request):
    return render(request, 'sources/sources.html')

def create_content_view(request):
    return render(request, 'generator/create_content.html')

def workspace_view(request, content_id):
    return render(request, 'content/workspace.html', {'content_id': content_id})

def evidence_view(request, content_id):
    return render(request, 'content/evidence.html', {'content_id': content_id})

def brand_settings_view(request):
    return render(request, 'brand/brand_settings.html')

def history_view(request):
    return render(request, 'history/history.html')

def exports_view(request):
    return render(request, 'exports/exports.html')

def settings_view(request):
    return render(request, 'settings/settings.html')

def custom_404_view(request, exception=None):
    return render(request, 'errors/404.html', status=404)

