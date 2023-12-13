from django.shortcuts import render
from .models import JewelryDetails
# # from .forms import JewelryDetailsForm

from django.db.models import Q

def show_jewelries(request, category_pk):
    
    jewelries = JewelryDetails.objects.filter(Q(jewelry__customer_gender=1), Q(jewelry__category=category_pk))
    
    context = {
        'jewelries': jewelries,
    }
    
    return render(request, 'jewelry/jewelries.html', context)

# def show_jewelries(request, category_pk):
    
#     jewelries = JewelryDetails.objects.filter(jewelry__category=category_pk)
    
#     context = {
#         'jewelries': jewelries,
#     }
    
#     return render(request, 'jewelries/jewelries.html', context)


# def show_jewelry_details(request, jewelry_pk, category_pk):
    
#     jewelry = JewelryDetails.objects.get(Q(jewelry_pk=jewelry_pk) & Q(jewelry__category=category_pk))
    
#     context = {
#         'jewelry': jewelry
#     }
    
#     return render(request, 'jewelry/jewelry_details.html', context)


# def product_create_view(request):
#     if request.method == 'POST':
#         form = JewelryDetailsForm(request.POST)
        
#         if form.is_valid():
#             form.save()
#             # Handle form submission, data saving, etc.
#             # Redirect or perform other actions as needed
#     else:
#         form = JewelryDetailsForm()

#     jewelries = JewelryDetails.objects.all()  # Fetch all products

#     return render(request, 'jewelries/jewelries.html', {'form': form, 'jewelries': jewelries})

