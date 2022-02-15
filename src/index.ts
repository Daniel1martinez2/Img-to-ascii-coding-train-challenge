import * as p5 from "p5";
import {setPixel} from './setPixel'; 
import {density} from './density'; 

const btn = document.querySelector(".save-canvas");
const container = document.createElement('div');

const sketch = (p: any) => {
    let displayImg: p5.Image;
    const saveCanvasHandler = () => {
        p.save("img.png");
    }
    btn.addEventListener("click", saveCanvasHandler); 
    p.preload = () => {
        displayImg = p.loadImage("../img/resol.png");
    };
    p.setup = () => {
        p.noCanvas()
        p.background(9, 4, 27);
        let w = p.width / displayImg.width;
        let h = p.height / displayImg.height;
        
        displayImg.loadPixels();
        container.classList.add("canvas");
        console.log(displayImg.width, h, p.width);
        console.log(displayImg.height, w, p.height);
        
        const displayWidth = displayImg.width;
        const displayHeight = displayImg.height / displayWidth;
        const scale = 564;
        document.body.style.fontSize = `${Math.floor(scale / 100)}pt`;
        container.style.width = `${scale}px`;
        container.style.height = `${displayHeight * scale}px`;
        container.style.position = "relative"; 
        
        for (let j = 0; j < displayImg.height; j++){
            for (let i = 0; i < displayImg.width; i++) {
                const pixelIndex = (i + j * displayImg.width) * 4;
                const character = setPixel(p, displayImg, pixelIndex, j, i);
                // console.log(pixelIndex/4);
                container.appendChild(character);
                
            }
        }
        document.body.appendChild(container);
        // const pixelList = container.childNodes;
        
        // container.children[(displayImg.width * 1)-1].innerHTML = "🐍"
        // console.log(pixelList[(displayImg.width * 1)-1], displayImg.width);
    };
    // console.log(density[Math.floor(Math.random()*density.length -1)]);
    // console.log(density[density.length -1 ]);
    
    // p.draw = () => {
        
    //     for (let j = 0; j < displayImg.height; j++){
    //         for (let i = 0; i < displayImg.width; i++) {
    //             const pixelIndex = (i + j * displayImg.width) * 4;
    //             // const character = setPixel(p, displayImg, pixelIndex, j, i);

    //             // container.children[pixelIndex/4].innerHTML = density[Math.floor(Math.random()*(density.length -1))]
    //             // console.log(pixelIndex/4);
    //             // container.appendChild(character);
    //             // console.log(container.childNodes.length);
    //             // container.childNodes[pixelIndex/4].innerHTML =
    //         }
    //     }

    // }
};
let p5js = new p5(sketch);
