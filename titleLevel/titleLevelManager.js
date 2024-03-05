import { MonoBehaviour } from "../sketch.js";

export default class TitleLevelManager{
    constructor(p5Var, gameEngine, levelName){
        this.p5 = p5Var;
        this.gameEngine = gameEngine;
        this.levelName = levelName;
    }

    Start(){
        // Title Screen setup
        this.gameEngine.resizeToFit = false; // Disable automatic canvas resizing
        this.gameEngine.setCanvasHeight(1440); // Set canvas height to 1440 pixels
        this.gameEngine.setCanvasWidth(2560); // Set canvas width to 2560 pixels

        // Create main title object
        let mainTitle = new MonoBehaviour.GameObject(this.gameEngine, this.p5.createVector(this.gameEngine.screenWidth / 2, 100), "mainTitle");
        mainTitle.addSpriteRenderer(this.gameEngine.imageSystem.getImage("mainTitle"), this.p5.createVector(1000, 300));
        mainTitle.ignoreCulling = true;

        // Create Molten title object
        let moltenTitle = new MonoBehaviour.GameObject(this.gameEngine, this.p5.createVector(200,400), "MoltenTitle");
        moltenTitle.addSpriteRenderer(this.gameEngine.imageSystem.getImage("MoltenLogo"), this.p5.createVector(400, 400));
        moltenTitle.ignoreCulling = true;

        // Create Flappy Bird title object
        let flappyBirdTitle = new MonoBehaviour.GameObject(this.gameEngine, this.p5.createVector(1000,400), "FlappyBirdTitle");
        flappyBirdTitle.addSpriteRenderer(this.gameEngine.imageSystem.getImage("flappyBirdLogo"), this.p5.createVector(400, 400));
        flappyBirdTitle.ignoreCulling = true;

        // Create Snake Game title object
        let snakeGameTitle = new MonoBehaviour.GameObject(this.gameEngine, this.p5.createVector(200, 1000), "SnakeGameTitle");
        snakeGameTitle.addSpriteRenderer(this.gameEngine.imageSystem.getImage("snakeGameLogo"), this.p5.createVector(400, 400));
        snakeGameTitle.ignoreCulling = true;

        // Create Molten button
        this.moltenBtn = this.p5.createButton("")
        this.moltenBtn.position(0, 200);
        this.moltenBtn.size(400, 400);
        this.moltenBtn.style("opacity", "0");
        this.moltenBtn.mousePressed(() => {
            setTimeout(() => {
            // wait 250ms to load the page
            this.gameEngine.loadLevel("glowFire", "glowLevelManager");
            }, 250);

        });

        // Create Flappy Bird button
        this.flappyBtn = this.p5.createButton("")
        this.flappyBtn.position(800, 200);
        this.flappyBtn.size(400, 400);
        this.flappyBtn.style("opacity", "0");
        this.flappyBtn.mousePressed(() => {
            setTimeout(() => {
            // wait 250ms to load the page
            this.gameEngine.loadLevel("flappyBird", "flappyBirdLevelManager");
            }, 250);

        });

        // Create Snake Game button
        this.snakeGameBtn = this.p5.createButton("")
        this.snakeGameBtn.position(0, 800);
        this.snakeGameBtn.size(400, 400);
        this.snakeGameBtn.style("opacity", "0");
        this.snakeGameBtn.mousePressed(() => {
            setTimeout(() => {
            // wait 250ms to load the page
            this.gameEngine.loadLevel("snakeGame", "snakeGameLevelManager");
            }, 250);

        });

        // Add title objects to the level
        this.gameEngine.addObjectsToLevel(this.levelName, [moltenTitle, mainTitle, flappyBirdTitle, snakeGameTitle]);
        this.gameEngine.addCameraToLevel(this.levelName, null);

        
    }

    Update(){
        
    }

    End(){
        // Enable automatic canvas resizing
        this.gameEngine.resizeToFit = true;
        this.gameEngine.setCanvasHeight(this.p5.windowHeight);
        this.gameEngine.setCanvasWidth(this.p5.windowWidth);

        // Remove any dom elements created
        this.moltenBtn.remove();
        this.flappyBtn.remove();
        this.snakeGameBtn.remove();
    }

  }

  