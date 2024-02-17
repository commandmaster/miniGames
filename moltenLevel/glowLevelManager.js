import { MonoBehaviour } from "../sketch.js";

export default class GlowLevelManager{
    constructor(p5Var, gameEngine, levelName){
        this.p5 = p5Var;
        this.gameEngine = gameEngine;
        this.levelName = levelName;
    }

    Start(){
        let player1 = new MonoBehaviour.GameObject(this.gameEngine, this.p5.createVector(0,-1000), "player1");
        player1.addRigidBody(1, 0.8, 0.007);
        player1.addCircleCollider(30, false, true, this.p5.createVector(0,0), "Player");
        player1.rigidBody.gravityScale = 0.03;
        player1.addTag("Player");
        

        player1.addSpriteRenderer("circle", 60, this.p5.color(0,200,200), true, this.p5.color(0, 200, 200));
        
        player1.addScript("playerScript");

        this.gameEngine.addCamera("glowLevelCamera", player1, this.p5.createVector(0, 200));
        this.gameEngine.addCulling(player1, 2000)

        let lavaFloor = new  MonoBehaviour.GameObject(this.gameEngine, this.p5.createVector(-100000, 200), "lavaFloor");
        lavaFloor.addRigidBody(100000000000, 0.5, 0);
        lavaFloor.addBoxCollider(this.p5.createVector(200000, 1000), false, true, this.p5.createVector(0, 0), "lava");
        lavaFloor.rigidBody.gravityScale = 0;
        lavaFloor.addSpriteRenderer("rect", this.p5.createVector(200000, 1000), this.p5.color(255,20,0), true, this.p5.color(255,80,0));
        lavaFloor.addTag("lava");
        lavaFloor.ignoreCulling = true;
        lavaFloor.addScript("lavaFloor");

        let enemySpawner = new  MonoBehaviour.GameObject(this.gameEngine, this.p5.createVector(0,0), "enemySpawner");
        enemySpawner.ignoreCulling = true;
        enemySpawner.addScript("enemySpawnerScript");
        
        this.gameEngine.addObjectsToLevel(this.levelName, [player1, lavaFloor, enemySpawner]);
        this.gameEngine.addCameraToLevel(this.levelName, "glowLevelCamera");
        



        this.runTime = 0;
        this.timeSinceLastSpeedIncrease = 0;
        this.score = 0;
        this.scoreMultiplier = 1;

        this.scoreText = this.p5.createButton("Score: 0")
        this.scoreText.position(0, 0);
        this.scoreText.style("font-size", "40px");
        this.scoreText.style("color", "red");
        this.scoreText.style("font-family", "pixelo", "Arial", "sans-serif");
        this.scoreText.style("background-color", "transparent");
        this.scoreText.style("border", "none");



        this.gameEngine.onEvent("increaseScore", () => {
            this.score += 10 * this.scoreMultiplier;
            this.scoreText.value("Score: " + String(this.score));
            this.scoreText.html("Score: " + String(this.score));
            
        });
    

    }

    Update(){
        this.runTime += this.p5.deltaTime;
        this.timeSinceLastSpeedIncrease += this.p5.deltaTime / 1000;

        const timeBetweenMultiplierIncrease = 7;
        this.scoreMultiplier = Math.floor(this.runTime/ (timeBetweenMultiplierIncrease * 1000)) + 1;
        


        if (this.timeSinceLastSpeedIncrease > 10){
            this.timeSinceLastSpeedIncrease = 0;
            this.gameEngine.broadCastEvent("speedIncrease", {speed: 0.5})
        }
    }

    End(){
        this.scoreText.remove();
        this.p5.storeItem("moltenCurrentScore", this.score);
        console.log(this.p5.getItem("moltenCurrentScore"))
        
       
    }

  }

  