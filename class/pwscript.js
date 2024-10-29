var csigns = {
    "Mg1-A": "CKC_Leader", // s. pilipovic
    "C937-IT-A": "(UniforM)", // yello
    "C9229-IT-LA": "Bitchin8675309", // b. bashford
    "C8787-IT": "Hawktuah18", // l. avery-quinn
    "X827105-P": "Baggles", // l. bowles
    "X103916-P": "make something up" // m. nine
}; // "callsign": "password" //name, "cs": "pw" //nm, etc.

var cclrs = {
    "Mg1-A": 1,
    "C937-IT-A": 1,
    "C9229-IT-LA": 5,
    "C8787-IT": 10,
    "X827105-P": null, // to be determined by job assignment
    "X103916-P": null // to be determined by job assignment
}; // "callsign": numerical clrclv, etc. see script.js for nclrclv translations

var csign = document.getElementById("csgn");
var pwd = document.getElementById("pwd");
var pbtn = document.getElementById("fbt");

function pullcred() { //function called (no arguments) by retcred button on pw.html
    let callsignAsString = csign.value; //localization of the username value
    let passwordAsString = pwd.value; //localization of the password value

    if (csigns[callsignAsString]) { //is the callsign valid
        if (csigns[callsignAsString] == passwordAsString) { //is the password correct
            let clearanceLevel = cclrs[callsignAsString];
            sessionStorage.setItem("clrc", clearanceLevel); //set clearance
        } else {
            pwd.style = "background-color: rgb(255, 0, 0);";
        }
    } else {
        csign.style = "background-color: rgb(255, 0, 0);";
    }
}
