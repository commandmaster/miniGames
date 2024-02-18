import { MonoBehaviour } from "../sketch.js";

export default class BirdScript{
    constructor(p5Var, gameEngine, gameObject){
      this.p5 = p5Var;
      this.gameEngine = gameEngine;
      this.gameObject = gameObject;
    }

    Start(){
    
      this.gameEngine.inputSystem.addKeyboardInput('flap', 'space', 'bool')
    
    }

    Update(){
        if (this.gameEngine.inputSystem.getInputDown('flap')){
            this.gameObject.animator.transition("flap") 
            this.gameObject.rigidBody.Velocity.y = -10.5;
        }

        else{
          if (this.gameObject.animator.loopCount > 0){
            this.gameObject.animator.transition("default")
          }
          
            
        }
    }

  }

  