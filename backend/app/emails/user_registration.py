def user_signup_email(fullname):
    return f"""
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        body {{
            font-family: 'Inter', sans-serif;
            background-color: #f9fafb;
            color: #1f2937;
            margin: 0;
            padding: 20px;
            line-height: 1.5;
        }}
        .container {{
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(145deg, #ffffff, #f3f4f6);
            padding: 32px;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }}
        .header {{
            text-align: center;
            padding-bottom: 24px;
        }}
        .header h1 {{
            margin: 0;
            text-align: left;
            color: #4f46e5;
            font-size: 28px;
            font-weight: 700;
        }}
        .content {{
            font-size: 16px;
        }}
        .button {{
            display: inline-block;
            padding: 12px 24px;
            font-size: 16px;
            font-weight: 600;
            color: #ffffff;
            background-color: #4f46e5;
            text-decoration: none;
            border-radius: 6px;
            margin-top: 24px;
            transition: background-color 0.2s ease;
        }}
        .button:hover {{
            background-color: #4338ca;
        }}
        .note {{
            margin-top: 24px;
            padding: 12px;
            background-color: #e0e7ff;
            color: #4338ca;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
        }}
        .footer {{
            text-align: center;
            padding-top: 24px;
            font-size: 14px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
            margin-top: 32px;
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Boom shakalak! Welcome to lostids!</h1>
        </div>
        <div class="content">
            <p>Dear {fullname},</p>
            <p>We're thrilled to welcome you to lostids! Thank you for creating an account with us. You've taken the first step towards a worry-free world where lost items find their way back home.</p>
            <p>With lostids, you now have a powerful ally in your quest to recover lost belongings. Our community-driven platform is designed to reunite you with your cherished possessions, bringing peace of mind and a touch of magic to your everyday life.</p>
            <p>Here's what you can do with your new account:</p>
            <ul>
                <li>Report lost items and increase your chances of recovery</li>
                <li>Post found items to help others in their search</li>
                <li>Connect with kind-hearted individuals in your community</li>
                <li>Access our user-friendly interface to manage your lost and found items</li>
            </ul>
            <p>We're excited to have you on board and can't wait to see the positive impact you'll make in our growing community of helpers and finders!</p>
            <a href="#" class="button">Explore lostids</a>
            <p class="note">Remember, every item has a story, and every return is a small miracle. Together, we're making the world a little bit kinder, one found item at a time.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 lostids. All rights reserved.</p>
            <p>If you need any assistance, we're here to help! Contact us at support@lostids.com</p>
        </div>
    </div>
</body>
</html>
    """