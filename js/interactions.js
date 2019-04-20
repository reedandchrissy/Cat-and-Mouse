
var playerEl = document.querySelector('#weapon');
var scene = document.querySelector('a-scene');
var health = document.querySelector('#player').querySelector('#health');

//Delete enemy after colliding with the player
playerEl.addEventListener('collide', function (e) {
  scene.removeChild(e.detail.body.el);
  let currHP = parseInt(health.getAttribute('value')) - 1;
  health.setAttribute('value', currHP);
});
