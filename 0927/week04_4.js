// 익명함수 활용하기
let doubleX = function (n) {
    return n * 2;
}

// --------------------------
//매개변수 배열 ar의 모든 요소가 number이면 true, 아니면 false 반환하기
let isAllNumber = function(ar) {
    return ar.every(element => typeof element === 'number');
}
// --------------------------

let sumArray = function(ar) {
    let sum = 0;
    for(let i = 1; i < ar.length; i++){
        sum += ar[i]
    }
    return sum;
}
// --------------------------

//매개변수 배열 ar의 모든 요소가 number이면 true, 아니면 false 반환하기
let isAllNumber2 = function(ar) {
    if(ar.every(element => typeof element === 'number')){
        console.log("숫자임 다 더한 값 반환해드림");
    }
    else{
        console.log("다 숫자아님 숫자 반환 안할 거임");
        return NaN;
    }
    return sumArray(ar);
}
// --------------------------
let max = (a,b) => {
    if(a > b)
        return a;
    else{
        return b;
    } 
}
// --------------------------
let max3 = (a,b,c) => {
    let m;
    m = max(max(a,b),c); 

    return m;
}
// ---------------------------

let arrayMax = (ar) => {
    return Math.max(...ar);
}
// ---------------------------

let dx = doubleX;
doubleX = "Korea";

console.log(dx(30));
console.log(doubleX);
console.log(sumArray([1, 2, 3, 4, 5]));
console.log(isAllNumber([1, 2, 3, 4, 5]));
console.log(isAllNumber2([1, 2, 3, 4, 5]));
console.log(max3(7, 4, 5));
console.log(arrayMax([1, 2, 3, 4, 5]));
