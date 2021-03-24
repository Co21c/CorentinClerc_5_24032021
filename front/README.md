# Exemple d'arborescence webpack

* /dist (fichiers compilés)
* / src (sources sass/js)  
* package.json (liste des packages du projet)
* webpack.config.js (configuration de webpack)
* .babelrc (configuration de babel)  
&nbsp;  
## Installation des packets :
    npm install  
&nbsp;  
## Compilation / dev serveur
    npm run build (compilation)
    npm run start (lancement du serveur)

Ces commandes sont modifiables dans le "package.json"  
&nbsp;  
## Ajout de fichiers js
Une fois le fichier js créé il faut l'ajouter dans le fichier "webpack.config.js", par exemple ici nous venons de créer le fichier test.js :  
```
    entry: {
        app: "./src/index.js",
        articles: "./src/js/articles.js",
        test: "./src/js/test.js",
    },
```

Puis ce fichier est ajouté de cette facon dans la page concernée :
```
<body>
    <script src="/test.bundle.js"></script>
</body>
```  
&nbsp;
## Ajout de fichiers SASS
Voir les exemples du fichier main.scss