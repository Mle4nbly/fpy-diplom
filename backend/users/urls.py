from django.urls import path
from .views.user import RegisterView, LoginView, LogoutView, MeView
from .views.admin import UserListView, UserDetailView

urlpatterns = [
    path('', UserListView.as_view(), name='users-list'),
    path('me/', MeView.as_view(), name='me-data'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('<int:pk>/', UserDetailView.as_view(), name='user-detail')
]