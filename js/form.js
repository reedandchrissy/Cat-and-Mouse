AFRAME.registerComponent('hello-world', {
  init: function () {
    console.log('Hello, World!');
  }
});

AFRAME.registerComponent('log', {
  schema: {
    message: {type: 'string', default: 'Hello, World!'},
    test:{type:'int',default:0}
  },

  init: function(){
    console.log(this.data.message)
    console.log(this.data.test*10)
  },

  tick: function(time, timeDelta){
    //.....
  },


  // ...
});

console.log("loaded test.js")
