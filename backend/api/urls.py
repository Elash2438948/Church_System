from django.urls import path, include
from . import views



urlpatterns = [
    path('v1/auth/', include('dj_rest_auth.urls')),    
    
    path('v1/members/', views.MemberListView.as_view(), name="member-list-create"),
    path('v1/members/<int:pk>/', views.MemberDetailView.as_view(), name="member-detail"),

    path('v1/events/', views.EventListView.as_view(), name="event-list-create"),
    path('v1/events/<int:pk>/', views.EventDetailView.as_view(), name="event-detail"),

    path('v1/delegates/', views.DelegateListView.as_view(), name="delegate-list-create"),
    path('v1/delegates/<int:pk>/', views.DelegateDetailView.as_view(), name="delegate-detail"),

    path('v1/dioceses/', views.DioceseListView.as_view(), name="diocese-list-create"),
    path('v1/dioceses/<int:pk>/', views.DioceseDetailView.as_view(), name="diocese-detail"),

    path('v1/circuits/', views.CircuitListView.as_view(), name="circuit-list-create"),
    path('v1/circuits/<int:pk>/', views.CircuitDetailView.as_view(), name="circuit-detail"),

    path('v1/branches/', views.BranchListView.as_view(), name="branch-list-create"),
    path('v1/branches/<int:pk>/', views.BranchDetailView.as_view(), name="branch-detail"),

    path('v1/fellowships/', views.FellowshipListView.as_view(), name="fellowship-list-create"),
    path('v1/fellowships/<int:pk>/', views.FellowshipDetailView.as_view(), name="fellowship-detail"),

    path('v1/communications/', views.CommunicationListView.as_view(), name="communication-list-create"),
    path('v1/communications/<int:pk>/', views.CommunicationDetailView.as_view(), name="communication-detail"),

    path('v1/donations/', views.DonationListView.as_view(), name="donation-list-create"),
    path('v1/donations/<int:pk>/', views.DonationDetailView.as_view(), name="donation-detail"),

    path('v1/prayer-requests/', views.PrayerRequestListView.as_view(), name="prayer-request-list-create"),
    path('v1/prayer-requests/<int:pk>/', views.PrayerRequestDetailView.as_view(), name="prayer-request-detail"),

    path('v1/volunteer-assignments/', views.VolunteerAssignmentsListView.as_view(), name="volunteer-request-list-create"),
    path('v1/volunteer-assignments/<int:pk>/', views.VolunteerAssignmentsDetailView.as_view(), name="volunteer-request-detail"),

    path('v1/ministerial-visits/', views.MinisterialVisitsListView.as_view(), name="ministerial-visit-list-create"),
    path('v1/ministerial-visits/<int:pk>/', views.MinisterialVisitsDetailView.as_view(), name="ministerial-visit-detail"),

    path('v1/communications/', views.CommunicationListView.as_view(), name="communication-list-create"),
    path('v1/communications/<int:pk>/', views.CommunicationDetailView.as_view(), name="communication-detail"),

    path('v1/financial-transactions/', views.FinancialTransactionsListView.as_view(), name="financial-transaction-list-create"),
    path('v1/financial-transactions/<int:pk>/', views.FinancialTransactionsDetailView.as_view(), name="financial-transaction-detail"),

    path('v1/notifications/', views.NotificationsListView.as_view(), name="notification-list-create"),
    path('v1/notifications/<int:pk>/', views.NotificationsDetailView.as_view(), name="notification-detail"),
]