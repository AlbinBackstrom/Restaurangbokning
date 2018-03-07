/**
 * Funktionen används för att hämta och spara info från den valda restaurangen i en lista
 */
function getRestaurantFromId() {

    //Hämtar och sparar värdet (restaurangens id) från den förra sidan (registration)
    var restaurantId = getParameterByName("id");

    //skapar en lista med alla restauranger från localstorage
    var listOfRest = JSON.parse(localStorage.getItem("listOfRestaurantsInLS"));

    //deklarerar en
    var listWithSpecificRest = [];

    // https://stackoverflow.com/questions/7364150/find-object-by-id-in-an-array-of-javascript-objects
    //om det aktuella objektets (listOfRest) ID stämmer överens med IDt som kommer
    //från URLen och är sparat i restaurantId. Pusha in det objektet i listan listWithSpecificRest
    for (var i = 0; i < listOfRest.length; i++) {

        if (listOfRest[i].IdOfRestaurant == restaurantId) {
            console.log("pushing");
            listWithSpecificRest.push(listOfRest[i]);
        }
    }

    //Används för att anropa och skriva ut information om den valda restaurangen.
    //Parametern är listan som innehåller den valda restaurangen
    populateInfoAboutSelectedRestaurant(listWithSpecificRest[0]);
}

/**
 * Funktion för att skriva ut info om den valda restaurangen, tar en
 * parameter som är en lista som innehåller den valda restaurangen.
 * @param listWithSpecificRest
 */
function populateInfoAboutSelectedRestaurant(listWithSpecificRest) {

    var name, stars, numberOfCourcesDeluxe,
        priceOfCourcesDeluxe, numberOfCourcesStandard, priceOfCourcesStandard, numberOfCourcesMini,
        priceOfCourcesMini, priceOfWinePairing, priceOfJuicePairing, priceOfNonAlcoholicPairing,
        priceOfWaterPairing, website, adress, image, imageTag;

    //mellan rad 40 -75 sparas all info om den valda resturangen i nya variabler
    name = listWithSpecificRest.NameOfRestaurant;
    stars = listWithSpecificRest.NumberOfStars;
    stars = parseInt(stars);

    //Alla priser för mat
    priceOfCourcesDeluxe = listWithSpecificRest.Prices.food.deluxe.price;
    priceOfCourcesStandard = listWithSpecificRest.Prices.food.standard.price;
    priceOfCourcesMini = listWithSpecificRest.Prices.food.mini.price;

    //Antal rätter per "kategori"
    numberOfCourcesDeluxe = listWithSpecificRest.Prices.food.deluxe.numberOfCourses;
    numberOfCourcesStandard = listWithSpecificRest.Prices.food.standard.numberOfCourses;
    numberOfCourcesMini = listWithSpecificRest.Prices.food.mini.numberOfCourses;

    //Priser för dryckespaket
    priceOfWinePairing = listWithSpecificRest.Prices.drink.winePairing;
    priceOfJuicePairing = listWithSpecificRest.Prices.drink.juiceParing;
    priceOfNonAlcoholicPairing = listWithSpecificRest.Prices.drink.nonAlcoholicPairing;
    priceOfWaterPairing = listWithSpecificRest.Prices.drink.water;

    //URLen för websidan hämtas och deklarerars som en a href så den fungerar som en
    //riktig länk istället för vanlig text.
    website = listWithSpecificRest.WebAddress;
    website = "<a href=" + website + ">  Webbsida </a>";

    //Adressen som som flera olika stängrar och sätts här samman till en enda sträng
    adress =
        listWithSpecificRest.AdressOfRestaurant.streetname + ", " +
        listWithSpecificRest.AdressOfRestaurant.postalcode + ", " +
        listWithSpecificRest.AdressOfRestaurant.city + ", " +
        listWithSpecificRest.AdressOfRestaurant.country + ".";

    //Bildens url hämtas och läggs i en img-tag så den visas som en
    // bild istället för enbart länken som text.
    image = listWithSpecificRest.Media;
    imageTag = "<img src=" + image + ">";

    //Nedan sätts värderna från variablerna ovan på element som finns i HTML-filen
    document.getElementById("headerRestaurant").innerHTML = name;
    document.getElementById("infoWebsite").innerHTML = website;
    document.getElementById("infoAdress").innerHTML = adress;
    document.getElementById("imageDivForRestaurant").innerHTML = imageTag;

    document.getElementById("priceDeluxee").innerHTML = priceOfCourcesDeluxe + ":-";
    document.getElementById("priceStan").innerHTML = priceOfCourcesStandard + ":-";
    document.getElementById("priceMini").innerHTML = priceOfCourcesMini + ":-";

    document.getElementById("numOfCorDel").innerHTML = numberOfCourcesDeluxe;
    document.getElementById("numOfCorStan").innerHTML = numberOfCourcesStandard;
    document.getElementById("numOfCorMini").innerHTML = numberOfCourcesMini;

    document.getElementById("priceOfWinePairing").innerHTML = priceOfWinePairing + ":-";
    document.getElementById("priceOfJuicePairing").innerHTML = priceOfJuicePairing + ":-";
    document.getElementById("priceOfNonAlcoholicPairing").innerHTML = priceOfNonAlcoholicPairing + ":-";
    document.getElementById("priceOfWaterPairing").innerHTML = priceOfWaterPairing + ":-";

    document.getElementById("infoStars").innerHTML = setStarIcon(stars);

    document.getElementById("inputDateForBookin").defaultValue = getCurrentDateAndFormat();
    document.getElementById("inputDateForBookin").min = getCurrentDateAndFormat();

    /**
     * Funktionsanrop som använder google maps geocoding för att placera ut en marker
     * på kartan vid en angiven adress. Parametern som skickas med är adressen till
     * den valda resturangen
     */
    getAndSetAdress(adress);

}

