import { MonoBehaviour } from "../sketch.js";

export default class TitleLevelManager{
    constructor(p5Var, gameEngine){
      this.p5 = p5Var;
      this.gameEngine = gameEngine;

    }

    Start(){
        
        let btn = this.p5.createButton("")
        btn.position(0, 200);
        btn.size(400, 400);
        btn.style("opacity", "0");
        btn.mousePressed(() => {
            setTimeout(() => {
                this.gameEngine.broadCastEvent("loadLevel", {levelName:"glowFire", levelManager:"glowLevelManager"});
            }, 300);

            btn.remove();
        });
    
    }

    Update(){
        
    }

  }

  