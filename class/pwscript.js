//import * as cInfo from '../hc/class.js'

var csigns = {
  "Mg898502-A": "CKC_Leader", // s. pilipovic
  "C981822-IT-A": "(UniforM)", // yello
  "C977168-IT-LA": "Bitchin8675309", // b. bashford
  "C1034772-IT": "Hawktuah18", // l. avery-quinn
  "M1029077-A": "Baggles", // l. bowles
  "X981668-P": "make something up", // m. nine
  "X1073604-P": "Carbonic", // s. wang
  "X972026-P": "Penguin", //L. Chittum
}; // "callsign": "password" //name, "cs": "pw" //nm, etc.
var cclrs = {
  "Mg898502-A": 1,
  "C981822-IT-A": 1,
  "C977168-IT-LA": 5,
  "C1034772-IT": 10,
  "M1029077-A": 2,
  "X981668-P": null, // to be determined by job assignment
  "X1073604-P": null, // to be determined by job assignment
  "X972026-P": null, // to be determined by job assignment
}; // "callsign": numerical clrclv, etc. see script.js for nclrclv translations
var protocols = {
  0:'throw new Error(\"No stored protocol\");',
  1:'totalFlip',
  2:'totalFlip',
  3:'totalFlip',
  4:'totalFlip',
  5:'totalFlip',
  6:'totalFlip',
  7:'totalFlip',
  8:'totalFlip',
  9:'totalFlip',
  10:'atob',
  11:'totalFlip',
  12:'atob',
  13:'totalFlip',
  14:'atob',
  15:'totalFlip',
  16:'atob',
  17:'totalFlip',
  18:'atob',
  19:'totalFlip',
  20:'atob',
  21:'atob',
  22:'atob',
  23:'atob',
  24:'atob'
};
var cInfo = { csigns, cclrs };

var easterEgg = false;
var timesWrong = 0;
var maxTimesWrong = 1;

var csign = document.getElementById("csgn");
var pwd = document.getElementById("pwd");

function pullcred() {
  //function called (no arguments) by retcred button on source index.html
  let callsignAsString = csign.value; //localization of the username value
  let passwordAsString = pwd.value; //localization of the password value

  if (cInfo.csigns[callsignAsString]) {
    //is the callsign valid
    if (cInfo.csigns[callsignAsString] == passwordAsString) {
      //is the password correct
      let clearanceLevel = cInfo.cclrs[callsignAsString];
      if (
        timesWrong <= maxTimesWrong &&
        localStorage.getItem("suspect") == null
      ) {
        if (localStorage.getItem("regUser")) {
          if (localStorage.getItem("regUser") == callsignAsString) {
            sessionStorage.setItem("clrc", clearanceLevel); //set clearance
            sessionStorage.setItem("protocol", protocols); // set protocol
            location.href = "../../unclass/index.html";
          } else {
            csign.value = "Code 192 security block\nContact an IT technician";
            csign.style = "background-color: rgb(255, 255, 0);";
            pwd.value = "";
            pwd.style = "background-color: rgb(255, 255, 0);";
            localStorage.setItem("regUser", "UNCLEARED");
          }
        } else {
          sessionStorage.setItem("clrc", clearanceLevel); //set clearance
          localStorage.setItem("regUser", callsignAsString); // set regular user
          sessionStorage.setItem("protocol", protocols); // set protocol
          location.href = "../../unclass/index.html";
        }
      } else {
        localStorage.setItem("suspect", true);
        pwd.style = "background-color: rgb(255, 0, 0);";
        csign.value =
          "Password incorrect too many times.\nContact an IT technician.";
        pwd.value = "";
        localStorage.setItem("regUser", "UNCLEARED");
      }
    } else {
      pwd.style = "background-color: rgb(255, 0, 0);";
      timesWrong = timesWrong + 1;
      if (timesWrong > maxTimesWrong) {
        localStorage.setItem("suspect", true);
        pwd.style = "background-color: rgb(255, 0, 0);";
        csign.value =
          "Password incorrect too many times.\nContact an IT technician.";
        pwd.value = "";
        localStorage.setItem("regUser", "UNCLEARED");
      }
    }
  } else if (callsignAsString.includes("{\\e;") == true) {
    let cmd = callsignAsString.replace("{\\e;", "");
    pwd.value = "";
    if (!(!cmd.includes('.setItem("clrc') && !cmd.includes(".setItem('clrc"))) {
      csign.value = "I'm sorry, Dave. I'm afraid I can't do that.";
      pwd.style = "background-color: rgb(255, 255, 0);";
      csign.style = "background-color: rgb(255, 255, 0);";
      easterEgg = true;
    } else {
      csign.value = "{\\r;" + eval(cmd);
    }
  } else if (callsignAsString == "What's the problem?" && easterEgg == true) {
    csign.value = "I think you know what the problem is just as well as I do.";
    pwd.style = "background-color: rgb(255, 0, 0);";
    csign.style = "background-color: rgb(255, 0, 0);";
    easterEgg = false;
  } else {
    csign.style = "background-color: rgb(255, 0, 0);";
    csign.value = "Invalid ID";
    pwd.value = "";
  }
}
