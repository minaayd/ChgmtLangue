# Portfolio de Mina Aydogmus

## Sommaire

1. [Description](#description)
2. [Fonctionnalités](#fonctionnalités)
3. [Structure du projet](#structure-du-projet)
4. [Installation](#installation)
5. [Utilisation](#utilisation)
6. [Fichiers JSON de traduction](#fichiers-json-de-traduction)
7. [translate.js](#translatejs)
8. [Problème rencontré](#problème-rencontré)

## Description

Il s'agit du site web portfolio de Mina Aydogmus, une data scientist. Le site comprend diverses sections telles que "à propos", "formation", "expériences", "projets", "compétences" et des informations de contact. Il dispose également d'un sélecteur de langue permettant aux utilisateurs de basculer entre le français et l'anglais.

## Fonctionnalités

- Design réactif
- Sélecteur de langue (français et anglais)
- Traduction dynamique à l'aide de fichiers JSON externes
- Effet de texte rotatif pour le nom et le titre
- Menu de navigation avec des liens vers différentes sections et téléchargement de PDF externe

## Structure du projet

```
├── CSS
│ └── style.css
├── Images
│ ├── accueil.png
│ ├── logo.png
│ └── CV_Mina_Aydogmus.pdf
├── lng
│ ├── en.json
│ └── fr.json
├── translate.js
└── index.html
```

## Installation

1. Clonez le dépôt :

   ```sh
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Assurez-vous d'avoir un serveur local pour servir les fichiers. Vous pouvez utiliser l'extension Live Server dans VS Code ou le serveur HTTP de Python.

**Utilisation de Live Server (VS Code) :**

- Installez l'extension "Live Server" dans Visual Studio Code.
- Ouvrez le dossier du projet dans VS Code.
- Faites un clic droit sur index.html et sélectionnez "Open with Live Server".

**Utilisation du serveur HTTP de Python :**

- Ouvrez un terminal dans le répertoire du projet.
- Exécutez la commande suivante :

```bash
python -m http.server 8000
```

- Ouvrez votre navigateur et accédez à http://localhost:8000.

## Utilisation

- Ouvrez index.html dans un navigateur.
- Utilisez le sélecteur de langue en haut pour basculer entre le français et l'anglais.

## Fichiers JSON de traduction

Créez des fichiers JSON pour chaque langue dans le répertoire lng. Par exemple, en.json et fr.json. Voici un exemple de structure pour ces fichiers :

**en.json :**

```json
{
  "educ": "EDUCATION",
  "nom": "Mina Aydogmus",
  "status": "Data Science Student"
  // Ajoutez d'autres traductions ici
}
```

**fr.json :**

```json
{
  "educ": "FORMATION",
  "nom": "Mina Aydogmus",
  "status": "Étudiante en Data Science"
  // Ajoutez d'autres traductions ici
}
```

## Translate.js

Ce script gère la traduction dynamique de la page web en fonction de la langue sélectionnée. Il récupère le fichier JSON correspondant et met à jour les éléments HTML avec les traductions appropriées.

```js
function Translate() {
  this.init = function (attribute, lng) {
    this.attribute = attribute;
    this.lng = lng;
  };

  this.process = async function () {
    try {
      const response = await fetch("lng/" + this.lng + ".json");
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const LngObject = await response.json();
      const allDom = document.getElementsByTagName("*");
      for (let i = 0; i < allDom.length; i++) {
        const elem = allDom[i];
        const key = elem.getAttribute(this.attribute);
        if (key !== null && LngObject[key]) {
          elem.innerHTML = LngObject[key];
        }
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };
}

document.addEventListener("DOMContentLoaded", function () {
  const translator = new Translate();
  translator.init("data-translate", "fr");
  translator.process();

  document
    .getElementById("languageSelect")
    .addEventListener("change", function () {
      const language = this.value;
      translator.init("data-translate", language);
      translator.process();
    });
});
```

## Problème rencontré

Un problème a été rencontré lors de l'utilisation de XMLHttpRequest pour charger les fichiers JSON de traduction. L'erreur CORS (Cross-Origin Resource Sharing) empêchait les requêtes HTTP de certaines origines pour des raisons de sécurité. Ce problème est courant lorsqu'on essaie de charger des fichiers locaux (file://) avec XMLHttpRequest dans un navigateur moderne.

Pour contourner ce problème, nous avons décidé d'utiliser la fonction fetch à la place de XMLHttpRequest et d'héberger les fichiers sur un serveur local. Cela permet de charger les fichiers JSON de manière sécurisée et sans erreurs CORS.
