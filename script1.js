// Espera a que el documento HTML esté completamente cargado y listo.
$(document).ready(function(){
  // Selecciona todos los enlaces que comienzan con el símbolo '#'.
  $('a[href^="#"]').on('click',function (e) {
    // Previene el comportamiento predeterminado de hacer clic en el enlace.
    e.preventDefault();

    // Obtiene el destino del enlace interno (hash).
    var target = this.hash;
    // Crea un objeto jQuery del destino.
    var $target = $(target);

    // Detiene cualquier animación en curso y realiza una animación de desplazamiento suave.
    $('html, body').stop().animate({
        'scrollTop': $target.offset().top
    }, 600, 'swing', function () {
        // Cambia la URL de la página para reflejar el destino del enlace interno.
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

// Esta función cambia el tamaño de fuente de los párrafos en un documento HTML.
function changeFontSize() {
  // Obtiene todos los elementos de párrafo en el documento.
  var paragraphs = document.getElementsByTagName("p");
  
  // Recorre cada uno de los elementos de párrafo.
  for (var i = 0; i < paragraphs.length; i++) {
    // Obtiene el tamaño de fuente actual del párrafo.
    var fontSize = window.getComputedStyle(paragraphs[i]).fontSize;
    // Convierte el tamaño de fuente a un número entero.
    var currentSize = parseInt(fontSize);
  
    // Comprueba las condiciones para determinar el nuevo tamaño de fuente.
    if (currentSize <= 16) {
      // Establece un tamaño de fuente de 20px si el tamaño actual es menor o igual a 16px.
      paragraphs[i].style.fontSize = "20px";
    } else if (currentSize <= 20) {
      // Establece un tamaño de fuente de 24px si el tamaño actual es menor o igual a 20px.
      paragraphs[i].style.fontSize = "24px";
    } else {
      // Establece un tamaño de fuente de 16px si el tamaño actual es mayor que 20px.
      paragraphs[i].style.fontSize = "16px";
    }
  }
}
