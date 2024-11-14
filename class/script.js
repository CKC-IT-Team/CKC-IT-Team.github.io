const AESutil = await import("./AESutil.js");

var clrcident = document.getElementById("clrcident")
var tblVisClear = document.getElementsByClassName("visclr")
var visitCLR = false

var clearance_dict = ["ALPHA", "BETA", "GAMMA", "DELTA", "EPSILON", "ZETA", "ETA", "THETA", "IOTA", "KAPPA", "LAMBDA", "MU", "NU", "XI", "OMICRON", "PI", "RHO", "SIGMA", "TAU", "UPSILON", "PHI", "CHI", "PSI", "OMEGA"] // numerically, as stored in sessionStorage by key/value pair, 1 is omega and larger numbers correspond to lower clearances

/*

0 - undefined, unauthorized session assumed
1 - omega - omni
2 - psi
3 - chi
4 - phi
5 - upsilon
6 - tau
7 - sigma
8 - rho
9 - pi
10 - omicron
11 - xi
12 - nu
13 - mu
14 - lambda
15 - kappa
16 - iota
17 - theta
18 - eta
19 - zeta
20 - epsilon
21 - delta
22 - gamma
23 - beta
24 - alpha

*/

var clev = sessionStorage.getItem("clrc"); //pull clearance

var ckeys = sessionStorage.getItem("key"); //pull encryption keys

var authorized = false;

if (clearance_dict[(clearance_dict.length - clev)] != undefined) {
    authorized = true;
}

if (authorized == true) {
    clrcident.textContent =  clev + " | " + clearance_dict[(clearance_dict.length - clev)];
} else {
    clrcident.style.color = "#FF0000";
    clrcident.textContent = "X | UNAUTHORIZED";
}

function rsc(specifiedElement, show, creq) { //show clicked-on text
    if (show) {
        if ((clev <= creq) && (authorized == true)) {
            specifiedElement.style.color = "#008000";
            specifiedElement.textContent = AESutil.decrypt("AES/CBC/PKCS5Padding", ckeys[creq], show);
            specifiedElement.style.cursor = "text";
        } else {
            if (authorized == false) {
                specifiedElement.textContent = "[UNAUTHORIZED SESSION]";
                specifiedElement.style.color = "#FE1000";
                specifiedElement.style.cursor = "not-allowed";
            } else {
                specifiedElement.textContent = "[SPECIFIED CLEARANCE :" + clearance_dict[(creq - 1)] +": NOT FOUND - MAXIMUM :" + clearance_dict[(clearance_dict.length - clev)] + ": AUTHORIZED]";
                specifiedElement.style.color = "#FE1000";
                specifiedElement.style.cursor = "not-allowed";
            }
        }
    }
}

function rtli() {
    sessionStorage.clear();
    window.location.href = "../index.html";
}
