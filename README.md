
# Lost ID Recovery Platform

## Overview

The Lost ID Recovery Platform is a web-based marketplace where individuals who find lost National IDs can post them, and users can search for their lost IDs. The platform is built using React for the frontend and Flask for the backend, with a strong focus on privacy and security.

## Features

- **User Authentication**: Secure login and registration using JWT for session management.
- **ID Posting**: Authorized users can post lost IDs with minimal, anonymized information.
- **ID Search**: Users can search for their lost IDs using partial information.
- **Verification Process**: Before handing over an ID, users must verify their ownership by providing matching details.
- **Secure Data Handling**: Sensitive data is encrypted both at rest and in transit.
- **Audit Logs**: All actions are logged for security and auditing purposes.

## Tech Stack

- **Frontend**: React
- **Backend**: Flask
- **Authentication**: Firebase authentication
- **Database**: PostgreSQL
- **Encryption**: Cryptography/Bcrypt
- **Styling**: Tailwind CSS & Shadcn

## Getting Started

### Prerequisites

- Node.js and npm
- Vite
- Python 3.12
- PostgreSQL (or other preferred database)

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/lostids.git
    cd lostids
    ```

2. **Backend Setup**:
   - Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

   - Create a virtual environment and install dependencies:

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    pip install -r requirements.txt
    ```

   - Set up environment variables for the Flask app:

    ```bash
    cp .env .env
    ```

   - Update the `.env` file with your database URI and secret key.
   - Run the Flask development server:

    ```bash
    flask run
    ```

3. **Frontend Setup**:
   - Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

   - Install dependencies:

    ```bash
    npm install
    ```

   - Start the development server:

    ```bash
    npm start
    ```

4. **Database Setup**:
   - Create and migrate the database:

    ```bash
    flask db init
    flask db migrate
    flask db upgrade
    ```

## Usage

1. **Register/Login**: Users can sign up and log in securely.
2. **Post Lost IDs**: Authorized users can post IDs they’ve found.
3. **Search IDs**: Users can search for their lost IDs using part of their ID number or name.
4. **Claim ID**: Once a user finds their ID, they can claim it by providing verification details.

## Security Considerations

- All sensitive data is encrypted.
- The platform uses HTTPS for secure communication.
- Role-based access control ensures only authorized actions are allowed.
- Audit logs are maintained to track all actions on the platform.

## Future Enhancements

- **Mobile App**: Develop a mobile version of the platform.
- **Notification System**: Notify users when a matching ID is posted.
- **Admin Dashboard**: A dashboard for managing posts, claims, and user activity.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or support, feel free to contact the project maintainer:

- **Email**: maildaviesevan@gmail.com
- **GitHub**: [daviesevan](https://github.com/daviesevan)

