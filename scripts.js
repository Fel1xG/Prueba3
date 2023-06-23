// Registro de datos
let registros = localStorage.getItem('registros') ? JSON.parse(localStorage.getItem('registros')) : [];
let idRegistro = localStorage.getItem('idRegistro') ? parseInt(localStorage.getItem('idRegistro')) : 1;
let registrosEliminados = localStorage.getItem('registrosEliminados') ? JSON.parse(localStorage.getItem('registrosEliminados')) : [];

// Función para guardar los registros en el almacenamiento local
function guardarRegistrosEnLocalStorage() {
  localStorage.setItem('registros', JSON.stringify(registros));
  localStorage.setItem('idRegistro', idRegistro.toString());
  localStorage.setItem('registrosEliminados', JSON.stringify(registrosEliminados));
}

// Función para obtener los datos de autocompletado
function obtenerDatosAutocompletado() {
  return {
    nombres: registros.map(registro => registro.nombre),
    correos: registros.map(registro => registro.correo),
    telefonos: registros.map(registro => registro.telefono),
    direcciones: registros.map(registro => registro.direccion),
    ciudades: ciudadesChile
  };
}

// Función para mostrar las sugerencias de autocompletado
function mostrarSugerencias() {
  const busquedaCiudad = document.getElementById('busquedaCiudad');
  const sugerenciasCiudad = document.getElementById('sugerenciasCiudad');

  const busqueda = busquedaCiudad.value.toLowerCase();
  const datosAutocompletado = obtenerDatosAutocompletado();

  // Verificar que se haya ingresado un valor en el campo de búsqueda
  if (busqueda.length === 0) {
    sugerenciasCiudad.innerHTML = '';
    return;
  }

  // Filtrar las sugerencias de ciudad basadas en la búsqueda
  const sugerenciasFiltradas = datosAutocompletado.ciudades.filter(ciudad =>
    ciudad.toLowerCase().startsWith(busqueda)
  );

  // Mostrar las sugerencias en el elemento HTML correspondiente
  sugerenciasCiudad.innerHTML = '';
  sugerenciasFiltradas.forEach(sugerencia => {
    const p = document.createElement('p');
    p.textContent = sugerencia;
    p.addEventListener('click', () => {
      // Asignar el valor seleccionado al campo de búsqueda
      busquedaCiudad.value = sugerencia;
      // Limpiar las sugerencias
      sugerenciasCiudad.innerHTML = '';
    });
    sugerenciasCiudad.appendChild(p);
  });
}

// Función para registrar
function registrar() {
  const nombreElement = document.getElementById('nombre');
  const correoElement = document.getElementById('correo');
  const telefonoElement = document.getElementById('telefono');
  const generoMasculinoElement = document.getElementById('genero-masculino');
  const generoFemeninoElement = document.getElementById('genero-femenino');
  const fechaNacimientoElement = document.getElementById('fechaNacimiento');
  const busquedaCiudadElement = document.getElementById('busquedaCiudad');
  const direccionElement = document.getElementById('direccion');
  const codigoPostalElement = document.getElementById('codigoPostal');

  const nombre = nombreElement.value.trim();
  const correo = correoElement.value.trim();
  const telefono = telefonoElement.value.trim();
  const genero = generoMasculinoElement.checked ? 'masculino' : 'femenino';
  const fechaNacimiento = fechaNacimientoElement.value.trim();
  const ciudad = busquedaCiudadElement.value.trim();
  const direccion = direccionElement.value.trim();
  const codigoPostal = codigoPostalElement.value.trim();

  if (nombre === '' || correo === '' || telefono === '' || fechaNacimiento === '' || ciudad === '' || direccion === '' || codigoPostal === '') {
    mostrarMensaje('Todos los campos son requeridos.', 'error');
    return;
  }

  // Validar el formato correcto del correo
  const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!correoRegex.test(correo)) {
    mostrarMensaje('Ingresa un correo electrónico válido.', 'error');
    return;
  }

