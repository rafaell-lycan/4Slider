var slides, json, speed = 'fast';

Slider = {
   now : '',
   total : '',
   slideContainer : '',
   nextSlide : function(){
      if(this.now < (this.total -1)){
         this.now++;
         $(".ativo").fadeOut(speed).removeClass("ativo").next().fadeIn(speed).addClass("ativo");
      }
   },
   prevSlide : function(){
      if(this.now > 0){
         this.now--;
         $(".ativo").fadeOut(speed).removeClass("ativo").prev().fadeIn(speed).addClass("ativo");
      }
   },
   loadDOM : function(dados){
      console.log(dados);
   },
   init : function(dados){

      //Load total of slides
      this.total = dados.length;

      //Define slider container
      this.slideContainer = $('.slider');

      //Make your slide in the first position
      this.now = 0;

      //Generate images in DOM
      for(var i = 0; i < this.total; i++){
         var img = document.createElement('img');
         img.src = dados[i].imgURL;
         img.setAttribute('alt','slide'+i);
         this.slideContainer.append(img);
      }

      //Load Slider and show the first image
      $(".slider img:first").fadeIn(speed).addClass("ativo");
   }
}

// Function to get KeyCode of your Keyboard
function getKey(event){
   var key = event;

   switch(key){
      case 37:
         Slider.prevSlide();
         break;
      case 39:
         Slider.nextSlide();
         break;
   }
}

jQuery(document).ready(function($) {

   //Load ressources from Json ressource
   $.ajax({
      dataType: 'JSON',
      type: 'GET',
      url: 'slides.json',

      success: function(data){
         json = data;

         //Init Slider
         Slider.init(data);
       }
   });

   // Navigation by Keyboard
   $(document).keydown(function(event) {
      getKey(event.keyCode);
   });

   //Navation by Link
   $('.controllers').find('a').on('click', function() {

      var command = this.hash.split('#')[1];

      switch(command){
         case 'home':
            Slider.now = 0;
            $(".ativo").removeClass("ativo");
            $(".slider img:first").fadeIn(speed).addClass("ativo");
            break;
         case 'prev':
            Slider.prevSlide();
            break;
         case 'next':
            Slider.nextSlide();
            break;
         case 'code':
            alert('Você clicou em Terminal');
            break;
         case 'notas':
            alert('Você clicou em Notas');
            break;
      }
   });
});