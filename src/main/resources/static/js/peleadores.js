document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:8080/api/peleadores')
        .then(res => res.json())
        .then(peleadores => {
            const lista = document.getElementById('peleadores-lista');
            lista.innerHTML = '';
            peleadores.forEach(p => {
                const card = document.createElement('div');
                card.className = 'peleador-card';
                card.innerHTML = `
                    <img src="${p.imagen}" alt="${p.nombre}" class="peleador-imagen">
                    <h3>${p.nombre}</h3>
                    <p>${p.descripcion}</p>
                    <span class="weight-class">${p.peso}</span>
                    <a class="follow-btn" href="${p.link}" target="_blank" rel="noopener">SEGUIR</a>
                `;
                lista.appendChild(card);
            });
        });
});
