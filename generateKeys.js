/**
 * Simplified DES key generation
 */

function p10(k) {
    var pA = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6];
    var kA = k.split('');
    var r = [];

    pA.forEach(element => {
        r.push(kA[element-1])
    });
    return r;
}

function p8(k) {
    var pA = [6, 3, 7, 4, 8, 5, 10, 9];
    var kA = k.split('');
    var r = [];

    pA.forEach(element => {
        r.push(kA[element-1])
    });
    return r;
}

function p4(k){
    var pA = [2, 4, 3, 1];
    var kA = k.split('');
    var r = [];

    pA.forEach(element => {
        r.push(kA[element-1])
    });
    return r;
} 

function lShift (a) {
    
    var shifted = [];
    var last;
    a.forEach( (element, key) => {
        if (key === 0) {
            last = element;
        } else {
            shifted.push(element);
        }
    })
    shifted.push(last);
    return shifted;
}

function lShiftN (a, m) {
    for(let i = 0; i < m; i++){
        a = lShift(a);
    } 
    return a;
}

function generateKeys (key) {

    key = p10(key)
    var kA1 = key.slice(0, 5);
    var kA2 = key.slice(5, 10);
    var LS1 = lShiftN(kA1, 1).concat(lShiftN(kA2, 1));


    kA1 = LS1.slice(0, 5);
    kA2 = LS1.slice(5, 10);

    var LS2 = lShiftN(kA1, 2).concat(lShiftN(kA2, 2));

    var key1 = p8(LS1.join(''));
    var key2 = p8(LS2.join(''));

    return [key1.join(''), key2.join('')];
}

module.exports = generateKeys;

