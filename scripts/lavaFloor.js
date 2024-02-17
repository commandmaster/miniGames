import { MonoBehaviour } from "../sketch.js";

export default class LavaFloor{
    constructor(p5Var, gameEngine, gameObject){
      this.p5 = p5Var;
      this.gameEngine = gameEngine;
      this.gameObject = gameObject;
    }

    Start(){
        this.speed = 3.5;
      
        this.gameEngine.onEvent("speedIncrease", (data) => {
            this.speed += data.speed;
            console.log("speed increased")
        });
    }

    Update(){
        let speed = this.speed
        if (Math.abs(this.gameEngine.gameObjects["player1"].Transform.Position.y - this.gameObject.Transform.Position.y) > 1500){
            speed *= 20;
        }
        
        this.gameObject.rigidBody.Velocity.y = -1 * speed;

        
    }

  }

  