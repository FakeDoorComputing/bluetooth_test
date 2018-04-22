var mac="B8:27:EB:D2:4A:3F"; /* MAC address of Raspberry Pi Bluetooth module */


// connect to the raspberry pi
function connect(){
  bluesy.connect(mac, con_success, con_failure);
}

// connection successful
function con_success(){
  bluesy.read(function (data){
    $("#display").text(data+"\n");
  });
}

// connection unsuccessful
function con_failure(){
  alert("ERROR CONNECTING");
}

// disconnect bluetooth
function disconnect(){
  bluesy.disconnect(dis_success, dis_failure);
}

// disconnection successful
function dis_success(){
  alert("Disconnected");
}

// disconnection unsuccessful
function dis_failure(){
  alert("ERROR DISCONNECTING");
}

connect();  
