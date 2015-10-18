var myApp;
var mainView;
var $$ = Dom7;
var beaconsSpotsObjArray = []; //array containing objects created from the http://odysseus.culture.gr/ opendata portal matched with the beacons ids
//var wishlistObjArray = [];  //objects inserted after clicking on wishlist button
var visitedObjArray = [];   //objects inserted after visiting a place, used in maps to change the icon
var badgesGainedArray = []; //objects inserted after visiting a place ( or paying a ticket )
var offersArray = []; //array of objects that contain the available badges (offers) 
var dataCategoriesObjectArray = [] //array of category objects
/*beacons*/ 
var rs = {    
   "status":"success",  
   "iBeacons":[    
      {   
         "minor":"1", 
         "rssi":"-52", 
         "major":"5", 
         "proximity":"Near",
         "accuracy":"0.42",
         "uuid":"E2C56DB5-DFFB-48D2-B060-D0F5A71096E0" 
      },
      {  
         "minor":"2",
         "rssi":"-60",
         "major":"6",
         "proximity":"Near",
         "accuracy":"0.95",
         "uuid":"E2C56DB5-DFFB-48D2-B060-D0F5A71096E0"
      }
   ],
   "errorDesc":""
};
var mappingBeaconsWithLatLong = [{
            "uuid": "E2C56DB5-DFFB-48D2-B060-D0F5A71096E0",
            "major":"6",
            "minor":"2",
            "identifier": "beacon_identifier_13",
            "Lat":"37.9744772", 
            "Long":"23.7252999"
            },
            {
            "uuid": "E2C56DB5-DFFB-48D2-B060-D0F5A71096E0",
            "major":"0",
            "minor":"1",
            "identifier": "beacon_identifier_13",
            "Lat":"37.9763471",
            "Long":"23.7264575"
        },
        {
            "uuid": "E2C56DB5-DFFB-48D2-B060-D0F5A71096E0",
            "major":"5",
            "minor":"1",
            "identifier": "beacon_identifier_13",
            "Lat":"37.9741571",
            "Long":"23.7248163"
        },
                {
                    "uuid": "-",
            "major":"5",
            "minor":"1",
            "identifier": "beacon_identifier_13",
            "Lat":"37.9751058",
            "Long":"23.7332588",
        },
                        {
                    "uuid": "-",
            "major":"5",
            "minor":"1",
            "identifier": "beacon_identifier_13",
            "Lat":"37.9752622",
            "Long":"23.7279153",
        },
        {
            "uuid": "-",
            "major":"5",
            "minor":"1",
            "identifier": "beacon_identifier_13",
            "Lat":"37.9763441",
            "Long":"23.7295319",
        }
        ];
        
 /*beacons*/   
 
 /*data*/

 dataCategoriesObjectArray = [{ 
        id:0,
        categoryName:"Church",
        tourismType:"Religious Tourism"
    },
    {
        id:1,
        categoryName:"Archaeological Site",
        tourismType:"Cultural Tourism"
    },
    {
        id:2,
        categoryName:"Museum",
        tourismType:"Cultural Tourism"
    },
    {
        id:3,
        categoryName:"Entertainment",
        tourismType:"Entertainment Tourism"
    },
    {
        id:4,
        categoryName:"Architecture",
        tourismType:"Cultural Tourism"
    },
    {
        id:5,
        categoryName:"Music",
        tourismType:"Entertainment Tourism",
        
    },
    {
        id:6,
        categoryName:"Squares",
        tourismType:"Cultural Tourism"
        
        
    },
    {
        id:7,
        categoryName:"Accomodation",
        tourismType:""
        
    },
    {
        id:8,
        categoryName:"Food/Drink",
        tourismType:""
        
    }
];

