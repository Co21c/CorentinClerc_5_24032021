main ()


// Fonction en dehors du main pour parcourir les articles en boucle

async function main () {
    const articles = await getArticles()
    onLoadCartNumbers()

    let carts = document.querySelectorAll('.add-cart')

    for (let cart of carts) {
        cart.addEventListener('click', () => {
            cartNumbers(articles[cart])
    })
}

    
    for (article of articles)
        displayArticle(article)


}



// Recupération des articles avec fetch

function getArticles () {
    return fetch("http://localhost:3000/api/teddies")
    .then(function (reponse) {
        return reponse.json()
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

    articleElt.querySelector(".template__image__add__cart").textContent = "Ajouter au panier"



    document.getElementById("main__product").appendChild(articleElt)
}





async function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers')
    if(productNumbers) {
        document.querySelector('.header__span').textContent = productNumbers
    }
}
  
async function cartNumbers (article) {
    console.log("the product clicked", article)
    let productNumbers = localStorage.getItem('cartNumbers')

    productNumbers = parseInt(productNumbers)

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1)
        document.querySelector('.header__span').textContent = productNumbers + 1
    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.header__span').textContent = 1
    }
}
