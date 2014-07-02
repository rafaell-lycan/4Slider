Slider = {
   current : 0,
   size : '',
   next = function(){

   },
   prev = function(){

   }
}

var slides = $('.slider');

function getKey(event){
   var key = event;

   if(key == 37){
      console.log("Prev");
   }else if(key == 39){
      console.log("Next");
   }else{
      console.log(key);
   }
}

jQuery(document).ready(function($) {

   $(document).keydown(function(event) {
      // event.preventDefault();
      // console.log(event.keyCode);
      getKey(event.keyCode);
   });
});