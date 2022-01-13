function Product(options = []) { 

    var obj = {

        /**
         * ------------------------------------------------------------------
         *  les options de l'object product
         * ------------------------------------------------------------------
         */
        options: options,


        productData:  [], // tableau de tedie

        /**
         * -----------------------------------------------------------------
         *  Recuperation des teddies 
         * -----------------------------------------------------------------
         * 
         * c'est ici qu'on recupere les produits en fonction de nos besoin 
         * dans le serveur distant
         * 
         * 
         * @param array option
         * @return array 
         */

        getTedis: function(option, show = false, page = false)
        {
            var teddies_Url = "http://localhost:3000/api/teddies";

            if(option[0] != undefined)
            {
                if(option[1] != undefined && option[0] == "once")
                {
                    var teddies_Url = `http://localhost:3000/api/teddies/${option[1]}`;
                }

                fetch(teddies_Url).then(response => response.json())
                .then(data => {  

                    if(data.length == 0) return false; // si aucune donnée n'est retounée
                    
                    // on injecte si cela est autorisé
                    if(option[0] == 'all' && show === true)
                    {
                        if(page === true){
                            this.showListInbasket(data)
                        }else{
                            this.showTedies(data);
                        }
                    }else{
                        this.showTedie(data);
                    }
                });
            }

           
  
            return this.productData;
        },



       


        /**
         * --------------------------------------------------------
         * Recuperation des couleur des produit
         * --------------------------------------------------------
         * 
         * Cette fonction permet de retourner les couleurs
         * 
         */
        getProductColor: function(data)
        {
            //let data    = this.getTedis(['once', id]);
            let options = "";

            for (color of data.colors) {
                options +=  `<option value="${color}">${color}</option>`;
            }

            return options;
        },


        /**
         * -----------------------------------------------------------
         * On recupere les valeur d'un colonne 
         * -----------------------------------------------------------
         * 
         * cette function retournera la valeur d'une collone du tableau
         * des produit recuperées dans la db en back-end.
         * 
         * @param {*} data 
         * @param {*} item 
         */

        getDataColumn: function(data, item)
        {
            const arrayColumn = (arr, n) => arr.map(x => x[n]);
            return arrayColumn(data, item);
        },



        /**
         * -----------------------------------------------------------
         * Affichage du produit en protion dans la balnière.
         * -----------------------------------------------------------
         * 
         * @param {*} data 
         */
        showPromo: function(data)
        {
            if(document.querySelector('#banner-pub-content') == null) return false;
         
            data.map(item => {
                if(item.pub == true)
                { 
                    document.querySelector('#banner-pub-content').insertAdjacentHTML('beforeend', `<div class="description flex-col-50 flex-container --column --justify-start --align-start">
                        <h1 class="title-ft">${item.name}</h1>
                        <p>Obtenez jusqu'à <span>40%</span>  de reduction</p>
                        <span class="price">Solde: ${item.price} €</span>
                        <a href="produit.html?_id=${item._id}" class="btn-add-basket">Commander maintenant</a>
                    </div>
                    <div class="illustration flex-col-50">
                        <img src="${item.imageUrl}" alt="${item.name}" class="banner-image">
                    </div>`);
                }
            });
        },
        

        /**
         * -------------------------------------------------------------
         * Affichage des produits a la page d'acceuil
         * -------------------------------------------------------------
         * 
         * @param string type
         * @return bool
        */
        showTedies: function(data)
        {
            this.showPromo(Object.values(data));
            var target = document.querySelector('#products-side');
            
            for(const key in data)
            {
                if(Object.hasOwnProperty.call(data, key))
                {
                    const element = data[key];
                    
                    target.insertAdjacentHTML('beforeend', `<div class="product-item flex-col-30">
                        <div class="image">
                        <img src="${element.imageUrl}" alt="${element.name}" class="product-image">
                        </div>
                        <div class="description">
                        <div class="name">${element.name} (${element.price} €)</div>
                        <p class="detail">${element.description}</p>
                        <a href="produit.html?_id=${element._id}" class="link">Commander<i class="fa fa-shopping-bag"></i></a>
                        </div>
                    </div>`);

                }
            }
        },

        /**
        * -------------------------------------------------------------
        * Affichage des detail du produits a la page d'acceuil
        * -------------------------------------------------------------
        * 
        * @param string type
        * @return bool
        */
        showTedie: function (data) {
            let target = document.querySelector('#form-product-id');
     
            if(data._id != undefined)
            {
                target.insertAdjacentHTML('afterbegin', `
                <div class="image flex-col-50 --margin-right-20">
                    <img src="${data.imageUrl}" alt="${data.name}" class="product-image">
                </div>
                <div class="description  flex-col-50 --margin-left-20" id="">
                    <div class="name"><span>${data.name}</span>  &nbsp;&nbsp;-&nbsp;&nbsp; ${data.price} euro </div>
                    <p class="detail">${data.description}</p>
                    
                    <div class="color-layout flex-container --row --justify-start --align-center">
                        <div class="title">Couleur : </div>
                        <select class="colors-list" id="color_of_product">
                            <option value="defaut">Couleur par defaut</option>
                            ${this.getProductColor(data)}
                        </select>
                    </div>
                    <div class="color-layout flex-container --row --justify-start --align-center">
                        <div class="title">Nombre : </div>
                        <input type="number" value="1" name="nump" min="1" max="1000" id="number_of_product" />
                        <input type="hidden" value="${data._id}" name="id" id="id_of_product" />
                    </div>
                    <button name="btn" class="link" id="btn-commands" >Ajouter <i class="fa fa-shopping-bag"></i></button>
                </div>`);
            }else{
                target.insertAdjacentHTML('beforeend',  `<p style="text-align:center; font-size:1.6rem; width:100%;">Ce produit d'existe pas.</p>`);
            }
        },


        /**
         * ------------------------------------------------
         * Liste des produits dans le pannier
         * ------------------------------------------------
         * 
         * @param {*} data
         */
        showListInbasket: async function(data)
        {
            var basket = Basket().get('basket');

            if(basket != null)
            {
                let idents = this.getDataColumn(Object.values(basket), 'id');

                var target = document.querySelector('#product_in_basket');
                if(target == null) return false;
                
                var i   = 1,
                    arr = [0, 0, 0];

                await data.map((item) => {
                    if(idents.includes(item._id))
                    {
                        let qte = Basket().key(item._id).qte;
                        target.insertAdjacentHTML('beforeend', `<tr data="${item._id}">
                        <td scope="col">${i}</td>
                        ${(location.href.split('/')[3] == 'panier.html') ? `<td scope="col"><img class="logo" src="${item.imageUrl}" alt="${item.name}"></td>` : ''}
                        <td scope="col">${item.name}</td>
                        <td scope="col">${item.price} €</td>
                        <td scope="col">${Basket().key(item._id).qte}</td>
                        <td scope="col">${Basket().key(item._id).clr}</td>
                        ${(location.href.split('/')[3] == 'panier.html') ? `<td class="op-basket" onclick="Product().removeProduct(this, '${item._id}')"><i class="fa fa-trash-o"></i></td>` : ""}
                      </tr>`);
                      arr[0] +=  Number(item.price);
                      arr[1] +=  Number(qte);
                      arr[2] +=  Number(item.price) * Number(qte);
                      i++;
                    }
                });

                var target = document.querySelector('#product_stat');
                if(target == null) return false;

                target.insertAdjacentHTML('beforeend', ` <tr>
                    ${(location.href.split('/')[3] == 'panier.html') ? `<td scope="col"></td><td scope="col"></td>` : ''}
                    <td scope="col"></td>
                    <td scope="col">${arr[0]} €</td>
                    <td scope="col">${arr[1]}</td>
                    <td scope="col">Total</td>
                    <td scope="col">${ arr[2] } €</td>
                </tr>`);
            }
           
        },

        /**
         * -----------------------------------------------------
         * suppression du produit dans le pannier
         * -----------------------------------------------------
         * 
         * @param {*} target 
         * @param {*} id 
         */
        removeProduct: function(target, id)
        {
            if(confirm('Êtes vous suure de vouloir retirer ce produit du panier ?'))
            {
                if(Basket().remove(id))
                {
                    location = location.href;
                }
            }
        },

        

    }  

    return obj; 
}



