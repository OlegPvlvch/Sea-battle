from django.urls import path
from . import views

urlpatterns = [
    path('users/create/', views.UserCreateView.as_view()),
    path('users/login/', views.LoginView.as_view()),
    path('users/logout/', views.LogoutView.as_view()),
    path('users/stat/', views.StatisticView.as_view()),
    path('games/', views.GameListView.as_view()),
    path('games/<int:pk>/', views.GameRetrieveView.as_view()),
    path('games/<int:pk>/join/', views.GameJoinView.as_view()),
    path('games/create/', views.GameCreateView.as_view()),
    path('games/<int:pk>/set_field/', views.UserFieldView.as_view())
]