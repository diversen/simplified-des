function p8Init(k) {
    var pA = [2, 6, 3, 1, 4, 8, 5, 7];
    var kA = k.split('');
    var r = [];

    pA.forEach(element => {
        r.push(kA[element-1])
    });
    return r;
}

function p8Inverse (k) {
    var pA = [4, 1, 3, 5, 7, 2, 8, 6];
    var kA = k.split('');
    var r = [];

    pA.forEach(element => {
        r.push(kA[element-1])
    });
    return r;
}

// Permutate and expand 4 bits to 8 bits
function p4E(k){
    
    var pA = [4, 1, 2, 3, 2, 3, 4, 1];

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

function XOR (a, b) {
    a = a.split('');
    b = b.split('');

    var r = [];
    a.forEach( (element, key) => {
        if (element !== b[key]) {
            r.push(1);
        } else {
            r.push(0);
        }
    });

    return r.join('');
}

var MATRIX_S0 = [
    ['01', '00', '11', '10'],
    ['11', '10', '01', '00'],
    ['00', '10', '01', '11'],
    ['11', '01', '11', '10']
];

var MATRIX_S1 = [
    ['00', '01', '10', '11'],
    ['10', '00', '01', '11'],
    ['11', '00', '01', '00'],
    ['10', '01', '00', '11']
]

// 4 bit input
// 1 and 4 of input is the row
// 2 and 3 of input is the column
function SUB1 (r, c) {

    r = parseInt(r, 2);
    c = parseInt(c, 2);

    return MATRIX_S0[r][c];
}

function SUB0 (r, c) {

    r = parseInt(r, 2);
    c = parseInt(c, 2);

    return MATRIX_S1[r][c];
}

function fk (P1, P2, key) {

    // Expand P2's 4 bits into 8
    var P2E = p4E(P2.join('')).join('')

    // XOR P2E with key1
    var XOR2 = XOR(P2E, key);

    // Split the 8 bits
    var S0 = XOR2.slice(0, 4);
    var S1 = XOR2.slice(4, 8);

    // Row is 1, 4 bits
    // Col is 2, 3 bits
    var R0 = S0[0] + S0[3];
    var C0 = S0[1] + S0[2];

    var R1 = S1[0] + S1[3];
    var C1 = S1[1] + S1[2];

    // Look up in the matrix
    var P4 = p4(SUB1(R0, C0) + SUB0(R1, C1));

    // XOR P4 and P1
    return XOR(P4.join(''), P1.join(''));
    
}


function encrypt (p, keys) {

    // Initial permutation
    // Split initial permutation into two halfs
    // P1 is the left bits and P2 is the right bits
    var IP = p8Init(p);

    var P1 = IP.slice(0, 4);
    var P2 = IP.slice(4, 8);

    // Run fk with key 0
    var fk1 = fk(P1, P2, keys[0]);

    // Swap
    var SW = P2.join('') + fk1;

    SW = SW.split('');

    // Put SW into the funtion fk again
    SW1 = SW.slice(0, 4);
    SW2 = SW.slice(4, 8);

    // Run fk with key 1
    var fk2 = fk(SW1, SW2, keys[1]);
    
    // Join
    var RES = fk2 + SW2.join('');
    var p8I = p8Inverse(RES);

    return p8I.join('');
}

// Decrypt is the same as encrypt , except that we start 
// Using key[1] as the first key and the key[0]
function decrypt (p, keys) {

    // Initial permutation
    // Split initial permutation into two halfs
    // P1 is the left bits and P2 is the right bits
    var IP = p8Init(p);

    var P1 = IP.slice(0, 4);
    var P2 = IP.slice(4, 8);

    // Run fk with key 1
    var fk1 = fk(P1, P2, keys[1]);

    // Swap
    var SW = P2.join('') + fk1;

    SW = SW.split('');

    // Put SW into the funtion fk again
    SW1 = SW.slice(0, 4);
    SW2 = SW.slice(4, 8);

    // Run fk with key 0
    var fk2 = fk(SW1, SW2, keys[0]);
    
    // Join
    var RES = fk2 + SW2.join('');
    var p8I = p8Inverse(RES);

    return p8I.join('');
}

var crypt = {
    encrypt: encrypt,
    decrypt: decrypt
}

module.exports = crypt