from django.shortcuts import redirect, render
from django.urls import reverse_lazy

from petstagram.common.forms import CommentForm
from petstagram.pets.models import Pet
from petstagram.pets.forms import PetAddForm, PetDeleteForm, PetEditForm

from django.views import generic as views


class AddPetView(views.CreateView):
    model = Pet
    form_class = PetAddForm
    template_name = 'pets/pet-add-page.html'
    success_url = reverse_lazy('profile-details', kwargs={'pk': 1})


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


class DetailsPetView(views.DetailView):
    model = Pet
    template_name = 'pets/pet-details-page.html'
    context_object_name = 'pet'
    slug_url_kwarg = 'pet_slug'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['all_photos'] = self.object.photo_set.all()
        context['comment_form'] = CommentForm()

        return context


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


class EditPetView(views.UpdateView):
    model = Pet
    form_class = PetEditForm
    slug_url_kwarg = 'pet_slug'
    template_name = 'pets/pet-edit-page.html'

    def get_success_url(self):
        return reverse_lazy('pet-details', kwargs={
            'username': self.kwargs['username'],
            'pet_slug': self.kwargs['pet_slug'],
        })


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


class DeletePetView(views.DeleteView):
    model = Pet
    template_name = 'pets/pet-delete-page.html'
    success_url = reverse_lazy('profile-details', kwargs={'pk': 1})
    slug_url_kwarg = 'pet_slug'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['form'] = PetDeleteForm(initial=self.object.__dict__)
        
        return context
        
    
    
    

def pet_delete(request, username: str, pet_slug: str):
    pet = Pet.objects.get(slug=pet_slug)

    if request.method == 'GET':
        form = PetDeleteForm(instance=pet, initial=pet.__dict__)

    else:
        pet.delete()
        return redirect('profile-details', pk=1)

    context = {'form': form, 'pet': pet}

    return render(request, 'pets/pet-delete-page.html', context)
