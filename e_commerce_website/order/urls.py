from django.urls import path

from e_commerce_website.order.views import CompleteOrderView, CompleteTransactionView, OrderDetails

urlpatterns = (
    path('complete_order/<int:pk>', CompleteOrderView.as_view(), name='complete_order'),
    path('complete_transaction/<int:pk>', CompleteTransactionView.as_view(), name='complete_transaction'),
    path('order/details/<int:pk>', OrderDetails.as_view(), name='order_details'),
)