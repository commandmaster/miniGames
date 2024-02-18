import { MonoBehaviour } from "../sketch.js";

export default class SnakeGameLevelManager{
    constructor(p5Var, gameEngine, levelName){
      this.p5 = p5Var;
      this.gameEngine = gameEngine;
      this.levelName = levelName;
    }

    Start(){
      this.uniqueSnakePieceId = 0;
      this.uniqueSnakeGridPieceId = 0;
      this.squareSize = 25;
      this.spacing = 5;
      this.startingPos = this.p5.createVector(0, 0);
      this.endPos = this.p5.createVector(this.gameEngine.screenWidth, this.gameEngine.screenHeight);

      this.gameEngine.inputSystem.addKeyboardInput('snakeUp', 'w', 'bool')
      this.gameEngine.inputSystem.addKeyboardInput('snakeDown', 's', 'bool')
      this.gameEngine.inputSystem.addKeyboardInput('snakeLeft', 'a', 'bool')
      this.gameEngine.inputSystem.addKeyboardInput('snakeRight', 'd', 'bool')

      this.gameEngine.inputSystem.addBindToKeyboardInput('snakeUp', 38)
      this.gameEngine.inputSystem.addBindToKeyboardInput('snakeDown', 40)
      this.gameEngine.inputSystem.addBindToKeyboardInput('snakeLeft', 37)
      this.gameEngine.inputSystem.addBindToKeyboardInput('snakeRight', 39)
      
      this.direction = this.p5.createVector(1, 0);
      this.snakeHeadPos = this.p5.createVector(1, 1);
      
      this.grid = [];
      let indexX = 0; 
      for (let i = this.startingPos.x; i < this.endPos.x - this.squareSize; i += this.squareSize + this.spacing) {
        this.grid.push([]);
        let indexY = 0; 
        for (let j = this.startingPos.y; j < this.endPos.y - this.squareSize; j += this.squareSize + this.spacing) {
          
          if (j > (this.endPos.y - this.squareSize) - (this.squareSize + this.spacing) || j < this.startingPos.y + this.squareSize + this.spacing || i > (this.endPos.x - this.squareSize) - (this.squareSize + this.spacing) || i < this.startingPos.x + this.squareSize + this.spacing){
            this.spawnGridPiece(this.p5.createVector(i, j), this.p5.createVector(this.squareSize, this.squareSize), this.p5.color(255, 255, 255));
            this.grid[indexX].push(1);
          }


          else{
            this.grid[indexX].push(0);
          }
          
          indexY++; 
        }

        indexX++; 
      }


      

      
    }

    Update(){
      if (this.gameEngine.inputSystem.getInputDown("snakeUp")){
        console.log("up")
        this.direction = this.p5.createVector(0, -1);
        this.snakeHeadPos.x = Math.round(this.snakeHeadPos.x)
        this.snakeHeadPos.y = Math.round(this.snakeHeadPos.y)

      }

      if (this.gameEngine.inputSystem.getInputDown("snakeDown")){
          console.log("down")
          this.direction = this.p5.createVector(0, 1);
          this.snakeHeadPos.x = Math.round(this.snakeHeadPos.x) 
        this.snakeHeadPos.y = Math.round(this.snakeHeadPos.y)
      }

      if (this.gameEngine.inputSystem.getInputDown("snakeLeft")){
          console.log("left")
          this.direction = this.p5.createVector(-1, 0);
          this.snakeHeadPos.x = Math.round(this.snakeHeadPos.x)
          this.snakeHeadPos.y = Math.round(this.snakeHeadPos.y)
      }

      if (this.gameEngine.inputSystem.getInputDown("snakeRight")){
          console.log("right")
          this.direction = this.p5.createVector(1, 0);
          this.snakeHeadPos.x = Math.round(this.snakeHeadPos.x)
          this.snakeHeadPos.y = Math.round(this.snakeHeadPos.y)
          
      }
      

      

      
      
      

      this.snakeHeadPos.x += this.direction.x * (this.squareSize + this.spacing) / 130;
      this.snakeHeadPos.y += this.direction.y * (this.squareSize + this.spacing) / 130;

      this.p5.rect(this.snakeHeadPos.x * (this.squareSize + this.spacing), this.snakeHeadPos.y * (this.squareSize + this.spacing), this.squareSize, this.squareSize);
      
    }


    

    spawnGridPiece(pos, size, color){
      let gridPiece = new MonoBehaviour.GameObject(this.gameEngine, pos, "gridPiece" + String(this.uniqueSnakeGridPieceId++));
      gridPiece.addSpriteRenderer("rect", size, color, true, color);
      gridPiece.addTag("GridPiece");
      gridPiece.ignoreCulling = true;

      this.gameEngine.addObjectsToLevel(this.levelName, [gridPiece]);
    }

    End(){

    }
  }



  