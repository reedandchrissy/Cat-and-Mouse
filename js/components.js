    var gameTimer = 15000;    

    /**
     * Click mouse to shoot.
     */
     AFRAME.registerComponent('click-to-shoot', {
      init: function () {
        document.body.addEventListener('mousedown', () => { this.el.emit('shoot'); });
      }
    });

    /**
     * Disappear at 0hp.
     */
     AFRAME.registerComponent('hit-handler', {
      dependencies: ['material'],

      init: function () {

        this.el.addEventListener('hit', () => {

        });

        this.el.addEventListener('die', () => {

          let score = document.querySelector('#scene').querySelector('#player').querySelector('#score');
          let scene = document.querySelector('#scene');
          let oldScore = parseInt(score.getAttribute('value'));
          let counter = document.querySelector('#scene').querySelector('#counter');
          let oldCounter = parseInt(counter.getAttribute('value'));
          gameTimer += 3000;

          counter.setAttribute('value', oldCounter - 1);
          score.setAttribute('value', oldScore + 1);
            scene.object3D.remove(this.el.object3D) //removes object from aframe; leaves behind invisible bounding box
            scene.removeChild(this.el) //removes object from DOM; used to delete bounding box
          });
      }

    });

     AFRAME.registerComponent('timer', {
      tick: function (time, timeDelta) {
        let timer = document.querySelector('#scene').querySelector('#player').querySelector('#time');
        let timeLeft = gameTimer - timeDelta;
        gameTimer -= timeDelta;
        timer.setAttribute('value', timeLeft / 1000);
      }
    });

     AFRAME.registerComponent('spawn', {

      init: function () {
        for(let i = 0; i < 10; i++){
          spawnNewEnemy(randomPosition());
        }

      },

      tick: function (time, timeDelta) {
        if(gameTimer <= 0 ){
          console.log("You lose!!!");
          //Insert lose event here
        }
        let enemiesLeft = parseInt(document.querySelector('#scene').querySelector('#player').querySelector('#counter').getAttribute('value'));
        if(enemiesLeft == 0 && gameTimer > 0 ){
          updateWaveCounter();
          let wave = parseInt(document.querySelector('#scene').querySelector('#player').querySelector('#wave').getAttribute('value'));
          if(wave < 4){
            spawnNewWave(wave);
          } else {
            console.log("You win!");
            //Insert win event here
          }
        }

      }
    });

     const updateWaveCounter = function(){
        let wave = document.querySelector('#scene').querySelector('#player').querySelector('#wave');
        let oldWaveCounter = parseInt(document.querySelector('#scene').querySelector('#player').querySelector('#wave').getAttribute('value'));
        wave.setAttribute('value', oldWaveCounter + 1);
     };

     const spawnNewWave = function(wave){
          let spawnLimit = 5 + wave * 5; 
          for(let i = 0; i < spawnLimit; i++){
            spawnNewEnemy(randomPosition());
          }
     };

     const spawnNewEnemy = function(position) { 
      let newEnemy = document.querySelector('#scene').querySelector('#base').cloneNode(true);
      let counter = document.querySelector('#scene').querySelector('#counter');
      let oldCounter = parseInt(counter.getAttribute('value'));
      counter.setAttribute('value', oldCounter + 1);
      newEnemy.setAttribute('position', position);
      document.body.querySelector('#scene').appendChild(newEnemy);
    };

    const randomPosition = function() { 
            let x = Math.floor((Math.random() * 20) + 10); // greater than 10, less than 30
            let z = Math.floor((Math.random() * 20) + 10); // greater than 10, less than 30

            if(Math.floor((Math.random() * 10)) % 2 == 0){ 
              x *= -1            
            }

            if(Math.floor((Math.random() * 10)) % 2 == 0){
              z *= -1            
            }

            return x + " " + 1 + " " + z;
          };


