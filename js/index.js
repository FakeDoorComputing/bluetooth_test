var mac="B8:27:EB:D2:4A:3F"; /* MAC address of Raspberry Pi Bluetooth module */

// (document).ready for desktop, 'deviceready' for mobile
$(document).ready(function(){
/*document.addEventListener('deviceready',
  function(){ */
    $("button").click(function(){
      /* when the button is clicked, check if bluetooth is on */
      check_conn()
    })
  },false);

  function check_conn(){
    /* if bluetooth is on, connect, else show warning */
    bluetoothSerial.isEnabled(connect, bt_off);
  }

  // connect to the raspberry pi
  function connect(){
    $("#message").html("Bluetooth is on");
    console.log("bluetooth is on"); /* for development */
    /* connect to the hard coded MAC address of the PI */
    bluetoothSerial.connect(mac, function(){
      /* send connected signal to pi */
    /*  bluetoothSerial.write("connected"); */
      con_success();
    }, con_failure);
  }

  // connection successful
  function con_success(){
    /* keep looping through con_success*/
    while(true){
      /* keep listening for data from pi */
      $("#message").append("\nListening....");
      bluetoothSerial.subscribe("\n",function (data){
        $("#message").append("\n*"+data+"*");
  /*      if(data=="locked\n"){
          $("#display").html("Locked");
        }
        else{
          $("#display").html("Unlocked");
        }   */
      });
      /* empty the buffer */
      bluetoothSerial.clear();
    }
  }

  // connection unsuccessful
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
