from django.urls import path
from .views.user_views import FilesListCreateView, FileDetailView, FileDownloadView, ShareFileDownloadView, ShareFileDetailView
from .views.admin_views import AdminFilesListCreateView, AdminFileDetailView, AdminFileDownloadView

urlpatterns = [
    path('s/<str:token>/', ShareFileDetailView.as_view(), name='share-file-detail'),
    path('s/<str:token>/download/', ShareFileDownloadView.as_view(), name='share-file-download'),

    path('files/', FilesListCreateView.as_view(), name='file-list'),
    path('files/<int:pk>/', FileDetailView.as_view(), name='file-detail'),
    path('files/<int:pk>/download/', FileDownloadView.as_view(), name='file-download'),

    path('files/<str:username>/', AdminFilesListCreateView.as_view(), name='file-list-by-user'),
    path('files/<str:username>/<int:pk>/', AdminFileDetailView.as_view(), name='file-detail-by-user'),
    path('files/<str:username>/<int:pk>/download/', AdminFileDownloadView.as_view(), name='file-download-by-user')
]   