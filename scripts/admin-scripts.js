/**
 * Köks i body=onload på admin sidan. Hämtar och tilldelar
 * elementet en selectlist innehållande alla gjorda bokningar.
 */
function getAndSetSelectListWithCurrentBookingsAdmin() {

    document.getElementById("selectListWithBookings").innerHTML = makeSelectListADMIN();
}

/**
 * Skapar en select list innehållande de bokningar som finns.
 * @returns {string}
 */
function makeSelectListADMIN() {

    //Hämtar lista med alla restauranger från local storager
    var listOfAllRestaurants = JSON.parse(localStorage.getItem("listOfRestaurantsInLS"));
    var i, prop;

    //Deklarerar en tom lista
    var listAll = [];
    //loopar genom listans properties och lagrar alla namn på restaurangen i en ny lista
    for (prop in listOfAllRestaurants) {
        listAll.push(listOfAllRestaurants[prop].NameOfRestaurant);
    }


    // Loopar genom hela local storage och sparar alla nycklar som finns
    // i variablen keys. Variabeln pushas sedan in i listan listOfAllKeysInLocalStorage
    var listOfAllKeysInLocalStorage = [];
    var keys;
    for (i = 0; i < localStorage.length; i++) {
        keys = localStorage.key(i);
        listOfAllKeysInLocalStorage.push(keys);
    }


    // https://stackoverflow.com/questions/12433604/how-can-i-find-matching-values-in-two-arrays
    //Skapar metoden myMatches som nedan används tillsammans med en array för att hitta
    //alla matchningar i två listor

    Array.prototype.myMatches = function (listAll) {
        var ret = [];
        for (var i in this) {
            if (listAll.indexOf(this[i]) > -1) {
                ret.push(this[i]);
            }
        }
        return ret;
    };


    /**
     * listOfActualBookings innehåller alla bokningar som finns.
     * listOfAllKeysInLocalStorage innehåller alla namn (keys) i localstorage
     * listall innehåller alla namn på resturanger som finns tillagda som man kan boka i appen
     * genom metoden myMatches jämförs dessa två listor och matchningarna (de namn/restauranger)
     * som finns i båda listorna sparas i listOfActualBookings.
     */
    listOfActualBookings = listOfAllKeysInLocalStorage.myMatches(listAll);

    //bygger ihop en select lista med bokningarna som finns i listan listOfActualBookings
    var nonSelectable = "<option selected disabled>Välj restaurang</option>";
    var allBookings = "<option value='all'>Alla bokningar</option>";
    var options = "";
    for (i = 0; i < listOfActualBookings.length; i++) {

        options += "<option value= '" + listOfActualBookings[i] + "'>" + listOfActualBookings[i] + "</option>";
    }
    //returnerar select listan
    return "<select class='form-control setWidth' id='selectListAdmin' onchange='activitySelectedADMIN();'>" + nonSelectable + allBookings + options + "</select>";

}

/**
 * Denna funktion körs när en restaurang är vald i selectlistan skapad i makeSelectListADMIN();
 */
function activitySelectedADMIN() {

    //Hämtar värdet på den valda restaurangen som finns i select listen när användaren valt restaurang
    var selectedName = document.getElementById("selectListAdmin").value;
    //Värdet från selectlisten används som parameter/key för att hämta motsvarande sträng från local storage
    //för att sedan parsas om till ett object.
    var selectedRestaurantBooking = JSON.parse(localStorage.getItem(selectedName));

    //  var listOfRestaurantsInLS = JSON.parse(localStorage.getItem("listOfRestaurantsInLS"));


    //i select list finns även värdet "all" hårdkodat. Om värdet är all ska ALLA bokningar visas
    if (selectedName === "all") {
        var choice = "all";
        //sätter rubriken på admin sidan till - Alla bokningar
        document.getElementById("headerRestaurantBookingAdmin").innerHTML = " - Alla bokningar";
        document.getElementById("showSelectedRestaurant").innerHTML = selectListForRestaurantsAdmin(choice);

        //om selected name inte innehåller "all"...
    } else {
        choice = selectedRestaurantBooking;

        //Visar värdet som skickas tillbaka i en div.
        document.getElementById("showSelectedRestaurant").innerHTML = selectListForRestaurantsAdmin(null, selectedName);
        //Sätter rubriken på sidan till den aktuella restaurangen så användaren ser tydligt vilken restaurang
        document.getElementById("headerRestaurantBookingAdmin").innerHTML = " - " + selectedName;


    }
}

