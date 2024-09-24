let ar = [13, 24, 33, 64, 23, 14, 66, 127];
//배열 ar에서 원소를 하나씩 꺼내서 홀수, 짝수 판별 결과에 따라 해당 배열에 넣는다.
let odd = []; //홀수 저장용 배열
let even = []; //짝수 저장용 배열

//for(let i = 1; i < ar.length; i++){
//    if(ar[i] % 2 === 1){
//        even.push(ar[i]);
//    }
//    else{
//       odd.push(ar[i]);
//    }
//}

for(let item of ar){
    if(item%2 > 0){
        odd.push(item);
    }
    else{
        push.push(item);
    }
}

console.log(odd);
console.log(even);
