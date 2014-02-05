var slides, json;

Slider = {
   now : '',
   total : '',
   slideContainer : '',
   nextSlide : function(){
      if(this.now < (this.total -1)){
         this.now++;
         this.loadImage();
      }
   },
   prevSlide : function(){
      if(this.now > 0){
         this.now--;
         this.loadImage();
      }
   },
   loadImage : function(){
      slides.hide();
      slides[this.now].style.display = 'block';
   },
   loadDOM : function(dados){
      console.log(dados);
   },
   init : function(dados){

      //Load total of slides
      this.total = dados.length;

      //Define slider container
      this.slideContainer = $('.slider');

      //Generate images in DOM
      for(var i = 0; i < this.total; i++){
         var img = document.createElement('img');
         img.src = dados[i].imgURL;
         img.setAttribute('alt','slide'+i);
         this.slideContainer.append(img);
      }

      //Load slider and images
      this.slideContainer = $('.slider');
      slides = Slider.slideContainer.find('img');

      //Make your slide in the first position
      this.now = 0;

      //Show image
      this.loadImage();
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

//Load ressources from Json
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

jQuery(document).ready(function($) {

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
            Slider.loadImage();
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