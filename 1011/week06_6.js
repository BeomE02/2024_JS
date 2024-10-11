//js 객체 정의하기 (리터럴 객체)
let st = {
    name: "하재범",
    "사는 주소": "부산시 부산진구 양지로 54 미래관 605호",
    age: 23,
    code: 202432421,
    dept: "컴퓨터소프트웨어",
    subject: {
        "교양 과목" : ["음악심리치료"],
        "전공 과목" : ["음악심리치료", "프론트"]
    }
}

console.log(st["사는 주소"]);
console.log(st.subject["전공 과목"][1]);
console.log(st.subject["전공 과목"][1]);
