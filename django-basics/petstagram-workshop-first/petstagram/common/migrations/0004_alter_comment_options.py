# Generated by Django 5.2 on 2025-04-18 09:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0003_alter_comment_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={'ordering': ['-date_time_of_publication']},
        ),
    ]
