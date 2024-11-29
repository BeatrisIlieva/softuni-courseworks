from django.core.exceptions import ValidationError


class Facade:
    def __init__(
        self,
        execute_payment,
        create_order,
        delete_shopping_bag,
        send_confirmation_email,
    ):
        self._execute_payment = execute_payment
        self._create_order = create_order
        self._delete_shopping_bag = delete_shopping_bag
        self._send_confirmation_email = send_confirmation_email

    def operation(self, user=None):
        self._execute_payment()

        self._create_order()
        self._delete_shopping_bag()
        self._send_confirmation_email()

        return None


def client_code(facade: Facade, user=None):
    facade.operation(user)
