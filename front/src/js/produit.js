// Recupération de l'id dans l'url pour fetch le produit selectionné

const getUrlId = window.location.search
const urlSearchParams = new URLSearchParams(getUrlId)
const getId = urlSearchParams.get('id')
// Ici initialiser une potentielle erreur



main()

async function main() {
    const articles = await getArticles()
    // Ici initialiser une potentielle erreur
    .catch(error => {
        console.log(error)
    })

    displayArticles(articles)

    // Boucle le tableau des couleurs du produits pour en creer des options dans le select
    let colors = articles.colors
    for(color of colors)
    chooseYourColor(color)



    second()
}

// Fetch du produit avec la variable ID récupéré plus haut dans l'url

async function getArticles() {
    const response = await fetch(`http://localhost:3000/api/teddies/${getId}`)
    // Ici initialiser une potentielle erreur
    const article = await response.json()
    return article
}


// Fonction pour afficher l'article

function displayArticles(article) {
    let templateElt = document.getElementById("template")
    let articleElt = document.importNode(templateElt.content, true)

    articleElt.querySelector(".template__name").textContent = article.name
    articleElt.querySelector(".template__price").textContent = article.price
    articleElt.querySelector(".template__desc").textContent = article.description
    articleElt.querySelector(".template__image__img").src = article.imageUrl

    document.getElementById("main__product").appendChild(articleElt)

}

// Fonction pour ajouter des "options" avec les couleurs du produits
function chooseYourColor(color) {
    let select = document.getElementById("option__produit")
    let addOption = new Option(color, color)
    select.add(addOption, select.options[0])
}



// Recupération des données pour le panier


async function second() {
    const idForm = document.querySelector("#option__produit")
    const sendBtn = document.querySelector("#btn_send")
    const articles = await getArticles()

    sendBtn.addEventListener('click', (event) => {
        event.preventDefault()
        const userChoice = idForm.value
      
        //Création d'un objet pour l'ajouter au clickevent listener
        let optionSelected = {
            nom: articles.name,
            price: articles.price,
            option: userChoice,
            quantity: 1,
            id: articles._id
        }

        console.log(optionSelected)
    })

}