// Validar que el nombre y apellido solo contengan texto y caracteres especiales
const nombreRegex = /^[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ\s]+$/;
if (!nombreRegex.test(nombre)) {
  mostrarMensaje('Ingresa un nombre válido. Solo se permiten letras y caracteres especiales.', 'error');
  return;
}


  // Validar el formato correcto del teléfono
  const telefonoRegex = /^[+]?(56)?[1-9][0-9]{8}$/;
  if (!telefonoRegex.test(telefono)) {
    mostrarMensaje('Ingresa un número de teléfono válido en el formato de Chile.', 'error');
    return;
  }

  const nuevoRegistro = {
    id: idRegistro,
    nombre: nombre,
    correo: correo,
    telefono: telefono,
    ciudad: ciudad,
    direccion: direccion,
    genero: genero,
    fechaNacimiento: fechaNacimiento,
    codigoPostal: codigoPostal
  };

  function mostrarMensaje(mensaje, tipo) {
    alert(mensaje);
  }

  registros.push(nuevoRegistro);
  console.log('Registro guardado:');
  console.log(nuevoRegistro);

  // Incrementar el ID para el próximo registro
  idRegistro++;

  // Limpiar los campos del formulario
  nombreElement.value = '';
  correoElement.value = '';
  telefonoElement.value = '';
  busquedaCiudadElement.value = '';
  direccionElement.value = '';
  generoMasculinoElement.checked = false;
  generoFemeninoElement.checked = false;
  fechaNacimientoElement.value = '';
  codigoPostalElement.value = '';

  guardarRegistrosEnLocalStorage();

  // Mostrar todos los registros en el HTML
  mostrarTodoEnHTML();
}


// Función para eliminar un registro por ID
function eliminar() {
  const id = parseInt(document.getElementById('id').value);

  const registroEliminado = registros.find(registro => registro.id === id);
  if (!registroEliminado) {
    mostrarMensajeEliminacion('No se encontró ningún registro con el ID ingresado.', 'error');
    return;
  }

  const confirmacion = confirm(`¿Estás seguro de eliminar el registro con ID ${id}?`);
  if (confirmacion) {
    registros = registros.filter(registro => registro.id !== id);
    registrosEliminados.push(registroEliminado);
    guardarRegistrosEnLocalStorage();
    mostrarMensajeEliminacion(`Registro con ID ${id} eliminado correctamente.`, 'success');
    resetearFormulario();
    bloquearCamposFormulario(true);
    mostrarIDsRegistrados();
    mostrarTodoEnHTML();
  // Verificar si se eliminó correctamente
  if (registroEliminado) {
    mostrarMensaje('Registro eliminado correctamente.', 'success');
  } else {
    mostrarMensaje('No se pudo eliminar el registro.', 'error');
  }
    document.getElementById('id').value = ''; // Vaciar el campo de ID
  }
}
function mostrarMensajeEliminacion(mensaje, tipo) {
  const mensajeElement = document.getElementById('mensajeEliminacion');
  mensajeElement.textContent = mensaje;
  mensajeElement.className = tipo;
}

function bloquearCamposFormulario(bloquear) {
  const nombreElement = document.getElementById('nombre');
  const correoElement = document.getElementById('correo');
  const telefonoElement = document.getElementById('telefono');
  const generoMasculinoElement = document.getElementById('genero-masculino');
  const generoFemeninoElement = document.getElementById('genero-femenino');
  const fechaNacimientoElement = document.getElementById('fechaNacimiento');
  const busquedaCiudadElement = document.getElementById('busquedaCiudad');
  const direccionElement = document.getElementById('direccion');
  const codigoPostalElement = document.getElementById('codigoPostal');
  const botonRegistrarElement = document.getElementById('botonRegistrar');

  nombreElement.disabled = bloquear;
  correoElement.disabled = bloquear;
  telefonoElement.disabled = bloquear;
  generoMasculinoElement.disabled = bloquear;
  generoFemeninoElement.disabled = bloquear;
  fechaNacimientoElement.disabled = bloquear;
  busquedaCiudadElement.disabled = bloquear;
  direccionElement.disabled = bloquear;
  codigoPostalElement.disabled = bloquear;
  botonRegistrarElement.disabled = bloquear;
}

