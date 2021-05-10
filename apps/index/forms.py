from django import forms
from .models import *


class LoginForm(forms.Form):
    username = forms.CharField(max_length=100, initial="请输入用户名", widget=forms.TextInput(attrs={"class": "name_input"}))
    password = forms.CharField(max_length=100, initial="请输入密码",
                               widget=forms.PasswordInput(attrs={"class": "pass_input"}))


class RegForm(forms.ModelForm):
    class Meta:
        model = Users
        fields = ['uname', 'upass', 'uemail', 'uphone']
        error_messages = {
            '__all__': {

            }
        }
