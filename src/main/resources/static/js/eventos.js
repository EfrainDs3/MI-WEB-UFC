// js/eventos.js
function formatearFecha(fechaIso) {
    const fecha = new Date(fechaIso);
    return fecha.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:8080/api/eventos')
        .then(res => res.json())
        .then(eventos => {
            const lista = document.getElementById('eventos-lista');
            lista.innerHTML = '';
            eventos.forEach(e => {
                const card = document.createElement('div');
                card.className = 'event-card';
                card.innerHTML = `
                    <img src="${e.imagen}" alt="${e.nombre}" class="event-image" />
                    <div class="event-content">
                        <h3 class="event-title">${e.nombre}</h3>
                        <p class="event-date">${formatearFecha(e.fecha)}</p>
                        <p class="event-location">${e.lugar}</p>
                        <a href="${e.link}" class="event-button" target="_blank">VER DETALLES</a>
                    </div>
                `;
                lista.appendChild(card);
            });
        });
});
