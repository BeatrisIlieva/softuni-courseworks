# Generated by Django 5.2 on 2025-04-17 17:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_comment_image_alter_comment_create_at'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='image',
        ),
        migrations.AddField(
            model_name='post',
            name='image',
            field=models.ImageField(default='kk', upload_to='post_images/'),
            preserve_default=False,
        ),
    ]
