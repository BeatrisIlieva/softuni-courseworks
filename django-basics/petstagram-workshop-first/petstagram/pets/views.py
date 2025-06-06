from django.shortcuts import redirect, render
from django.urls import reverse_lazy
from django.views.generic import CreateView, DetailView, UpdateView, DeleteView

from petstagram.common.forms import CommentForm
from petstagram.pets.forms import PetAddForm, PetDeleteForm, PetEditForm
from petstagram.pets.models import Pet


class PetAddPage(CreateView):
    model = Pet
    form_class = PetAddForm
    template_name = 'pets/pet-add-page.html'
    success_url = reverse_lazy('profile-details', kwargs={'pk': 1})


def pet_add_page(request):
    form = PetAddForm(request.POST or None)

    if request.method == 'POST':
        if form.is_valid():
            form.save()

            return redirect('profile-details', pk=1)

    context = {
        'form': form,
    }

    return render(request, 'pets/pet-add-page.html', context)


class PetDetailsPage(DetailView):
    model = Pet
    template_name = 'pets/pet-details-page.html'
    slug_url_kwarg = 'pet_slug'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['all_photos'] = context['pet'].photo_set.all()
        context['comment_form'] = CommentForm()
        return context


def pet_details_page(request, username: str, pet_slug: str):
    pet = Pet.objects.get(slug=pet_slug)
    all_photos = pet.photo_set.all()

    context = {
        'pet': pet,
        'all_photos': all_photos,
    }

    return render(request, 'pets/pet-details-page.html', context)


class PetEditPage(UpdateView):
    model = Pet
    template_name = 'pets/pet-edit-page.html'
    form_class = PetEditForm
    slug_url_kwarg = 'pet_slug'

    def get_success_url(self):
        return reverse_lazy(
            'pet-details',
            kwargs={
                'username': self.kwargs['username'],
                'pet_slug': self.kwargs['pet_slug'],
            }
        )


def pet_edit_page(request, username: str, pet_slug: str):
    pet = Pet.objects.get(slug=pet_slug)
    form = PetEditForm(request.POST or None, instance=pet)

    if request.method == 'POST':
        if form.is_valid:
            form.save()

            return redirect('pet-details', username, pet_slug)

    context = {
        'form': form,
        'pet': pet,
    }

    return render(request, 'pets/pet-edit-page.html', context)

class PetDeletePage(DeleteView):
    model = Pet 
    template_name = 'pets/pet-delete-page.html'
    slug_url_kwarg = 'pet_slug'
    form_class = PetDeleteForm
    success_url = reverse_lazy('profile-details', kwargs={'pk': 1})
    
    def get_initial(self):
        return self.get_object().__dict__
    
    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        
        kwargs.update({
            'data': self.get_initial(),
        })
        
        return kwargs


def pet_delete_page(request, username: str, pet_slug: str):
    pet = Pet.objects.get(slug=pet_slug)
    form = PetDeleteForm(instance=pet)
    comment_form = CommentForm()

    if request.method == 'POST':
        pet.delete()

        return redirect('profile-details', pk=1)

    context = {
        'pet': pet,
        'form': form,
        'comment_form': comment_form,
    }

    return render(request, 'pets/pet-delete-page.html', context)
