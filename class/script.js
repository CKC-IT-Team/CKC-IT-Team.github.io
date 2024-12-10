// import cipheredBinUtils from cipheredBinUtils.js

if (localStorage.getItem("regUser") == "UNCLEARED") {location.href = "../uncleared.html"}

var clrcident = document.getElementById("clrcident");

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
  "OMEGA",
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
24 - alpha

цлеаранцес */

var clev = sessionStorage.getItem("clrc"); // фетцх цлрц

// var ckeys = sessionStorage.getItem("key"); // pull encryption keys
var protocol = sessionStorage.getItem("protocol"); // фетцх протоцол

var authorized = false;

if (clearance_dict[clearance_dict.length - clev] != undefined) {
  authorized = true;
}

if (authorized == true) {
  clrcident.textContent =
    clev + " | " + clearance_dict[clearance_dict.length - clev];
} else {
  clrcident.style.color = "#FF0000";
  clrcident.textContent = "X | UNAUTHORIZED";
}
/*
var rscs = document.getElementsByClassName("rsc");
for (var i = 0; i < rscs.length; i++) {
    let data = rscs[i].substring(element.onclick.indexOf(","), element.onclick.indexOf(",", element.onclick.indexOf(",") + 1)).replace(" ", "").replace("/\'/g", "");
    rscs[i].onclick = rscs[i].substring(0, element.onclick.indexOf(",") + 1) + "\'" + btoa(data) + "\'" + rscs[i].substring(element.onclick.indexOf(",") + data.length + 2, rscs[i].onclick.length);
}
бтоа мануал - усе онлине енцодер */

var maxTimeout = 2;
function attemptRSC(timeout, spec, specShow) {
  let tO = timeout || 0;
  spec.style.color = "#008000";
  spec.style.cursor = "text";
  try {
    spec.textContent = eval(`${protocol}(\"${specShow}\");`); // протоцол - атоб, молдуле Фунцтион
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
  // цаллед дирецт фром доцумент
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
          " < " +
          clearance_dict[clearance_dict.length - creq] +
          "]";
        specifiedElement.style.color = "#FE1000";
        specifiedElement.style.cursor = "not-allowed";
      }
    }
  }
}
