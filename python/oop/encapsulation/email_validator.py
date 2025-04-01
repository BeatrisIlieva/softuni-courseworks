from typing import List


class EmailValidator:
    def __init__(self, min_length: int, mails: List[str], domains: List[str]) -> None:
        self.min_length = min_length
        self.mails = mails
        self.domains = domains

    def __is_name_valid(self, name: str) -> bool:
        return len(name) >= self.min_length

    def __is_mail_valid(self, mail: str) -> bool:
        return mail in self.mails

    def __is_domain_valid(self, domain: str) -> bool:
        return domain in self.domains

    def validate(self, email: str) -> bool:
        email_spil_by_at_sign = email.split("@")
        name = email_spil_by_at_sign[0]
        mail, domain = email_spil_by_at_sign[1].split(".")

        name_is_valid = self.__is_name_valid(name)
        mail_is_valid = self.__is_mail_valid(mail)
        domain_is_valid = self.__is_domain_valid(domain)

        return name_is_valid and mail_is_valid and domain_is_valid


mails = ["gmail", "softuni"]
domains = ["com", "bg"]
email_validator = EmailValidator(6, mails, domains)
print(email_validator.validate("pe77er@gmail.com"))
print(email_validator.validate("georgios@gmail.net"))
print(email_validator.validate("stamatito@abv.net"))
print(email_validator.validate("abv@softuni.bg"))
