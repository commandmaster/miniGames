import { MonoBehaviour } from "../sketch.js";

export default class EnemySpawner{
    constructor(p5Var, gameEngine, gameObject){
      this.p5 = p5Var;
      this.gameEngine = gameEngine;
      this.gameObject = gameObject;
    }

    Start(){
        this.uniqueEnemyId = 0;
        this.spawnEnemys(0.000003, 0.000007, this.p5.createVector(-50000, 50000), this.p5.createVector(-5000, 100))
        this.playerPosition = this.gameEngine.gameObjects["player1"].Transform.Position;
        this.currentChunk = this.p5.createVector(0, 0);
        this.lastChunk = this.p5.createVector(0, 0);    
        
    }

    Update(){
        this.currentChunk = this.getChunk();
        
        
    }

    getChunk(){
        return this.p5.createVector(Math.floor(this.playerPosition.x / 5000), Math.floor(this.playerPosition.y / 5000))
    }


    
    spawnEnemy(pos, radius, color, health, name){
        const enemy = new MonoBehaviour.GameObject(this.gameEngine, pos, name)
        enemy.addRigidBody(1000000, 0.5)
        enemy.addCircleCollider(radius, false, false, this.p5.createVector(0,0), "enemy")
        enemy.rigidBody.gravityScale = 0;
        enemy.addSpriteRenderer("circle", radius*2, color, true, color)
        enemy.addScript("enemyScript");
        enemy.addTag("enemy")
    
        
    }
    
        
    
    spawnEnemys(densityLower, densityUpper, rangeX, rangeY){
        console.log((Math.abs(rangeX.x) + Math.abs(rangeX.y)) * (Math.abs(rangeY.x) + Math.abs(rangeY.y)) * this.p5.random(densityLower, densityUpper))
        for (let i = 0; i < (Math.abs(rangeX.x) + Math.abs(rangeX.y)) * (Math.abs(rangeY.x) + Math.abs(rangeY.y)) * this.p5.random(densityLower, densityUpper); i++){
        console.log("spawn")
        this.uniqueEnemyId += 1;
        this.spawnEnemy(this.p5.createVector(this.p5.random(rangeX.x, rangeX.y), this.p5.random(rangeY.x, rangeY.y)), 25, this.p5.color(255, 0, 0), 5, String(this.uniqueEnemyId))
        }
    }
  
  }

  