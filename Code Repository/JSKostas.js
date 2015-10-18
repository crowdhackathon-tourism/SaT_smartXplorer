 var beaconsWhiteList = [{
    "uuid": "E2C56DB5-DFFB-48D2-B060-D0F5A71096E0",
    "major":"6",
    "minor":"2",
    "identifier": "beacon_identifier_13" 
    },
    {
    "uuid": "E2C56DB5-DFFB-48D2-B060-D0F5A71096E0",
    "major":"5",
    "minor":"1",
    "identifier": "beacon_identifier_14" 
},
    {
        "uuid": "E2C56DB5-DFFB-48D2-B060-D0F5A71096E0",
        "major":"0", 
        "minor":"1",
        "identifier": "beacon_identifier_R2" 
}];
       
function constructPluginInputArgs(action) {
    console.log(arguments.callee.name);
    if (action != "registerBeacon" && action != "unregisterBeacon") {
        throw "invalid action";
    }
    var pluginInputArgs = {
        "plugin": "GLBPluginBeacon",
        "params": {
            "regions": beaconsWhiteList,
            "interval": "2"
        },
        "action": action
    };
    return pluginInputArgs;
}
                
function scanForBeaconsStart() {
    var pluginInputArgs = constructPluginInputArgs("registerBeacon");
    go.executePlugin(pluginInputArgs, scanForBeaconsStartCallback);
}

function scanForBeaconsStop() {
    //console.log(arguments.callee.name);
    var pluginInputArgs = constructPluginInputArgs("unregisterBeacon");
    go.executePlugin(pluginInputArgs, scanForBeaconsStopCallback);
}
var visitedPlaces = [];
var visitedPlacesIn = [];
function scanForBeaconsStartCallback(rs) {
    //console.log(rs);
    executeNotification(rs);
}

function executeNotification(rs){
    var foundedBeacons = rs.iBeacons;
    if (foundedBeacons.length > 0) {
        for(var i=0; i<foundedBeacons.length;i++) {
            var t = getTitle(foundedBeacons[i].major);
            var acc = parseFloat(foundedBeacons[i].accuracy.replace(",","."));
            //var proximity = foundedBeacons[i].proximity;
            if ( visitedPlaces.indexOf(foundedBeacons[i].major) == -1 && acc < 2 && acc > 0) {
                console.log(foundedBeacons[i].major);
                visitedPlaces.push(foundedBeacons[i].major);
                console.log(t);
                playAudio();
                localNotification(t,acc);
                animateMe(foundedBeacons[i].major);
            }
            if ( visitedPlacesIn.indexOf(foundedBeacons[i].major) == -1 && acc < 0.04  && acc > 0) {
                visitedPlacesIn.push(foundedBeacons[i].major);
                go.alert("You just approached the location: " + t,"Congratulations");
            }
        }
    }
}

function getTitle(maj) {
    var res;
    for (var j=0; j<myApp.template7Data.dataSitesObjectArray.length;j++) {
        if( myApp.template7Data.dataSitesObjectArray[j].beacon.major == maj ) {
            res = myApp.template7Data.dataSitesObjectArray[j].title;
            break;    
        }
    }
    return res;
} 

function scanForBeaconsStopCallback(rs) {
    //console.log(arguments.callee.name);
    console.log(rs);
}
      
function localNotification(titleDestination, accDestination){
    var t = new Date();
    t.setSeconds(t.getSeconds() + 3);
    
    var result = go.localNotification({'message': titleDestination + ' is ' + accDestination + 'm away from your location.', 'dateShow':go.utils.dateToGoDate(t)});
    console.log(JSON.stringify(result));
}

function initAudio() {
    go.media.initializeAudio({"id": "audio", "source": "Boing2.mp3", "callback": "callbackInit"});
}

function playAudio() {
    go.media.playAudio({"id": "audio", "numberOfLoops": "1", "callback": "callbackPlay"});
}
