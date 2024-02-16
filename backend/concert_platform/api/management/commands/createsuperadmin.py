import sys
from django.contrib.auth.models import User
from api.models import ExtendedUser, UserRole
from django.core.management.base import BaseCommand, CommandError, CommandParser

class Command(BaseCommand):
    help = "Creates superuser and corresponding profile"

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument('--email', required=True)
        parser.add_argument('--username', required=True)
        parser.add_argument('--password', required=True)
    
    def handle(self, *args, **options):
        user = User.objects.filter(username=options['username']).first()
        if user is None:
            user = User.objects.create_superuser(
                username=options['username'],
                email=options['email'],
                password=options['password']
            )
        profile = ExtendedUser.objects.filter(id=user.id).first()
        if profile is None:
            ExtendedUser.objects.create(
                id=user.id,
                name=options['username'],
                role=UserRole.ADMINISTRATOR.value,
                avatar_url=None
            )
        sys.stdout.write('Successfully created superadmin user\n')