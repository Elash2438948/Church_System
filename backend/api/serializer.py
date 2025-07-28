from core.models import Member, PrayerRequest, Event, Delegates, Diocese, \
    Circuit, Branch, Fellowship, Donations, VolunteerAssignments, MinisterialVisits, \
    Communications, FinancialTransactions, Notifications
from rest_framework import serializers



class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class GetMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

class GetPrayerRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrayerRequest
        fields = '__all__'

class GetEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class GetDelegatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Delegates
        fields = '__all__'

class GetDioceseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diocese
        fields = '__all__'

class GetCircuitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Circuit
        fields = '__all__'

class GetBranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = '__all__'

class GetFellowshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fellowship
        fields = '__all__'

class GetDonationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donations
        fields = '__all__'

class GetVolunteerAssignmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerAssignments
        fields = '__all__'

class GetMinisterialVisitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MinisterialVisits
        fields = '__all__'

class GetCommunicationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Communications
        fields = '__all__'

class GetFinancialTransactionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinancialTransactions
        fields = '__all__'

class GetNotificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notifications
        fields = '__all__'