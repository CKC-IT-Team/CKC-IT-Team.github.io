import("./AESutil.java");

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

var clrctokeys = {
    1: "df565d1e70632c60cd0ed093b45435a9",
    2: "06dc707e008eb37d286db31509c67390",
    3: "92df70a9bd63b150987760f4e67b0f9b",
    4: "027b2d9b9db3b966bbee5730bf9325ee",
    5: "67d8087b3eaf94c55ab0341792db4486",
    6: "dfa9bb61c80cd95344ca7e124abdd6ad",
    7: "d35e42a01f8faf0b779f654338095678",
    8: "19ac53ea7a28fc2664859ba3657b7d27",
    9: "c41f5a4772cb5a583db1f4fcb21bd91f",
    10: "6f3670b87119dd0ba2e7132fe6bc452e",
    11: "94b0f3c3df6472ab4fd9c007c055b66b",
    12: "51674430838e799bd49f487774161f7a",
    13: "aaa141f74a1779371ecf0cbdbb8dff88",
    14: "16562cbcdafb4cd87562ce206fd1f1e9",
    15: "f25083f35ff50ab6815e007718065981",
    16: "351a9f862029bf3b4ff14620a82957a0",
    17: "7313947198fcf9a2f8274a3f65fcc10b",
    18: "67a66454327a9a6d8fcb84df9390b3d5",
    19: "d2b350cb4468251425d3f18e19d131ed",
    20: "113d7771efb544baf8087d28047a0e9b",
    21: "aa47b0577bc3b444d1a6451ee4820596",
    22: "8b45f4e9557d5150f17392562eb35267",
    23: "b68361235f4ced58b242d9fd4fd3ff2e",
    24: "d056c420cc2658c1b37ca1b4b29dc225"
};

var csign = document.getElementById("csgn");
var pwd = document.getElementById("pwd");

function pullcred() { //function called (no arguments) by retcred button on source index.html
    let callsignAsString = csign.value; //localization of the username value
    let passwordAsString = pwd.value; //localization of the password value

    if (csigns[callsignAsString]) { //is the callsign valid
        if (csigns[callsignAsString] == passwordAsString) { //is the password correct
            let clearanceLevel = cclrs[callsignAsString];
            sessionStorage.setItem("clrc", clearanceLevel); //set clearance
            for (var i = 24; i > clearanceLevel; i--) {
                clrctokeys[i] = null
            }
            sessionStorage.setItem("key", clrctokeys); // store relevant decryption keys
        } else {
            pwd.style = "background-color: rgb(255, 0, 0);";
        }
    } else {
        csign.style = "background-color: rgb(255, 0, 0);";
    }
}
