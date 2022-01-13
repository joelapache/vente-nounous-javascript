function Basket(options = []) { 

    var obj = {

        // les options
        options: options,

        /**
         * ------------------------------------------------------------
         *  Insertion de l'article dans un panier
         * ------------------------------------------------------------
         * 
         * @param {*} item 
         * @param {*} value 
         */
        set: function(item, value)
        {
            if(value != '' && item != '')
            {
                return localStorage.setItem(item, JSON.stringify(value));
            }
            return false;
        },



        /**
        * ------------------------------------------------------------
        *  inpection des key
        * ------------------------------------------------------------
        * 
        * @param {*} item 
        */
        key: function(item)
        {
            var rep = false;

              if(item != '')
              {
                let basket = this.get('basket');
                if(basket != null){
                    basket.map(value  => {
                        if(value.id === item){
                            rep = value;
                        }
                    });
                }
              }
              return rep;
        },


        /**
         * ------------------------------------------------------------
         *  recuperation de l'article dans un panier
         * ------------------------------------------------------------
         * 
         * @param {*} item 
         */
         get: function(item)
         {
             if(item != '')
             {
                return JSON.parse(localStorage.getItem(item));
             }
             return false;
         },


        /**
         * ------------------------------------------------------------
         *  suppression de l'article dans un panier
         * ------------------------------------------------------------
         * 
         * @param {*} item 
        */
        remove: function(item)
        {
            var rep = false;

            if(item != '')
            {
                var basket = this.get('basket');
  
                if(basket != null){
                    basket.map((value, index)  => {
                        if(value.id === item){
                          
                            if(basket.length >= 2)
                            {
                                rep = basket.splice(index);
                            }else{
                                localStorage.removeItem('basket');
                            }
                          
                           rep = true;
                        }
                    });
                }
                this.set('basket', basket);
            }
            return rep;
        },


        /**
         * ------------------------------------------------------------
         *  vider le panier
         * ------------------------------------------------------------
         * 
        */
        clean: function()
        {
            return localStorage.clear();
        },


        /**
         * -----------------------------------------------------
         * Afficharge du nombre de produit dans le panier
         * -----------------------------------------------------
         * 
         */

        showBasketNum: function()
        {
            var basket = localStorage.key('basket');
            
            if(basket == null) return false;

            document.querySelector("#qte_in_basket").innerHTML = Basket().get('basket').length;
        },


        /**
         * ---------------------------------------------
         * recuperation des information de la commande
         * ---------------------------------------------
         */
        getCommandInfo: function(){
            var com = this.get('command');

            var target = document.querySelector('.table-info');
            if(target == null || com == null) return false;

            target.insertAdjacentHTML('beforeend', `<tr>
                <td>Nom</td>
                    <td>${ com[0] }</td>
                    <td>Prénom</td>
                    <td>${ com[1] }</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>${ com[3] }</td>
                    <td>Ville</td>
                    <td>${ com[4] }</td>
                </tr>`);
            
            this.clean(); // on vide le panier.
        }
    }

    return obj
}



setInterval(() => {
    Basket().showBasketNum();
}, 10);