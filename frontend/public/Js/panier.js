window.addEventListener("load", function () {
    console.log("loaded")
    valideLocalstorage()
})
//récupération données localStorage
let TeddiesLocalStorage = JSON.parse(localStorage.getItem('NouveauArticle'));
console.log(TeddiesLocalStorage);
const table = document.querySelector('table')
const vidCacher = document.getElementById('vidCacher')
const CarteddyDiv = document.getElementById("CarteddyDiv")
// //Lorseque le localstorege est vide??????
var valideLocalstorage = () => {
    if (TeddiesLocalStorage == null || TeddiesLocalStorage.length === 0) {
        panierVide()
        return;
    }
    else {
        console.log("le locale storage n'est pas vide")
        // si des éléments sont présents dans le panier : récupération des éléments du panier
        DemoPrixTtotal();
        DomPanierTabel()
        VidderPannier();
    }
}
var panierVide = () => {
    const PanierVide = document.createElement("p")
    CarteddyDiv.appendChild(PanierVide)
    PanierVide.className = "CarteVide";
    table.style.visibility = "hidden"
    vidCacher.style.visibility = "hidden"
    PanierVide.textContent = "Votre Panier est vide pour Linstant"
    /******le button de retour */
    var bit = document.getElementById('back')
    bit.style.visibility = 'visible'

}
var DemoPrixTtotal = () => {
    let calculePrix = []
    for (elementDeTeddy of TeddiesLocalStorage) {
        let PrixArticle = elementDeTeddy.teddyPrice;
        calculePrix.push(PrixArticle);
    };
    console.log(calculePrix);
    const valeurs = (prixUnicial, valeurAjour) =>
        prixUnicial + valeurAjour
    const totalPrice = calculePrix.reduce(valeurs);
    console.log(totalPrice);
    const tfoot1 = document.getElementById("tfoot1")
    tfoot1.textContent = totalPrice + " €"
}

////variable globale
const infosTeddy = document.createElement('div');
/*///////////*/
var DomPanierTabel = () => {
    for (lesElements of TeddiesLocalStorage) {
        console.log(lesElements)
        CarteddyDiv.appendChild(infosTeddy);
        const teddiesCart = document.createElement('p');
        infosTeddy.appendChild(teddiesCart);
        teddiesCart.textContent = lesElements.teddyNom + " " + lesElements.teddyColor;
        ////Affichage du pix et de la couleur dans le panier
        var tbody2=document.getElementById("tbody")
        tbody2.innerHTML +=`
        <tr>
            <td scope="row">${lesElements.teddyNom}</td>
            <td>${lesElements.teddyPrice}</td>
            <td>${lesElements.teddyColor}</td>
        </tr>
        `
    
       

        //////////////les images         
        const teddyImage = document.createElement('div');
        infosTeddy.appendChild(teddyImage);
        teddyImage.className = 'imagteddy';
        teddyImage.innerHTML += `<a href="">
         <img src="${lesElements.teddyImage}" class="img-fluid img-thumbnail p-1" alt="${lesElements.name}" width="200px"></a>
`
        // création bouton suppression d'un teddy
        const SuppButton = document.createElement('button');
        infosTeddy.appendChild(SuppButton);
        SuppButton.className = 'supprime_teddy btn btn-secondary';
        SuppButton.title = 'Supprimer cet article ?';
        const iconButton = document.createElement('i');
        SuppButton.appendChild(iconButton);
        iconButton.className = 'fas fa-trash-alt Acacher';
        SuppButton.addEventListener('click', function (event) {
            event.preventDefault();
            const neWlist = TeddiesLocalStorage.filter((teddy) => {
                return teddy !== lesElements;
            });
            localStorage.setItem('NouveauArticle', JSON.stringify(neWlist));

            alert('Cet article a bien été supprimé !');
            window.location.href = "panier.html"


        })
    }
}
var VidderPannier = ()=>{
    ////butoon pour vider le panier
    const ButVidPagnet = document.createElement('button');
    CarteddyDiv.appendChild(ButVidPagnet);
    ButVidPagnet.className = 'icon_SupButton  btn-secondary';
    ButVidPagnet.textContent = "Vider mon panier ";
    const icon = document.createElement('i');
    ButVidPagnet.appendChild(icon);
    icon.className = 'fas fa-trash-alt'
    ButVidPagnet.addEventListener("click", function (event) {
        event.preventDefault();
        const confirme = window.confirm("voulez vous vider le panier?")
        if (confirme == true) {
            window.location.href = "panier.html";
            localStorage.removeItem('NouveauArticle');
        } else {
            window.location.href = "panier.html";
        }
    });
    
}
///le formulaire
        /////////////////Nom//////////////// valide///////////////////////////
        function validationNom(value) {
            return /^[A-Z-a-z\s]{5,80}$/.test(value)
        };
        function validationVille(value) {
            return /^[A-Z-a-z\s]{5,80}$/.test(value)
        };
        function validationPreNom(value) {
            return /^[A-Z-a-z\s]{5,80}$/.test(value)
        };
        function validationAddress(value) {
            return /^[A-Z-a-z-0-9\s]{5,80}$/.test(value)
        };
        function validMail(value) {
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
        };
        Nom = document.getElementById('nom')
        let NomErreur = document.getElementById('NomErreur')
        Nom.addEventListener("change", function (event) {
            if (validationNom(Nom.value)) {
                Nom.style.color = "green"
                NomErreur.style.visibility = "hidden"
            }
            else {
                NomErreur.innerHTML = "Le champ doit comporter que des lettres et chiffre "
                NomErreur.style.color = "red"
                NomErreur.style.marginTop = "10px"
                event.preventDefault()
            }
        }
        )
        ////////////////////Prenom /////////////////Valide
        
        PreNom = document.getElementById('Prenom')
        let PreNomErreur = document.getElementById('PreNomErreur')
        PreNom.addEventListener("change", function (event) {
            if (validationPreNom(PreNom.value)) {
                PreNom.style.color = "green"
                PreNomErreur.style.visibility = "hidden"
            }
            else {
                PreNomErreur.innerHTML = "Le champ doit comperter que des lettre et chiffre "
                PreNomErreur.style.color = "red"
                PreNomErreur.style.marginTop = "10px"
                event.preventDefault()
            }
        }
        )
        // Vérification de la validité de l'adresse
        
        let AdressErreur = document.getElementById('AdressErreur')
        adresse = document.getElementById('adresse')
        adresse.addEventListener("change", function (event) {
            if (validationAddress(adresse.value)) {
                adresse.style.color = "green"
                AdressErreur.style.visibility = "hidden"

            } else {
                AdressErreur.innerHTML = "Le champ doit comperter que des lettre et chiffre "
                AdressErreur.style.color = "red"
                AdressErreur.style.marginTop = "10px"
                event.preventDefault()
            }
        }
        )
        //validation de la ville 
        Ville = document.getElementById('ville')
        let VilleErreur = document.getElementById('VilleErreur')
        Ville.addEventListener("change", function (event) {
            if (validationVille(ville.value)) {
                Ville.style.color = "green"
                VilleErreur.style.visibility = "hidden"
            }
            else {
                VilleErreur.innerHTML = "Le champ doit comperter que des lettre et tiret uniquement"
                VilleErreur.style.color = "red"
                VilleErreur.style.marginTop = "10px"
                event.preventDefault()
            }
        }
        )
        // // création fonctions et validité mail
        var mail = document.getElementById("email")
        let EmailErreur = document.getElementById('EmailErreur')
        mail.addEventListener("change", function (event) {
            if (validMail(mail.value)) {
                mail.style.color = "green"
                EmailErreur.style.visibility = "hidden"
            }
            else {
                mail.style.fontFamily = "cursive"
                EmailErreur.innerHTML = "Veuillez saisir une adresse mail valide (exemple : abcd@mail.com)."
                EmailErreur.style.color = "red"
                EmailErreur.style.marginTop = "10px"
                event.preventDefault()
            }
        })
        // envoie des données panier + contact au serveur si le formulaire est valide
