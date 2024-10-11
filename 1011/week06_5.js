function rangeRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

let fruits = ["사과", "배", "포도", "샤인머스켓", "감", "키위"];
let fruitBox = [];
let simulationRunning = true;

function     farmer() {
    if (!simulationRunning) return;

    let nextFruitIndex = rangeRandom(0, fruits.length - 1);
    fruitBox.push(fruits[nextFruitIndex]);
    console.log(`${fruits[nextFruitIndex]}를 생산하여 과일 박스에 추가하였습니다. 현재 과일 박스:`, fruitBox);
    
    setTimeout(farmer, rangeRandom(2000, 7000));
}

function consumer() {
    if (!simulationRunning) return;

    if (fruitBox.length > 0) {
        let eatenFruit = fruitBox.shift();
        console.log(`${eatenFruit}를 먹었습니다. 현재 과일 박스:`, fruitBox);
    } else {
        console.log("과일 박스가 비어있습니다. 소비자가 기다립니다.");
    }

    setTimeout(consumer, rangeRandom(2000, 7000));
}

function stopSimulation() {
    simulationRunning = false;
    console.log("1분이 지나 시뮬레이션이 종료되었습니다.");
}

setTimeout(stopSimulation, 60000);
farmer();
consumer();
