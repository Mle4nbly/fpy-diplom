from django.urls import path
from .views import FilesListCreateView, FileDetailView, FileDownloadView, FilesListByUserView

urlpatterns = [
    path('', FilesListCreateView.as_view(), name='file-list'),
    path('<int:pk>/', FileDetailView.as_view(), name='file-detail'),
    path('<int:pk>/download/', FileDownloadView.as_view(), name='file-download'),
    path('by-user/', FilesListByUserView.as_view(), name='file-list-by-user')
]