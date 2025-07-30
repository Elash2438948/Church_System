from django.contrib import admin
from import_export import resources
from django.contrib.auth.admin import UserAdmin
from import_export.admin import ImportExportModelAdmin

from django.contrib.auth.models import Group
from .models import Member, PrayerRequest, VolunteerAssignments, MinisterialVisits, \
    Delegates, Communications, Fellowship, Branch, Circuit, Diocese, Event, Role, User

from django.utils.translation import gettext_lazy as _


class UserResource(resources.ModelResource):
    class Meta:
        fields = '__all__'
        model = User

class RoleResource(resources.ModelResource):
    class Meta:
        fields = '__all__'
        model = Role

# Register your models here.
class MemberResource(resources.ModelResource):
    class Meta:
        fields = '__all__'
        model = Member

class PrayerRequestResource(resources.ModelResource):
    class Meta:
        fields = '__all__'
        model = PrayerRequest

class VolunteerAssignmentsResource(resources.ModelResource):
    class Meta:
        fields = '__all__'
        model = VolunteerAssignments

class MinisterialVisitsResource(resources.ModelResource):
    class Meta:
        fields = '__all__'
        model = MinisterialVisits

class DelegatesResource(resources.ModelResource):
    class Meta:
        fields = '__all__'
        model = Delegates

class CommunicationsResource(resources.ModelResource):
    class Meta:
        fields = '__all__'
        model = Communications


class FellowshipResource(resources.ModelResource):
    class Meta:
        fields = '__all__'
        model = Fellowship

class BranchResource(resources.ModelResource):
    class Meta:
        fields = '__all__'
        model = Branch

class CircuitResource(resources.ModelResource):
    class Meta:
        fields = '__all__'
        model = Circuit

class DioceseResource(resources.ModelResource):
    class Meta:
        fields = '__all__'
        model = Diocese

class EventResource(resources.ModelResource):
    class Meta:
        fields = '__all__'
        model = Event


admin.site.unregister(Group)

@admin.register(Role)
class roleModelAdmin(ImportExportModelAdmin):
    resource_class = RoleResource
    list_display = ("id", "name", 'role_type', "description",)
    search_fields = ("name", 'role_type', "description",)
    filter_horizontal = ("permissions",)

@admin.register(User)
class userModelAdmin(UserAdmin, ImportExportModelAdmin):
    resource_class = UserResource
    list_display = ("id", "username", "is_staff", "is_active", "is_superuser", "display_roles", "last_login", )
    search_fields = ("username", "is_staff", "is_active", "is_superuser", "display_roles", "last_login", )
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (_("Personal info"), {"fields": ("email", )}),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "roles",
                    "user_permissions",
                ),
            },
        ),
        (_("Important dates"), {"fields": ("last_login",)}),
    )
    filter_horizontal = ('roles', 'user_permissions', )

    def display_roles(self, obj):
        return ", ".join([role.name for role in obj.roles.all()])


@admin.register(Member)
class MemberAdmin(ImportExportModelAdmin):
    resources = MemberResource
    list_display = ['first_name', 'last_name', 'email', 'created_at', 'updated_at']

@admin.register(PrayerRequest)
class PrayerRequestAdmin(ImportExportModelAdmin):
    resources = PrayerRequestResource
    list_display = ['member', 'message', 'request_date', 'status', 'created_at', 'updated_at']


@admin.register(VolunteerAssignments)
class VolunteerAssignmentsAdmin(ImportExportModelAdmin):
    resources = VolunteerAssignmentsResource
    list_display = ['fellowship', 'member', 'role', 'start_date', 'end_date', 'created_at', 'updated_at']

@admin.register(MinisterialVisits)
class MinisterialVisitsAdmin(ImportExportModelAdmin):
    resources = MinisterialVisitsResource
    list_display = ['member', 'visit_date', 'notes', 'created_at', 'updated_at']

@admin.register(Delegates)
class DelegatesAdmin(ImportExportModelAdmin):
    resources = DelegatesResource
    list_display = ['member', 'event', 'created_at', 'updated_at']

@admin.register(Communications)
class CommunicationsAdmin(ImportExportModelAdmin):
    resources = CommunicationsResource
    list_display = ['sender', 'receipient', 'content', 'title', 'created_at', 'updated_at']



@admin.register(Fellowship)
class FellowshipAdmin(ImportExportModelAdmin):
    resources = FellowshipResource
    list_display = ['name', 'description', 'created_at', 'updated_at']

@admin.register(Branch)
class BranchAdmin(ImportExportModelAdmin):
    resources = BranchResource
    list_display = ['name', 'circuit', 'diocese', 'created_at', 'updated_at']

@admin.register(Circuit)
class CircuitAdmin(ImportExportModelAdmin):
    resources = CircuitResource
    list_display = ['name', 'diocese', 'created_at', 'updated_at']

@admin.register(Diocese)
class DioceseAdmin(ImportExportModelAdmin):
    resources = DioceseResource
    list_display = ['name', 'created_at', 'updated_at']

@admin.register(Event)
class EventAdmin(ImportExportModelAdmin):
    resources = EventResource
    list_display = ['name', 'description', 'event_date', 'event_time', 'location', 'created_at', 'updated_at']