function resetearFormulario() {
  const formulario = document.getElementById('registroForm');
  formulario.reset();
}

// Ocultar el contenedor de registros al cargar la página
window.addEventListener('DOMContentLoaded', function() {
  const registrosContainer = document.getElementById('registrosContainer');
  registrosContainer.style.display = 'none';
});

// Función para mostrar todos los registros en el HTML
function mostrarTodoEnHTML() {
  const registrosContainer = document.getElementById('registrosContainer');
  registrosContainer.innerHTML = '';

  registros.forEach(registro => {
    const registroDiv = document.createElement('div');
    registroDiv.classList.add('registro');

    const idP = document.createElement('p');
    idP.textContent = `ID: ${registro.id}`;

    const nombreP = document.createElement('p');
    nombreP.textContent = `Nombre: ${registro.nombre}`;

    const correoP = document.createElement('p');
    correoP.textContent = `Correo: ${registro.correo}`;

    const telefonoP = document.createElement('p');
    telefonoP.textContent = `Teléfono: ${registro.telefono}`;

    const ciudadP = document.createElement('p');
    ciudadP.textContent = `Ciudad: ${registro.ciudad}`;

    const direccionP = document.createElement('p');
    direccionP.textContent = `Dirección: ${registro.direccion}`;

    const generoP = document.createElement('p');
    generoP.textContent = `Género: ${registro.genero}`;

    const fechaNacimientoP = document.createElement('p');
    fechaNacimientoP.textContent = `Fecha de Nacimiento: ${registro.fechaNacimiento}`;

    const codigoPostalP = document.createElement('p');
    codigoPostalP.textContent = `Código Postal: ${registro.codigoPostal}`;

    registroDiv.appendChild(idP);
    registroDiv.appendChild(nombreP);
    registroDiv.appendChild(correoP);
    registroDiv.appendChild(telefonoP);
    registroDiv.appendChild(ciudadP);
    registroDiv.appendChild(direccionP);
    registroDiv.appendChild(generoP);
    registroDiv.appendChild(fechaNacimientoP);
    registroDiv.appendChild(codigoPostalP);

    registrosContainer.appendChild(registroDiv);
  });

  // Mostrar el contenedor de registros al hacer clic en el botón
  registrosContainer.style.display = 'block';


  

  // Mostrar los IDs registrados en el campo de entrada del ID
  mostrarIDsRegistrados();
}

// Función para mostrar el mensaje de eliminación en el HTML
function mostrarMensajeEliminacion(mensaje) {
  const mensajeEliminacionElement = document.getElementById('mensajeEliminacion');
  mensajeEliminacionElement.textContent = mensaje;
}

// Función para mostrar los IDs registrados en el campo de entrada del ID
function mostrarIDsRegistrados() {
  const idElement = document.getElementById('id');
  idElement.innerHTML = '';

  registros.forEach(registro => {
    const option = document.createElement('option');
    option.value = registro.id;
    option.textContent = registro.id;
    idElement.appendChild(option);
  });

  // Si hay registros, seleccionar el primer ID por defecto
  if (registros.length > 0) {
    idElement.value = registros[0].id;
  }
}

