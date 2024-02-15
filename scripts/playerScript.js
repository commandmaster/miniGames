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
      
    
    }

    Update(){
      if (this.p5.mouseIsPressed === true && this.p5.mouseButton === this.p5.LEFT && this.p5.mouseButton !== this.p5.RIGHT) {
        this.drawChargeUp(50);
        this.gameObject.rigidBody.applyDrag(0.05);
      }

      else if (this.p5.mouseIsPressed === true && this.p5.mouseButton === this.p5.RIGHT){
        this.charge = 0;
        this.gameObject.rigidBody.applyDrag(0.18);
      }

      else{
        if (this.charge > 0) {
          this.shoot(this.charge * 0.07);
          this.charge = 0;
        }
        
      }
      

      for (const collider of this.gameObject.colliders[0].collidingWith){
        if (collider.gameObject.hasTag("enemy")){
          this.gameObject.rigidBody.Velocity.y = 0;
          this.gameObject.rigidBody.addForce(this.p5.createVector(0, -1), 10);
          console.log("hit");
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
    }

    shoot(speed){
      const dir = MonoBehaviour.cameraToMouseDirection(this.gameEngine.mainCamera, this.gameEngine.screenWidth, this.gameEngine.screenHeight)
      this.gameObject.rigidBody.addForce(dir, speed);
    }

  }

  