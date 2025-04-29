#!/bin/bash

echo "=== Début du processus de réinitialisation et déploiement ==="

# Étape 1: Supprimer le dossier deploy2 existant
echo "Suppression du dossier deploy2 existant..."
rm -rf ~/deploy2

# Étape 2: Cloner le dépôt à partir de la branche deploy
echo "Clonage du dépôt à partir de la branche deploy..."
git clone -b deploy https://github.com/stephene369/TimeTranking-App.git ~/deploy2

# Étape 3: Rendre les scripts exécutables
echo "Attribution des permissions d'exécution aux scripts..."
chmod +x ~/deploy2/build_and_deploy.sh
chmod +x ~/deploy2/update_front_config.py

# Étape 5: Exécuter le script de build et déploiement
echo "Exécution du script de build et déploiement..."
~/deploy2/build_and_deploy.sh

echo "=== Processus de réinitialisation et déploiement terminé ==="
