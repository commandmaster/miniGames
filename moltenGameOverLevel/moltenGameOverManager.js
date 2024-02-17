import { MonoBehaviour } from "../sketch.js";

export default class MoltenGameOverManager{
    constructor(p5Var, gameEngine, levelName){
      this.p5 = p5Var;
      this.gameEngine = gameEngine;
      this.levelName = levelName;
    }

    Start(){
        this.gameEngine.addObjectsToLevel(this.levelName, []);
        this.gameEngine.addCameraToLevel(this.levelName, null);

        let highScore = this.p5.getItem("moltenHighScore")
        let currentScore = this.p5.getItem("moltenCurrentScore")

        if (highScore !== null && currentScore !== null && currentScore > highScore || highScore === null && currentScore !== null){
           this.p5.storeItem("moltenHighScore", currentScore)
        }





        this.gameOverTxt = this.p5.createButton("Ouch that burns!");
        this.gameOverTxt.style("font-size", "100px");
        this.gameOverTxt.style("color", "red");
        this.gameOverTxt.style("font-family", "pixelo", "Arial", "sans-serif");
        this.gameOverTxt.style("background-color", "transparent");
        this.gameOverTxt.style("border", "none");
        this.gameOverTxt.size(800, 300);
        this.gameOverTxt.position(this.gameEngine.screenWidth/2 - this.gameOverTxt.size().width/2, 50);


        this.retryBtn = this.p5.createButton("Retry");
        this.retryBtn.size(200, 50);
        this.retryBtn.position(this.gameEngine.screenWidth/2 - this.retryBtn.size().width/2, 850);
        this.retryBtn.style("font-size", "40px");
        this.retryBtn.style("background-color", "transparent");
        this.retryBtn.style("border", "none");
        this.retryBtn.style("color", "red");
        this.retryBtn.style("font-family", "pixelo", "Arial", "sans-serif");

        this.mainMenuBtn = this.p5.createButton("Menu");
        this.mainMenuBtn.size(200, 50);
        this.mainMenuBtn.position(this.gameEngine.screenWidth/2 - this.mainMenuBtn.size().width/2, 950);
        this.mainMenuBtn.style("font-size", "40px");
        this.mainMenuBtn.style("background-color", "transparent");
        this.mainMenuBtn.style("border", "none");
        this.mainMenuBtn.style("color", "red");
        this.mainMenuBtn.style("font-family", "pixelo", "Arial", "sans-serif");


        this.retryBtn.mousePressed(() => {
            setTimeout(() => {
                this.gameEngine.loadLevel("glowFire", "glowLevelManager");
            }, 250);

    
        });

        this.mainMenuBtn.mousePressed(() => {
            setTimeout(() => {
                this.gameEngine.loadLevel("titleScreen", "titleLevelManager");
            }, 100);

    
        });


        this.highScoreTxt = this.p5.createButton("High Score: " + String(this.p5.getItem("moltenHighScore")));
        this.highScoreTxt.style("font-size", "40px");
        this.highScoreTxt.style("color", "red");
        this.highScoreTxt.style("font-family", "pixelo", "Arial", "sans-serif");
        this.highScoreTxt.style("background-color", "transparent");
        this.highScoreTxt.style("border", "none");
        this.highScoreTxt.size(600, 50);
        this.highScoreTxt.position(this.gameEngine.screenWidth/2 - this.highScoreTxt.size().width/2, 500);


        this.currentScoreTxt = this.p5.createButton("Current Score: " + String(this.p5.getItem("moltenCurrentScore")));
        this.currentScoreTxt.style("font-size", "40px");
        this.currentScoreTxt.style("color", "red");
        this.currentScoreTxt.style("font-family", "pixelo", "Arial", "sans-serif");
        this.currentScoreTxt.style("background-color", "transparent");
        this.currentScoreTxt.style("border", "none");
        this.currentScoreTxt.size(800, 50);
        this.currentScoreTxt.position(this.gameEngine.screenWidth/2 - this.currentScoreTxt.size().width/2, 600);
        
        
        
    }

    Update(){
        
    }

    End(){
        this.gameOverTxt.remove();
        this.retryBtn.remove();
        this.mainMenuBtn.remove();
        this.currentScoreTxt.remove();
        this.highScoreTxt.remove();
    }

  }

  