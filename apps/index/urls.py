from django.urls import path
from .views import *

urlpatterns = [
    path('login/', login_views, name='login'),
    path('register/', register_views, name='reg'),
    path('', index_views),
    path('checkPhone/', check_phone),
    path('checkName/', check_name),
    path('checkEmail/', check_email)
]
