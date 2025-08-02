from rest_framework.authtoken.models import Token
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404

from core.models import Member, Event, Delegates, Diocese, \
    Branch, Circuit, Fellowship, Donations, Communications, \
    FinancialTransactions, Notifications, PrayerRequest, VolunteerAssignments, \
    MinisterialVisits

from .serializer import GetMemberSerializer, GetEventSerializer, GetDelegatesSerializer, \
    GetDioceseSerializer, GetBranchSerializer, GetCircuitSerializer, GetFellowshipSerializer, \
    GetCommunicationsSerializer, GetFinancialTransactionsSerializer, GetNotificationsSerializer, \
    GetDonationsSerializer, GetPrayerRequestSerializer, GetVolunteerAssignmentsSerializer, \
    GetMinisterialVisitsSerializer

from drf_yasg.utils import swagger_auto_schema

# class LoginView(APIView):

#     @swagger_auto_schema(
#         request_body=LoginSerializer,
#         responses={
#             200: 'Success',
#             400: 'Bad Request',
#             401: 'Unauthorized'
#         }
#     )
#     def post(self, request):
#         serializer = LoginSerializer(data=request.data)
#         if serializer.is_valid():
#             username = serializer.validated_data['username']
#             password = serializer.validated_data['password']
#             user = authenticate(request, username=username, password=password)
            
#             if user is not None:
#                 token, _ = Token.objects.get_or_create(user=user)
#                 return Response({'token': token.key}, status=status.HTTP_200_OK)
#             else:
#                 return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class LogoutView(APIView):
#     @swagger_auto_schema(
#         responses={
#             200: 'Success'
#         }
#     )
#     def post(self, request):
#         request.user.auth_token.delete()
#         return Response(status=status.HTTP_200_OK)

class MemberListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request):
        members = Member.objects.all()
        serializer = GetMemberSerializer(members, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

    @swagger_auto_schema(
        request_body=GetMemberSerializer,
        responses={
            201: 'Success',
            400: 'Bad Request'
        }
    )
    def post(self, request):
        serializer = GetMemberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MemberDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(Member, pk=pk)

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request, pk):
        member = self.get_object(pk)
        serializer = GetMemberSerializer(member)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetMemberSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }
    )
    def put(self, request, pk):
        
        member = self.get_object(pk)
        serializer = GetMemberSerializer(member, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        request_body=GetMemberSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }
    )
    def patch(self, request, pk):
        member = self.get_object(pk)
        serializer = GetMemberSerializer(member, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        responses={
            204: 'Success',
            400: 'Bad Request'
        }
    )
    def delete(self, request, pk):
        member = self.get_object(pk)
        member.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class EventListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request):
        events = Event.objects.all()
        serializer = GetEventSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetEventSerializer,
        responses={
            201: 'Success',
            400: 'Bad Request'
        }
    )
    def post(self, request):
        serializer = GetEventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(Event, pk=pk)

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request, pk):
        event = self.get_object(pk)
        serializer = GetEventSerializer(event)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetEventSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }
    )
    def put(self, request, pk):
        
        event = self.get_object(pk)
        serializer = GetEventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        request_body=GetEventSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }
    )
    def patch(self, request, pk):
        event = self.get_object(pk)
        serializer = GetEventSerializer(event, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        responses={
            204: 'Success',
            400: 'Bad Request'
        }
    )
    def delete(self, request, pk):
        event = self.get_object(pk)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DelegateListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request):
        delegates = Delegates.objects.all()
        serializer = GetDelegatesSerializer(delegates, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetDelegatesSerializer,
        responses={
            201: 'Success',
            400: 'Bad Request'
        }
    )
    def post(self, request):
        serializer = GetDelegatesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DelegateDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(Delegates, pk=pk)

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request, pk):
        delegate = self.get_object(pk)
        serializer = GetDelegatesSerializer(delegate)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetDelegatesSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }
    )
    def put(self, request, pk):
        
        delegate = self.get_object(pk)
        serializer = GetDelegatesSerializer(delegate, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        request_body=GetDelegatesSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }
    )
    def patch(self, request, pk):
        delegate = self.get_object(pk)
        serializer = GetDelegatesSerializer(delegate, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        responses={
            204: 'Success',
            400: 'Bad Request'
        }
    )
    def delete(self, request, pk):
        delegate = self.get_object(pk)
        delegate.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DioceseListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request):
        dioceses = Diocese.objects.all()
        serializer = GetDioceseSerializer(dioceses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetDioceseSerializer,
        responses={
            201: 'Success',
            400: 'Bad Request'
        }
    )
    def post(self, request):
        serializer = GetDioceseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DioceseDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(Diocese, pk=pk)

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request, pk):
        diocese = self.get_object(pk)
        serializer = GetDioceseSerializer(diocese)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetDioceseSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }
    )
    def put(self, request, pk):
        diocese = self.get_object(pk)
        serializer = GetDioceseSerializer(diocese, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        request_body=GetDioceseSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }
    )
    def patch(self, request, pk):
        diocese = self.get_object(pk)
        serializer = GetDioceseSerializer(diocese, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        responses={
            204: 'Success',
            400: 'Bad Request'
        }
    )
    def delete(self, request, pk):
        diocese = self.get_object(pk)
        diocese.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CircuitListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request):
        circuits = Circuit.objects.all()
        serializer = GetCircuitSerializer(circuits, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetCircuitSerializer,
        responses={
            201: 'Success',
            400: 'Bad Request'
        }
    )
    def post(self, request):
        serializer = GetCircuitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CircuitDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(Circuit, pk=pk)

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request, pk):
        circuit = self.get_object(pk)
        serializer = GetCircuitSerializer(circuit)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetCircuitSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }
    )
    def put(self, request, pk):
        circuit = self.get_object(pk)
        serializer = GetCircuitSerializer(circuit, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        request_body=GetCircuitSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }
    )
    def patch(self, request, pk):
        circuit = self.get_object(pk)
        serializer = GetCircuitSerializer(circuit, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        responses={
            204: 'Success',
            400: 'Bad Request'
        }
    )
    def delete(self, request, pk):
        circuit = self.get_object(pk)
        circuit.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BranchListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request):
        branches = Branch.objects.all()
        serializer = GetBranchSerializer(branches, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetBranchSerializer,
        responses={
            201: 'Success',
            400: 'Bad Request'
        }
    )
    def post(self, request):
        serializer = GetBranchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BranchDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(Branch, pk=pk)

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request, pk):
        branch = self.get_object(pk)
        serializer = GetBranchSerializer(branch)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetBranchSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }
    )
    def put(self, request, pk):
        branch = self.get_object(pk)
        serializer = GetBranchSerializer(branch, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        request_body=GetBranchSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }
    )
    def patch(self, request, pk):
        branch = self.get_object(pk)
        serializer = GetBranchSerializer(branch, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        responses={
            204: 'Success',
            400: 'Bad Request'
        }
    )
    def delete(self, request, pk):
        branch = self.get_object(pk)
        branch.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class FellowshipListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request):
        followships = Fellowship.objects.all()
        serializer = GetFellowshipSerializer(followships, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetFellowshipSerializer,
        responses={
            201: 'Success',
            400: 'Bad Request'
        }
    )
    def post(self, request):
        serializer = GetFellowshipSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FellowshipDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(Fellowship, pk=pk)

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request, pk):
        fellowship = self.get_object(pk)
        serializer = GetFellowshipSerializer(fellowship)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetFellowshipSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }   
    )
    def put(self, request, pk):
        fellowship = self.get_object(pk)
        serializer = GetFellowshipSerializer(fellowship, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        request_body=GetFellowshipSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }
    )
    def patch(self, request, pk):
        fellowship = self.get_object(pk)
        serializer = GetFellowshipSerializer(fellowship, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(
        responses={
            204: 'Success',
            400: 'Bad Request'
        }
    )
    def delete(self, request, pk):
        fellowship = self.get_object(pk)
        fellowship.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DonationListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request):
        donations = Donations.objects.all()
        serializer = GetDonationsSerializer(donations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetDonationsSerializer,
        responses={
            201: 'Success',
            400: 'Bad Request'
        }
    )
    def post(self, request):
        serializer = GetDonationsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class DonationDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(Donations, pk=pk)

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request, pk):
        donation = self.get_object(pk)
        serializer = GetDonationsSerializer(donation)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetDonationsSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }   
    )
    def put(self, request, pk):
        donation = self.get_object(pk)
        serializer = GetDonationsSerializer(donation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        request_body=GetDonationsSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }
    )
    def patch(self, request, pk):
        donation = self.get_object(pk)
        serializer = GetDonationsSerializer(donation, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(
        responses={
            204: 'Success',
            400: 'Bad Request'
        }
    )
    def delete(self, request, pk):
        donation = self.get_object(pk)
        donation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PrayerRequestListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request):
        prayer_requests = PrayerRequest.objects.all()
        serializer = GetPrayerRequestSerializer(prayer_requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetPrayerRequestSerializer,
        responses={
            201: 'Success',
            400: 'Bad Request'
        }
    )
    def post(self, request):
        serializer = GetPrayerRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PrayerRequestDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(PrayerRequest, pk=pk)

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request, pk):
        prayer_request = self.get_object(pk)
        serializer = GetPrayerRequestSerializer(prayer_request)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetPrayerRequestSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }   
    )
    def put(self, request, pk):
        prayer_request = self.get_object(pk)
        serializer = GetPrayerRequestSerializer(prayer_request, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        request_body=GetPrayerRequestSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }
    )
    def patch(self, request, pk):
        prayer_request = self.get_object(pk)
        serializer = GetPrayerRequestSerializer(prayer_request, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(
        responses={
            204: 'Success',
            400: 'Bad Request'
        }
    )
    def delete(self, request, pk):
        prayer_request = self.get_object(pk)
        prayer_request.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class VolunteerAssignmentsListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request):
        volunteer_assignments = VolunteerAssignments.objects.all()
        serializer = GetVolunteerAssignmentsSerializer(volunteer_assignments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetVolunteerAssignmentsSerializer,
        responses={
            201: 'Success',
            400: 'Bad Request'
        }
    )
    def post(self, request):
        serializer = GetVolunteerAssignmentsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VolunteerAssignmentsDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(VolunteerAssignments, pk=pk)

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request, pk):
        volunteer_assignment = self.get_object(pk)
        serializer = GetVolunteerAssignmentsSerializer(volunteer_assignment)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetVolunteerAssignmentsSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }   
    )
    def put(self, request, pk):
        volunteer_assignment = self.get_object(pk)
        serializer = GetVolunteerAssignmentsSerializer(volunteer_assignment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        request_body=GetVolunteerAssignmentsSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }
    )
    def patch(self, request, pk):
        volunteer_assignment = self.get_object(pk)
        serializer = GetVolunteerAssignmentsSerializer(volunteer_assignment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(
        responses={
            204: 'Success',
            400: 'Bad Request'
        }
    )
    def delete(self, request, pk):
        volunteer_assignment = self.get_object(pk)
        volunteer_assignment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 


class MinisterialVisitsListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request):
        ministerial_visits = MinisterialVisits.objects.all()
        serializer = GetMinisterialVisitsSerializer(ministerial_visits, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetMinisterialVisitsSerializer,
        responses={
            201: 'Success',
            400: 'Bad Request'
        }
    )
    def post(self, request):
        serializer = GetMinisterialVisitsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MinisterialVisitsDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(MinisterialVisits, pk=pk)

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request, pk):
        ministerial_visit = self.get_object(pk)
        serializer = GetMinisterialVisitsSerializer(ministerial_visit)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetMinisterialVisitsSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }   
    )
    def put(self, request, pk):
        ministerial_visit = self.get_object(pk)
        serializer = GetMinisterialVisitsSerializer(ministerial_visit, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        request_body=GetMinisterialVisitsSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }
    )
    def patch(self, request, pk):
        ministerial_visit = self.get_object(pk)
        serializer = GetMinisterialVisitsSerializer(ministerial_visit, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(
        responses={
            204: 'Success',
            400: 'Bad Request'
        }
    )
    def delete(self, request, pk):
        ministerial_visit = self.get_object(pk)
        ministerial_visit.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CommunicationListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request):
        communications = Communications.objects.all()
        serializer = GetCommunicationsSerializer(communications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetCommunicationsSerializer,
        responses={
            201: 'Success',
            400: 'Bad Request'
        }
    )
    def post(self, request):
        serializer = GetCommunicationsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommunicationDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(Communications, pk=pk)

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request, pk):
        communication = self.get_object(pk)
        serializer = GetCommunicationsSerializer(communication)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetCommunicationsSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }   
    )
    def put(self, request, pk):
        communication = self.get_object(pk)
        serializer = GetCommunicationsSerializer(communication, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        request_body=GetCommunicationsSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }   
    )
    def patch(self, request, pk):
        communication = self.get_object(pk)
        serializer = GetCommunicationsSerializer(communication, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(
        responses={
            204: 'Success',
            400: 'Bad Request'
        }
    )
    def delete(self, request, pk):
        communication = self.get_object(pk)
        communication.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class FinancialTransactionsListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request):
        financial_transactions = FinancialTransactions.objects.all()
        serializer = GetFinancialTransactionsSerializer(financial_transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetFinancialTransactionsSerializer,
        responses={
            201: 'Success',
            400: 'Bad Request'
        }
    )
    def post(self, request):
        serializer = GetFinancialTransactionsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FinancialTransactionsDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(FinancialTransactions, pk=pk)

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request, pk):
        financial_transaction = self.get_object(pk)
        serializer = GetFinancialTransactionsSerializer(financial_transaction)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetFinancialTransactionsSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }   
    )
    def put(self, request, pk):
        financial_transaction = self.get_object(pk)
        serializer = GetFinancialTransactionsSerializer(financial_transaction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        request_body=GetFinancialTransactionsSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }   
    )
    def patch(self, request, pk):
        financial_transaction = self.get_object(pk)
        serializer = GetFinancialTransactionsSerializer(financial_transaction, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(
        responses={
            204: 'Success',
            400: 'Bad Request'
        }
    )
    def delete(self, request, pk):
        financial_transaction = self.get_object(pk)
        financial_transaction.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    


class NotificationsListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request):
        notifications = Notifications.objects.all()
        serializer = GetNotificationsSerializer(notifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetNotificationsSerializer,
        responses={
            201: 'Success',
            400: 'Bad Request'
        }
    )
    def post(self, request):
        serializer = GetNotificationsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    

class NotificationsDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(Notifications, pk=pk)

    @swagger_auto_schema(
        responses={
            200: 'Success',
        }
    )
    def get(self, request, pk):
        notification = self.get_object(pk)
        serializer = GetNotificationsSerializer(notification)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @swagger_auto_schema(
        request_body=GetNotificationsSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }   
    )
    def put(self, request, pk):
        notification = self.get_object(pk)
        serializer = GetNotificationsSerializer(notification, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        request_body=GetNotificationsSerializer,
        responses={
            200: 'Success',
            400: 'Bad Request'
        }   
    )
    def patch(self, request, pk):
        notification = self.get_object(pk)
        serializer = GetNotificationsSerializer(notification, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @swagger_auto_schema(
        responses={
            204: 'Success',
            400: 'Bad Request'
        }
    )
    def delete(self, request, pk):
        notification = self.get_object(pk)
        notification.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

