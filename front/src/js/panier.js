




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
    clearCart()
}

/**
 * Fonction pour afficher les produits
 */
function displayArticle() {
    let templateElt = document.getElementById("template")
    let articleElt = document.importNode(templateElt.content, true)

    articleElt.querySelector(".panier__product__name").textContent = ted.nom
    articleElt.querySelector(".panier__product__price").textContent = ted.price
    articleElt.querySelector(".panier__product__option").textContent = ted.option
    articleElt.querySelector(".panier__product__quantity").textContent = ted.quantity



    document.getElementById("panier__container").appendChild(articleElt)
}

/**
 * function pour nettoyer le panier (local storage pour actualisaiton de la page)
 */
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


    for(let btn in btnClearTed) {
        btnClearTed[btn].addEventListener("click", function(event) {
            event.preventDefault()

            teddieStorage.splice(btn, 1)
            localStorage.setItem("teddie", JSON.stringify(teddieStorage))

            // let idTeddieClear = teddieStorage[btn].id
            // let optionTeddieClear = teddieStorage[btn].option

            // console.log(idTeddieClear)
            // console.log(optionTeddieClear)
            // teddieStorage = teddieStorage.filter((el) => 
            // el.id !== idTeddieClear && el.option !== optionTeddieClear) 


            alert("L'article a été vidé")
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
    console
    totalAmount = totalAmount.reduce((acc, cur) => acc + cur, 0)
    let amountCart = document.getElementById("amountCart")
    amountCart.textContent = "Le prix total : " + totalAmount + " $"
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
        const formCP = document.getElementById("formCP").value
        const formEmail = document.getElementById("formEmail").value
        

        let FormComplete = {
            firstname: formPrenom,
            lastname: formNom,
            adress: formAdresse,
            city: formVille,
            cp: formCP,
            mail: formEmail
        }

        // tester le formulaire
        //Verifier les inputs avec des fonctions ou autre

        localStorage.setItem("form", JSON.stringify(FormComplete))


        const formAlert = document.getElementById("formAlert")
        formAlert.textContent = "Merci de verifier vos informations"
        //

        
        const teddie = JSON.parse(localStorage.getItem("teddie"))
        // Création de l'objet à envoyer
        const toSend = {
            teddie,
            FormComplete
        }

        fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(toSend)
        })
        .then(function(response) {
            if(response.status === 201) {
                window.location.assign("confirmation.html")

            }
        })




    })
}
/**
 * fonction pour garder le nombre d'objet dans le panier
 */
spanInCart ()
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
 * QUESTION POUR LA SESSION MENDOTORAT
 * 
 * J'ai du mal a gerer les fonction et les arguments
 * 
 * J'ai bad request sur ma méthod post
 * Page confirmation, quel est son contenu
 * 
 * Je me souviens plus comment commenter mes fonctions
 * J'utilise une même fonction sur mes 3 pages, je peux reduire ?
 * 
 * Que me reste t il a faire
 */