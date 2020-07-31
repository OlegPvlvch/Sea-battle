from django.urls import path
from . import views

urlpatterns = [
    path('users/create/', views.UserCreateView.as_view(), name='user_create'),
    path('users/login/', views.LoginView.as_view(), name='login'),
    path('users/logout/', views.LogoutView.as_view(), name='logout'),
]