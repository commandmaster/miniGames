import { MonoBehaviour } from "../sketch.js";

export default class GameState{
    constructor(p5Var, gameEngine){
      this.p5 = p5Var;
      this.gameEngine = gameEngine;

    }

    Preload(){
        // LoadScripts and Images
        this.gameEngine.scriptSystem.loadScript("playerScript", "./scripts/playerScript.js")
        this.gameEngine.scriptSystem.loadScript("enemyScript", "./scripts/enemyScript.js")
        this.gameEngine.scriptSystem.loadScript("enemySpawnerScript", "./scripts/enemySpawnerScript.js")
        this.gameEngine.scriptSystem.loadScript("lavaFloor", "./scripts/lavaFloor.js")
        this.gameEngine.scriptSystem.loadScript("glowLevelManager", "./scripts/glowLevelManager.js")
        this.gameEngine.scriptSystem.loadScript("titleLevelManager", "./scripts/titleLevelManager.js")
        

        this.gameEngine.imageSystem.addImage("MoltenLogo", "./images/MoltenPursuit.png");
        this.gameEngine.imageSystem.addImage("mainTitle", "./images/mainGameTitle.png");
    }

    Setup(){

        // level main level setup
        let player1 = new MonoBehaviour.GameObject(this.gameEngine, this.p5.createVector(0,-1000), "player1");
        player1.addRigidBody(1, 0.8, 0.007);
        player1.addCircleCollider(30, false, true, this.p5.createVector(0,0), "Player");
        player1.rigidBody.gravityScale = 0.03;
        player1.addTag("Player");
        

        player1.addSpriteRenderer("circle", 60, this.p5.color(0,200,200), true, this.p5.color(0, 200, 200));
        
        player1.addScript("playerScript");

        this.gameEngine.addCamera("glowLevelCamera", player1, this.p5.createVector(0, 200));
        

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

        this.gameEngine.createLevel("glowFire", [player1, lavaFloor, enemySpawner], "glowLevelCamera");
        // End of main level setup


        // Title Screen setup
        let moltenTitle = new MonoBehaviour.GameObject(this.gameEngine, this.p5.createVector(200,400), "MoltenTitle");
        moltenTitle.addSpriteRenderer(this.gameEngine.imageSystem.getImage("MoltenLogo"), this.p5.createVector(400, 400));
        

        let mainTitle = new MonoBehaviour.GameObject(this.gameEngine, this.p5.createVector(this.gameEngine.screenWidth / 2, 170), "mainTitle");
        mainTitle.addSpriteRenderer(this.gameEngine.imageSystem.getImage("mainTitle"), this.p5.createVector(1000, 300));

        this.gameEngine.createLevel("titleScreen", [moltenTitle, mainTitle], null);
        this.gameEngine.loadLevel("titleScreen", "titleLevelManager");
        // End of Title Screen setup


        // End Screen setup
        let endScreen = new MonoBehaviour.GameObject(this.gameEngine, this.p5.createVector(200,400), "moltenEndScreen");

        

    }







    Start(){
        this.runTime = 0;
        this.timeSinceLastSpeedIncrease = 0;
    
    }

    Update(){
        this.gameEngine.onEvent("loadLevel", (data) => {
            this.gameEngine.loadLevel(data.levelName, data.levelManager)
        });



        this.runTime += this.p5.deltaTime;
        this.timeSinceLastSpeedIncrease += this.p5.deltaTime / 1000;

        this.gameEngine.onEvent("game over", (data) => {
            console.log("game over")
        });

        if (this.timeSinceLastSpeedIncrease > 10){
            this.timeSinceLastSpeedIncrease = 0;
            this.gameEngine.broadCastEvent("speedIncrease", {speed: 0.5})
        }

    }

  }

  