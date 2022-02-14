import * as p5 from "p5";

const btn = document.querySelector(".save-canvas");


const density = "Ñ@#W$9876543210?!abc;:+=-,._  ";
const len = density.length;

const sketch = (p: any) => {
    let vermeerImg: p5.Image;
    const saveCanvasHandler = () => {
        p.save("img.png");
    }
    btn.addEventListener("click", saveCanvasHandler); 
    p.preload = () => {
        vermeerImg = p.loadImage("../img/resol.png")
    };
    p.setup = () => {
        // const canvas = p.createCanvas(400, 400);
        // canvas.parent("my-canvas");
        p.noCanvas()
        p.background(9, 4, 27);
        let w = p.width / vermeerImg.width;
        let h = p.height / vermeerImg.height;
        
        vermeerImg.loadPixels();
        // p.image(vermeerImg, 0, 0, p.width, p.height)
        const container = document.createElement('div');
        container.style.position = "relative"; 
        
        for (let j = 0; j < vermeerImg.height; j++){
            let row = '';
            for (let i = 0; i < vermeerImg.width; i++) {
                const pixelIndex = (i + j * vermeerImg.width) * 4;
                const r = vermeerImg.pixels[pixelIndex + 0];    
                const g = vermeerImg.pixels[pixelIndex + 1];
                const b = vermeerImg.pixels[pixelIndex + 2];
                const avg = (r + g +b) / 3;
                // p.noStroke()
                // p.fill(r, g, b)
                
                const charIndex = Math.floor(p.map(avg, 0, 255, len, 0));
                // p.square(i * w, j * h, w)
                // p.textSize(w);
                // p.textStyle(p.BOLD);
                // p.textAlign(p.CENTER, p.CENTER);
                // row += (density[charIndex], i * w + w * 0.5, j * h + h * 0.5); 


                const c = density[charIndex]; 
                const character = document.createElement("p");
                character.innerText =  c;
                character.style.position = "absolute";
                character.style.left = `${i * 10 * w + w * 0.50}px`;
                character.style.top = `${j * 10 * h + h * 0.50}px`;
                character.style.color = `rgb(${r},${g},${b})`
                container.appendChild(character);
                // row += c === ' ' ? '&nbsp' : c;
            }
            
            // console.log(row);
            // p.createDiv(row);
        }
        document.body.appendChild(container);
    };
    
    
    // p.draw = () => {
    // };
};
let p5js = new p5(sketch);
