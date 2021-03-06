console.log("loading powerup.js")

AFRAME.registerComponent('powerup', {
  schema: {
    target: {type: 'selector', default:"#hud"}
  },


  init: function() {
    const component = this
    this.health=5
    this.score=0
    let z = new Date()
    this.startTime = z.getTime()
    this.gameLength = 30 // you have 30 seconds to play!
    this.gameOver = false

    this.avatar = document.querySelector("#avbox")
    this.collisionHandler = (e) => {
         console.log('just collided with something')
         component.otherBody = e.detail.body
    }
    this.el.addEventListener('collide', this.collisionHandler);
  },

  tick: function(uptime,delta) {
    if (this.gameOver) return
    let z = new Date()
    let t = (z.getTime()-this.startTime)/1000
    let timeLeft = this.gameLength - t

    const otherBody = this.otherBody
    this.otherBody = null
    if (this.avatar) {

      let pos = this.avatar.object3D.position
      let wall=80
      if (pos.x >  wall) pos.x=  wall
      if (pos.x < -wall) pos.x= -wall
      if (pos.z >  wall) pos.z=  wall
      if (pos.z < -wall) pos.z= -wall
      //pos.set(position)
    }

    hud.setAttribute('health',this.health)
    hud.setAttribute('score',this.score)
    hud.setAttribute('text','value',
             "Score:"
           + this.score
           + "  Health:"
           + this.health
           + " Time: "
           + Math.round(timeLeft))

    if (timeLeft <0) {
     this.gameOver=true
     hud.setAttribute('text','value',"TIMESUP!  YOU LOSE!! GAME OVER!")
     setTimeout(function(){ window.history.back(); }, 5000);
    }

    if (otherBody) {

      console.log('in the tick function')
      console.dir(otherBody)
      const hud = this.data.target

      let elt = otherBody.el
      const eltHealth = parseInt(elt.getAttribute('health'))
      const eltScore = parseInt(elt.getAttribute('score'))
      const eltTime = parseInt(elt.getAttribute('time'))

      if (eltHealth) {
        this.health+= eltHealth;
        if(eltHealth==-10){
            let audio = new Audio('sounds/badCat.wav');
        	audio.play();
         }else if(eltHealth==-5){
         	let audio = new Audio('sounds/niceCat.wav');
        	audio.play();
         }else{
          	let audio = new Audio('sounds/health.wav');
          	audio.play();       	
         }
      }

      if (eltScore) {
        this.score += eltScore;
        let audio = new Audio('sounds/good.wav');
        audio.play();
      }

      if (eltTime) {
        console.log("updating the time!")
        this.gameLength += eltTime
        let audio = new Audio('sounds/bite.wav');
        audio.play();
      }
      console.log(this.startTime)






      if (eltHealth || eltScore || eltTime){
        console.log('removing elt from scene')
        console.dir(elt)
        console.log('parent is ')
        console.dir(elt.parentNode)
        otherBody.el.removeAttribute("dynamic-body");
        elt.parentNode.removeChild(elt)
      }


      if (this.score>20 && this.health > 0){
        this.health = 999;
        hud.setAttribute('text','value',"YOU WIN!!")
        this.gameOver = true
        setTimeout(function(){ window.history.back(); }, 5000);
      } else if (this.health <0){
        hud.setAttribute('text','value',"YOU LOSE!! GAME OVER!")
        this.gameOver = true
        setTimeout(function(){ window.history.back(); }, 5000);
      }


    }
  }

});
