# Bank Management System

The **Bank Management System** is a project that simulates the basic operations of a bank. It provides users with the ability to:

- **Register** and **log in** securely to the system.
- **Manage financial products**, including:
  - Credit/Debit cards
  - Loans
- Perform operations such as:
  - Viewing product details
  - Editing product information
  - Deleting products

This system aims to provide an intuitive and efficient way for users to interact with their banking products, enhancing their overall experience.

## Technologies Used

The project is divided into three main components: database, backend, and frontend.

### Database

- **Technology**: PostgreSQL
- The database was designed using SQL and is currently hosted on a Vercel server, so local installation is not required. However, the SQL script is included in the repository for those who wish to deploy it on their own environment.

### Backend

- **Language**: Python
- **Framework**: Flask
- The backend provides an API with multiple endpoints for data management.
- It includes token generation to secure routes.
- Database operations are performed by executing raw SQL statements directly, rather than using an ORM.

### Frontend

- **Framework**: React with Next.js
- **Libraries**:
  - MUI for interface components.
  - TailwindCSS for design and styling customization.

This architecture ensures a clear separation of concerns, offering flexibility and scalability for the system.

## Installation

### Prerequisites

Before you begin, ensure your system has the following installed:

- **Python** (latest stable version recommended)
- **Node.js** (version 16.x or higher recommended)
- A `.env` file into backend folder containing the necessary environment variables for database connection. A template file is provided in the repository.

### Backend Installation

To set up and run the backend, navigate to the `/backend` directory and follow these steps:

1. **Create a virtual environment**
   ```bash
   python -m venv venv
   ```

2. **Activate the virtual environment**
   - On Linux or macOS (e.g., using Bash):
     ```bash
     source venv/Scripts/activate
     ```
   - On Windows (using PowerShell):
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   python src/run.py
   ```

The backend should now be running and listening for requests.

### Frontend Installation

To set up and run the frontend, navigate to the `/frontend` directory and follow these steps:

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

   > **Note**: The first time you run the application, the startup process might take a bit longer as dependencies and build processes are initialized.

The frontend should now be running locally, and you can access it via your browser at `http://localhost:3000`.

## Application Usage

### Frontend

Initially, the application starts at `/login`, where users can log in. Two users are pre-registered in the database:

1. **Administrator** (Admin role):
   - **Email**: admin@mybank.com
   - **Password**: administrator

2. **John Doe** (Client role):
   - **Email**: john.doe@mybank.com
   - **Password**: john5522

Alternatively, users can register a new account at `/register`, which will assign them the **Client** role.

At `/`, users can view their registered cards and loans. By default, each user has two cards and two loans. From this page, users can:

- Add a new card or loan via the `/add` link.
- Log out using the logout option at the bottom of the page.

Clicking on a card or loan redirects to its detailed page (`/card/[id]` for cards and `/loan/[id]` for loans), where users can:

- View the product's detailed information.
- Edit the product's information.
- Delete the product from the system.

### Backend

While the backend is primarily designed for API consumption, developers can interact with its endpoints. Note that most routes are protected and require a valid token for access. Tokens can be obtained via the login endpoint.

#### User Endpoints

1. `/api/users/` (GET): View all registered users (requires an Admin token).
2. `/api/users/login/` (POST): Accepts email and password, returns an authentication token.
3. `/api/users/register/` (POST): Accepts user data for registration, returns the newly created user information.

#### Card Endpoints (All require a token)

1. `/api/cards/` (GET): View all registered cards (Admin token required).
2. `/api/cards/<id>` (GET): View all cards for a specific client.
3. `/api/cards/card/<id>` (GET): View details of a specific card.
4. `/api/cards/card/add` (POST): Add a new card.
5. `/api/cards/card/update/<id>` (PUT): Edit a card by its ID.
6. `/api/cards/card/delete/<id>` (DELETE): Delete a card by its ID.

#### Loan Endpoints (All require a token)

1. `/api/loans/<id>` (GET): View all loans for a specific client.
2. `/api/loans/loan/<id>` (GET): View details of a specific loan.
3. `/api/loans/loan/add` (POST): Add a new loan.
4. `/api/loans/loan/update/<id>` (PUT): Edit a loan by its ID.
5. `/api/loans/loan/delete/<id>` (DELETE): Delete a loan by its ID.

This structure allows for a robust and secure interaction between the client and server while maintaining data integrity and user privacy.