offersArray = [
    {
        id:0,
        offer:"REDEEM 4 BADGES AND GET  <div class='offerRed'>20% OFF</div> AT ATHENS CYPRIA HOTEL",
        badges:4
    },
    {
        id:1,
        offer:"REDEEM 10 BADGES AND GET  <div class='offerRed'>A FREE</div> TICKET TO ACROPOLIS",
        badges:10
    },
    {
        id:2,
        offer:"REDEEM YOUR BADGES FOR <div class='offerRed'>1 + 1 COFFEE</div> AT EVEREST EATERY",
        badges:2
    }
];

$(document).ready(function () {
   myApp = new Framework7({ 
        template7Pages: true, //enable Template7 rendering for pages
        pushState: true,
        cache:false,
        template7Data: {
            wishlistObjArray:[],
dataSitesObjectArray: [
    {
        id: 0,
        title: "The Museum of Popular Instruments",
        description: "About half of the instruments forming the Anoyanakis Collection are on public display. They have been selected on the criterion not only of their aesthetic and decorative value but, in particular, of their ethnological and musicological interest. The remaining instruments are available for research and for travelling exhibitions to be held in schools etc and for occasional exhibitions of a special nature. The permanent exhibition is spread over three floors and divided into four sections, corresponding to the groups of determined by the material that is made to vibrate in order to produce sound. The objects of the Museum and Research Centre, as stated in the foundation charter, are as follows: 1) The collection, maintenance and display of popular musical instruments and generally of any material contributing to the research study and furtherance of Greek musical tradition, 2) The promotion of research and study in connection with ethnomusicological subjects, in addition to the identification and dissemination of traditional music, 3) The preservation, study, projection and dissemination by all available means of Greek folk and Byzantine musical tradition, both in Greece and abroad, and 4) The creation of a special ethnomusicological and audio-visual archive. The MELMOKE organizes traditional music lessons",
        smallDescription: "The Museum of Popular Instruments - Research Centre for Ethnomusicology comprises the collection of about 1200 Greek popular musical instruments dating from the 18th century to the present day.",
        amenities: "Not Available Information",
        photopath: "musicMuseum.jpg",
        category: dataCategoriesObjectArray[2].categoryName,
        availableOffer: offersArray[1],
        badges: 1,
        beacon: mappingBeaconsWithLatLong[0], //Lat: long: 37.9742389,23.7254488
        hasTicket: false

                },
    {
        id: 1,
        title: "Church of Panagia Kapnikarea",
        description: "It is estimated that the church was built some time in the 11th century, perhaps around 1050. As it was common with the early Christian churches, this was built over an ancient Greek pagan temple dedicated to the worship of a goddess, possibly Athena or Demeter.It appears that the Kapnikarea church may have originally been the katholikon of a monastery. Presently, the building is formed by a complex of three different units attached together; these units were built in succession: a) the largest south church dedicated to the Presentation of Mary to the Temple, b) the chapel of St Barbara on the northern side; and c) the exonarthex with the propylon to the west.The larger of the two churches, the south one, is a domed complex, cross-in-square, has been dated (on the basis of morphological criteria) to just after the middle of the 11th century.",
        smallDescription: "The Church of Panagia Kapnikarea or just Kapnikarea is a Greek Orthodox church and one of the oldest churches in Athens",
        amenities: "Not Available Information",
        photopath: "kapnikarea.jpg",
        category: dataCategoriesObjectArray[0].categoryName,
        availableOffer: offersArray[2],
        badges: 1,
        beacon: mappingBeaconsWithLatLong[1],
        hasTicket: false

                },
    {
        id: 2,
        title: "Horologion of Andronikos Kyrristos",
        description: "The octagonal tower (3.20 m. long on each side) stands on a base of three steps and is built of white Pentelic marble. It has a conical roof, a cylindrical annex on the south side, and two Corinthian porches, one on the NE and one on the NW side. At the top of each of the eight sides there is a relief representation of a wind, symbolized by a male figure with the appropriate attributes and its name inscribed on the stone. There were sundials on the external walls and an elaborate waterclock in the interior. The tower was built in the first half of the 1st century B.C. by the astronomer Andronicos, from Kyrrhos in Macedonia. In the early Christian period, the Tower of the Winds was converted into a church or a baptesterion of an adjacent church, while the area outside the NE entrance was occupied by a Christian cemetery. In the 15th century A.D., Cyriacus of Ancona mentions the monument as the temple of Aeolos while an anonymous traveller refers to it as a church. In the 18th century it was used as the tekke of the Dervishes. The monument had been half-buried by the earth accumulated over the centuries. It was excavated between 1837 and 1845 by the Greek Archaeological Society.",
        smallDescription: "The Tower of the Winds or the Horologion of Andronikos Kyrrhestes is an octagonal Pentelic marble clocktower in the Roman Agora in Athens that functioned as a horologion or 'timepiece'.",
        amenities: "Not Available Information",
        photopath: "aerhdes.jpg",
        category: dataCategoriesObjectArray[1].categoryName,
        availableOffer: offersArray[0],
        badges: 1,
        beacon: mappingBeaconsWithLatLong[2], //37.9742389,23.7254488
        hasTicket: true
                },
    {
        id: 3,
        title: "Everest Eatery in Syntagma",
        description: "Need something to eat and drink to continue your walk around Athens? Everest is the place to be",
        smallDescription: "The highest peak of taste!",
        amenities: "All areas are wheelchair accessible.",
        photopath: "everest.png",
        category: dataCategoriesObjectArray[8].categoryName,
        availableOffer: offersArray[1],
        badges: 1,
        beacon: mappingBeaconsWithLatLong[3], //37.976861,23.6591087
        hasTicket: false
                },
    {
        id: 4,
        title: "Metropolitan Cathedral of Athens",
        description: "When Athens became the capital of Greece in 1834, a cathedral was needed here. Construction on the Mitrópoli began on Christmas Day in 1842 with the laying of the cornerstone by King Otto and Queen Amalia. Workers used marble from no less than 72 demolished churches to build the Mitrópoli's immense walls.Three architects and 20 years later, it was complete. The king and queen were present at the dedication on May 21, 1862 in honor of the Evangelismós Theotókou (Annunciation of the Virgin).The Mitrópoli is the seat of the Bishop of Athens and an important spiritual center of Greek Orthodoxy. It remains a major city landmark and the site of official ceremonies like coronations and important weddings and funerals.",
        smallDescription: "The Metropolitan Cathedral of the Annunciation popularly known as the 'Mētrópolis', is the cathedral church of the Archbishopric of Athens and all Greece",

        amenities: "All public areas are wheelchair accessible.",
        photopath: "metropolis.jpg",
        category: dataCategoriesObjectArray[0].categoryName,
        availableOffer: offersArray[0],
        badges: 2,
        beacon: mappingBeaconsWithLatLong[4],
        hasTicket: false
    },
    {
        id: 5,
        title: "Athens Cypria Hotel",
        description: "Best place for a smartXplorer to rest his body and mind after a long exploration throught the city.",
        smallDescription: "SmartXplorers' book smart hotels! ",
        amenities: "All areas are wheelchair accessible.",
        photopath: "cypriaHotel.jpg",
        category: dataCategoriesObjectArray[7].categoryName,
        availableOffer: offersArray[1],
        badges: 1,
        beacon: mappingBeaconsWithLatLong[5], //37.9763441,23.7295319,
        hasTicket: false
    }
                ]
         }
    }),
    mainView = myApp.addView('.view-main');  
    // initialize map page 
   
    myApp.onPageInit('map', function () {  
    
        initialize(myApp.template7Data.dataSitesObjectArray); 
        scanForBeaconsStart();
    });
    myApp.onPageInit('login', function () {  
        $('html').addClass('with-statusbar-overlay');  
        initAudio();
    });
    
    myApp.onPageInit('pgDetails', function () {
        console.log(myApp.template7Data.wishlistObjArray.length);
        checkWishList(mainView.activePage.context.id,'#wishlistItem');
        hasTickets(mainView.activePage.context.hasTicket);
        closeWin();
    })


}); 

 



