/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/articles.js":
/*!****************************!*\
  !*** ./src/js/articles.js ***!
  \****************************/
/***/ (() => {

eval("main ()\n\n\n// Fonction en dehors du main pour parcourir les articles en boucle\n\nasync function main () {\n    const articles = await getArticles()\n\n    for (article of articles)\n        displayArticle(article)\n}\n\n// Recupération des articles avec fetch\n\nfunction getArticles () {\n    return fetch(\"http://localhost:3000/api/teddies\")\n    .then(function (reponse) {\n        return reponse.json()\n    })\n    .then(function(articles) {\n        return articles\n    })\n    .catch(function(error) {\n        alert(error)\n    })\n}\n\n// Fonction pour creer des templates avec des articles recupérés\n\nfunction displayArticle () {\n    let templateElt = document.getElementById(\"template\")\n    let articleElt = document.importNode(templateElt.content, true)\n\n    articleElt.querySelector(\".template__name\").textContent = article.name\n    articleElt.querySelector(\".template__price\").textContent = article.price\n    articleElt.querySelector(\".template__img\").src = article.imageUrl\n    articleElt.querySelector(\".template__desc\").textContent = article.description\n\n\n\n\n    document.getElementById(\"main__product\").appendChild(articleElt)\n}\n\n\n\n\n\n\n\n//# sourceURL=webpack://project/./src/js/articles.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/articles.js"]();
/******/ 	
/******/ })()
;