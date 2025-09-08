$(document).ready(function () {
  // Animación inicial al cargar
  $(".login-box").hide().fadeIn(1200);

  // Animación al enfocar los inputs
  $("input").focus(function () {
    $(this).css("background-color", "#2a2a2a");
  });

  $("input").blur(function () {
    $(this).css("background-color", "#333");
  });

  // Animación al pasar el mouse sobre el botón
  $("button").hover(
    function () {
      $(this).css({
        "background-color": "#ff2e63",
        transform: "scale(1.05)",
      });
    },
    function () {
      $(this).css({
        "background-color": "#d90429",
        transform: "scale(1)",
      });
    }
  );

  // Lógica de login
  $('#formLogin').submit(function (e) {
    e.preventDefault();
    const correo = $('#email').val();
    const contrasena = $('#password').val();
    if (!correo || !contrasena) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    $.ajax({
      url: '/api/usuarios/login',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        correo: correo,
        contrasena: contrasena
      }),
      success: function (data) {
        window.location.href = 'index.html';
      },
      error: function (xhr) {
        alert('Correo o contraseña incorrectos.');
      }
    });
  });
});
