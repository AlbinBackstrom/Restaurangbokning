/**
 * Den första funktionen som körs i onload på den första html-sidan (registration.html)
 */
function createAndSavePredefinedRestaurants() {

    //Skapar upp en lista med 3 fördefinerade restuaranger
    var listOfRestaurants = [
        {
            "IdOfRestaurant": 0,
            "NameOfRestaurant": "Maaemo",
            "NumberOfStars": 3,
            "Prices": {
                "food": {
                    "deluxe": {
                        "numberOfCourses": 20,
                        "price": 2600
                    },
                    "standard": {
                        "numberOfCourses": 15,
                        "price": 1800
                    },
                    "mini": {
                        "numberOfCourses": 12,
                        "price": 1200
                    }
                },

                "drink": {
                    "winePairing": 1300,
                    "juiceParing": 800,
                    "nonAlcoholicPairing": 400,
                    "water": 0
                }

            },
            "WebAddress": "http://www.maaemo.no",
            "AdressOfRestaurant": {
                "streetname": "Schweigaardsgate 15b",
                "postalcode": "0191",
                "city": "Oslo",
                "country": "Norway"
            },
            "Media": "https://andershusa.com/wp-content/uploads/2016/10/studio-friends-maaemo-torsten-vildgaard-esben-holmboe-bang-michelin-stars-four-hands-dinner-copenhagen-denmark-scandinavia-food-foodie-eat-eating-dine-dining-travel-2016-11.jpg"
        },
        {
            "IdOfRestaurant": 1,
            "NameOfRestaurant": "Noma",
            "NumberOfStars": 2,
            "Prices": {
                "food": {
                    "deluxe": {
                        "numberOfCourses": 19,
                        "price": 2400
                    },
                    "standard": {
                        "numberOfCourses": 15,
                        "price": 1900
                    },
                    "mini": {
                        "numberOfCourses": 12,
                        "price": 1500
                    }
                },

                "drink": {
                    "winePairing": 1800,
                    "juiceParing": 500,
                    "nonAlcoholicPairing": 400,
                    "water": 0
                }

            },
            "WebAddress": "http://www.noma.dk",
            "AdressOfRestaurant": {
                "streetname": "Strandgade 93",
                "postalcode": "1401",
                "city": "Copenhagen",
                "country": "Denmark"
            },
            "Media": "http://www.luxeat.com/images/2015/01/L1160228-1200x799.jpg"

        },
        {
            "IdOfRestaurant": 2,
            "NameOfRestaurant": "Geranium",
            "NumberOfStars": 3,
            "Prices": {
                "food": {
                    "deluxe": {
                        "numberOfCourses": 21,
                        "price": 2600
                    },
                    "standard": {
                        "numberOfCourses": 19,
                        "price": 1800
                    },
                    "mini": {
                        "numberOfCourses": 12,
                        "price": 1200
                    }
                },

                "drink": {
                    "winePairing": 1300,
                    "juiceParing": 800,
                    "nonAlcoholicPairing": 400,
                    "water": 0
                }

            },
            "WebAddress": "http://www.geranium.dk/",
            "AdressOfRestaurant": {
                "streetname": "Per Henrik Lings Allé 4",
                "postalcode": "DK-2100",
                "city": "Copenhagen",
                "country": "Denmark"
            },
            "Media": "http://www.chefsworld.net/blog/wp-content/uploads/2016/03/Geranium-Restaurant.png"

        }
    ];

    /**
     * Kontrollerar innehållet i LS.
     * Om LS är tomt sparas den fördefinerade listan i LS, annars så händer ingenting.
     * If satsen behövs för att datat som användaren matar in inte ska skrivas över av den
     * fördefinerade listan.
     * */
    if (localStorage.getItem("listOfRestaurantsInLS") === null) {

        localStorage.setItem("listOfRestaurantsInLS", JSON.stringify(listOfRestaurants));
    }

    //Hämtar en div med idt selectList och skapar en select list med värden från functionen som anrops.
    document.getElementById("selectList").innerHTML = makeSelectList();
}

/**
 * skapar och returnerar  en select list med värden från localstorage.
 * value i listan sätts till idt som restaurangen har i listOfRestaurantsInLS
 * @returns {string}
 */
function makeSelectList() {

    var selectListOfRestaurants = JSON.parse(localStorage.getItem("listOfRestaurantsInLS"));
    var nonSelectable = "<option selected disabled>Välj aktivitet</option>";
    var options = "";
    for (i = 0; i < selectListOfRestaurants.length; i++) {

        options += "<option value= " + selectListOfRestaurants[i].IdOfRestaurant + ">" + selectListOfRestaurants[i].NameOfRestaurant + "</option>";
    }
    console.log(selectListOfRestaurants);

    //selectlistan får ett id för att kunna anropas från onchangefunktionen
    return "<select class='form-control' id='selectListForAllRestaurants' onchange=activitySelected();>" + nonSelectable + options + "</select>";
}

/**
 * När en restuarang vals i selectlistan körs koden nedan. Varje restuarang har sitt unika id
 * som används för att identifiera restaurangen. När en restaurang har valts så skickas
 * användaren vidare och i url:en finns restaurangens id som används för att hämta information
 * till den nästkommande sidan som är new-booking.html
 */
function activitySelected() {
    var selectedId = document.getElementById("selectListForAllRestaurants").value;
    console.log(selectedId);
    location.href = "new-booking.html?id=" + selectedId;
    console.log(location.href = "new-booking.html?id=" + selectedId);

}
