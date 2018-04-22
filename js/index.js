var mac="B8:27:EB:D2:4A:3F"; /* MAC address of Raspberry Pi Bluetooth module */

document.addEventListener('deviceready',
  function(){check_conn()},
  false);

// connect to the raspberry pi
function connect(){
  console.log("bluetooth is on");
  bluetoothSerial.connect(mac, con_success, con_failure);
}

// connection successful
function con_success(){
  $("#display").html("Connected\n")
  bluetoothSerial.write("connected");
  bluetoothSerial.subscribe("\n",function (data){
    $("#display").html("*"+data+"*");
    if(data=="locked\n"){
      $("#display").html("Locked");
    }
    else{
      $("#display").html("Unlocked");
    }
  });
}

// connection unsuccessful
function con_failure(){
  alert("ERROR CONNECTING");
}

// disconnect bluetooth
function disconnect(){
  bluetoothSerial.disconnect(dis_success, dis_failure);
}

// disconnection successful
function dis_success(){
  alert("Disconnected");
}

// disconnection unsuccessful
function dis_failure(){
  alert("ERROR DISCONNECTING");
}

function check_conn(){
  bluetoothSerial.isEnabled(connect, bt_off);
}

function bt_off(){
  alert("Bluetooth not on");
}
