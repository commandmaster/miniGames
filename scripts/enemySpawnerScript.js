import { MonoBehaviour } from "../sketch.js";

export default class EnemySpawner{
    constructor(p5Var, gameEngine, gameObject){
      this.p5 = p5Var;
      this.gameEngine = gameEngine;
      this.gameObject = gameObject;
    }

    Start(){
        this.uniqueEnemyId = 0;
        //this.spawnEnemys(0.000003, 0.000007, this.p5.createVector(-50000, 50000), this.p5.createVector(-5000, 100))
        this.playerPosition = this.gameEngine.gameObjects["player1"].Transform.Position;
        this.currentChunk = this.p5.createVector(0, 0);
        this.lastChunk = this.p5.createVector(0, 0); 
        this.loadedChunks = {};   
        this.loadChunks(this.currentChunk);
    }

    Update(){
        this.currentChunk = this.getChunk();
        //console.log(this.currentChunk)
        if (this.currentChunk.x != this.lastChunk.x || this.currentChunk.y != this.lastChunk.y){
            this.lastChunk = this.currentChunk;
            this.loadChunks(this.currentChunk);

        }
        
        
    }

    getChunk(){
        return {x:Math.floor(this.playerPosition.x / 5000), y:Math.floor(this.playerPosition.y / 5000)}
    }

    loadChunks(chunk){
        
        for (let i = 0; i <= 4; i++){
            for (let j = 0; j <= 4; j++){
                this.loadChunk(this.p5.createVector(chunk.x - 2 + i, chunk.y - 2 + j))
            }
        }   
    }

    loadChunk(chunk){
        if (this.loadedChunks[chunk] == undefined && chunk.y < 0){
            this.spawnEnemys(0.000002, 0.0000025, this.p5.createVector(chunk.x * 5000, chunk.x * 5000 + 5000), this.p5.createVector(chunk.y * 5000, chunk.y * 5000 + 5000))
            this.loadedChunks[chunk] = true;

            
            
            
        }

        
    }


    
    spawnEnemy(pos, radius, color, health, name){
        const enemy = new MonoBehaviour.GameObject(this.gameEngine, pos, name)
        enemy.addRigidBody(1000000, 0.5)
        enemy.addCircleCollider(radius, false, false, this.p5.createVector(0,0), "enemy")
        enemy.rigidBody.gravityScale = 0;
        enemy.addSpriteRenderer("circle", radius*2, color, true, color)
        enemy.addScript("enemyScript");
        enemy.addTag("enemy")
        this.gameEngine.addObjectToLevel(enemy)
    
        
    }
    
        
    
    spawnEnemys(densityLower, densityUpper, rangeX, rangeY){
        
        for (let i = 0; i < (Math.abs(rangeX.x - rangeX.y)) * (Math.abs(rangeY.x - rangeY.y)) * this.p5.random(densityLower, densityUpper); i++){
            this.uniqueEnemyId += 1;
            this.spawnEnemy(this.p5.createVector(this.p5.random(rangeX.x, rangeX.y), this.p5.random(rangeY.x, rangeY.y)), 25, this.p5.color(255, 0, 0), 5, String(this.uniqueEnemyId))
        }
    }
  
  }

  