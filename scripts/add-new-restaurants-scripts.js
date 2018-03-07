/**
 * Funktion som körs i onsubmit i ett formulär som används för att skapa nya restauranger.
 * saveNewResaturant() sparar restarurangen, sen visas en alert och slutligen skickas
 * användare tillbaka till startsidan.
 */
function saveNewRestaurantAndRedirect() {
    saveNewResaturant();
    alert("Tack. Din restaurang har nu lagts till och kan väljas från listan på startsidan");
    window.location.href = "registration.html";
}

/**
 * Konstruktor för att skapa en ny restaurang
 * @param mId
 * @param mName
 * @param mStars
 * @param mNumDeluxe
 * @param mPriceDel
 * @param mNumStan
 * @param mPriceStan
 * @param mNumMini
 * @param mPriceMini
 * @param mPriceWine
 * @param mPriceJuice
 * @param mPriceNonAlc
 * @param mPriceWater
 * @param mStreet
 * @param mPostal
 * @param mCity
 * @param mContry
 * @param mWebadress
 * @param mImage
 * @constructor
 */
function Restaurants(mId, mName, mStars, mNumDeluxe, mPriceDel, mNumStan, mPriceStan, mNumMini, mPriceMini, mPriceWine, mPriceJuice, mPriceNonAlc, mPriceWater, mStreet, mPostal, mCity, mContry, mWebadress, mImage) {
    this.IdOfRestaurant = mId;
    this.NameOfRestaurant = mName;
    this.NumberOfStars = mStars;


    //this.Prices = {};

    /* this.Prices = {
         food: {
             deluxe: {
                 numberOfCources: mNumDeluxe,
                 price: mPriceDel
             }
         }
     };

     this.Prices = {
         food: {
             standard: {
                 numberOfCources: mNumStan,
                 price: mPriceStan
             }
         }
     };

     this.Prices = {
         food: {
             mini: {
                 numberOfCources: mNumMini,
                 price: mPriceMini
             }
         }
     };

     this.Prices = {
         drink: {
             winePairing: mPriceWine,
             juiceParing: mPriceJuice,
             nonAlcoholicPairing: mPriceNonAlc,
             water: mPriceWater
         }
     };

 */
    this.Prices = {
        food: {
            deluxe: {
                numberOfCourses: mNumDeluxe,
                price: mPriceDel
            },
            standard: {
                numberOfCourses: mNumStan,
                price: mPriceStan
            },
            mini: {
                numberOfCourses: mNumMini,
                price: mPriceMini
            }
        },

        drink: {
            winePairing: mPriceWine,
            juiceParing: mPriceJuice,
            nonAlcoholicPairing: mPriceNonAlc,
            water: mPriceWater
        }

    };


    // this.Prices = {drink:{juiceParing:mPriceJuice}};
    //this.Prices = {drink:{nonAlcoholicPairing:mPriceNonAlc}};
    //this.Prices = {drink:{water:mPriceWater}};

    /*
    this.Prices.food.deluxe.numberOfCourses = mNumDeluxe;
    this.Prices.food.deluxe.price = mPriceDel;

    this.Prices.food.standard.numberOfCourses = mNumStan;
    this.Prices.food.standard.price = mPriceStan;

    this.Prices.food.mini.numberOfCourses = mNumMini;
    this.Prices.food.mini.price = mPriceMini;

    this.Prices.drink.winePairing = mPriceWine;
    this.Prices.drink.juiceParing = mPriceJuice;
    this.Prices.drink.nonAlcoholicPairing = mPriceNonAlc;
    this.Prices.drink.water = mPriceWater;*/


    this.WebAddress = mWebadress;
    this.AdressOfRestaurant = {}; //Fråga varför
    this.AdressOfRestaurant.streetname = mStreet;
    this.AdressOfRestaurant.postalcode = mPostal;
    this.AdressOfRestaurant.city = mCity;
    this.AdressOfRestaurant.country = mContry;
    this.Media = mImage;

}

/**
 * Funktionen för att spara en ny restraurant,
 * anropas från funktionen saveNewRestaurantAndRedirect();
 */
