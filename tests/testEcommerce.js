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

// Pour exécuter le test, il suffit d'appeler la fonction
// testAdd();

// Question 2
console.log("\n Question 2 \n");
function testRemove() {
    // 1. Créer un panier vide.
    const currentBasket = new Basket();
    
    // Créer un produit
    const item = { name: "Carte mère", price: 100 };
    
    // 2. Ajouter le produit, puis le retirer.
    addToBasket(currentBasket, item);
    removeFromBasket(currentBasket, item);
    
    // 3. Vérifier que le panier est de nouveau vide et que totalPrice vaut 0.
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
    // Étape 1 : Créer un panier vide
    const currentBasket = new Basket();
    const item = { name: "Carte graphique", price: 300 };

    // Étape 2 : Ajouter un produit au panier
    addToBasket(currentBasket, item);
    
    // Vérification de l'ajout
    if (currentBasket.totalPrice !== 300) {
        console.log('Test "Ajout/Suppression" échoué : l\'ajout n\'a pas fonctionné correctement.');
        return false;
    }

    // Étape 3 : Supprimer le produit du panier
    removeFromBasket(currentBasket, item);

    // Étape 4 : Vérifier que le panier est de nouveau vide et que le prix total est 0
    if (currentBasket.items.length === 0 && currentBasket.totalPrice === 0) {
        console.log('Test "Ajout/Suppression" réussi');
        return true;
    } else {
        console.log('Test "Ajout/Suppression" échoué : la suppression n\'a pas ramené le panier à son état initial.');
        return false;
    }
}

// Pour exécuter le test, décommentez la ligne suivante
testAddRemove();

// Question 4
console.log("\n Question 4 \n");
function testTransactionAllowed() {
    // Indice : Créer un utilisateur avec un solde de 500 € [cite: 81]
    const user = { name: 'Armand', balance: 500 };

    // Vérification 1 : Une transaction de 400 € doit être autorisée.
    // Cette partie du test couvre la branche 'true' de la fonction.
    const isAllowed = transactionAllowed(user, 400);
    if (!isAllowed) {
        console.log('Test "Transaction autorisée" échoué : la transaction aurait dû être autorisée.');
        return false;
    }

    // Vérification 2 : Une transaction de 600 € doit être refusée.
    // Cette partie du test couvre la branche 'false' de la fonction.
    const isDenied = transactionAllowed(user, 600);
    if (isDenied) {
        console.log('Test "Transaction refusée" échoué : la transaction aurait dû être refusée.');
        return false;
    }

    // Si les deux vérifications passent, le test est réussi.
    console.log('Test "Transaction autorisée" réussi');
    return true;
}

// Vous pouvez appeler le test pour le vérifier.
testTransactionAllowed();

// Question 5
console.log("\n Question 5 \n");
function testPayBasket() {
    // Étape 1 : Préparation
    const user = { name: 'Armand', balance: 500 };
    const currentBasket = new Basket();
    const item = { name: 'Carte graphique', price: 300 };
    addToBasket(currentBasket, item);

    // Étape 2 : Premier paiement
    payBasket(user, currentBasket);

    // Étape 3 : Première vérification
    if (user.balance !== 200) {
        console.log('Test "Paiement du panier" échoué : Le solde de l\'utilisateur n\'est pas correct après le premier paiement.');
        return false;
    }
    
    // Étape 4 : Deuxième paiement (devrait échouer)
    payBasket(user, currentBasket);

    // Étape 5 : Deuxième vérification
    if (user.balance !== 200) {
        console.log('Test "Paiement du panier" échoué : Le solde de l\'utilisateur a changé après le deuxième paiement, qui aurait dû échouer.');
        return false;
    }

    // Si toutes les vérifications passent, le test est réussi
    console.log('Test "Paiement du panier" réussi');
    return true;
}

// Vous pouvez appeler la fonction pour la tester
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

// Appelez la fonction principale pour lancer tous les tests.
testAppEcommerce();