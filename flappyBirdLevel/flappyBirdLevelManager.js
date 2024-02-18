import { MonoBehaviour } from "../sketch.js";

export default class FlappyBirdLevelManager{
    constructor(p5Var, gameEngine, levelName){
      this.p5 = p5Var;
      this.gameEngine = gameEngine;
      this.levelName = levelName;
    }

    Start(){
        this.gameEngine.setBackground(this.gameEngine.imageSystem.getImage("flappyBirdBackground"), this.p5.createVector(2560,1440));

        let bird = new MonoBehaviour.GameObject(this.gameEngine, this.p5.createVector(400, 400), "Bird");

        bird.addAnimator();
        bird.animator.createAnimation("default", this.gameEngine.imageSystem.getImage("birdIdle"), 8, 0.4, 10)
        bird.animator.createAnimation("flap", this.gameEngine.imageSystem.getImage("birdFlap"), 7, 0.4, 15)
        bird.animator.transition("default")
    
        bird.addTag("FlappyBird");

        bird.addRigidBody(3, 1, 0);
        bird.rigidBody.gravityScale = 0.05;
        bird.addCircleCollider(43, false, true, this.p5.createVector(53, 42));

        bird.addScript("birdScript");

        let groundZone = new MonoBehaviour.GameObject(this.gameEngine, this.p5.createVector(0, this.gameEngine.screenHeight - 270), "GroundZone");
        groundZone.addRigidBody(10000000, 0, 0);
        groundZone.rigidBody.gravityScale = 0;
        groundZone.addBoxCollider(this.p5.createVector(this.gameEngine.screenWidth, this.gameEngine.screenHeight), false, true);
        groundZone.addScript("groundZoneScript");

        this.gameEngine.addObjectsToLevel(this.levelName, [bird, groundZone]);


        this.scoreTxt = this.p5.createButton("Score: 0");
        this.scoreTxt.position(0, 0);
        this.scoreTxt.style("font-size", "32px");
        this.scoreTxt.style("background-color", "transparent");
        this.scoreTxt.style("border", "none");
        this.scoreTxt.style("color", "white");
        this.scoreTxt.style("font-family", "Pixelo, Arial, sans-serif");

        this.highScoreTxt = null;
        this.retryBtn = null;
        this.backToMenuBtn = null;



        this.gameOver = false;

        
        this.spawnRate = 0.22;
        this.uniquePipeId = 0;
        this.score = 0;
        this.timeSinceLastPipe = 1000 * 1/this.spawnRate;
        this.runTime = 0;
       
        this.pipeSpeed = -8;
        


        this.gameEngine.onEvent("increaseFlappyScore", () => {
            this.score += 1;
            this.scoreTxt.html("Score: " + String(this.score));
            this.scoreTxt.value("Score: " + String(this.score));
            
        });

        this.gameEngine.onEvent("flappyGameOver", () => {
            if (this.gameOver) return;

            this.gameEngine.backgroundScrollSpeed = 0;

            this.scoreTxt.style("font-size", "64px");
            this.scoreTxt.style("color", "#fca146");
            this.scoreTxt.style("text-shadow", "-2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white");
            this.scoreTxt.position(this.gameEngine.screenWidth / 2 - this.scoreTxt.size().width/2, this.gameEngine.screenHeight / 2 - 100);


            let highScore = this.p5.getItem("flappyHighScore");

            if (highScore === null || this.score > highScore){
                this.p5.storeItem("flappyHighScore", this.score);
                highScore = this.score;
            }

            if (highScore !== null){
                this.highScoreTxt = this.p5.createButton("High Score: " + String(highScore));
                
                this.highScoreTxt.style("font-size", "64px");
                this.highScoreTxt.style("background-color", "transparent");
                this.highScoreTxt.style("color", "#fca146");
                this.highScoreTxt.style("text-shadow", "-2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white");
                this.highScoreTxt.style("font-family", "Pixelo, Arial, sans-serif");
                this.highScoreTxt.style("border", "none");

                this.highScoreTxt.position(this.gameEngine.screenWidth / 2 - this.highScoreTxt.size().width/2, this.gameEngine.screenHeight / 2 - 250);

            }
            
            let flappyGameOver = new MonoBehaviour.GameObject(this.gameEngine, this.p5.createVector(this.gameEngine.screenWidth / 2, this.gameEngine.screenHeight / 2 - 400), "FlappyGameOver");
            flappyGameOver.addSpriteRenderer(this.gameEngine.imageSystem.getImage("flappyGameOver"), this.p5.createVector(192*3, 42*3));

            this.gameEngine.addObjectsToLevel(this.levelName, [flappyGameOver]);
            this.gameOver = true;

            this.retryBtn = this.p5.createButton("Retry");
            
            this.retryBtn.style("font-size", "64px");
            this.retryBtn.style("background-color", "transparent");
            this.retryBtn.style("color", "#fca146");
            this.retryBtn.style("font-family", "Pixelo, Arial, sans-serif");
            this.retryBtn.style("border", "none");
            this.retryBtn.style("text-shadow", "-2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white");
            this.retryBtn.position(this.gameEngine.screenWidth / 2 - this.retryBtn.size().width/2, this.gameEngine.screenHeight / 2 + 150);

            this.backToMenuBtn = this.p5.createButton("Menu");
            this.backToMenuBtn.style("font-size", "64px");
            this.backToMenuBtn.style("background-color", "transparent");
            this.backToMenuBtn.style("color", "#fca146");
            this.backToMenuBtn.style("font-family", "Pixelo, Arial, sans-serif");
            this.backToMenuBtn.style("border", "none");
            this.backToMenuBtn.style("text-shadow", "-2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white");
            this.backToMenuBtn.position(this.gameEngine.screenWidth / 2 - this.backToMenuBtn.size().width/2, this.gameEngine.screenHeight / 2 + 250);

           


            this.retryBtn.mousePressed(() => {
                this.gameEngine.loadLevel("flappyBird", "flappyBirdLevelManager");
            });

            this.backToMenuBtn.mousePressed(() => {
                this.gameEngine.loadLevel("title", "titleLevelManager");
            });
            
        });
    }

