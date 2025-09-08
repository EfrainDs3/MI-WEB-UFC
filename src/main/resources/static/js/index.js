// js/index.js
$(document).ready(function () {

  // Fade in de contenido principal
  $("main").hide().fadeIn(1000);

  // Animar el logo al cargar
  $(".logo").css({ opacity: 0, transform: "translateY(-30px)" })
            .animate({ opacity: 1, top: "0px" }, 800);

  // Hover suave en botones SEGUIR
  $(".follow-btn").hover(
    function () {
      $(this).stop().animate({ backgroundColor: "#e50914", color: "#fff" }, 300);
    },
    function () {
      $(this).stop().animate({ backgroundColor: "#fff", color: "#000" }, 300);
    }
  );

  // Efecto al hacer clic en "SEGUIR"
  $(".follow-btn").click(function (e) {
    e.preventDefault();
    $(this).text("SIGUIENDO ✅").fadeOut(200).fadeIn(200);
  });

  // Animar tarjetas al pasar el mouse
  $(".fighter-card").hover(
    function () {
      $(this).css("transform", "scale(1.05)").css("box-shadow", "0 8px 20px rgba(0,0,0,0.3)");
    },
    function () {
      $(this).css("transform", "scale(1)").css("box-shadow", "none");
    }
  );

});
