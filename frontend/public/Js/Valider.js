
window.addEventListener("load" ,function(){
    console.log("loaded")
    valideCommande()  

})
var valideCommande =()=>{
let orderId = localStorage.getItem('responseOrder');
console.log(orderId);
var orderIdd=document.getElementById("orderId")
orderIdd.innerHTML +=` <p id="ref">NUMERO DE SUIVI DE PRODUIT(S) </p> <strong id="ordercss">${orderId} <strong> `
// récupération du prix total de la commande
let totalPrice = localStorage.getItem('totalPrice');
console.log(totalPrice);
var totalPrices=parseFloat(totalPrice)
var prix=document.getElementById("recap")
prix.innerHTML +=`<p id="idprix">PRIX TOTAL : </p>
<strong id="Price">${totalPrices.toFixed(2)} Euro </strong">`
// Efface localStorage
localStorage.clear();
}