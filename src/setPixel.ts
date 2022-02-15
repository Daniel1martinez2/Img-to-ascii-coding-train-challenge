import * as p5 from "p5";
import {density} from './density';

const len = density.length;

export function setPixel(p: any, currentImage: p5.Image, pixelIndex: number, j: number, i: number){
    const r = currentImage.pixels[pixelIndex + 0];    
    const g = currentImage.pixels[pixelIndex + 1];
    const b = currentImage.pixels[pixelIndex + 2];
    const avg = (r + g +b) / 3;
    const charIndex = Math.floor(p.map(avg, 0, 255, len, 0));
    
    const c = density[charIndex]; 
    const character = document.createElement("p");
    character.innerText =  c;
    character.style.position = "absolute";
    
    const posH = p.map(j, 0, currentImage.height, 0, 100);
    const posW = p.map(i, 0, currentImage.width, 0, 100);
       
    character.style.left = `${posW}%`;
    character.style.top = `${posH}%`;
    character.style.color = `rgb(${r},${g},${b})`;
    return character;
}