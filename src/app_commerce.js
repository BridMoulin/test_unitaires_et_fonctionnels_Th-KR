// On définit une classe représentant un panier
class Basket { 
    constructor(items = [], totalPrice = 0) { 
        this.items = items; 
        this.totalPrice = totalPrice; 
    } 
} function addToBasket(basket, item) { 
    basket.items.push(item); 
    basket.totalPrice = basket.totalPrice + item.price; 
} 

function removeFromBasket(basket, item) { 
    for (let i = 0; i < basket.items.length; i++) { 
        if (JSON.stringify(item) === JSON.stringify(basket.items[i])) { 
            basket.items.splice(i, 1); 
            basket.totalPrice = basket.totalPrice - item.price; 
            break; 
        } 
    } 
}

function transactionAllowed(userAccount, priceToPay) { 
    if (userAccount.balance >= priceToPay) { 
        return true; 
    } 
    return false; 
} 

function payBasket(userAccount, basket) { 
    if (transactionAllowed(userAccount, basket.totalPrice)) { 
        userAccount.balance = userAccount.balance - basket.totalPrice; 
        console.log('Paiement du panier réussi'); 
    } else { 
        console.log('Paiement du panier échoué'); 
    } 
} 

// Exemple d’utilisation 
const currentBasket = new Basket(); 

const item1 = { name: 'Carte mère', price: 100 }; 
const item2 = { name: 'Carte graphique', price: 300 }; 
const user = { name: 'Perceval', balance: 500 }; 

addToBasket(currentBasket, item1); 
addToBasket(currentBasket, item2); 
// Suppression d’un produit du panier 
removeFromBasket(currentBasket, item1); 
console.log(currentBasket); 
// Paiement du panier 
payBasket(user, currentBasket); 
console.log(user); 
// Perceval n’a plus que 200 euros

module.exports = { Basket, addToBasket, removeFromBasket, transactionAllowed, payBasket };