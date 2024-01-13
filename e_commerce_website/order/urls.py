from django.urls import path

from e_commerce_website.order.views import CompleteOrderView, CompleteTransactionView, OrderDetails, UserOrdersView

urlpatterns = (
    path('complete-order/<int:pk>/', CompleteOrderView.as_view(), name='complete_order'),
    path('complete-transaction/<int:pk>/', CompleteTransactionView.as_view(), name='complete_transaction'),
    path('order-details/<int:pk>/', OrderDetails.as_view(), name='order_details'),
    path(
        'my-orders/',
        UserOrdersView.as_view(),
        name='my_orders'
    ),
)