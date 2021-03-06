"""Ddjango URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin

from Ddjango.ZYJson.GetJson import getJson
from Ddjango.ZYJson.GetJson import login,loginPost

urlpatterns = [
    url(r'^admin/', admin.site.urls), #http://127.0.0.1(local):8000
    url(r'^getJson/', getJson),
    url(r'^login/', login), #GET
    url(r'^loginPost/', loginPost)
]
