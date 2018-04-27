var connected=false; /* MAC address of Raspberry Pi Bluetooth module */

// (document).ready for desktop, 'deviceready' for mobile
//$(document).ready(function(){
document.addEventListener('deviceready',
  function(){
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
    console.log("bluetooth is on at mac "+app.mac_add); /* for development */
    /* connect to the hard coded MAC address of the PI */
    bluetoothSerial.connect(app.mac_add, connectedIsTrue, app.con_failure);
  }

  function connectedIsTrue(){
    connected=true;
    console.log("connected=true");
    $("#message").append("<p>\n\nConnected=true</p>");
    con_success();
  }

  var app={
    mac_add: "B8:27:EB:D2:4A:3F",
    connected: function(){
      connected=true;
      console.log("connected=true");
      $("#message").append("<p>\n\nConnected=true</p>");
      con_success();
    },
  // connection unsuccessful
    con_failure: function con_failure(){
      alert("ERROR CONNECTING");
    }
  }
  // connection successful
  function con_success(){
    console.log("con_success, "+connected)
    /* keep looping through con_success*/
    while(connected){
    //  console.log("in the loop")
      /* keep listening for data from pi */
    //  $("#message").append("\nListening....");
    //  console.log("listening")
      bluetoothSerial.subscribe("\n",function (data){
        console.log("subscribe finished")
        $("#message").append("</p>\n*"+data+"*</p>");
      },function(){
        console.log("no data recieved");
      });
      /* empty the buffer */
    //  console.log("clear the buffer")
    //  bluetoothSerial.clear();
    }
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