function saveNewResaturant() {

    /**
     * Alla variabler nedan hämtar sitt värde från inputrutor eller
     * annan form av input som är gjord av användaren. Undantaget är
     * restaurantId = createNewId som får sitt värde genom en annan funktion.
     */

    var listOfRestaurantsInLS, restaurantId, restaurantName, numberOfStars,
        priceOfCourcesDeluxe, numberOfCourcesStandard, numberOfCourcesMini,
        priceOfWinePairing, numberOfCourcesDeluxe, priceOfCourcesStandard,
        priceOfCourcesMini, priceOfJuicePairing, priceOfNonAlcoholicPairing,
        priceOfWaterPairing, streetName, postalCode, city, country, webadress, image;

    //Hämtar alla restauranger i local storage
    listOfRestaurantsInLS = JSON.parse(localStorage.getItem("listOfRestaurantsInLS"));

    //Ger restaurangen ett nytt id baserat på det högsta idt som finns
    restaurantId = createNewId(listOfRestaurantsInLS);

    //Namnet på den nya restuarangen
    restaurantName = document.getElementById("inputNamePlace").value;

    //Antal stjärnor restaurangen ska ha.
    numberOfStars = document.getElementById("numberOfStars").value; //select list

    //Antal rätter och tillhörade pris
    //deluxe
    numberOfCourcesDeluxe = document.getElementById("inputNumberOfCourcesDeluxe").value;
    priceOfCourcesDeluxe = document.getElementById("inputFoodPriceDeluxe").value;

    //standard
    numberOfCourcesStandard = document.getElementById("inputNumberOfCourcesStandard").value;
    priceOfCourcesStandard = document.getElementById("inputFoodPriceStandard").value;

    //mini
    numberOfCourcesMini = document.getElementById("inputNumberOfCourcesMini").value;
    priceOfCourcesMini = document.getElementById("inputFoodPriceMini").value;

    //Priser för dryckespaket
    //vin
    priceOfWinePairing = document.getElementById("inputWinePairingPrice").value;
    //Juice
    priceOfJuicePairing = document.getElementById("inputJuicePairingPrice").value;
    //NON-ALC
    priceOfNonAlcoholicPairing = document.getElementById("inputNonAlcPairingPrice").value;
    //Water
    priceOfWaterPairing = document.getElementById("inputWaterPairingPrice").value;

    //adress
    streetName = document.getElementById("inputStreetname").value;
    postalCode = document.getElementById("inputPostalCode").value;
    city = document.getElementById("inputCity").value;
    country = document.getElementById("inputCountry").value;

    webadress = document.getElementById("inputWebpage").value;
    //Lägger till https:// så att länken blir klickbar när den visas för användaren
    webadress = "https://" + webadress;
    image = document.getElementById("inputLinkToImage").value;


    //skapar ett nytt objekt av typen restaurants
    var newRestaurant = new Restaurants(restaurantId, restaurantName, numberOfStars, numberOfCourcesDeluxe,
        priceOfCourcesDeluxe, numberOfCourcesStandard, priceOfCourcesStandard, numberOfCourcesMini,
        priceOfCourcesMini, priceOfWinePairing, priceOfJuicePairing, priceOfNonAlcoholicPairing,
        priceOfWaterPairing, streetName, postalCode, city, country, webadress, image);

    //Det nya objektet lagras i den befintliga listan med restauranger som sedan sparas i local storage
    listOfRestaurantsInLS.push(newRestaurant);
    localStorage.setItem("listOfRestaurantsInLS", JSON.stringify(listOfRestaurantsInLS));
}


/**
 * Funktion för att bestämma ett nytt Id (IdOfRestaurant) till en ny restaurang.
 * Funktionen tar emot en lista innehållande alla sparade
 * restauranger. Sedan sparas alla IDn i en ny lista och
 * Math.max hittar det högsta idt. Det som returneras är
 * ett nytt id till den nya restaurangen som alltså är det
 * högsta nummret som finns + 1.
 * @param listOfRestaurantsInLS
 * @returns {*}
 */
function createNewId(listOfRestaurantsInLS) {
    var listOfIds = [];
    var i, intId;
    for (i = 0; i < listOfRestaurantsInLS.length; i++) {
        listOfIds.push(listOfRestaurantsInLS[i].IdOfRestaurant);
    }
    intId = Math.max.apply(null, listOfIds);
    return intId + 1;
}




