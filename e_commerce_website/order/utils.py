from e_commerce_website.order.models import Order, OrderProducts


def add_order(user_pk):
    Order.objects.create(user_id=user_pk)


def add_order_details(user_pk, jewelries_by_quantities):
    order = Order.objects.filter(user_id=user_pk).last()
    for jewelry, details in jewelries_by_quantities.items():
        OrderProducts.objects.create(order_id=order.pk, product_id=jewelry.pk, quantity=details['quantity'], total_price=details['jewelry_total_price'])

    return order.pk


def clean_shopping_cart(cart):
    cart.delete()