main ()

// Fonction en dehors du main pour parcourir les articles en boucle

async function main () {
    const articles = await getArticles()
    // Ici initialiser une potentielle erreur

    for (article of articles) {
        displayArticle(article)
    }

}


// Recupération des articles avec fetch

function getArticles () {
    return fetch("http://localhost:3000/api/teddies")
    // Ici initialiser une potentielle erreur
    .then(function (response) {
        if(response.status == 200) {
            return response.json()
        } else {
            throw new Error("Erreur sur la réponse du serveur")
        }
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
    articleElt.querySelector(".template__price").textContent = "Prix : " + article.price / 100 + " €"
    articleElt.querySelector(".template__image").src = article.imageUrl
    articleElt.querySelector(".template__desc").textContent = "Description : " + article.description

    articleElt.querySelector(".template__link").href = "produit.html?id=" + article._id


    document.getElementById("main__product").appendChild(articleElt)
}

/**
 * fonction pour garder le nombre d'objet dans le panier
 */
spanInCart()
 function spanInCart () {
    let spanNumber = JSON.parse(localStorage.getItem("teddie"))
    let tab = []
    for(let span in spanNumber) {
        tab.push(spanNumber[span].quantity)    
    }
    if(spanNumber) {
        document.querySelector(".header__span").innerHTML = tab.reduce((acc, cur) => acc + cur, 0)
    }
}
