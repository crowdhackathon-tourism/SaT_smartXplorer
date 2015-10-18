var map;
var longitude;
var latitude;
var locationsTbl;
 var marker,mymarker;
 var markers=[];
 var infoWindows=[];
 
 function initialize(customObj) {    
   console.log(customObj);
   locationsTbl= customObj; 
    var map = new google.maps.Map(document.getElementById('map'), { 
    zoom: 15,
      center: new google.maps.LatLng(37.974552, 23.728361),  
      mapTypeId: google.maps.MapTypeId.ROADMAP ,
       panControl:false,
        styles:[{
            featureType:"poi",
            elementType:"labels",
            stylers:[{
                visibility:"off"
            }]
        }]
    });

    var infowindow = new google.maps.InfoWindow(  
            { 
                closeBoxURL: "", 
                closeBoxMargin : "",
               
            }
    );
 

    var i, j,image;
    for (i = 0; i < locationsTbl.length; i++) { 
      if (locationsTbl[i].title == 'Everest Eatery in Syntagma')  {
         image= 'everest_1.png';
      }
     else if (locationsTbl[i].title == 'Athens Cypria Hotel')  { 
         image= 'Hotel-bed-icon.png';
      }
     else {
           image= 'icon2.png';
      }
      marker = new google.maps.Marker({
          position: new google.maps.LatLng(locationsTbl[i].beacon.Lat, locationsTbl[i].beacon.Long),
          icon: image,  
        map: map,
    id: i
      });
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
            
            console.log('location '+locationsTbl[i].id)
            myApp.closeModal();
            infowindow.setContent('<a href="#" data-picker=".picker-1" class="open-picker" ><div id="test"> '+ locationsTbl[i].title +' </div> </a>');
            infowindow.open(map, marker);
            setInfoWin(i);
            infoWindows.push(infowindow);
        }
      })(marker, i));
    markers.push(marker);
    }

      mymarker = new google.maps.Marker({
        position: new google.maps.LatLng(37.974552, 23.728361),  
        icon:'icon1.png',
         //animation:google.maps.Animation.BOUNCE,
        map: map
    });
    function setInfoWin(i) { 
      
        google.maps.event.addDomListener(infowindow, 'domready', function() {
            $('#test').click(function() {
            $('.picker-modal-inner_rightContentTitle').html(locationsTbl[i].title);
            $('.picker-modal-inner_rightContentContent').html(locationsTbl[i].smallDescription); 
            $('.toolbar_inner_down .left').html(locationsTbl[i].category); 
            $('.picker-modal-inner_leftContent').css({
                'background': 'url(' + locationsTbl[i].photopath +')',
                'background-position':'center',
                'background-size':'cover'
                })
            });
            var thisClass = "'.picker-modal-inner_map_img_1'";
            var thisPlace = "'"+locationsTbl[i].title+"'";
            $('div').remove('.picker-modal-inner_map_img_1,.picker-modal-inner_map_img_3');
            $('.picker-modal-inner_map_img').append('<div class="picker-modal-inner_map_img_1" id='+i+' onclick="addtoWishlist('+thisClass+','+i+','+replaceChar(thisPlace)+')"> </div>');
            $('.picker-modal-inner_map_img').append('<div class="picker-modal-inner_map_img_3" onclick=mainView.router.load({url:"pgDetails.html",contextName:"dataSitesObjectArray.' + locationsTbl[i].id +'"})> MORE </div>');
            checkWishList(locationsTbl[i].id,'#'+i); 
            /*         $('.picker-modal-inner_map_img_3').click(function() {
            mainView.router.load({url:'pgDetails.html',contextName:'dataSitesObjectArray.'+ locationsTbl[i].id +''}) 
        });*/
        })
       
    }    
 
 
}
// anmimate pin with id  6,0,5
function animateMe(major) { 
    var id;
    if (major== 6) {id = 0}
    if (major== 0) {id = 1}
    if (major== 5) {id = 2} 
    markers[id].setAnimation(google.maps.Animation.BOUNCE);   
    setTimeout(function(){ markers[id].setAnimation() }, 5000);
}
function closeWin() {
    infoWindows[0].close(); 
}
