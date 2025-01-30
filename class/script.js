// READ WARNING.md! YOU HAVE BEEN WARNED!

// import cipheredBinUtils from cipheredBinUtils.js

if (localStorage.getItem("regUser") == "UNCLEARED") {location.href = "../unclass/uncleared.html"};

var notificationsRead = [];
var notificationsTotal = 1;

if (localStorage.getItem("notificationsRead")) {notificationsRead = localStorage.getItem("notificationsRead")} else {localStorage.setItem("notificationsRead", [])};

if (document.getElementById("idrN")) {document.getElementById("idrN").textContent = notificationsTotal - notificationsRead.length}

var clrcident = document.getElementById("clrcident"); //  get clearance ID in doc
var fileTS;
var debounce_W = sessionStorage.getItem("debounceW") || false;
if (!debounce_W) {sessionStorage.setItem("debounceW", false)}

var clearance_dict = [
  "ALPHA",
  "BETA",
  "GAMMA",
  "DELTA",
  "EPSILON",
  "ZETA",
  "ETA",
  "THETA",
  "IOTA",
  "KAPPA",
  "LAMBDA",
  "MU",
  "NU",
  "XI",
  "OMICRON",
  "PI",
  "RHO",
  "SIGMA",
  "TAU",
  "UPSILON",
  "PHI",
  "CHI",
  "PSI",
  "OMEGA"
]; // numerically, as stored in sessionStorage by key/value pair, 1 is omega and larger numbers correspond to lower clearances

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
24 - alpha  - baselevel

clearances */

var clev = sessionStorage.getItem("clrc"); // fetch clrc

// var ckeys = sessionStorage.getItem("key"); // pull encryption keys
var protocol = sessionStorage.getItem("protocol"); // fetch protocol

var authorized = false;

if (clearance_dict[clearance_dict.length - clev] != undefined) {
  authorized = true;
  clrcident.textContent =
    clev + " | " + clearance_dict[clearance_dict.length - clev] + " | SIGNED ON: " + localStorage.getItem("regUser");
} else {
  clrcident.style.color = "#FF0000";
  clrcident.textContent = "X | UNAUTHORIZED";
  // location.href = "../uncleared.html" // handle for removal of unathorized viewership. disabled
}

var maxTimeout = 2;
function attemptRSC(timeout, spec, specShow) {
  let tO = timeout || 0;
  spec.style.color = "#008000";
  spec.style.cursor = "text";
  try {
    spec.textContent = eval(`${protocol}(\"${specShow}\");`); // protocol - atob, module function
  } catch (err) {
    spec.textContent = `{\\r;${err}`
    spec.style.cursor = "not-allowed";
    spec.style.color = "#FE1000";
    tO++;
    if (tO <= maxTimeout) {
      attemptRSC(tO, spec, specShow);
    }
  }
}

function rsc(specifiedElement, show, creq) {
  // called directly from document
  if (show) {
    if (clev <= creq && authorized == true) {
      attemptRSC(null, specifiedElement, show);
    } else {
      if (authorized == false) {
        specifiedElement.textContent = "[UNAUTHORIZED SESSION]";
        specifiedElement.style.color = "#FE1000";
        specifiedElement.style.cursor = "not-allowed";
      } else {
        specifiedElement.textContent =
          "[" +
          clearance_dict[clearance_dict.length - clev] +
          " DENIED FOR " +
          clearance_dict[clearance_dict.length - creq] +
          "]";
        specifiedElement.style.color = "#FE1000";
        specifiedElement.style.cursor = "not-allowed";
      }
    }
  } else {
    specifiedElement.textContent = "CODE 1: field _s " + show;
  }
}
function identMO(_, fTS) {
  if (!_) {fileTS = null;return}
  // called directly from document
  fileTS = fTS;
};
function markAsRead(specifiedElement) {
  specifiedElement.onclick = "markAsUnread(this)";
  specifiedElement.textContent = "Mark As Unread";
  specifiedElement.style = "background-color: rgb(100, 10, 10);";
  if (!notificationsRead.find(specifiedElement.id)) {notificationsRead.push(specifiedElement.id)};
  localStorage.setItem("notificationsRead", notificationsRead);
}
function markAsUnread(specifiedElement) {
  specifiedElement.onclick = "markAsRead(this)";
  specifiedElement.textContent = "Mark As Read";
  specifiedElement.style = "background-color: rgb(10, 100, 10);";
  if (notificationsRead.find(specifiedElement.id)) {notificationsRead.splice(specifiedElement.id)};
  localStorage.setItem("notificationsRead", notificationsRead);
}
window.addEventListener('keydown', (event) => {
  if (event.key == "w") {
    if (!debounce_W) {
      debounce_W = true;
      sessionStorage.setItem("debounceW", true);
      if (location.href.includes("personnel-files")) {
        location.href = "../personnel.html";
      } else if (location.href.includes("divisions/")) {
        location.href = "../divisions.html";
      } else {
        location.href  = "index.html";
      };
    };
  };
  if (event.key == "s") {
    if (location.href.includes("unclass/index.html")) {
      if (debounce_W) {window.alert("By holding W and pressing S on the index page, you are now signing-off.");location.href = "../index.html";}
    }
    if (fileTS) {
      location.href = "../unclass/" + fileTS;
    };
  };
});
window.addEventListener('keyup', (event) => {
  if (event.key == "w") {
    debounce_W = false;
    sessionStorage.setItem("debounceW", false);
  };
});