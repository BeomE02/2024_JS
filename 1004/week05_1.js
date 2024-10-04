
//선언적 함수 정의
function doubleX(n = 0) {
    return n*2;
}
//------------------------
console.log(doubleX());

function Welcome(name = "손", name2 = "홍길동") {
    console.log("어서오세요 "+ name + "님 저는 " + name2 + "입니다.")
    console.log(`어서오세요 ${name}님 저는 ${name2}입니다.`)
}
//------------------------
function tagString(n1 = "", n2 = "p", n3 = "") {
    if(n3 === ""){
        console.log(`<${n2}>${n1}</${n2}>`);
    }
    else{
        console.log(`<${n2} class="${n3}">${n1}</${n2}>`);
    }
}
//------------------------
tagString("Hello"); // <p> Hello <p>
tagString("Hello", "div"); // <div>Hello</div>
tagString("Hello", "h1", "maintitle"); // <h1 class="maintitle">Hello</h1>

