

//check if details are already expanded
var showMore = true;

function closePopover(){
    myApp.closeModal();
}
 
function hasTickets(hasTicketFlag){
    if(!hasTicketFlag){
        $('#tickets').css('opacity','0.5');
        $('#tickets').attr('disabled','disabled');
    }
} 

function buyTicket(){
        $('#tickets').css('opacity','0.5');
        $('#tickets').attr('disabled','disabled');
} 

function addtoWishlist(myClass,id,name){
    console.log(myClass);
    var wishListItem = {
        title:name,
        id:id
    }; 
    console.log(wishListItem);
    myApp.template7Data.wishlistObjArray.push(wishListItem);
    $(myClass).css('opacity','0.5')
    $(myClass).attr('disabled','disabled');
     
}

function showMoreDetails(){
    if(showMore == true){ 
        $('.detailsInfoSection').css('height','100%');
        $('.more').text('▲');
        showMore = false;
    }
    else{
        $('.detailsInfoSection').css('height','100px');
         $('.more').text('▼');
        showMore = true;
    }
} 

function replaceChar(myString){
    return myString.replace("\"","");
}

function checkWishList(id,itemId){
   console.log(id,itemId)
    for(var i=0;i<myApp.template7Data.wishlistObjArray.length;i++){
         console.log('inside '+ myApp.template7Data.wishlistObjArray[i].id);
        if(myApp.template7Data.wishlistObjArray[i].id == id){
               
                $(itemId).css('opacity','0.5')
                $(itemId).attr('disabled','disabled');
            }
        }
}

