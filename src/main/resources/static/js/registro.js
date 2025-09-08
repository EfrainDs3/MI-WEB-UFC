$(document).ready(function () {
  // Animación inicial de entrada del formulario
  $('.login-box').hide().fadeIn(1000);

  // Animación para los campos de entrada al enfocar
  $('input').focus(function () {
    $(this).animate({
      paddingLeft: '20px'
    }, 300);
  });

  $('input').blur(function () {
    $(this).animate({
      paddingLeft: '10px'
    }, 300);
  });

  // Efecto hover en el botón
  $('button[type="submit"]').hover(
    function () {
      $(this).stop().animate({ opacity: 0.8 }, 200);
    },
    function () {
      $(this).stop().animate({ opacity: 1 }, 200);
    }
  );

  // Lógica de registro
  $('#formRegistro').submit(function (e) {
    e.preventDefault();
    const nombre = $('#nombre').val();
    const correo = $('#email').val();
    if (!nombre || !correo) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    $.ajax({
      url: '/api/usuarios',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        nombre: nombre,
        correo: correo
      }),
      success: function (data) {
        alert('¡Se registró a nuestra familia de UFC!');
        $('#formRegistro')[0].reset();
      },
      error: function (xhr) {
        alert('Error al registrar usuario: ' + xhr.responseText);
      }
    });
  });
});
