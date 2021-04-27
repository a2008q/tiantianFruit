from django.contrib import admin

# Register your models here.
from .models import *


class UsersAdmin(admin.ModelAdmin):
    list_display = ['uname', 'uemail', 'uphone', 'isActive']


admin.site.register(Users, UsersAdmin)
