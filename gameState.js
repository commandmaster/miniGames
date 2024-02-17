import { MonoBehaviour } from "./sketch.js";

export default class GameState{
    constructor(p5Var, gameEngine){
      this.p5 = p5Var;
      this.gameEngine = gameEngine;

    }

    Preload(){
        // Load Scripts and Images
        this.gameEngine.scriptSystem.loadScript("playerScript", "./moltenLevel/playerScript.js")
        this.gameEngine.scriptSystem.loadScript("enemyScript", "./moltenLevel/enemyScript.js")
        this.gameEngine.scriptSystem.loadScript("enemySpawnerScript", "./moltenLevel/enemySpawnerScript.js")
        this.gameEngine.scriptSystem.loadScript("lavaFloor", "./moltenLevel/lavaFloor.js")
        this.gameEngine.scriptSystem.loadScript("glowLevelManager", "./moltenLevel/glowLevelManager.js")
        this.gameEngine.scriptSystem.loadScript("titleLevelManager", "./titleLevel/titleLevelManager.js")
        this.gameEngine.scriptSystem.loadScript("moltenGameOverManager", "./moltenGameOverLevel/moltenGameOverManager.js")
        this.gameEngine.scriptSystem.loadScript("flappyBirdLevelManager", "./flappyBirdLevel/flappyBirdLevelManager.js")
        this.gameEngine.scriptSystem.loadScript("birdScript", "./flappyBirdLevel/birdScript.js")
        this.gameEngine.scriptSystem.loadScript("pipeScript", "./flappyBirdLevel/pipeScript.js")
        

        this.gameEngine.imageSystem.addImage("MoltenLogo", "./images/MoltenPursuit.png");
        this.gameEngine.imageSystem.addImage("mainTitle", "./images/mainGameTitle.png");
        this.gameEngine.imageSystem.addImage("moltenEndScreen", "./images/endScreenMolten.png");
        this.gameEngine.imageSystem.addImage("flappyBirdLogo", "./images/flappyBirdLogo.png");
        this.gameEngine.imageSystem.addImage("flappyBirdBackground", "./images/flappyBackgroundV2.png");
    }

    Setup(){
        // Load Title Screen
        this.gameEngine.loadLevel("titleScreen", "titleLevelManager");
        

        

    }







    Start(){
        
    
    }

    Update(){

    }

  }

  