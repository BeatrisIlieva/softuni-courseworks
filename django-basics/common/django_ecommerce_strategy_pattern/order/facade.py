from django.core.exceptions import ValidationError

from django_ecommerce_strategy_pattern.user_payment_details.models import (UserPaymentDetails,)
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

class ExecutePayment:
    def get_user_details(self, user):
        user_pk = user.pk
        user_pd = UserPaymentDetails.objects.get(user_id=user_pk)
        
        print("Please enter your payment details")
        user_pd.card_holder = input("Card Holder*: ")
        user_pd.card_number = input("Card Number*: ")
        user_pd.expiry_date = input("Expiry Date*: ")
        user_pd.cvv_code = input("CVV Code*: ")
        
        return self.__save_user_details(user_pd)

    def __save_user_details(self, user_pd):
        try:
            user_pd.full_clean()
            user_pd.save()

            return "Payment Details saved successfully"

        except ValidationError as e:
            return e.messages
        

def client_code(facade: Facade, user=None):
    facade.operation(user)
