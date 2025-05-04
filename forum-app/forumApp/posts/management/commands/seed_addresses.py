from django.core.management.base import BaseCommand
from forumApp.posts.models import Address
from faker import Faker
from itertools import cycle

class Command(BaseCommand):
    help = 'Seed the database with fake address data'

    def add_arguments(self, parser):
        parser.add_argument('total', type=int, help='Number of addresses to create')

    def handle(self, *args, **kwargs):
        european_locales = ['en_GB', 'de_DE', 'fr_FR', 'it_IT', 'es_ES', 'nl_NL', 'pl_PL', 'sv_SE']
        locale_cycle = cycle(european_locales)
        
        total = kwargs['total']
        fake = Faker()
        
        
        for i in range(total):
            locale = next(locale_cycle)
            fake = Faker(locale)

            Address.objects.create(
                country=fake.current_country(),
                city=fake.city(),
                postal_code=fake.postcode(),
                street_address=fake.street_address()
            )

        # for _ in range(total):
        #     Address.objects.create(
        #         country=fake.country(),
        #         city=fake.city(),
        #         postal_code=fake.postcode(),
        #         street_address=fake.street_address()
        #     )

        self.stdout.write(self.style.SUCCESS(f'Successfully created {total} addresses'))
