# TimeTracking App

## Prerequisites

- Python 3.8+
- Node.js 14+ and npm
- Git

---

## 🔧 Backend Setup

### 1. Clone the repository and navigate to the project directory

```bash
git clone https://github.com/stephene369/TimeTranking-App.git
cd TimeTranking-App
```

### 2. Create and activate a Python virtual environment

```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python -m venv venv
source venv/bin/activate
```

### 3. Install backend dependencies

```bash
pip install -r requirements.txt
```

### 4. Apply migrations to set up the database

```bash
cd back-end
python manage.py makemigrations
python manage.py migrate
```

### 5. Create a superuser (admin)

```bash
python manage.py createsuperuser
```

### 6. Start the Django server

```bash
python manage.py runserver
```

> The backend will be accessible at **http://localhost:8000/**

---

## 💻 Frontend Setup

### 1. In a new terminal, navigate to the frontend directory

```bash
cd front-end
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

> The frontend will be accessible at **http://localhost:5173/**

---

## 📁 Project Structure

```
TimeTranking-App/
├── back-end/                # Django backend
│   ├── authentication/      # User authentication
│   ├── tasks/               # Task management
│   ├── time_entries/        # Time tracking
│   ├── analytics/           # Data analysis
│   └── manage.py            # Django management script
├── front-end/               # React frontend
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React Context providers
│   │   ├── layouts/         # Page layouts
│   │   ├── pages/           # Application pages
│   │   ├── services/        # API service integrations
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main application component
│   │   └── main.jsx         # Application entry point
│   └── package.json         # npm dependencies
└── README.md                # Project documentation
```


### Database Errors

If you encounter migration errors or missing tables, try resetting your database:

```bash
# Remove the SQLite database file
rm back-end/db.sqlite3

# Recreate migrations and apply them
cd back-end
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

---

## 🚀 Future Enhancements

- Mobile application using React Native  
- Integration with calendar services (Google Calendar, Outlook)  
- Advanced analytics with machine learning recommendations  
- Collaborative features for group projects  
- Notification system for deadlines and reminders  

---

## 🤝 Contributing

To contribute to the project:

1. Create a branch for your feature  
2. Make your changes  
3. Submit a pull request  

Please follow the coding conventions and add tests for any new features.

---

## 📝 License

This project is licensed under the **MIT License**.
