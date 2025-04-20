from django.contrib import admin

from petstagram.common.models import Comment, Like


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('get_tagged_pets',)

    @staticmethod
    def get_tagged_pets(obj):
        return ', '.join(pet.name for pet in obj.to_photo.tagged_pets.all())


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('get_tagged_pets',)

    @staticmethod
    def get_tagged_pets(obj):
        return ', '.join(pet.name for pet in obj.to_photo.tagged_pets.all())
