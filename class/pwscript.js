var csigns = {
    "Mg898502-A": "CKC_Leader", // s. pilipovic
    "C981822-IT-A": "(UniforM)", // yello
    "C977168-IT-LA": "Bitchin8675309", // b. bashford
    "C1034772-IT": "Hawktuah18", // l. avery-quinn
    "M1029077-A": "Baggles", // l. bowles
    "X981668-P": "make something up", // m. nine
    "X1073604-P": "Carbonic", // s. wang
    "X972026-P": "Penguin" //L. Chittum
}; // "callsign": "password" //name, "cs": "pw" //nm, etc.

var cclrs = {
    "Mg898502-A": 1,
    "C981822-IT-A": 1,
    "C977168-IT-LA": 5,
    "C1034772-IT": 10,
    "M1029077-A": 2,
    "X981668-P": null, // to be determined by job assignment
    "X1073604-P": null, // to be determined by job assignment
    "X972026-P": null // to be determined by job assignment
}; // "callsign": numerical clrclv, etc. see script.js for nclrclv translations

var csign = document.getElementById("csgn");
var pwd = document.getElementById("pwd");
var pbtn = document.getElementById("fbt");

function pullcred() { //function called (no arguments) by retcred button on source index.html
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
