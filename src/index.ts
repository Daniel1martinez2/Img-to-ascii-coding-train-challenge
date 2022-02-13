import * as p5 from "p5";

const btn = document.querySelector(".save-canvas");


const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";
const len = density.length;

const sketch = (p: any) => {
    let vermeerImg: p5.Image;
    const saveCanvasHandler = () => {
        p.save("img.png");
    }
    btn.addEventListener("click", saveCanvasHandler); 
    p.preload = () => {
        vermeerImg = p.loadImage("../img/ver.png")
    };
    p.setup = () => {
        const canvas = p.createCanvas(400, 400);
        canvas.parent("my-canvas");
    };
    p.draw = () => {
        p.background(9, 4, 27);
        // p.image(vermeerImg, 0, 0, p.width, p.height)
        
        let w = p.width / vermeerImg.width;
        let h = p.height / vermeerImg.height;
        vermeerImg.loadPixels();
        for (let i = 0; i < vermeerImg.width; i++) {
            for (let j = 0; j < vermeerImg.height; j++){
                const pixelIndex = (i + j * vermeerImg.width) * 4;
                const r = vermeerImg.pixels[pixelIndex + 0];    
                const g = vermeerImg.pixels[pixelIndex + 1];
                const b = vermeerImg.pixels[pixelIndex + 2];
                const avg = (r + g +b) / 3;
                p.noStroke()
                p.fill(r, g, b)
                const charIndex = Math.floor(p.map(avg, 0, 255, len, 0));
                // p.square(i * w, j * h, w)
                p.textSize(w);
                p.textStyle(p.BOLD);
                p.textAlign(p.CENTER, p.CENTER);
                p.text(density[charIndex], i * w + w * 0.5, j * h + h * 0.5); 
            }
            
        }
    };
};
let p5js = new p5(sketch);
