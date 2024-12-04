/*
function toCipheredBin(bin, binCipherParams) {
    var cipheredBin = bin;
    for (let i = 0; i < bin.length; i++) {
        if ((i % binCipherParams["flipInterval"] == 0) && (binCipherParams["flipInterval"] = Math.abs(binCipherParams["flipInterval"]))) {
            let toFlip = cipheredBin[i];
            toFlip = toFlip.replace("1", "0");toFlip = toFlip.replace("0", "1");
            cipheredBin = setCharAt(cipheredBin, i, toFlip);
        }
    }
    let toShift = ""
    for (let i = 0; i < cipheredBin.length; i++) {
        if (i >= bin.length - binCipherParams["shiftInterval"]) {
            toShift += cipheredBin[i];
            cipheredBin = setCharAt(cipheredBin, i, "");
        }
    }
    cipheredBin = toShift + cipheredBin;
    toShift = null;
    return cipheredBin
}
function setCharAt(origString, index, replaceChar) {
    let firstPart = origString.substr(0, index);
    let lastPart = origString.substr(index + 1);
      
    let newString = firstPart + replaceChar + lastPart;
    return newString;
}
function toBin(toConv) {
    var output = "";
    for (var i = 0; i < toConv.length; i++) {
        output += toConv[i].charCodeAt(0).toString(2) + " ";
    }
    return output
}
function fromCipheredBin(cipheredBin, binCipherParams) {
    var bin = cipheredBin
    let toShift = ""
    for (let i = 0; i <= binCipherParams["shiftInterval"]; i++) {
        toShift += bin[i];
        bin = setCharAt(bin, i, "");
    }
    bin += toShift
    for (let i = 0; i < bin.length; i++) {
        if ((i % binCipherParams["flipInterval"] == 0) && (binCipherParams["flipInterval"] = Math.abs(binCipherParams["flipInterval"]))) {
            let toFlip = cipheredBin[i];
            if (toFlip != undefined) {
                toFlip = toFlip.replace("1", "0");toFlip = toFlip.replace("0", "1");
            }
            bin = setCharAt(bin, i, toFlip);
        }
    }
    return bin
}

export {toCipheredBin, setCharAt, toBin, fromCipheredBin}
currently unused nonstandard ES */