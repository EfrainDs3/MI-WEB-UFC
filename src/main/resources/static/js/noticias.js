document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:8080/api/publicaciones')
        .then(res => res.json())
        .then(noticias => {
            const lista = document.getElementById('noticias-lista');
            lista.innerHTML = '';
            noticias.forEach(n => {
                const card = document.createElement('div');
                card.className = 'news-card';
                card.innerHTML = `
                    <img src="${n.imagen}" alt="${n.titulo}" class="news-image" />
                    <div class="news-content">
                        <h3 class="news-title">${n.titulo}</h3>
                        <p class="news-text">${n.contenido}</p>
                        <a href="${n.link}" class="news-button" target="_blank">VER MÁS</a>
                    </div>
                `;
                lista.appendChild(card);
            });
        });
});
