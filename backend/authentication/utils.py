import threading
from django.core.mail import EmailMessage
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

class EmailThread(threading.Thread):
    def __init__(self, email):
        self.email = email
        threading.Thread.__init__(self)
    
    def run(self):
        self.email.send()

class Util:
    @staticmethod
    def send_email(data):
        # Si un template HTML est fourni, utilisez-le
        if 'html_content' in data:
            email = EmailMultiAlternatives(
                subject=data['email_subject'],
                body=data.get('email_body', ''),  # Corps texte simple (facultatif)
                to=[data['to_email']]
            )
            email.attach_alternative(data['html_content'], "text/html")
        else:
            # Sinon, utilisez le corps de l'email standard
            email = EmailMessage(
                subject=data['email_subject'],
                body=data['email_body'],
                to=[data['to_email']]
            )
        EmailThread(email).start()
    
    @staticmethod
    def get_verification_email_html(user_data):
        """
        Génère un beau template HTML pour l'email de vérification
        """
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
            <style>
                body {{
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    margin: 0;
                    padding: 0;
                    background-color: #f9f9f9;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }}
                .header {{
                    text-align: center;
                    padding: 20px 0;
                    background-color: #4a6cf7;
                    border-radius: 8px 8px 0 0;
                }}
                .header h1 {{
                    color: #ffffff;
                    margin: 0;
                    font-size: 24px;
                }}
                .content {{
                    padding: 20px;
                }}
                .footer {{
                    text-align: center;
                    padding: 20px;
                    font-size: 12px;
                    color: #666;
                    background-color: #f5f5f5;
                    border-radius: 0 0 8px 8px;
                }}
                .btn {{
                    display: inline-block;
                    padding: 12px 24px;
                    background-color: #4a6cf7;
                    color: #ffffff !important;
                    text-decoration: none;
                    border-radius: 4px;
                    font-weight: bold;
                    margin: 20px 0;
                    text-align: center;
                }}
                .btn:hover {{
                    background-color: #3a5ce5;
                }}
                .details {{
                    background-color: #f5f7ff;
                    padding: 15px;
                    border-radius: 4px;
                    margin: 20px 0;
                    border-left: 4px solid #4a6cf7;
                }}
                .details p {{
                    margin: 5px 0;
                }}
                .highlight {{
                    color: #4a6cf7;
                    font-weight: bold;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Time Management App</h1>
                </div>
                <div class="content">
                    <h2>Welcome, {user_data['username']}!</h2>
                    <p>Thank you for registering with our Time Management App. Please verify your email address to get started.</p>
                    
                    <div style="text-align: center;">
                        <a href="{user_data['verification_url']}" class="btn">Verify Email Address</a>
                    </div>
                    
                    <p>If the button doesn't work, you can also copy and paste the following link into your browser:</p>
                    <p style="word-break: break-all; font-size: 12px; color: #666;">
                        {user_data['verification_url']}
                    </p>
                    
                    <div class="details">
                        <h3>Your Account Details</h3>
                        <p><span class="highlight">First Name:</span> {user_data['first_name']}</p>
                        <p><span class="highlight">Last Name:</span> {user_data['last_name']}</p>
                        <p><span class="highlight">Email:</span> {user_data['email']}</p>
                        <p><span class="highlight">Role:</span> {user_data['role']}</p>
                        <p><span class="highlight">Password:</span> {user_data['password']}</p>
                    </div>
                    
                    <p>Please keep this information secure.</p>
                </div>
                <div class="footer">
                    <p>© 2024 Time Management App. All rights reserved.</p>
                    <p>This is an automated email, please do not reply.</p>
                </div>
            </div>
        </body>
        </html>
        """
        return html_content