/**
 * Funktion för att hämta dagens datum.
 * @returns {string}
 */
function getCurrentDateAndFormat() {
    var currentDate = new Date();
    var dd = currentDate.getDay();
    var mm = currentDate.getMonth();
    var yyyy = currentDate.getFullYear();

    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    var today = yyyy + '-' + mm + '-' + dd;
    return today;
}

/**Funktion som returnerar x antal element innehållandes stjärnor från font awesome.
 * Parametern stars innehåller siffran 1,2 eller 3 och returnerar då 1,2 eller 3
 * element innehållande lika många stjärnor.
 * @param stars
 * @returns {string}
 */
function setStarIcon(stars) {

    var starsInt = parseInt(stars);
    var numberOfStars = "";
    var element = "<i class=\"fa fa-star\"></i>";

    for (i = 0; i <= starsInt - 1; i++) {

        numberOfStars += element;
    }
    return numberOfStars;

}

/**
 * Funktion för att spara nya bokningar
 */
function saveNewBooking() {

    var fName, lName, phnNumber, email, valFood,
        valDrink, date, mComments, NameOfRestaurant;


    /**
     * Hämtar alla värden som finns på sidan new-booking.html som behövs för att skapa en ny bokning
     * NameOfRestaurant används som nyckel i local storage per restaurang och bokning.
     */
    NameOfRestaurant = document.getElementById("headerRestaurant").textContent;
    fName = document.getElementById("fName").value;
    lName = document.getElementById("lName").value;
    phnNumber = document.getElementById("phnNumber").value;
    email = document.getElementById("email").value;
    date = document.getElementById("inputDateForBookin").value;
    mComments = document.getElementById("textBox").value;


    //Funktionsanrop som returnerar en lista/array med värdena av radioknapparna
    var list = getRadioValues();
    //"Delar" listan och sparar de två olika indexen i var sin variabel
    valFood = list[0]; //Innehåller valet av menypaket - deluxe, standard eller mini
    valDrink = list[1]; //Innehåller valet av dryckespaket - wine, juice, non-alcoholic eller water


    //Skapar ett nytt objekt av booking och alltså en ny bokning innehållandes info om personen
    var newBooking = new Booking(NameOfRestaurant, fName, lName, phnNumber, email, valFood, valDrink, date, mComments);


    /**
     * NameOfRestaurant används som nyckel för varje restaurangs bokning i local storage
     *
     * if -  Kollar om det INTE finns något sparat i local storage med värdet av nyckeln
     * NameOfRestaurant (tex Noma) så skapas en ny lista där den nya bokningen lagras.
     *
     * else - Körs när if-satsen ovan inte stämmer och då hämtas key-value paret som innehåller
     * värdet av NameOfRestaurant (tex Noma). Sedan läggs den nya bokningen till efter i den listan.
     */
    if (localStorage.getItem(NameOfRestaurant) === null) {
        var newBookingList = [];
        newBookingList.push(newBooking);
        localStorage.setItem(NameOfRestaurant, JSON.stringify(newBookingList));
    } else {
        newBookingList = JSON.parse(localStorage.getItem(NameOfRestaurant));
        newBookingList.push(newBooking);
        localStorage.setItem(NameOfRestaurant, JSON.stringify(newBookingList));



    }
}

