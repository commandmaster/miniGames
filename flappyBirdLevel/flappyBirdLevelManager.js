import { MonoBehaviour } from "../sketch.js";

export default class FlappyBirdLevelManager{
    constructor(p5Var, gameEngine, levelName){
      this.p5 = p5Var;
      this.gameEngine = gameEngine;
      this.levelName = levelName;
    }

    Start(){
        //this.gameEngine.setBackground(this.gameEngine.imageSystem.getImage("flappyBirdBackground"), this.p5.createVector(0,0), this.p5.createVector(2560,1440));
        
    
    }

    Update(){
        this.p5.image(this.gameEngine.imageSystem.getImage("flappyBirdBackground"), 0, 0, 2560 * 2, 1440 * 2);
    }

  }

  