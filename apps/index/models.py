from django.db import models


# Create your models here.

class Users(models.Model):
    uname = models.CharField(max_length=20, verbose_name='用户名')
    upass = models.CharField(max_length=50, verbose_name='密码')
    uemail = models.EmailField(verbose_name='邮箱',null=True)
    uphone = models.CharField(max_length=20, verbose_name='手机号', null=True)
    isActive = models.BooleanField(default=True, verbose_name='启用状态')

    def __str__(self):
        return self.uname

    class Meta:
        db_table = 'index_users'
        verbose_name = "用户"
        verbose_name_plural = verbose_name
