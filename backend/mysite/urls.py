from django.contrib import admin
from django.urls import path, include
from store.views import home

# 👇 ADD THESE
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),

    path('api/', include('store.urls')),
]

# 👇 THIS IS REQUIRED FOR IMAGES
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)