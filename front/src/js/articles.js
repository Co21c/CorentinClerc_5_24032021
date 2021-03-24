main ()

// Fonction en dehors du main pour parcourir les articles en boucle

async function main () {
    const articles = await getArticles()
    // Ici initialiser une potentielle erreur

    for (article of articles)
        displayArticle(article)
}


// Recupération des articles avec fetch

function getArticles () {
    return fetch("http://localhost:3000/api/teddies")
    // Ici initialiser une potentielle erreur
    .then(function (response) {
        return response.json()
    })
    .then(function(articles) {
        return articles
    })
    .catch(function(error) {
        alert(error)
    })
}

// Fonction pour creer des templates avec des articles recupérés

function displayArticle () {
    let templateElt = document.getElementById("template")
    let articleElt = document.importNode(templateElt.content, true)

    articleElt.querySelector(".template__name").textContent = article.name
    articleElt.querySelector(".template__price").textContent = article.price
    articleElt.querySelector(".template__image__img").src = article.imageUrl
    articleElt.querySelector(".template__desc").textContent = article.description

    articleElt.querySelector(".template__image__add__cart").href = "produit.html?id=" + article._id


    document.getElementById("main__product").appendChild(articleElt)
}


