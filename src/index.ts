import * as p5 from "p5";

const btn = document.querySelector(".save-canvas");


const density = "Ñ@#W$9876543210?!abc;:+=-,._  ";
const len = density.length;

const sketch = (p: any) => {
    let displayImg: p5.Image;
    const saveCanvasHandler = () => {
        p.save("img.png");
    }
    btn.addEventListener("click", saveCanvasHandler); 
    p.preload = () => {
        displayImg = p.loadImage("../img/resol.png")
    };
    p.setup = () => {
        // const canvas = p.createCanvas(400, 400);
        // canvas.parent("my-canvas");
        p.noCanvas()
        p.background(9, 4, 27);
        let w = p.width / displayImg.width;
        let h = p.height / displayImg.height;
        
        displayImg.loadPixels();
        // p.image(displayImg, 0, 0, p.width, p.height)
        const container = document.createElement('div');
        container.classList.add("canvas");
        console.log(displayImg.width, h, p.width);
        console.log(displayImg.height, w, p.height);
        
        container.style.width = `${800}px`;
        container.style.height = `${960.00}px`;
        container.style.position = "relative"; 
        
        for (let j = 0; j < displayImg.height; j++){
            // let row = '';
            for (let i = 0; i < displayImg.width; i++) {
                const pixelIndex = (i + j * displayImg.width) * 4;
                const r = displayImg.pixels[pixelIndex + 0];    
                const g = displayImg.pixels[pixelIndex + 1];
                const b = displayImg.pixels[pixelIndex + 2];
                const avg = (r + g +b) / 3;
                
                const charIndex = Math.floor(p.map(avg, 0, 255, len, 0));
                


                const c = density[charIndex]; 
                const character = document.createElement("p");
                character.innerText =  c;
                character.style.position = "absolute";
                
                const posH = p.map(j, 0, displayImg.height, 0, 100);
                const posW = p.map(i, 0, displayImg.width, 0, 100);
                   
                character.style.left = `${posW}%`;
                character.style.top = `${posH}%`;
                character.style.color = `rgb(${r},${g},${b})`
                if (c !== ' '){
                    container.appendChild(character);
                }
            }
        }
        document.body.appendChild(container);
    };
    
    
    // p.draw = () => {
    // };
};
let p5js = new p5(sketch);