/**
 * -----------------------------------------------------------
 * Mise des produit dans le panier
 * ----------------------------------------------------------
*/

if(document.getElementById('form-product-id') != undefined){
    // ecoute du clique du bouton d'ajout au panier
    const command_btn = document.getElementById('form-product-id');

    // si l'utilisateur valide l'ajout du produit au panier
    command_btn.addEventListener('submit', function(e){
        e.preventDefault();

        const qte_produit = document.getElementById("number_of_product").value;
        const id_produit  = document.getElementById("id_of_product").value;
        const clr_produit = document.getElementById("color_of_product").value;

        // quand les informations sont vérifiées alors...
        if(qte_produit > 0 && id_produit.length >= 8 && clr_produit != "")
        {
            var basket = Basket().get("basket");
            
            // si le panier n'est pas vide
            if(basket != null)
            {
                var i = 0;
                
                basket.map((value, index) => {
                    if(value.id == id_produit)
                    {
                        basket[index].qte = qte_produit;
                        basket[index].clr = clr_produit;
                        i++;
                    }
                });

                if(i > 0){
                    // ce produit exite deja dans le panier on met a jour les valeur
                    Basket().set("basket", basket);
                }else{
                    // ce produit n'exite pas dans le panier on met a jour les valeur
                    Basket().set("basket", basket.concat([{id:id_produit, qte:qte_produit, clr:clr_produit}]));
                }
            }else{
                // on ajoute un nouveau produit si le panier est vide.
                Basket().set("basket", [{id:id_produit, qte:qte_produit, clr:clr_produit}]);
            }
            
            alert("Le produit a été place dans le panier.");
            location = 'index.html';
        }
    });
}


