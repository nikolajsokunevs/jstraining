function Point2D(x, y){
    this.x=x;
    this.y=y;
}

Point2D.prototype.plus=function(v){
    return new Point2D(this.x+v.dx, this.y+v.dy);
}

Point2D.prototype.minus=function(p){
    return new Vector2D(p.x-this.x, p.y-this.y);
}

Point2D.prototype.getTranslate=function(){
    return `translate(${this.x}px, ${this.y}px)`;
}

function Vector2D(dx, dy) {
    this.dx=dx;
    this.dy=dy;
}

Vector2D.prototype.getLength =function(){
    return Math.sqrt(this.dx*this.dx+this.dy*this.dy);
}

Vector2D.prototype.setLength =function(newLength){
  
    var oldLength=this.getLength();
    if (oldLength>0){
        var factor = Math.sqrt(newLength*newLength)/oldLength;
        this.dx*=factor;
        this.dy*=factor;
    } else{
        this.dx=newLength;
        this.dy=0;
    }
}

Vector2D.prototype.multiply = function(k){
    return new Vector2D(this.dx*k, this.dy*k);
}

Vector2D.prototype.getAngle =function(){
  return Math.atan2(this.dy, this.dx)/ Math.PI * 180;
}

Vector2D.prototype.setAngle =function(newAngle){
    var a = newAngle/180*Math.PI;
    var len = this.getLength();
    this.dx=Math.cos(a)*len;
    this.dy=Math.sin(a)*len;
}

Vector2D.prototype.plus =function(other){
  return new Vector2D(this.dx+other.dx, this.dy+other.dy);
}

Vector2D.prototype.reflectX =function(){
  return new Vector2D(-this.dx, this.dy);
}

Vector2D.prototype.reflectY =function(){
  return new Vector2D(this.dx, -this.dy);
}

Vector2D.prototype.getRotate =function(){
  return `rotate(${this.getAngle()}deg)`;
}

var keyboard={}

document.addEventListener("keydown", function(e){
    keyboard[e.code]=true;   
})

document.addEventListener("keyup", function(e){
    keyboard[e.code]=false;   
})

function SpaceShip(options){
    this.element=document.createElement("img");
    this.element.src="spaceship.png";
    this.element.style.position="absolute";
    this.setState(options);    
}

SpaceShip.prototype.setState=function(state){
    this.state=state;
    this.element.style.transform=state.pos.getTranslate()+" "+state.v.getRotate();
}

SpaceShip.prototype.show=function(){
    document.body.appendChild(this.element);
}


SpaceShip.prototype.getShipSize=function(){
    return this.element.getBoundingClientRect().height;
}

SpaceShip.prototype.exceedsH=function(){
    return ((this.state.pos.x>window.innerWidth-this.getShipSize()&&this.state.v.dx>0)||(this.state.pos.x<0 && this.state.v.dx<0))        
}

SpaceShip.prototype.exceedsW=function(){
    return ((this.state.pos.y>window.innerHeight-this.getShipSize()&&this.state.v.dy>0)||(this.state.pos.y<0 && this.state.v.dy<0))       
}

function LaserShot(options){
    this.element=document.createElement("img");
    this.element.src="lasershot.png";
    this.element.style.position="absolute";
    this.setState(options);    
}

LaserShot.prototype.setState=function(state){
    this.state=state;
    this.element.style.transform=state.pos.getTranslate();
}

LaserShot.prototype.show=function(){
    document.body.appendChild(this.element);
}

LaserShot.prototype.step=function(){
 console.log("2")
    var v = this.state.v+5;
    this.setState({pos:this.state.pos.plus(v),
                   v:v});
      
}

var shot;

SpaceShip.prototype.step=function(){
    if (this.exceedsH()){
       this.state.v=this.state.v.reflectX(); 
    }
     if (this.exceedsW()){
       this.state.v=this.state.v.reflectY(); 
    }
    var v = this.state.v;
    if (keyboard.ArrowLeft){
        v.setAngle(v.getAngle()-1);
    }
    if (keyboard.ArrowRight){
        v.setAngle(v.getAngle()+1);
    }
    
    if (keyboard.ArrowRight){
        v.setAngle(v.getAngle()+1);
    }
    if (keyboard.ArrowUp){
        v.setLength(v.getLength()+0.05);
    } 
    
    if (keyboard.ArrowDown){
        v.setLength(v.getLength()-0.05);
    }
    
     this.setState({pos:this.state.pos.plus(v),
                   v:v});
    
    if (keyboard.Space){
        shot=new LaserShot({pos:new Point2D(this.state.pos.x, this.state.pos.y),
                        v: new Vector2D(this.state.v.dx, this.state.v.dy)}); 
                        shot.show();   
         
    }   
}

var s1 = new SpaceShip({pos:new Point2D(0, 30),
                        v: new Vector2D(0, 0)});
     
                      
s1.show();   

function render(){
    s1.step();
    requestAnimationFrame(render);
}

function render2(){
   if (undefined != shot){
       shot.step();
   }
    requestAnimationFrame(render2);
}

render();
render2();