    Update(){
        if (this.gameOver) return;

        this.runTime += this.p5.deltaTime;
        this.timeSinceLastSpeedIncrease += this.p5.deltaTime;

        this.timeSinceLastPipe += this.p5.deltaTime;
        if (this.timeSinceLastPipe > 1000 * 1/this.spawnRate){
            this.timeSinceLastPipe = 0;
            this.spawnPipe(Math.max(350 - this.runTime / 500, 240), this.p5.random(15, 65) / 100)
        }
       
        
        this.spawnRate = Math.min(0.37, 0.22 + this.score / 500);
        
        this.gameEngine.backgroundScrollSpeed = this.pipeSpeed;
    }

    spawnPipe(gap, relativeY){
        this.uniquePipeId += 1;
        let upperPipe = new MonoBehaviour.GameObject(this.gameEngine, this.p5.createVector(this.gameEngine.screenWidth + 100, 0), "UpperPipe" + String(this.uniquePipeId));
        
        const pipeScale = 0.7;
        const pipeYSize = 2000*pipeScale;

        upperPipe.addAnimator();
        upperPipe.animator.createAnimation("default", this.gameEngine.imageSystem.getImage("upperPipe"), 1, pipeScale, 1)
        upperPipe.animator.animations["default"].animationOffset = this.p5.createVector(-210, -pipeYSize + this.gameEngine.screenHeight*relativeY - gap/2);
        upperPipe.animator.transition("default")

        upperPipe.addRigidBody(10000000, 1, 0);
        upperPipe.rigidBody.gravityScale = 0;
        upperPipe.addBoxCollider(this.p5.createVector(280, this.gameEngine.screenHeight*relativeY - gap/2), false, true);
        upperPipe.addScript("pipeScript");

        let lowerPipe = new MonoBehaviour.GameObject(this.gameEngine, this.p5.createVector(this.gameEngine.screenWidth + 100, this.gameEngine.screenHeight*relativeY + gap/2), "LowerPipe" + String(this.uniquePipeId));
        
        lowerPipe.addAnimator();
        lowerPipe.animator.createAnimation("default", this.gameEngine.imageSystem.getImage("lowerPipe"), 1, pipeScale, 1)
        lowerPipe.animator.animations["default"].animationOffset = this.p5.createVector(-210, 0);
        lowerPipe.animator.transition("default")

        lowerPipe.addRigidBody(10000000, 1, 0);
        lowerPipe.rigidBody.gravityScale = 0;
        lowerPipe.addBoxCollider(this.p5.createVector(280, (this.gameEngine.screenHeight - 275) - (this.gameEngine.screenHeight*relativeY + gap/2)), false, true);
        lowerPipe.addScript("pipeScript");


        lowerPipe.rigidBody.Velocity.x = this.pipeSpeed;
        upperPipe.rigidBody.Velocity.x = this.pipeSpeed;

        let scoreZone = new MonoBehaviour.GameObject(this.gameEngine, this.p5.createVector(this.gameEngine.screenWidth + 100, 0), "ScoreZone" + String(this.uniquePipeId));
        scoreZone.addRigidBody(10000000, 0, 0);
        scoreZone.rigidBody.gravityScale = 0;
        scoreZone.addBoxCollider(this.p5.createVector(80, this.gameEngine.screenHeight), true, true, this.p5.createVector(100, 0));
        scoreZone.addScript("scoreZoneScript");
        scoreZone.rigidBody.Velocity.x = this.pipeSpeed;


        this.gameEngine.addObjectsToLevel(this.levelName, [upperPipe, lowerPipe, scoreZone]);
    }

    End(){
        

        this.scoreTxt.remove();
        
        this.highScoreTxt.remove();
        
        this.retryBtn.remove();

        this.backToMenuBtn.remove();

        console.log(this.scoreTxt);
        console.log(this.highScoreTxt.remove());
        console.log(this.retryBtn);
        console.log(this.backToMenuBtn);



    }

  }

  