// Función para modificar un registro por ID
function modificar() {
  const idModificacionElement = document.getElementById('idModificacion');
  const nombreElement = document.getElementById('nombre');
  const correoElement = document.getElementById('correo');
  const telefonoElement = document.getElementById('telefono');
  const generoMasculinoElement = document.getElementById('genero-masculino');
  const generoFemeninoElement = document.getElementById('genero-femenino');
  const fechaNacimientoElement = document.getElementById('fechaNacimiento');
  const busquedaCiudadElement = document.getElementById('busquedaCiudad');
  const direccionElement = document.getElementById('direccion');
  const codigoPostalElement = document.getElementById('codigoPostal');

  const idModificacion = idModificacionElement.value;
  const nombre = nombreElement.value.trim();
  const correo = correoElement.value.trim();
  const telefono = telefonoElement.value.trim();
  const genero = generoMasculinoElement.checked ? 'masculino' : 'femenino';
  const fechaNacimiento = fechaNacimientoElement.value.trim();
  const ciudad = busquedaCiudadElement.value.trim();
  const direccion = direccionElement.value.trim();
  const codigoPostal = codigoPostalElement.value.trim();

  if (idModificacion === '' || nombre === '' || correo === '' || telefono === '' || fechaNacimiento === '' || ciudad === '' || direccion === '' || codigoPostal === '') {
    mostrarMensaje('Todos los campos son requeridos.', 'error');
    return;
  }

  // Validar el formato correcto del correo
  const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!correoRegex.test(correo)) {
    mostrarMensaje('Ingresa un correo electrónico válido.', 'error');
    return;
  }

  // Validar que el nombre y apellido solo contengan texto y caracteres especiales
  const nombreRegex = /^[a-zA-ZáÁéÉíÍóÓúÚñÑüÜ\s]+$/;
  if (!nombreRegex.test(nombre)) {
    mostrarMensaje('Ingresa un nombre válido. Solo se permiten letras y caracteres especiales.', 'error');
    return;
  }

  // Validar el formato correcto del teléfono
  const telefonoRegex = /^[+]?(56)?[1-9][0-9]{8}$/;
  if (!telefonoRegex.test(telefono)) {
    mostrarMensaje('Ingresa un número de teléfono válido en el formato de Chile.', 'error');
    return;
  }

  const registro = registros.find(registro => registro.id === parseInt(idModificacion));
  if (!registro) {
    mostrarMensaje('El ID seleccionado no existe.', 'error');
    return;
  }

  registro.nombre = nombre;
  registro.correo = correo;
  registro.telefono = telefono;
  registro.genero = genero;
  registro.fechaNacimiento = fechaNacimiento;
  registro.ciudad = ciudad;
  registro.direccion = direccion;
  registro.codigoPostal = codigoPostal;

  mostrarMensaje('Registro modificado exitosamente.', 'success');
  guardarRegistrosEnLocalStorage();
}

  // Vaciar los campos después de la modificación
  idModificacionElement.value = '';
  nombreElement.value = '';
  correoElement.value = '';
  telefonoElement.value = '';
  generoMasculinoElement.checked = false;
  generoFemeninoElement.checked = false;
  fechaNacimientoElement.value = '';
  busquedaCiudadElement.value = '';
  direccionElement.value = '';
  codigoPostalElement.value = '';


function mostrarMensaje(mensaje, tipo) {
  const mensajeElement = document.getElementById('mensaje');
  mensajeElement.textContent = mensaje;
  mensajeElement.className = `mensaje-container ${tipo}`;
  setTimeout(() => {
    mensajeElement.textContent = '';
    mensajeElement.className = 'mensaje-container';
  }, 3000);
}

function validarFechaNacimiento() {
  const fechaNacimientoElement = document.getElementById('fechaNacimiento');
  const fechaNacimiento = fechaNacimientoElement.value;
  const fechaActual = new Date();

  if (fechaNacimiento > fechaActual.toISOString().split('T')[0]) {
    fechaNacimientoElement.setCustomValidity('La fecha de nacimiento no puede ser en el futuro.');
  } else {
    fechaNacimientoElement.setCustomValidity('');
  }
}


  // Mostrar todos los registros en el HTML
  mostrarTodoEnHTML();


// ...

// Cargar los registros desde el almacenamiento local al cargar la página
cargarRegistrosDesdeLocalStorage();

