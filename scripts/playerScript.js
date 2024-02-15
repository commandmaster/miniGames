import { MonoBehaviour } from "../sketch.js";

export default class Player{
    constructor(p5Var, gameEngine, gameObject){
      this.p5 = p5Var;
      this.gameEngine = gameEngine;
      this.gameObject = gameObject;
    }

    Start(){
      this.chargeStartPos = this.p5.createVector(0, 0);
      this.charge = 0;

      this.gameEngine.inputSystem.addKeyboardInput('SuperBounce', 'space', 'bool')
      this.bounceStarted = false;
      this.bounceFrameRange = 20;
      this.bounceFrameCounter = 0;
      this.hitTimeout = 0;
      this.afterBounce = false;
      this.bounceHit = false;


      this.gameEngine.addCulling(this.gameObject, 2500)
    }

    Update(){
      if (this.p5.mouseIsPressed === true && this.p5.mouseButton === this.p5.LEFT && this.p5.mouseButton !== this.p5.RIGHT) {
        this.drawChargeUp(50);
        this.gameObject.rigidBody.applyDrag(0.05);
      }

      else if (this.p5.mouseIsPressed === true && this.p5.mouseButton === this.p5.RIGHT){
        this.charge = 0;
        this.gameObject.rigidBody.applyDrag(0.18, true);
      }

      else{
        if (this.charge > 0) {
          this.shoot(this.charge * 0.1);
          this.charge = 0;
        }
        
      }


      if (this.gameEngine.inputSystem.getInputDown('SuperBounce')){
        this.bounceStarted = true;
      }

      if (this.bounceStarted){
        this.bounceFrameCounter++;

        if (this.bounceFrameCounter > this.bounceFrameRange || this.bounceHit){
          if (this.bounceHit){
            this.gameObject.rigidBody.addForce(this.p5.createVector(0, -1), 25);
          }

          else{
            this.gameObject.rigidBody.addForce(this.p5.createVector(0, 1), 20);
            this.gameObject.rigidBody.applyDrag(1, true);
          }

          this.bounceStarted = false;
          this.bounceFrameCounter = 0;
          this.bounceHit = false;

          console.log(this.bounceHit)
        }

      }




      this.hitTimeout++;

      if (this.hitTimeout > this.bounceFrameRange/2){
        this.bounceHit = false;
      }   

      for (const collider of this.gameObject.colliders[0].collidingWith){
        if (collider.gameObject.hasTag("enemy")){
          this.gameObject.rigidBody.Velocity.y = 0;

          this.bounceHit = true;
          this.hitTimeout = 0;
          
          this.gameObject.rigidBody.addForce(this.p5.createVector(0, -1), 10);
          
        }
    }
      
    }

    drawChargeUp(startOffset){
      const dir = MonoBehaviour.cameraToMouseDirection(this.gameEngine.mainCamera, this.gameEngine.screenWidth, this.gameEngine.screenHeight)

      this.p5.drawingContext.shadowBlur = 10;
      this.p5.drawingContext.shadowColor = this.p5.color(255);
      this.p5.strokeWeight(2);
      this.p5.stroke(255);
      this.p5.line(this.gameEngine.mainCamera.position.x + startOffset * dir.x, this.gameEngine.mainCamera.position.y + startOffset * dir.y, this.p5.mouseX, this.p5.mouseY);
      this.charge = this.p5.dist(this.gameEngine.mainCamera.position.x + startOffset * dir.x, this.gameEngine.mainCamera.position.y + startOffset * dir.y, this.p5.mouseX, this.p5.mouseY);
      this.charge = this.p5.min(this.charge, 500);
    }

    shoot(speed){
      const dir = MonoBehaviour.cameraToMouseDirection(this.gameEngine.mainCamera, this.gameEngine.screenWidth, this.gameEngine.screenHeight)
      this.gameObject.rigidBody.addForce(dir, speed);
    }

  }

  