import re
from django.core.exceptions import ValidationError

class CustomPasswordValidator:

    def validate(self, password, user=None):
        
        if not re.search(r'[A-Z]', password):
            raise ValidationError("Пароль должен содержать заглавную букву")

        if not re.search(r'\d', password):
            raise ValidationError("Пароль должен содержать цифру")

        if not re.search(r'[^\w\s]', password):
            raise ValidationError("Пароль должен содержать специальный символ")

    def get_help_text(self):
        return "Пароль должен содержать минимум 6 символов, одну заглавную букву, цифру и спецсимвол"