// Mostrar todos los registros en el HTML al cargar la página
mostrarTodoEnHTML();

// Event listeners
nombreElement.addEventListener('input', mostrarSugerencias);
correoElement.addEventListener('input', mostrarSugerencias);
telefonoElement.addEventListener('input', mostrarSugerencias);
busquedaCiudadElement.addEventListener('input', mostrarSugerencias);
direccionElement.addEventListener('input', mostrarSugerencias);
generoMasculinoElement.addEventListener('change', mostrarSugerencias);
generoFemeninoElement.addEventListener('change', mostrarSugerencias);
form.addEventListener('submit', (event) => {
  event.preventDefault();
  registrar();
});
eliminarButton.addEventListener('click', eliminar);
modificarButton.addEventListener('click', modificar);

function toggleTheme() {
  var body = document.body;
  body.classList.toggle("dark-theme");

  // Guardar la preferencia del usuario en el almacenamiento local
  if (body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }

  // Agregar o quitar la clase "dark-theme" al formulario
  var forms = document.querySelectorAll("form");
  forms.forEach(function (form) {
    form.classList.toggle("dark-theme");
  });
}

// Cargar el tema preferido del usuario al cargar la página
window.addEventListener("DOMContentLoaded", function () {
  var theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark-theme");

    // Agregar la clase "dark-theme" a los formularios
    var forms = document.querySelectorAll("form");
    forms.forEach(function (form) {
      form.classList.add("dark-theme");
    });
  }
});

  function validarFechaNacimiento() {
    var inputFecha = document.getElementById("fechaNacimiento");
    var fechaNacimiento = new Date(inputFecha.value);
    var fechaActual = new Date();
    var edadMinima = 10; // Edad mínima permitida en años

    if (fechaNacimiento > fechaActual) {
      alert("Por favor, ingresa una fecha de nacimiento válida.");
      inputFecha.value = ""; // Limpiar el campo de fecha de nacimiento
    } else {
      var edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

      // Verificar si la edad es menor a 10 años
      if (edad < edadMinima) {
        alert("Debes tener al menos 10 años para registrarte.");
        inputFecha.value = ""; // Limpiar el campo de fecha de nacimiento
      }
    }
  }

  function validarFormularioRegistrar() {
    const nombreElement = document.getElementById('nombre');
    const correoElement = document.getElementById('correo');
    const telefonoElement = document.getElementById('telefono');
    const busquedaCiudadElement = document.getElementById('busquedaCiudad');
    const direccionElement = document.getElementById('direccion');
    const generoMasculinoElement = document.getElementById('genero-masculino');
    const generoFemeninoElement = document.getElementById('genero-femenino');
    const fechaNacimientoElement = document.getElementById('fechaNacimiento');
    const codigoPostalElement = document.getElementById('codigoPostal');
  
    // Validar campos individuales
    const nombre = nombreElement.value.trim();
    const correo = correoElement.value.trim();
    const telefono = telefonoElement.value.trim();
    const ciudad = busquedaCiudadElement.value.trim();
    const direccion = direccionElement.value.trim();
    const fechaNacimiento = fechaNacimientoElement.value.trim();
    const codigoPostal = codigoPostalElement.value.trim();
  
    if (nombre === '') {
      mostrarMensaje('Por favor, ingresa un nombre.', 'error');
      return false;
    }
  
    if (correo === '') {
      mostrarMensaje('Por favor, ingresa un correo electrónico.', 'error');
      return false;
    }
  
    // Agregar validaciones adicionales para los otros campos
  
    return true; // Si todos los campos son válidos
  }
  
  function validarFormularioModificar() {
    // Realiza validaciones similares a la función validarFormularioRegistrar() para el formulario de modificar
  }
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validarFormularioRegistrar()) {
      registrar();
    }
  });
  
  modificarButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (validarFormularioModificar()) {
      modificar();
    }
  });
  