let submit = document.getElementById("form")
let submiErreur = document.getElementById("SubmitErreur")

submit.addEventListener("submit", function (event) {
    //Création de l'objet "contact"
    let contact = {
        firstName: Nom.value,
        lastName: PreNom.value,
        address: adresse.value,
        city: ville.value,
        email: mail.value,
    }
    if (validationAddress(Nom.value) && validationPreNom(PreNom.value)
        && validationAddress(adresse.value) && validationVille(ville.value)
        && (validMail(mail.value))) {
            let calculePrix = []
            for (elementDeTeddy of TeddiesLocalStorage) {
                let PrixArticle = elementDeTeddy.teddyPrice;
                calculePrix.push(PrixArticle);
            };
            console.log(calculePrix);
            const valeurs = (prixUnicial, valeurAjour) =>
                prixUnicial + valeurAjour
            const totalPrice = calculePrix.reduce(valeurs);
        event.preventDefault();
        submiErreur.style.visibility = "hidden"
        console.log(contact)
        // envoie du prix total au localStorage
        localStorage.setItem('totalPrice', totalPrice);
        const storagePrice = localStorage.getItem('totalPrice');
        console.log(storagePrice);
        // TAbleau pour recuperer les id des nounous qui sons dans le panier 
        let products = [];
        for (storedTeddy of TeddiesLocalStorage) {
            let produitId = storedTeddy.teddyId;
            products.push((produitId));
        }
        console.log(products);

        const data = {
            contact,
            products
        }
        console.log(data)
        var API = 'http://localhost:3000/api/teddies/order'
        const post = async function (data) {
            try {
                let response = await fetch(API,
                    {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers:
                        {
                            'Content-Type': 'application/json'
                        }
                    });
                if (response) {
                    let datas = await response.json();
                    console.log(datas)
                    localStorage.setItem("responseOrder", datas.orderId);
                    localStorage.removeItem("NouveauArticle");
                    window.location = "validation.html";
                } else {
                    event.preventDefault();
                    console.error('Retour du serveur : ', response.status);
                    alert('Erreur rencontrée : ' + response.status);
                }
            }
            catch (error) {
                alert("Erreur : " + error);
            }
        };
        post(data);
    }
    else {

        event.preventDefault();
        submiErreur.style.visibility = "visible"
        submiErreur.innerHTML = "Remplissez Bien le formulaire SVP"
        submiErreur.style.color = "red"
        submiErreur.style.marginTop = "10px"
    }
})
