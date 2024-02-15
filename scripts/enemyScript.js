import { MonoBehaviour } from "../sketch.js";

export default class Enemy{
    constructor(p5Var, gameEngine, gameObject){
      this.p5 = p5Var;
      this.gameEngine = gameEngine;
      this.gameObject = gameObject;
    }

    Start(){
    
      
    
    }

    Update(){
        let wasHit = false;

        for (const collider of this.gameObject.colliders[0].collidingWith){
            if (collider.gameObject.hasTag("Player")){
                wasHit = true;
            }
        }

        if (wasHit){
            //this.gameObject.delete();
        }

    }

  }

  