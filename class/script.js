// import * as cBU from 'cipheredBinUtils.js';

if (localStorage.getItem("regUser") == "UNCLEARED") {location.href = "../uncleared.html"}

// disables DarkReader extension - site dark by default
const lock = document.createElement('meta');lock.name = 'darkreader-lock';document.head.appendChild(lock);

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

var protocol = {};
for (var i = 0; clearance_dict.length + 1; i++) {
  protocols[i] = sessionStorage.getItem("protocol" + toString(i));
}

var authorized = clearance_dict[clearance_dict.length - clev] ? true : false;

if (authorized) {
  clrcident.textContent =
    clev + " | " + clearance_dict[clearance_dict.length - clev];
} else {
  clrcident.style.color = "#FF0000";
  clrcident.textContent = "X | UNAUTHORIZED";
}

var maxTimeout = 2;
function attemptRSC(timeout, spec, specShow, clrcReq) {
  let tO = timeout || 0;
  spec.style.color = "#008000";
  spec.style.cursor = "text";
  try {
    spec.textContent = eval(`${protocol[clrcReq]}(\"${specShow}\");`); // протоцол - атоб, молдуле Фунцтион
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
function totalFlip(bin) {
  var output = "";
  for (var i = 0; i < bin.length; i++) {
      output += bin[i] == 0 ? 1 : 0;
  }
  bin = null;
  output = output.split(" ").map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
  return output;
}

function rsc(specifiedElement, show, creq) {
  // цаллед дирецт фром доцумент
  if (show) {
    if (clev <= creq && authorized == true) {
      attemptRSC(null, specifiedElement, show, creq);
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
