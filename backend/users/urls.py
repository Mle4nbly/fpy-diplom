from django.urls import path
from .views import UserListView, RegisterView, LoginView, LogoutView, UserDetailView

urlpatterns = [
    path('', UserListView.as_view(), name='users-list'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('<int:pk>/', UserDetailView.as_view(), name='user-detail')
]