// READ WARNING.md! YOU HAVE BEEN WARNED!

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
  "EXPER": "ADMIN", // temp
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
  "EXPER": 24,
}; // "callsign": numerical clrclv, etc. see script.js for nclrclv translations
var cInfo = { csigns, cclrs };

var easterEgg = false;
var timesWrong = 0;
var maxTimesWrong = 1;

/*
var binCipherParamsPerCLRC = {
    1: {"flipInterval":2, "shiftInterval":6},
    2: {"flipInterval":4, "shiftInterval":3},
    3: {"flipInterval":5, "shiftInterval":1},
    4: {"flipInterval":3, "shiftInterval":0},
    5: {"flipInterval":1, "shiftInterval":2},
    6: {"flipInterval":10, "shiftInterval":4},
    7: {"flipInterval":7, "shiftInterval":3},
    8: {"flipInterval":8, "shiftInterval":8},
    9: {"flipInterval":4, "shiftInterval":2},
    10: {"flipInterval":9, "shiftInterval":3},
    11: {"flipInterval":2, "shiftInterval":1},
    12: {"flipInterval":1, "shiftInterval":6},
    13: {"flipInterval":2, "shiftInterval":7},
    14: {"flipInterval":9, "shiftInterval":6},
    15: {"flipInterval":4, "shiftInterval":6},
    16: {"flipInterval":5, "shiftInterval":6},
    17: {"flipInterval":3, "shiftInterval":6},
    18: {"flipInterval":9, "shiftInterval":5},
    19: {"flipInterval":3, "shiftInterval":2},
    20: {"flipInterval":5, "shiftInterval":7},
    21: {"flipInterval":6, "shiftInterval":6},
    22: {"flipInterval":9, "shiftInterval":1},
    23: {"flipInterval":4, "shiftInterval":7},
    24: {"flipInterval":1, "shiftInterval":4}
};
currently unused nonstandard ES keys */

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
            sessionStorage.setItem("protocol", "atob"); // set protocol
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
          sessionStorage.setItem("protocol", "atob"); // set protocol
          /*
                    for (var i = 0; i <= 24; i++) {
                        if (clearanceLevel > i) {
                            binCipherParamsPerCLRC[i] = "";
                        }
                    }
                    sessionStorage.setItem("key", binCipherParamsPerCLRC);
                    */
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
