let fps = 10;
let xScene = 0;

const attack = () => {
    console.log("Attack");
};




const moveScene = () => {
    xScene ++;
    console.log("Move", xScene);
};



const main = () => {
    moveScene();
};

setInterval(main, 1000 / 4);