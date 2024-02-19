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
      this.pieces = [];
      this.direction = this.p5.createVector(1, 0);

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


      this.pieces.push({x: 20, y: 3});
      this.pieces.push({x: 19, y: 3});
      this.pieces.push({x: 18, y: 3});
      this.pieces.push({x: 17, y: 3});
      this.pieces.push({x: 16, y: 3});
      this.pieces.push({x: 15, y: 3});
      this.pieces.push({x: 14, y: 3});

      
    }

    Update(){
      this.timeSinceLastMove += this.p5.deltaTime;

      if (this.gameEngine.inputSystem.getInputDown("snakeUp")){
        console.log("up")
        this.direction = this.p5.createVector(0, -1);
        

      }

      if (this.gameEngine.inputSystem.getInputDown("snakeDown")){
          console.log("down")
          this.direction = this.p5.createVector(0, 1);
          
      }

      if (this.gameEngine.inputSystem.getInputDown("snakeLeft")){
          console.log("left")
          this.direction = this.p5.createVector(-1, 0);
          
      }

      if (this.gameEngine.inputSystem.getInputDown("snakeRight")){
          console.log("right")
          this.direction = this.p5.createVector(1, 0);
          
          
      }

      if (this.timeSinceLastMove > 1000){
        this.timeSinceLastMove = 0;

        this.grid[this.pieces[this.pieces.length - 1].x][this.pieces[this.pieces.length - 1].y] = 0;
        

        this.grid[this.pieces[1].x][this.pieces[1].y] = 3;

        this.pieces[0].x += this.direction.x;
        this.pieces[0].y += this.direction.y;

        this.grid[this.pieces[0].x][this.pieces[0].y] = 3;
        



        this.updatePieces();
      }
        this.drawGrid();
      
    }

    updatePieces(){
    
      for (let i = this.pieces.length - 1; i >= 1; i--) {
        this.pieces[i].x = this.pieces[i - 1].x;
        this.pieces[i].y = this.pieces[i - 1].y;
      }
    
      // Update grid cells after updating all positions
      for (let i = 1; i < this.pieces.length; i++) {
        this.grid[this.pieces[i].x][this.pieces[i].y] = 3;
      }
      
      
      
    }


    drawGrid(){
      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[i].length; j++) {
          if (this.grid[i][j] === 1){
            this.p5.fill(255, 255, 255);
            this.p5.rect(i * (this.squareSize + this.spacing), j * (this.squareSize + this.spacing), this.squareSize, this.squareSize);
          }

          else if (this.grid[i][j] === 3){
            this.p5.fill(0, 255, 0);
            this.p5.rect(i * (this.squareSize + this.spacing), j * (this.squareSize + this.spacing), this.squareSize, this.squareSize);
          }
        }
      }

      console.log(this.grid);
    }
  

    End(){

    }

    
  }



  