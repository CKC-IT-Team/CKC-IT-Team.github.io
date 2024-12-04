function initIndex() {
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

export {initIndex}