$(document).ready(function(){
    $('a[href^="#"]').on('click',function (e) {
      e.preventDefault();
  
      var target = this.hash;
      var $target = $(target);
  
      $('html, body').stop().animate({
          'scrollTop': $target.offset().top
      }, 600, 'swing', function () {
          window.location.hash = target;
      });
    });
  });

  $(document).ready(function() {
    // Obtener el estado actual del modo (si está guardado en localStorage)
    var mode = localStorage.getItem('mode');
  
    // Si el modo no está definido en localStorage, usa el modo predeterminado (modo claro)
    if (!mode) {
      mode = 'light';
    }
  
    // Establecer el modo actual en el cuerpo del documento
    $('body').addClass(mode + '-mode');
  
    // Manejar el evento de clic en el botón de cambio de modo
    $('#toggle-mode').click(function() {
      // Alternar entre los modos claro y oscuro
      if (mode === 'light') {
        mode = 'dark';
      } else {
        mode = 'light';
      }
  
      // Guardar el modo actual en localStorage
      localStorage.setItem('mode', mode);
  
      // Cambiar el modo en el cuerpo del documento
      $('body').removeClass('light-mode dark-mode').addClass(mode + '-mode');
    });
  });

  function changeFontSize() {
    var paragraphs = document.getElementsByTagName("p");
  
    for (var i = 0; i < paragraphs.length; i++) {
      var fontSize = window.getComputedStyle(paragraphs[i]).fontSize;
      var currentSize = parseInt(fontSize);
  
      if (currentSize <= 16) {
        paragraphs[i].style.fontSize = "20px";
      } else if (currentSize <= 20) {
        paragraphs[i].style.fontSize = "24px";
      } else {
        paragraphs[i].style.fontSize = "16px";
      }
    }
  }
  