
var playerEl = document.querySelector('#weapon');

//Delete enemy after colliding with the player
playerEl.addEventListener('collide', function (e) {
  e.detail.body.el.parentNode.removeChild(e.detail.body.el);
});

