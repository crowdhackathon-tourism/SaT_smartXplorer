function openProfile() {
    mainView.router.load({url:'pgProfile.html',contextName:'wishlistObjArray'});
    closePopover();
}

function openNearMe() {
    mainView.router.loadPage('pgMap.html');
    closePopover(); 
}