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
      
      this.pieces = [];
      this.direction = this.p5.createVector(1, 0);
      this.dificulty = 1;
      
      this.endPos = this.p5.createVector(Math.min(this.gameEngine.screenWidth, this.gameEngine.screenHeight), Math.min(this.gameEngine.screenWidth, this.gameEngine.screenHeight));
      
      this.timeSinceLastMove = 0;

      this.gameEngine.inputSystem.addKeyboardInput('snakeUp', 'w', 'bool')
      this.gameEngine.inputSystem.addKeyboardInput('snakeDown', 's', 'bool')
      this.gameEngine.inputSystem.addKeyboardInput('snakeLeft', 'a', 'bool')
      this.gameEngine.inputSystem.addKeyboardInput('snakeRight', 'd', 'bool')

      this.gameEngine.inputSystem.addBindToKeyboardInput('snakeUp', 38)
      this.gameEngine.inputSystem.addBindToKeyboardInput('snakeDown', 40)
      this.gameEngine.inputSystem.addBindToKeyboardInput('snakeLeft', 37)
      this.gameEngine.inputSystem.addBindToKeyboardInput('snakeRight', 39)

      
      this.grid = [];
      let indexX = 0; 
      for (let i = this.startingPos.x; i < this.endPos.x - this.squareSize; i += this.squareSize + this.spacing) {
        this.grid.push([]);
        let indexY = 0; 
        for (let j = this.startingPos.y; j < this.endPos.y - this.squareSize; j += this.squareSize + this.spacing) {
          
          if (j > (this.endPos.y - this.squareSize) - (this.squareSize + this.spacing) || j < this.startingPos.y + this.squareSize + this.spacing || i > (this.endPos.x - this.squareSize) - (this.squareSize + this.spacing) || i < this.startingPos.x + this.squareSize + this.spacing){
            this.grid[indexX].push(1);
          }


          else{
            this.grid[indexX].push(0);
          }
          
          indexY++; 
        }

        indexX++; 
      }

      this.score = 3;
      this.pieces.push({x: 3, y: 3, direction: this.p5.createVector(1, 0)});
      this.pieces.push({x: 2, y: 3, direction: this.p5.createVector(1, 0)});
      this.pieces.push({x: 1, y: 3, direction: this.p5.createVector(1, 0)});
      

      this.spawnApple();
      this.spawnApple();
      this.spawnApple();
      

      this.scoreTxt = this.p5.createButton("Score: " + this.score);
      this.scoreTxt.position(25, 25);
      this.scoreTxt.style("font-size", "24px");
      this.scoreTxt.style("font-family", "Pixelo, Arial");
      this.scoreTxt.style("background-color", "transparent");
      this.scoreTxt.style("border", "none");
      this.scoreTxt.style("color", "#00ff00");
      this.scoreTxt.style("outline", "none");
      this.scoreTxt.style("z-index", "1000");
    }

    Update(){
      this.timeSinceLastMove += this.p5.deltaTime;

      if (this.gameEngine.inputSystem.getInputDown("snakeUp")){
        if (this.pieces[0].direction.y !== 1){
          this.direction = this.p5.createVector(0, -1);
        }

      }

      if (this.gameEngine.inputSystem.getInputDown("snakeDown")){
          if (this.pieces[0].direction.y !== -1){
            this.direction = this.p5.createVector(0, 1);
          }

      }

      if (this.gameEngine.inputSystem.getInputDown("snakeLeft")){
          if (this.pieces[0].direction.x !== 1){
            this.direction = this.p5.createVector(-1, 0);
          }

      }

      if (this.gameEngine.inputSystem.getInputDown("snakeRight")){
          if (this.pieces[0].direction.x !== -1){
            this.direction = this.p5.createVector(1, 0);
          } 

      }

      if (this.timeSinceLastMove > 200){
        this.timeSinceLastMove = 0;
        this.updatePieces();
      }
        this.drawGrid();
      
    }

    updatePieces(){
      this.grid[this.pieces[this.pieces.length - 1].x][this.pieces[this.pieces.length - 1].y] = 0;
      for (let i = this.pieces.length - 1; i >= 0; i--) {
        if (i > 0){
          this.pieces[i].x = this.pieces[i - 1].x;
          this.pieces[i].y = this.pieces[i - 1].y;
          this.pieces[i].direction = this.pieces[i - 1].direction;
          this.grid[this.pieces[i].x][this.pieces[i].y] = 3;
        }

        else if (i === 0){
          this.pieces[i].x += this.direction.x;
          this.pieces[i].y += this.direction.y;
          this.pieces[i].direction = this.direction;

          if (this.grid[this.pieces[i].x][this.pieces[i].y] === 1){
            console.log("Game Over");
            return;
          }

          else if (this.grid[this.pieces[i].x][this.pieces[i].y] === 2){
            this.score += 4 - this.dificulty;
            
              
              
            this.grid[this.pieces[i].x][this.pieces[i].y] = 3;
            
            this.createPiece();
            this.spawnApple();
            
          }

          else if (this.grid[this.pieces[i].x][this.pieces[i].y] === 3){
            console.log("Game Over");
            return;
          }

          else if (this.grid[this.pieces[i].x][this.pieces[i].y] === 0){
            this.grid[this.pieces[i].x][this.pieces[i].y] = 3;
          }
          
        }
      }
    
    }

    createPiece(){
      this.pieces.push({x:this.pieces[this.pieces.length - 1].x - this.pieces[this.pieces.length - 1].direction.x, y:this.pieces[this.pieces.length - 1].y - this.pieces[this.pieces.length - 1].direction.y, direction: this.pieces[this.pieces.length - 1].direction});
    }

    spawnApple(){
      let x = Math.floor(Math.random() * this.grid.length);
      let y = Math.floor(Math.random() * this.grid[0].length);
      if (this.grid[x][y] === 0){
        this.grid[x][y] = 2;
      }

      else{
        this.spawnApple();
      }
    }


    drawGrid(){
      this.p5.push();
      this.p5.noStroke();
      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[i].length; j++) {
          if (this.grid[i][j] === 1){
            this.p5.drawingContext.shadowBlur = 17;
            this.p5.drawingContext.shadowColor = this.p5.color(255, 255, 255);
            this.p5.fill(255, 255, 255);
            this.p5.rect(i * (this.squareSize + this.spacing), j * (this.squareSize + this.spacing), this.squareSize, this.squareSize);
          }

          else if (this.grid[i][j] === 3){
            this.p5.drawingContext.shadowBlur = 12;
            this.p5.drawingContext.shadowColor = this.p5.color(0, 255, 0);
            this.p5.fill(0, 255, 0);
            this.p5.rect(i * (this.squareSize + this.spacing), j * (this.squareSize + this.spacing), this.squareSize, this.squareSize);
          }

          else if (this.grid[i][j] === 2){
            this.p5.drawingContext.shadowBlur = 17;
            this.p5.drawingContext.shadowColor = this.p5.color(255, 0, 0);
            this.p5.fill(255, 0, 0);
            this.p5.rect(i * (this.squareSize + this.spacing), j * (this.squareSize + this.spacing), this.squareSize, this.squareSize);
          }
        }
      }

      this.p5.pop();

      
    }
  

    End(){

    }

    
  }



  