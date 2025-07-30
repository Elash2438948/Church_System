from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from django.db.models.signals import post_save, pre_save
from django.contrib.auth.models import AbstractBaseUser, \
    PermissionsMixin, BaseUserManager, Permission, GroupManager

# Create your models here.

class Role(models.Model):

    class roleTypes(models.TextChoices):
        ADMIN = "admin", "Admin"
        MODERATOR = "moderator", "Moderator"
        USER = "user", "User"

    name = models.CharField(_("name"), max_length=150, unique=True)
    role_type = models.CharField(_("role_type"), max_length=50, choices=roleTypes.choices, default=roleTypes.USER)
    description = models.TextField(_("description"), blank=True, null=True)
    permissions = models.ManyToManyField(
        Permission,
        verbose_name=_("permissions"),
        blank=True,
    )

    objects = GroupManager()

    class Meta:
        verbose_name = _("Role")
        verbose_name_plural = _("Roles")

    def __str__(self):
        return self.name

    def natural_key(self):
        return (self.name,)
    
    

class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, username, password, **extra_fields):
        if not username:
            raise ValueError('The given username must be set')
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_user(self, username, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, password, **extra_fields)
    
    def create_superuser(self, username, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self._create_user(username, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)
    is_staff = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    
    email = models.EmailField(_('email address'), blank=True, null=True)
    
    roles = models.ManyToManyField(
        Role,
        verbose_name=_("roles"),
        blank=True,
        help_text=_(
            "The roles this user has. A user will get all permissions "
            "granted to each of their roles."
        ),
        related_name="user_set",
        related_query_name="user_set",
    )

    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_("user permissions"),
        blank=True,
        help_text=_("Specific permissions for this user."),
        related_name="user_set",
        related_query_name="user_set",
    )

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    # def clean(self):
    #     from django.core.exceptions import ValidationError
    #     if self.is_client and self.client is None:
    #         raise ValidationError("Client is required for client user account")
    #     return super().clean()

    def __str__(self):
        return f"{self.username}"
    
    def get_role_permissions(self):
        if not hasattr(self, '_role_permissions'):
            self._role_permissions = set()
            for role in self.roles.all():
                self._role_permissions.update(role.permissions.all())
        return self._role_permissions
    
    def has_perm(self, perm, obj=None):
        if self.is_superuser:
            return True
        return perm in self.get_all_permissions()

    def get_all_permissions(self, obj=None):
        return {
            *self.get_role_permissions(),
            *super().get_all_permissions(obj),
        }
    

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")



