import { MonoBehaviour } from "../sketch.js";

export default class TitleLevelManager{
    constructor(p5Var, gameEngine, levelName){
        this.p5 = p5Var;
        this.gameEngine = gameEngine;
        this.levelName = levelName;
    }

    Start(){
        // Title Screen setup
        this.gameEngine.resizeToFit = false;
        this.gameEngine.setCanvasHeight(1440);
        this.gameEngine.setCanvasWidth(2560);

        let mainTitle = new MonoBehaviour.GameObject(this.gameEngine, this.p5.createVector(this.gameEngine.screenWidth / 2, 100), "mainTitle");
        mainTitle.addSpriteRenderer(this.gameEngine.imageSystem.getImage("mainTitle"), this.p5.createVector(1000, 300));
        mainTitle.ignoreCulling = true;



        let moltenTitle = new MonoBehaviour.GameObject(this.gameEngine, this.p5.createVector(200,400), "MoltenTitle");
        moltenTitle.addSpriteRenderer(this.gameEngine.imageSystem.getImage("MoltenLogo"), this.p5.createVector(400, 400));
        moltenTitle.ignoreCulling = true;

        let flappyBirdTitle = new MonoBehaviour.GameObject(this.gameEngine, this.p5.createVector(1000,400), "FlappyBirdTitle");
        flappyBirdTitle.addSpriteRenderer(this.gameEngine.imageSystem.getImage("flappyBirdLogo"), this.p5.createVector(400, 400));
        flappyBirdTitle.ignoreCulling = true;

        let snakeGameTitle = new MonoBehaviour.GameObject(this.gameEngine, this.p5.createVector(200, 1000), "SnakeGameTitle");
        snakeGameTitle.addSpriteRenderer(this.gameEngine.imageSystem.getImage("snakeGameLogo"), this.p5.createVector(400, 400));
        snakeGameTitle.ignoreCulling = true;

        this.moltenBtn = this.p5.createButton("")
        this.moltenBtn.position(0, 200);
        this.moltenBtn.size(400, 400);
        this.moltenBtn.style("opacity", "0");
        this.moltenBtn.mousePressed(() => {
            setTimeout(() => {
                this.gameEngine.loadLevel("glowFire", "glowLevelManager");
            }, 250);

        });


        this.flappyBtn = this.p5.createButton("")
        this.flappyBtn.position(800, 200);
        this.flappyBtn.size(400, 400);
        this.flappyBtn.style("opacity", "0");
        this.flappyBtn.mousePressed(() => {
            setTimeout(() => {
                this.gameEngine.loadLevel("flappyBird", "flappyBirdLevelManager");
            }, 250);

        });

        this.snakeGameBtn = this.p5.createButton("")
        this.snakeGameBtn.position(0, 800);
        this.snakeGameBtn.size(400, 400);
        this.snakeGameBtn.style("opacity", "0");
        this.snakeGameBtn.mousePressed(() => {
            setTimeout(() => {
                this.gameEngine.loadLevel("snakeGame", "snakeGameLevelManager");
            }, 250);

        });

        this.gameEngine.addObjectsToLevel(this.levelName, [moltenTitle, mainTitle, flappyBirdTitle, snakeGameTitle]);
        this.gameEngine.addCameraToLevel(this.levelName, null);

        
    }

    Update(){
        
    }

    End(){
        this.gameEngine.resizeToFit = true;
        this.gameEngine.setCanvasHeight(this.p5.windowHeight);
        this.gameEngine.setCanvasWidth(this.p5.windowWidth);
        this.moltenBtn.remove();
        this.flappyBtn.remove();
        this.snakeGameBtn.remove();
    }

  }

  