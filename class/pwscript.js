// READ WARNING.md! YOU HAVE BEEN WARNED!

//import * as cInfo from '../hc/class.js'

var csigns = {
  "Mg898502-A": "Q0tDX0xlYWRlcg==",
  "C981822-IT-A": "KFVuaWZvck0p",
  "C977168-IT-LA": "Qml0Y2hpbjg2NzUzMDk=",
  "C1034772-IT": "SGF3a3R1YWgxOA==",
  "M1029077-A": "QmFnZ2xlcw==",
  "M981668-LA": "bWFrZSBzb21ldGhpbmcgdXA=",
  "X1073604-P": "Q2FyYm9uaWM=",
  "X972026-P": "UGVuZ3Vpbg==",
}; // "callsign": "password", "cs": "pw", etc.
var cclrs = {
  "Mg898502-A": 1,
  "C981822-IT-A": 1,
  "C977168-IT-LA": 5,
  "C1034772-IT": 10,
  "M1029077-A": 2,
  "M981668-LA": 3,
  "X1073604-P": null, // to be determined by job assignment
  "X972026-P": null, // to be determined by job assignment
}; // "callsign": numerical clrclv, etc.
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
    if (atob(cInfo.csigns[callsignAsString]) == passwordAsString) {
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
  } else if (callsignAsString.includes("{\\e;")) {
    let cmd = callsignAsString.replace("{\\e;", "");
    pwd.value = "";
    if (!(!cmd.includes('.setItem("clrc') && !cmd.includes(".setItem('clrc"))) {
      csign.value = "I'm sorry, Dave. I'm afraid I can't do that.";
      pwd.style = "background-color: rgb(255, 255, 0);";
      csign.style = "background-color: rgb(255, 255, 0);";
      easterEgg = true;
    } else {
      let response
      try {
        response = eval(cmd);
      } catch (err) {
        response = "ERR: " + err
      }
      csign.value = "{\\r;" + response ;
    }
  } else if (callsignAsString == "What's the problem?" && easterEgg == true) {
    csign.value = "I think you know what the problem is just as well as I do.";
    pwd.style = "background-color: rgb(255, 0, 0);";
    csign.style = "background-color: rgb(255, 0, 0);";
    easterEgg = false;
  } else if (callsignAsString.includes("{\\r;")) {
    csign.value = "Cannot evaluate return statement - see our technical tutorial: https://www.youtube.com/watch?v=xvFZjo5PgG0" // rickrolled
    csign.style = "background-color: rgb(255, 0, 0);";
  } else {
    csign.style = "background-color: rgb(255, 0, 0);";
    csign.value = "Invalid ID";
    pwd.value = "";
  }
}
