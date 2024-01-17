from e_commerce_website.order.models import Order, OrderProducts


def add_order(user_pk):
    Order.objects.create(user_id=user_pk, status=Order.StatusChoices.P)


def add_order_details(user_pk, jewelries_by_quantity_and_size):
    order = Order.objects.filter(user_id=user_pk).last()
    for jewelry, details in jewelries_by_quantity_and_size.items():
        OrderProducts.objects.create(order_id=order.pk, jewelry_id=jewelry.pk, quantity=details['quantity'], size=details['size'], total_price=details['jewelry_total_price'])

    return order.pk

