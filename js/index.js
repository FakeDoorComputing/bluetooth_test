var mac_add="B8:27:EB:D2:4A:3F", connected=false; /* MAC address of Raspberry Pi Bluetooth module */

document.addEventListener('deviceready', function(){
    $("button").click(function(){
      /* when the button is clicked, check if bluetooth is on */
      check_conn()
    })
  },false);

function check_conn(){
  $("#message").append("<p>\n\nChecking bluetooth status...</p>");
  /* if bluetooth is on, connect, else show warning */
  bluetoothSerial.isEnabled(connect, bt_off);
}

// connect to the raspberry pi
function connect(){
  $("#message").append("<p>\n\nBluetooth is on</p>");
  console.log("bluetooth is on at mac "+mac_add);
  /* connect to the hard coded MAC address of the PI */
  bluetoothSerial.connect(mac_add, con_success, con_failure);
}

// connection successful
function con_success(){
  connected=true;
  console.log("con_success, "+connected)
  /* keep looping through con_success*/
  while(connected){
    /* keep listening for data from pi */
    bluetoothSerial.subscribe("\n",function (data){
      console.log("subscribe finished")
      $("#message").append("</p>\n*"+data+"*</p>");
    },function(){
      console.log("no data recieved");
    });
  }
}

function con_failure(){
  alert("ERROR CONNECTING");
}

// disconnect bluetooth
function disconnect(){
  /* disconnect from the bluetooth */
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

function bt_off(){
  alert("Bluetooth not on");
}