// validation de la commande.
if(document.getElementById('form-command-id') != undefined)
{ 
    const command_form = document.getElementById('form-command-id');

    // si l'utilisateur valide l'ajout du produit au panier
    command_form.addEventListener('submit', function(e)
    {
        e.preventDefault();

        const nom       = document.querySelector('#nombox').value;
        const prenom    = document.querySelector('#prenombox').value;
        const email     = document.querySelector('#emailbox').value;
        const adresse   = document.querySelector('#adressebox').value;

        if(nom.length > 1 && prenom.length > 1 && adresse.length > 1  && email.length > 1)
        {
            Basket().set('command', [nom, prenom, email, adresse]);
            location = 'validation.html';

        }else{
            document.getElementById('SubmitErreur').innerHTML = 'Certaines informations sont manquantes ou invalides.';
        }
    });
}




window.addEventListener("load", function () {

    const searchParams = new URLSearchParams(location.search);
    const id_teddies   = searchParams.get("_id");

    if(id_teddies == undefined || id_teddies == null)
    {  
        // une sorte de route
        if(location.href.split('/')[3] == 'panier.html' || location.href.split('/')[3] == 'validation.html')
        {
            Product().getTedis(['all'], true, true); // on affiche les produit diponible dans le panier

            if(location.href.split('/')[3] == 'validation.html')
            {
                Basket().getCommandInfo(); // on affiche les information du client dans la facture
            }
        }
        else if(location.href.split('/')[3] == 'index.html' || location.href.split('/')[3] == '')
        {
            Product().getTedis(['all'], true); // on affiche les produit en stock
        }
    }else{
        Product().getTedis(['once', id_teddies], true); // on affiche les information d'un seul produit
    }

});