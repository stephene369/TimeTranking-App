#!/bin/bash

echo "=== Début du processus de réinitialisation et déploiement ==="

# Étape 1: Supprimer le dossier deploy existant
echo "Suppression du dossier deploy existant..."
rm -rf ~/deploy

# Étape 2: Cloner le dépôt à partir de la branche deploy
echo "Clonage du dépôt à partir de la branche deploy..."
git clone -b deploy https://github.com/stephene369/TimeTranking-App.git ~/deploy

# Étape 3: Configuration du backend
echo "Configuration du backend..."
cd ~/deploy/backend

# Créer un environnement virtuel s'il n'existe pas
if [ ! -d "venv" ]; then
    echo "Création de l'environnement virtuel..."
    python3 -m venv venv
fi

# Activer l'environnement virtuel
source venv/bin/activate

# Installer les dépendances
echo "Installation des dépendances backend..."
pip install -r requirements.txt

# Effectuer les migrations
echo "Exécution des migrations..."
python manage.py makemigrations
python manage.py migrate

# Désactiver l'environnement virtuel
deactivate

# Étape 4: Redémarrer le service backend
echo "Redémarrage du service backend..."
sudo systemctl restart backend.service

# Étape 5: Exécuter le script update_front_config.py
echo "Exécution du script de mise à jour de la configuration frontend..."
python3 ~/deploy/update_front_config.py

# Étape 6: Exécuter le script de build et déploiement pour le frontend
echo "Exécution du script de build et déploiement du frontend..."
cd ~/deploy/front-end

# Installer les dépendances frontend
echo "Installation des dépendances frontend..."
/home/ubuntu/.nvm/versions/node/v20.19.1/bin/npm install

# Build du frontend
echo "Build du frontend..."
/home/ubuntu/.nvm/versions/node/v20.19.1/bin/npm run build

# Démarrer le serveur frontend
echo "Démarrage du serveur frontend..."
cd ~/deploy/front-end/dist
nohup /home/ubuntu/.nvm/versions/node/v20.19.1/bin/npx http-server -p 8000 > /dev/null 2>&1 &

echo "=== Processus de réinitialisation et déploiement terminé ==="

# Afficher le statut du backend
echo "Statut du service backend :"
sudo systemctl daemon-reload
sudo systemctl restart backend.service

sudo systemctl status backend.service


sudo journalctl -u backend.service -f