from django.http import HttpResponse
from django.shortcuts import render, redirect

from .models import *
from .forms import *


# Create your views here.


def login_views(request):
    if request.method == 'GET':
        form = LoginForm()
        return render(request, 'login.html', locals())
        # return render(request, 'login.html')
    else:
        uname, upwd = None, None
        form = LoginForm(request.POST)
        if form.is_valid():
            uname = form.cleaned_data['username']
            upwd = form.cleaned_data['password']
            if uname and upwd:
                users = Users.objects.filter(uname=uname)
                if users:
                    user = users[0]
                    if user.upass == upwd:
                        return redirect(index_views)
                    else:
                        errmsg = "密码不正确"
                        return render(request, 'login.html', locals())
                else:
                    errmsg = "用户名不正确"
                    return render(request, 'login.html', locals())
            else:
                errmsg = '请输入用户名和密码'
                return render(request, 'login.html', locals())


def register_views(request):
    if request.method == "GET":
        return render(request, 'register.html')
    else:
        uname, upwd, uemail = None, None, None
        if 'username' in request.POST:
            uname = request.POST['username']
        if 'pwd' in request.POST:
            upwd = request.POST['pwd']
        if 'email' in request.POST:
            uemail = request.POST['email']
        if 'phone' in request.POST:
            phone = request.POST['phone']
        if uname and upwd and uemail and phone:
            Users.objects.create(uname=uname, upass=upwd, uemail=uemail, uphone=phone)
            return redirect(login_views)
        else:
            render(request, 'register.html', {'errmsg': '信息不完整'})


def check_phone(request):
    if 'phone' in request.POST:
        phone = request.POST['phone']
    user = Users.objects.filter(uphone=phone)
    if not user:
        return HttpResponse("ok")
    else:
        return HttpResponse("error")


def check_email(request):
    if 'email' in request.POST:
        email = request.POST['email']
    user = Users.objects.filter(uemail=email)
    if not user:
        return HttpResponse("ok")
    else:
        return HttpResponse("error")


def check_name(request):
    if 'name' in request.POST:
        name = request.POST['name']
    user = Users.objects.filter(uname=name)
    if not user:
        return HttpResponse("ok")
    else:
        return HttpResponse("error")


def index_views(request):
    return render(request, 'index.html')