class Member(models.Model):
    gender_choices_tuple = (
        ('Male', 'Male'),
        ('Female', 'Female'),
    )

    member_status_choices_tuple = (
        ('Active', 'Active'),
        ('Inactive', 'Inactive'),
        ('Distant', 'Distant'),
    )

    group_choices_tuple = [
        ('Dagadu', 'Dagadu'),
        ('Clegg', 'Clegg'),
        ('Kittoe', 'Kittoe'),
        ('Wesley', 'Wesley'),
    ]

    leadership_status_choices_tuple = [
        ('Current Officer', 'Current Officer'),
        ('Member', 'Member'),
        ('Past Officer', 'Past Officer'),
    ]

    employment_status_choices_tuple = [
        ('Yes', 'Employed'),
        ('No', 'Unemployed'),
    ]

    employed_type_choices_tuple = [
        ('Self Employed', 'Self Employed'),
        ('Employee', 'Employee'),
    ]

    relationship_status_choices_tuple = [
        ('Single', 'Single'),
        ('Married', 'Married'),
        ('Divorced', 'Divorced'),
        ('Separated', 'Separated'),
        ('Widowed', 'Widowed'),
    ]

    # Personal Information
    photo = models.ImageField(upload_to='photos/members/', null=True, blank=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    middle_name = models.CharField(max_length=255, blank=True, null=True)
    gender = models.CharField(max_length=10, choices=gender_choices_tuple)

    contact = models.CharField(max_length=15)
    email = models.EmailField()

    dob = models.DateField()
    nationality = models.CharField(max_length=100)
    hometown = models.CharField(max_length=100)
    postal_address = models.TextField(blank=True)
    languages = models.CharField(max_length=255, blank=True)

    # Membership Information

    member_status = models.CharField(max_length=10, choices=member_status_choices_tuple)
    group = models.CharField(max_length=10, choices=group_choices_tuple)
    date_of_admission = models.DateField()
    leadership_status = models.CharField(max_length=15, choices=leadership_status_choices_tuple)
    current_position = models.CharField(max_length=100, blank=True)
    position_start_date = models.DateField(null=True, blank=True)
    position_end_date = models.DateField(null=True, blank=True)

    # Employment Information
    employment_status = models.CharField(max_length=3, choices=employment_status_choices_tuple)
    employed_type = models.CharField(max_length=15, choices=employed_type_choices_tuple, blank=True)
    employer = models.CharField(max_length=255, blank=True)
    current_position_employment = models.CharField(max_length=100, blank=True)
    occupation = models.CharField(max_length=100, blank=True)

    # Unemployment Information
    unemployment_details = models.CharField(max_length=100, blank=True)
    education_level = models.CharField(max_length=50, blank=True)
    institution = models.CharField(max_length=255, blank=True)
    completion_year = models.CharField(max_length=4, blank=True)
    profession = models.CharField(max_length=100, blank=True)
    vocation = models.CharField(max_length=100, blank=True)

    # Relationship Information
    relationship_status = models.CharField(max_length=10, choices=relationship_status_choices_tuple)
    spouse_name = models.CharField(max_length=255, blank=True)
    spouse_contact = models.CharField(max_length=15, blank=True)
    number_of_children = models.PositiveIntegerField(default=0, blank=True)
    closest_relative_contact = models.CharField(max_length=15, blank=True)

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    family = models.ForeignKey('Branch', related_name='member_family', on_delete=models.SET_NULL, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name} {self.middle_name}"

    class Meta:
        verbose_name = 'Member'
        verbose_name_plural = 'Members'

    def __str__(self):
        return self.full_name
    


class Event(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    event_date = models.DateField()
    event_time = models.TimeField()
    location = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Event'
        verbose_name_plural = 'Events'

    def __str__(self):
        return f"{self.name} | {self.event_date} | {self.event_time}"


class Delegates(models.Model):
    member = models.ForeignKey(Member, related_name='delegates', on_delete=models.CASCADE)
    event = models.ForeignKey(Event, related_name='delegates_events', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Delegate'
        verbose_name_plural = 'Delegates'

    def __str__(self):
        return f"{self.member.full_name} | {self.event.name}"

class Diocese(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Diocese'
        verbose_name_plural = 'Dioceses'

    def __str__(self):
        return f"{self.name} | {self.created_at}"

class Circuit(models.Model):
    name = models.CharField(max_length=255)
    diocese = models.ForeignKey(Diocese, related_name='circuits', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Circuit'
        verbose_name_plural = 'Circuits'

    def __str__(self):
        return f"{self.name} | {self.diocese.name} | {self.created_at}"

class Branch(models.Model):
    name = models.CharField(max_length=255)
    circuit = models.ForeignKey(Circuit, related_name='branches', on_delete=models.CASCADE)
    diocese = models.ForeignKey(Diocese, related_name='branch_diocese', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Branch'
        verbose_name_plural = 'Branches'

    def __str__(self):
        return f"{self.name} | {self.circuit.name} | {self.created_at}"

# class Family(models.Model):
#     name = models.CharField(max_length=255)
#     branch = models.ForeignKey(Branch, related_name="family_branches", on_delete=models.CASCADE)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def __str__(self):
#         return f"{self.name} | {self.branch.name} | {self.created_at}"


class Fellowship(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Fellowship'
        verbose_name_plural = 'Fellowships'

    def __str__(self):
        return f"{self.name} | {self.created_at}"


class Donations(models.Model):
    member = models.ForeignKey(Member, related_name="member_donations", on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    donation_date = models.DateField()
    fund  = models.CharField(max_length=255)
    payment_method = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Donation'
        verbose_name_plural = 'Donations'

    def __str__(self):
        return f"{self.member.full_name} | {self.donation_date} | {self.payment_method} | {self.created_at}"



class PrayerRequest(models.Model):
    status_choices_tuple = (
        ('Received', 'Received'),
        ('Read', 'Read'),
    )
    member = models.ForeignKey(Member, related_name="member_prayers", on_delete=models.CASCADE)
    message = models.TextField()
    request_date = models.DateField()
    status = models.CharField(max_length=10, choices=status_choices_tuple)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Prayer Request'
        verbose_name_plural = 'Prayer Requests'

    def __str__(self):
        return f"{self.member.full_name} | {self.request_date} | {self.created_at}"


class VolunteerAssignments(models.Model):
    fellowship = models.ForeignKey(Fellowship, related_name="volunteer_assignments", on_delete=models.CASCADE)
    member = models.ForeignKey(Member, related_name="volunteer_members", on_delete=models.CASCADE)
    role = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Volunteer Assignment'
        verbose_name_plural = 'Volunteer Assignments'

    def __str__(self):
        return f"{self.member.full_name} | {self.fellowship.name} | {self.created_at}"


class MinisterialVisits(models.Model):
    member = models.ForeignKey(Member, related_name="ministerial_visits", on_delete=models.CASCADE)
    visit_date = models.DateField()
    notes = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Ministerial Visit'
        verbose_name_plural = 'Ministerial Visits'

    def __str__(self):
        return f"{self.member.full_name} | {self.visit_date} | {self.created_at}"


class Communications(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    sender = models.ForeignKey(Member, related_name="empoyee_sender", on_delete=models.CASCADE)
    receipient = models.ForeignKey(Member, related_name="employee_recipients", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Communication'
        verbose_name_plural = 'Communications'

    def __str__(self):
        return f"{self.sender.full_name} - {self.receipient.full_name} | {self.title} | {self.created_at}"


class FinancialTransactions(models.Model):
    member = models.ForeignKey(Member, related_name="member_transactions", on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_date = models.DateField()
    type = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Financial Transaction'
        verbose_name_plural = 'Financial Transactions'

    def __str__(self):
        return f"{self.member.full_name} | {self.transaction_date} | {self.type} | {self.created_at}"
    

class Notifications(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Notification'
        verbose_name_plural = 'Notifications'

    def __str__(self):
        return f"{self.title} | {self.created_at}"