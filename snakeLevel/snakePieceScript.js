import { MonoBehaviour } from "../sketch.js";

export default class SnakePiece{
    constructor(p5Var, gameEngine, gameObject){
      this.p5 = p5Var;
      this.gameEngine = gameEngine;
      this.gameObject = gameObject;
    }

    Start(){
        
    }

    Update(){
        for (const collider of this.gameObject.collidingWith){
            if (collider.gameObject.hasTag("snakePiece") || collider.gameObject.hasTag("GridPiece")){
                console.log("die")
            }
        }

        if (this.gameEngine.inputSystem.getInputDown("snakeUp")){
            console.log("up")
        }

        if (this.gameEngine.inputSystem.getInputDown("snakeDown")){
            console.log("down")
        }

        if (this.gameEngine.inputSystem.getInputDown("snakeLeft")){
            console.log("left")
        }

        if (this.gameEngine.inputSystem.getInputDown("snakeRight")){
            console.log("right")
        }

    }

    

  }

  