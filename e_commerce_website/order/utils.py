from e_commerce_website.order.models import Order, OrderProducts


def add_order(user_pk):
    Order.objects.create(user_id=user_pk, status=Order.StatusChoices.P)


def add_order_details(user_pk, jewelries_by_quantities):
    order = Order.objects.filter(user_id=user_pk).last()
    for jewelry, details in jewelries_by_quantities.items():
        OrderProducts.objects.create(order_id=order.pk, jewelry_id=jewelry.pk, quantity=details['quantity'], total_price=details['jewelry_total_price'])
    print(order.pk)
    return order.pk

