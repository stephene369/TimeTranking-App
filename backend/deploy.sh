#!/bin/bash

# Création et activation de l'environnement virtuel
python3 -m venv venv
source venv/bin/activate

# Installation des dépendances
pip install -r requirements.txt
pip install gunicorn


# Migrations de la base de données
python manage.py makemigrations
python manage.py migrate

# Collecte des fichiers statiques
python manage.py collectstatic --noinput

# Création d'un superutilisateur (optionnel, décommentez si nécessaire)
# echo "from authentication.models import User; User.objects.create_superuser('admin@example.com', 'password')" | python manage.py shell

# Lancement de Gunicorn
gunicorn back_end.wsgi:application --bind 0.0.0.0:8000 --workers 3 --daemon
