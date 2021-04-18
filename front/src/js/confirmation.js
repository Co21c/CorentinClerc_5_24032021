// Recupération de l'id dans l'url pour fetch le produit selectionné

const getUrlId = window.location.search
const urlSearchParams = new URLSearchParams(getUrlId)
const getId = urlSearchParams.get('id')
const getPrenom = urlSearchParams.get('prenom')
const getNom = urlSearchParams.get('nom')

console.log(getId)
console.log(getPrenom)
console.log(getNom)

document.getElementById("confirm__prenom").innerHTML = getPrenom
document.getElementById("confirm__nom").innerHTML = getNom
document.getElementById("confirm__id").innerHTML = getId

function timer () {
    window.location.assign("index.html")
}
setTimeout(timer, 4000)

clearLocalStorage ()
function clearLocalStorage () {
    let teddies = localStorage.getItem("teddie")
    if(teddies) {
        localStorage.removeItem("teddie")
    }
    return false
}