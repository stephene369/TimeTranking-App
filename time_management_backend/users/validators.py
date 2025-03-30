from django.core.exceptions import ValidationError
import re

def validate_password_strength(password):
    """
    Validate that the password meets minimum requirements:
    - At least 8 characters
    - Contains at least one digit
    - Contains at least one uppercase letter
    - Contains at least one lowercase letter
    - Contains at least one special character
    """
    if len(password) < 8:
        raise ValidationError("Password must be at least 8 characters long.")
    
    if not re.search(r'\d', password):
        raise ValidationError("Password must contain at least one digit.")
    
    if not re.search(r'[A-Z]', password):
        raise ValidationError("Password must contain at least one uppercase letter.")
    
    if not re.search(r'[a-z]', password):
        raise ValidationError("Password must contain at least one lowercase letter.")
    
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        raise ValidationError("Password must contain at least one special character.")