/**
 * Funktionen hämtar alla? eller den första? formen på sidan och
 * loopar genom den. Värderna från de element vars attributet är checked
 * sparas i en lista. Listan innehåller två värden som i den anropande funktioen
 * delas upp i två strängar.
 * @returns {Array}
 */
function getRadioValues() {

    var valuesFromRadio = document.forms[0];
    var list = [];
    var i;
    for (i = 0; i < valuesFromRadio.length; i++) {
        if (valuesFromRadio[i].checked) {
            list.push(valuesFromRadio[i].value);
        }
    }
    return list;
}

/**
 * Konstruktor för Booking
 * @param nameOfRestaurant
 * @param fName
 * @param lName
 * @param phnNumber
 * @param email
 * @param valFood
 * @param valDrink
 * @param date
 * @param mComments
 * @constructor
 */
function Booking(nameOfRestaurant, fName, lName, phnNumber, email, valFood, valDrink, date, mComments) {
    this.NameOfRestaurant = nameOfRestaurant;
    this.fName = fName;
    this.lName = lName;
    this.phnNumber = phnNumber;
    this.email = email;
    this.valFood = valFood;
    this.valDrink = valDrink;
    this.date = date;
    this.mComments = mComments;

}


/**
 * Hämtar ett värde från urlen som används för att identifiera och sedan bestämma vilken
 * restaurang som ska visas/användas
 * @param name
 * @param url
 * @returns {*}
 */
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 *Funktion som anropas i onsubmit i formuläret där användaren registrerar en ny bookning.
 *Först anropas funktionen saveNewBooking() som sparar den nya bokningen
 * Sen visas en alert som voch efter det skickas användaren till huvudu
 */
function saveNewBookingAndRedirect() {
    saveNewBooking();
    alert("Tack för din bokning! Vi ses snart.");
    window.location.href = "registration.html";
}

/**
 * Anropas när knappen Avbryt trycks på i ett formulär
 * Parameten bestämms av vilket formulär som används. Formuläret rensas och sedan
 * skickas användaren tillbaka till startsidan.
 * @param choise
 */
function resetForm(choise) {
    if (choise == "booking") {
        document.getElementById("newBookingForm").reset();
    }
    if (choise == "restaurant") {
        document.getElementById("formToSaveActivities").reset();

    }
    location.href = "registration.html";
}

/**
 * ::::GOOGLE MAPS::::
 **/

//Globala variabler så både initMap och getAndSetAdress kommer åt dom
var geocoder;
var map;

/**
 * Funktion för att skapa en ny instans av google maps
 * Koden är kopierad från googles dokumentation
 */
function initMap() {
    console.log("inintmap");

    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
        zoom: 15,
        center: latlng
    };
    map = new google.maps.Map(document.getElementById('googleMapsForSelectedActivity'), mapOptions);

}

/**
 * Funktion för att använda geocode. Dvs att sätta ut en marker och visa en adress
 * på google maps.
 * I stort sätt kopierad från googles dokumentation förutom att det skickas
 * med en parameter som innehåller den aktuella adressen.
 * @param adress
 */
function getAndSetAdress(adress) {
    geocoder.geocode({'address': adress}, function (results, status) {
        if (status == "OK") {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            console.log("funkar ej: " + status);

        }
    });

}



















