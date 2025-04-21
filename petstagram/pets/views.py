from django.shortcuts import redirect, render

from petstagram.common.forms import CommentForm
from petstagram.pets.models import Pet
from petstagram.pets.forms import PetAddForm, PetDeleteForm, PetEditForm


def add_pet(request):

    if request.method == 'GET':
        form = PetAddForm()

    else:
        form = PetAddForm(request.POST)

        if form.is_valid():
            form.save()

            return redirect('profile-details', pk=1)

    context = {
        'form': form,
    }

    return render(request, 'pets/pet-add-page.html', context)


def pet_details(request, username: str, pet_slug: str):
    pet = Pet.objects.get(slug=pet_slug)
    all_photos = pet.photo_set.all()
    comment_form = CommentForm()

    context = {
        'pet': pet,
        'all_photos': all_photos,
        'comment_form': comment_form,
    }

    return render(request, 'pets/pet-details-page.html', context)


def pet_edit(request, username: str, pet_slug: str):
    pet = Pet.objects.get(slug=pet_slug)
            
    if request.method == "GET":
        form = PetEditForm(instance=pet, initial=pet.__dict__)

        
    else:
        form = PetEditForm(request.POST, instance=pet)
        
        if form.is_valid():
            form.save()
            
            return redirect('pet-details', username, pet_slug)
            
    context = {
        'form': form,
        'pet': pet,
    }
    
    return render(request, 'pets/pet-edit-page.html', context)


def pet_delete(request, username: str, pet_slug: str):
    pet = Pet.objects.get(slug=pet_slug)
    
    if request.method == 'GET':
        form = PetDeleteForm(instance=pet, initial=pet.__dict__)
        
    else:
        pet.delete()
        return redirect('profile-details', pk=1)
    
    context = {'form': form, 'pet': pet}
    
    return render(request, 'pets/pet-delete-page.html', context)
