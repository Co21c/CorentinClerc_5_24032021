// Recupération de l'id dans l'url pour fetch le produit selectionné

const getUrlId = window.location.search
const urlSearchParams = new URLSearchParams(getUrlId)
const getId = urlSearchParams.get('id')



main()

function main() {
    getArticles()
    .then (articles => {
        displayArticles(articles)
        let colors = articles.colors
        for(color of colors) {
            chooseYourColor(color)
        }
        addToCart(articles)

    })
    .catch(error => {
        alert(error)
    })


    // Boucle le tableau des couleurs du produits pour en creer des options dans le select

    spanInCart()
}

// Fetch du produit avec la variable ID récupéré plus haut dans l'url
async function getArticles() {
    const response = await fetch(`http://localhost:3000/api/teddies/${getId}`)
    if(response.status == 200 ) {
        const article = await response.json()
        return article
    } else {
        console.log("erreur")
        throw new Error("Erreur sur la réponse du serveur")
    }
}


// Fonction pour afficher l'article

function displayArticles(article) {
    let templateElt = document.getElementById("template")
    let articleElt = document.importNode(templateElt.content, true)

    articleElt.querySelector(".produit__name").textContent = article.name
    articleElt.querySelector(".produit__price").textContent = (article.price / 100).toFixed(2) + " €"
    articleElt.querySelector(".produit__desc").textContent = article.description
    articleElt.querySelector(".produit__image").src = article.imageUrl

    document.getElementById("main__product").appendChild(articleElt)

}

/**
 * 
 * @param {string} color 
 */
function chooseYourColor(color) {
    let select = document.getElementById("option__produit")
    let addOption = new Option(color, color)
    select.add(addOption, select.options[0])
}



// Recupération des données pour le panier

function addToCart(articles) {
    const idForm = document.querySelector("#option__produit")
    const sendBtn = document.querySelector("#btn_send")

    sendBtn.addEventListener('click', (event) => {
        event.preventDefault()
        const optionSelected = idForm.value
        let qt = 1
        // Création d'un objet pour l'ajouter au clickevent listener
        let teddie = {
            nom: articles.name,
            price: articles.price,
            option: optionSelected,
            quantity: qt,
            id: articles._id
        }

        let teddiesExist = true
        let teddieStorage = JSON.parse(localStorage.getItem("teddie"))

        // On compare la couleur et l'id pour obtenir une cobinaison unique, si ca match, on augmente la quantité++, sinon on push le produit
        if(teddieStorage) {
            for(i = 0; i < teddieStorage.length; i++) {
                if(teddieStorage[i].id === teddie.id && teddieStorage[i].option === teddie.option) {
                    teddieStorage[i].quantity++
                    localStorage.setItem("teddie", JSON.stringify(teddieStorage))
                    teddiesExist = false
                    break
                } 
            }
            if(teddiesExist) {
                teddieStorage.push(teddie)
                localStorage.setItem("teddie", JSON.stringify(teddieStorage))
            }
        }

        // Si rien est dans le local storage, on l'init en tableau et push le premier article
        if (teddieStorage == null) {
            teddieStorage = []
            teddieStorage.push(teddie)
            localStorage.setItem("teddie", JSON.stringify(teddieStorage))
        }

        const productAdded = document.getElementById("product__added")
        productAdded.classList.remove("produit__added")

        function displayNone () {
            const productAdded = document.getElementById("product__added")
            productAdded.classList.add("produit__added")

        }

        setTimeout(displayNone, 200)
        spanInCart()
    })
}

/**
 * fonction pour garder le nombre d'objet dans le panier
 */
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

