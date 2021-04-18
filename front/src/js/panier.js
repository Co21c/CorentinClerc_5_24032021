

main()

async function main() {
    let teddieStorage = JSON.parse(localStorage.getItem("teddie"))
    const panierContainer = document.getElementById("panier__container")


    if(teddieStorage == null || teddieStorage == 0) {
        panierContainer.textContent = "Le panier est vide"
    } else {
        for(ted of teddieStorage) {
            displayArticle(ted)
        }
    }
    clearTeddie(teddieStorage)
    spanInCart("teddie")
}

/**
 * Fonction pour afficher les produits
 */
function displayArticle() {
    let templateElt = document.getElementById("template")
    let articleElt = document.importNode(templateElt.content, true)

    articleElt.querySelector(".panier__product__name").textContent = ted.nom
    articleElt.querySelector(".panier__product__price").textContent = ted.price / 100 + " €"
    articleElt.querySelector(".panier__product__option").textContent = ted.option
    articleElt.querySelector(".panier__product__quantity").textContent = ted.quantity



    document.getElementById("panier__container").appendChild(articleElt)
}

/**
 * function pour nettoyer le panier (local storage pour actualisaiton de la page)
 */
clearCart()
function clearCart() {
    const btnClearCart = document.getElementById("clearCart")
    btnClearCart.addEventListener("click", function(event){
        event.preventDefault
        localStorage.removeItem("teddie")
        alert("Le panier a été vidé")
        window.location.reload()
    }) 
}

/**
 * 
 * @param {array} teddieStorage 
 */
function clearTeddie (teddieStorage) {
    let btnClearTed = document.querySelectorAll(".panier__product__clear")

        for(let i = 0; i < btnClearTed.length; i++) {
        btnClearTed[i].addEventListener("click", function(event) {
            event.preventDefault()
            teddieStorage.splice(i, 1)
            localStorage.setItem("teddie", JSON.stringify(teddieStorage))
            alert("L'article a été supprimé")
            window.location.reload()
            
        })
    }
}
totalAmountCart ()
function totalAmountCart () {
    let totalAmount = []
    let teddieStorage = JSON.parse(localStorage.getItem("teddie"))
    for(let ted in teddieStorage) {
        let singleAmount = teddieStorage[ted].price * teddieStorage[ted].quantity
        totalAmount.push(singleAmount)
    }
    totalAmount = totalAmount.reduce((acc, cur) => acc + cur, 0)
    let amountCart = document.getElementById("amountCart")
    amountCart.textContent = "Le prix total : " + totalAmount / 100 + " €"
}


form()
function form () {
    const btnForm = document.getElementById("formButton")
    const form = document.getElementById("form")
    form.addEventListener("submit", function(event) {
        event.preventDefault()

        const formPrenom = document.getElementById("formPrenom").value
        const formNom = document.getElementById("formNom").value
        const formAdresse = document.getElementById("formAdresse").value
        const formVille = document.getElementById("formVille").value
        const formEmail = document.getElementById("formEmail").value
        

        const FormComplete = {
            firstName: formPrenom,
            lastName: formNom,
            address: formAdresse,
            city: formVille,
            email: formEmail
        }

        //Tester le formulaire
        let formIstrue = false
        if(validFormAddress(formAdresse) && validFormEmail(formEmail) && validFormNames(formPrenom) && validFormNames(formNom) && validFormNames(formVille)) {
            formIstrue = true
        }

        //Creation de l'objet à envoyer
        let teddie = JSON.parse(localStorage.getItem("teddie"))
        let tedId = []
        if(teddie) {
            for(i = 0; i < teddie.length; i++) {
            tedId.push(teddie[i].id)
            }
        } else {
            alert("le panier est vide")
        }

        const toSend = {
            products: tedId,
            contact: FormComplete
        }

        // Fetch de l'objet si le formulaire est true
        if(formIstrue === true && teddie) {
            fetch("http://localhost:3000/api/teddies/order", {
                method: "POST",
                headers: {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(toSend)
                })
                .then(function(response) {
                    if(response.status === 201) {
                        return response.json()
                    } else {
                        throw new Error("Erreur sur la réponse du serveur")
                    }
                })
                .then(function(data) {
                    window.location.assign("confirmation.html?id=" + data.orderId + "&prenom=" + data.contact.firstName + "&nom=" + data.contact.lastName)
                })
                .catch(function(e) {
                    console.log(e)
                })
            
                
        }
    })
}

/**
 * 
 * @param {string} nom 
 */
function spanInCart (nom) {
    let spanNumber = JSON.parse(localStorage.getItem(nom))
    let tab = []
    for(let span in spanNumber) {
        tab.push(spanNumber[span].quantity)    
    }
    if(spanNumber) {
        document.querySelector(".header__span").innerHTML = tab.reduce((acc, cur) => acc + cur, 0)
    }
}


formStayIn()
function formStayIn () {
    const formStorage = JSON.parse(localStorage.getItem("form"))

    if(formStorage) {
        document.getElementById("formPrenom").value = formStorage.firstname
        document.getElementById("formNom").value = formStorage.lastname
        document.getElementById("formAdresse").value = formStorage.adress
        document.getElementById("formVille").value = formStorage.city
        document.getElementById("formCP").value = formStorage.cp
        document.getElementById("formEmail").value = formStorage.mail
    }
}



/**
 * 
 * @param {string} data 
 * @returns 
 */
function validFormNames(data) {
    if(/^[A-Za-zéèàê]{3,20}-?([A-Za-zéèàê]{3,20})?$/.test(data)) {
        return true
    } else {
        alert(alertForm(data))
        return false
    }
}
/**
 * 
 * @param {string} data 
 * @returns 
 */
function validFormEmail(data) {
    if(/^[\w\-]+(\.[\w\-]+)*@[\w\-]+(\.[\w\-]+)*\.[\w\-]{2,}$/.test(data)) {
        return true
    } else {
        alert("Merci de saisir une adresse mail valide")
        return false
    }
}

/**
 * 
 * @param {string} data 
 * @returns 
 */
function validFormAddress(data) {
    if(/^([0-9]*) ?([a-zA-Z,\. ]*)$/.test(data)) {
        return true
    } else {
        alert("Merci de vérifier votre adresse postale")
        return false
    }
}


/**
 * 
 * @param {string} value 
 * @returns 
 */
function alertForm(value) {
    return value + ": Chiffre et caratéres spéciaux non autorisé. \n Saisir entre 3 et 20 caratéres"
}
/**
 * QUESTION POUR LA SESSION MENDOTORAT
 * 
 * J'ai du mal a gerer les fonction et les arguments
 * 
 * J'ai bad request sur ma méthod post
 * Page confirmation, quel est son contenu
 * J'arrive tjrs pas a commit le back
 * 
 * Je me souviens plus comment commenter mes fonctions
 * J'utilise une même fonction sur mes 3 pages, je peux reduire ?
 * 
 * Que me reste t il a faire
 */