/**
 * Funktion som anropas genom ovanstående funktionn. Den bestämmer om ALLA bokningar som finns inlagda
 * ska visas eller enbart visa alla bokningar från en specefik restaurang
 * @param choice
 * @param selectedName
 * @returns {string}
 */
function selectListForRestaurantsAdmin(choice, selectedName) {

    //Det här if-statementet körs när choice är "all" och ska visa ALLA bokningar som finns inlagda.
    if (choice === "all") {
        var allBookingsName = "";
        var listOfAllBookings = [];
        var listOfRestaurantsFromLS = JSON.parse(localStorage.getItem('listOfRestaurantsInLS'));

        //Loopar genom alla restauranger som finns i LS
        for (var i = 0; i < listOfRestaurantsFromLS.length; i++) {

            allBookingsName = JSON.parse(localStorage.getItem(listOfRestaurantsFromLS[i].NameOfRestaurant));

            //För varje restaurang inte är null, loopa genom den restaurangen och skriv ut restaurangens data
            if (allBookingsName !== null) {
                for (var j = 0; j < allBookingsName.length; j++) {
                    var LIs = "";
                    LIs += "<hr>";
                    LIs += "<li><span class=\"headerRestaurantAdmin bold\">" + allBookingsName[j].NameOfRestaurant + "</li>";
                    LIs += "<li>Förnamn: <span class=\"bold\">" + allBookingsName[j].fName + "</li>";
                    LIs += "<li>Efternamn: <span class=\"bold\">" + allBookingsName[j].lName + "</li>";
                    LIs += "<li>Datum: <span class=\"bold\">" + allBookingsName[j].date + "</li>";
                    LIs += "<li>Telefon: <span class=\"bold\">" + allBookingsName[j].phnNumber + "</li>";
                    LIs += "<li>Email: <span class=\"bold\">" + allBookingsName[j].email + "</li>";
                    LIs += "<li>Dryckespaket: <span class=\"bold\">" + allBookingsName[j].valDrink + "</li>";
                    LIs += "<li>Menypaket: <span class=\"bold\">" + allBookingsName[j].valFood + "</li>";
                    LIs += "<li>Kommentarer: <span class=\"bold\">" + allBookingsName[j].mComments + "</li>";
                    listOfAllBookings += LIs;
                }
            }
        }
        return "<ul class='listStyleAdmin'>" + listOfAllBookings + "<hr></ul>";
    }

    else {

        //Om choice inte är "all", använd selectedName (den valda restaurangens) namn som parameter
        //för att hämta den specefika restaurangens alla bokningar.
        var booking = JSON.parse(localStorage.getItem(selectedName));
        LIs = "";

        for (i = 0; i < booking.length; i++) {
            LIs += "<hr>";
            LIs += "<li> Förnamn: <span class=\"bold\">" + booking[i].fName + "</span> </li>";
            LIs += "<li> Efternamn: <span class=\"bold\">" + booking[i].lName + "</span> </li>";
            LIs += "<li> Datum: <span class=\"bold\">" + booking[i].date + "</span> </li>";
            LIs += "<li> Telefon: <span class=\"bold\">" + booking[i].phnNumber + "</span> </li>";
            LIs += "<li> Email: <span class=\"bold\">" + booking[i].email + "</span> </li>";
            LIs += "<li> Dryckespaket: <span class=\"bold\">" + booking[i].valDrink + "</span> </li>";
            LIs += "<li> Menypaket: <span class=\"bold\">" + booking[i].valFood + "</span> </li>";
            LIs += "<li> Kommentarer: <span class=\"bold\">" + booking[i].mComments + "</span> </li>";
        }
        return "<ul class='listStyleAdmin'>" + LIs + "<hr></ul>";
    }
}
