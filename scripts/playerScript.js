import { MonoBehaviour } from "../sketch.js";

export default class Player extends MonoBehaviour{
    constructor(p5Var, gameEngine, gameObject){
      super(p5Var, gameEngine, gameObject);
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


      this.gameEngine.addCulling(this.gameObject, 2000)


      this.gameEngine.particleSystem.createNewParticle({
        name: "bloodParticle",
        lifeSpan: 0.2,
        color: this.p5.color(255, 0, 0),
        opacity: 1,
        shouldFade: true,
        shape: "circle",
        sizeRange: this.p5.createVector(10, 10),
        hasGravity: false,
        gravityScale: 0.007,
        hasWind: false,
        windScale: 0,
        windDirection: this.p5.createVector(1, 0),
        glow: true
      });
      
      this.gameEngine.particleSystem.createNewParticleEmitter({
        name: "bloodEmitter",
        particleName: "bloodParticle",
        radius: 50,
        spawnRate: 1,
        densityRange: this.p5.createVector(0.6, 0.7),
        triggerDelay: 0,
        emitterLifeSpan: 0.2,
        trigger: "OnLoop",
        followObject: null,
        followObjectOffset: this.p5.createVector(0, 0),
        xVelRange: this.p5.createVector(-10, 10),
        yVelRange: this.p5.createVector(-10, 10)
  
      });


      this.gameEngine.particleSystem.createNewParticle({
        name: "trailParticle",
        lifeSpan: 0.1,
        color: this.gameObject.spriteRenderer.spriteColor,
        opacity: 1,
        shouldFade: true,
        shape: "circle",
        sizeRange: this.p5.createVector(5, 10),
        hasGravity: false,
        gravityScale: 0.007,
        hasWind: false,
        windScale: 0,
        windDirection: this.p5.createVector(1, 0),
        glow: true
      });
      
      this.gameEngine.particleSystem.createNewParticleEmitter({
        name: "trailEmitter",
        particleName: "trailParticle",
        radius: 10,
        spawnRate: 5,
        densityRange: this.p5.createVector(0.7, 0.8),
        triggerDelay: 0,
        emitterLifeSpan: 0.1,
        trigger: "OnLoop",
        followObject: this.gameObject,
        followObjectOffset: this.p5.createVector(0, 0),
        xVelRange: this.p5.createVector(-5,5),
        yVelRange: this.p5.createVector(-5,5)
  
      });
      
      
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

      this.gameEngine.particleSystem.spawnEmitter("trailEmitter");


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
            // pentitalize the player for not hitting anything
            if (this.gameObject.rigidBody.Velocity.y < 0){
              this.gameObject.rigidBody.Velocity.y = 0;
            }
            
            this.gameObject.rigidBody.addForce(this.p5.createVector(0, 1), 30);
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

          
          
          this.gameEngine.particleSystem.spawnEmitter("bloodEmitter", collider.gameObject.Transform.Position);
        }
    }
      
    }

    drawChargeUp(startOffset){
      const dir = MonoBehaviour.cameraToMouseDirection(this.gameEngine.mainCamera, this.gameEngine.screenWidth, this.gameEngine.screenHeight)

      this.p5.push();
      this.p5.drawingContext.shadowBlur = 10;
      this.p5.drawingContext.shadowColor = this.p5.color(255);
      this.p5.strokeWeight(2);
      this.p5.stroke(255);
      this.p5.line(this.gameEngine.mainCamera.position.x + startOffset * dir.x, this.gameEngine.mainCamera.position.y + startOffset * dir.y, this.p5.mouseX, this.p5.mouseY);
      this.charge = this.p5.dist(this.gameEngine.mainCamera.position.x + startOffset * dir.x, this.gameEngine.mainCamera.position.y + startOffset * dir.y, this.p5.mouseX, this.p5.mouseY);
      this.charge = this.p5.min(this.charge, 500);
      this.p5.pop();
    }

    shoot(speed){
      const dir = MonoBehaviour.cameraToMouseDirection(this.gameEngine.mainCamera, this.gameEngine.screenWidth, this.gameEngine.screenHeight)
      this.gameObject.rigidBody.addForce(dir, speed);
    }

  }

  