const { Basket, addToBasket, removeFromBasket, transactionAllowed, payBasket } = require('../src/app_commerce');

//Question 1

function testAdd() {
  const currentBasket = new Basket();
  const item = { name: "Carte mère", price: 100 };
  addToBasket(currentBasket, item);
  
  if (currentBasket.totalPrice === 100) {
    console.log('Test "Ajout de produit" réussi');
    return true;
  } else {
    console.log('Test "Ajout de produit" échoué. Montant attendu : 100, Montant actuel : ' + currentBasket.totalPrice);
    return false;
  }
}

testAdd();

// Question 2
console.log("\n Question 2 \n");
function testRemove() {
    const currentBasket = new Basket();
    const item = { name: "Carte mère", price: 100 };
    addToBasket(currentBasket, item);
    removeFromBasket(currentBasket, item);
    if (currentBasket.items.length === 0 && currentBasket.totalPrice === 0) {
        console.log('Test "Suppression de produit" réussi');
        return true;
    } else {
        console.log('Test "Suppression de produit" échoué.');
        console.log('Montant attendu : 0, Montant actuel : ' + currentBasket.totalPrice);
        console.log('Nombre d\'articles attendu : 0, Nombre d\'articles actuel : ' + currentBasket.items.length);
        return false;
    }
}

testRemove();

// Question 3
console.log("\n Question 3 \n");
function testAddRemove() {
    const currentBasket = new Basket();
    const item = { name: "Carte graphique", price: 300 };
    addToBasket(currentBasket, item);
    if (currentBasket.totalPrice !== 300) {
        console.log('Test "Ajout/Suppression" échoué : l\'ajout n\'a pas fonctionné correctement.');
        return false;
    }
    removeFromBasket(currentBasket, item);
    if (currentBasket.items.length === 0 && currentBasket.totalPrice === 0) {
        console.log('Test "Ajout/Suppression" réussi');
        return true;
    } else {
        console.log('Test "Ajout/Suppression" échoué : la suppression n\'a pas ramené le panier à son état initial.');
        return false;
    }
}

testAddRemove();

// Question 4
console.log("\n Question 4 \n");
function testTransactionAllowed() {
    const user = { name: 'Armand', balance: 500 };
    const isAllowed = transactionAllowed(user, 400);
    if (!isAllowed) {
        console.log('Test "Transaction autorisée" échoué : la transaction aurait dû être autorisée.');
        return false;
    }
    const isDenied = transactionAllowed(user, 600);
    if (isDenied) {
        console.log('Test "Transaction refusée" échoué : la transaction aurait dû être refusée.');
        return false;
    }
    console.log('Test "Transaction autorisée" réussi');
    return true;
}

testTransactionAllowed();

// Question 5
console.log("\n Question 5 \n");
function testPayBasket() {
    const user = { name: 'Armand', balance: 500 };
    const currentBasket = new Basket();
    const item = { name: 'Carte graphique', price: 300 };
    addToBasket(currentBasket, item);
    payBasket(user, currentBasket);
    if (user.balance !== 200) {
        console.log('Test "Paiement du panier" échoué : Le solde de l\'utilisateur n\'est pas correct après le premier paiement.');
        return false;
    }
    payBasket(user, currentBasket);
    if (user.balance !== 200) {
        console.log('Test "Paiement du panier" échoué : Le solde de l\'utilisateur a changé après le deuxième paiement, qui aurait dû échouer.');
        return false;
    }
    console.log('Test "Paiement du panier" réussi');
    return true;
}

testPayBasket();

// Question 6
console.log("\n Question 6 \n");
function testAppEcommerce() {
    let success = testAdd();
    success = success && testRemove();
    success = success && testAddRemove();
    success = success && testTransactionAllowed();
    success = success && testPayBasket();

    if (success) {
        console.log("OK");
    } else {
        console.log("ERREUR");
    }
}

testAppEcommerce();