// --- Configuración de API base ---
const API_URL = 'http://localhost:8080/api';

// --- Utilidades generales ---
function crearElemento(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
}

// --- Navegación entre módulos ---
const navItems = document.querySelectorAll('.nav-item');
const sections = {
    noticias: document.getElementById('section-noticias'),
    peleadores: document.getElementById('section-peleadores'),
    eventos: document.getElementById('section-eventos'),
    config: document.getElementById('section-config')
};
const mainTitle = document.getElementById('main-title');
const addBtn = document.getElementById('add-btn');
let currentSection = 'noticias';

const sectionTitles = {
    noticias: 'Gestión de Noticias',
    peleadores: 'Gestión de Peleadores',
    eventos: 'Gestión de Eventos'
};

function setAddBtnHandler(section) {
    if (section === 'noticias') addBtn.onclick = () => abrirModalNoticia();
    else if (section === 'peleadores') addBtn.onclick = () => abrirModalPeleador();
    else if (section === 'eventos') addBtn.onclick = () => abrirModalEvento();
    else addBtn.onclick = null;
}

function showSection(section) {
    Object.keys(sections).forEach(key => {
        if (sections[key]) sections[key].style.display = (key === section) ? '' : 'none';
    });
    mainTitle.textContent = sectionTitles[section] || '';
    setAddBtnHandler(section);
}

navItems.forEach(item => {
    item.onclick = () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const section = item.getAttribute('data-section');
        currentSection = section;
        showSection(section);
    };
});

// Inicialización: mostrar solo la sección de noticias al cargar
showSection(currentSection);

// --- Modal ---
const modal = document.getElementById('modal-form');
const modalContent = document.getElementById('modal-entity-form');
const closeModal = document.getElementById('close-modal');
let editId = null;

function abrirModal(html, onSubmit, values = {}) {
    modalContent.innerHTML = html;
    modal.style.display = 'flex';
    Object.keys(values).forEach(key => {
        if (modalContent[key]) modalContent[key].value = values[key];
    });
    modalContent.onsubmit = async e => {
        e.preventDefault();
        await onSubmit();
        cerrarModal();
    };
}
function cerrarModal() {
    modal.style.display = 'none';
    modalContent.innerHTML = '';
    editId = null;
}
closeModal.onclick = cerrarModal;
window.onclick = e => { if (e.target === modal) cerrarModal(); };

// --- Noticias ---
const noticiasTbody = document.getElementById('noticias-tbody');
const buscarNoticia = document.getElementById('buscar-noticia');
let noticiasData = [];

function renderNoticiasTabla(data) {
    noticiasTbody.innerHTML = '';
    data.forEach(noticia => {
        const tr = crearElemento(`
            <tr>
                <td><img src="${noticia.imagen}" alt="img" /></td>
                <td>${noticia.titulo}</td>
                <td>${noticia.contenido}</td>
                <td><a href="${noticia.link}" target="_blank">Enlace</a></td>
                <td class="action-btns">
                    <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                    <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `);
        tr.querySelector('.edit-btn').onclick = () => abrirModalNoticia(noticia);
        tr.querySelector('.delete-btn').onclick = () => eliminarNoticia(noticia.id);
        noticiasTbody.appendChild(tr);
    });
}

function abrirModalNoticia(noticia = null) {
    editId = noticia ? noticia.id : null;
    abrirModal(`
        <h2>${noticia ? 'Editar' : 'Agregar'} Noticia</h2>
        <input type="text" name="titulo" placeholder="Título" required />
        <textarea name="contenido" placeholder="Contenido" required></textarea>
        <input type="url" name="imagen" placeholder="URL de la imagen" required />
        <input type="url" name="link" placeholder="Enlace de la noticia" required />
        <button type="submit">${noticia ? 'Guardar Cambios' : 'Agregar Noticia'}</button>
    `, async () => {
        const noticiaObj = {
            titulo: modalContent.titulo.value,
            contenido: modalContent.contenido.value,
            imagen: modalContent.imagen.value,
            link: modalContent.link.value
        };
        let url = `${API_URL}/publicaciones`;
        let method = 'POST';
        if (editId) {
            url += '/' + editId;
            method = 'PUT';
        }
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(noticiaObj)
        });
        await cargarNoticias();
    }, noticia || {});
}

async function eliminarNoticia(id) {
    if (confirm('¿Eliminar esta noticia?')) {
        await fetch(`${API_URL}/publicaciones/` + id, { method: 'DELETE' });
        await cargarNoticias();
    }
}

async function cargarNoticias() {
    const res = await fetch(`${API_URL}/publicaciones`);
    noticiasData = await res.json();
    renderNoticiasTabla(filtrarNoticias(buscarNoticia.value));
}

function filtrarNoticias(q) {
    if (!q) return noticiasData;
    return noticiasData.filter(n => n.titulo.toLowerCase().includes(q.toLowerCase()) || n.contenido.toLowerCase().includes(q.toLowerCase()));
}
buscarNoticia.oninput = () => renderNoticiasTabla(filtrarNoticias(buscarNoticia.value));

// --- Gestión de Peleadores ---
const peleadoresTbody = document.getElementById('peleadores-tbody');
const buscarPeleador = document.getElementById('buscar-peleador');
let peleadoresData = [];

function renderPeleadoresTabla(data) {
    peleadoresTbody.innerHTML = '';
    data.forEach(peleador => {
        const tr = crearElemento(`
            <tr>
                <td><img src="${peleador.imagen}" alt="img" /></td>
                <td>${peleador.nombre}</td>
                <td>${peleador.descripcion}</td>
                <td>${peleador.peso}</td>
                <td><a href="${peleador.link}" target="_blank">Enlace</a></td>
                <td class="action-btns">
                    <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                    <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `);
        tr.querySelector('.edit-btn').onclick = () => abrirModalPeleador(peleador);
        tr.querySelector('.delete-btn').onclick = () => eliminarPeleador(peleador.id);
        peleadoresTbody.appendChild(tr);
    });
}

function abrirModalPeleador(peleador = null) {
    editId = peleador ? peleador.id : null;
    abrirModal(`
        <h2>${peleador ? 'Editar' : 'Agregar'} Peleador</h2>
        <input type="text" name="nombre" placeholder="Nombre" required />
        <textarea name="descripcion" placeholder="Descripción" required></textarea>
        <input type="url" name="imagen" placeholder="URL de la imagen" required />
        <input type="text" name="peso" placeholder="Categoría de peso" required />
        <input type="url" name="link" placeholder="Enlace (Instagram u otro)" required />
        <button type="submit">${peleador ? 'Guardar Cambios' : 'Agregar Peleador'}</button>
    `, async () => {
        const peleadorObj = {
            nombre: modalContent.nombre.value,
            descripcion: modalContent.descripcion.value,
            imagen: modalContent.imagen.value,
            peso: modalContent.peso.value,
            link: modalContent.link.value
        };
        let url = `${API_URL}/peleadores`;
        let method = 'POST';
        if (editId) {
            url += '/' + editId;
            method = 'PUT';
        }
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(peleadorObj)
        });
        await cargarPeleadores();
    }, peleador || {});
}

async function eliminarPeleador(id) {
    if (confirm('¿Eliminar este peleador?')) {
        await fetch(`${API_URL}/peleadores/` + id, { method: 'DELETE' });
        await cargarPeleadores();
    }
}

async function cargarPeleadores() {
    const res = await fetch(`${API_URL}/peleadores`);
    peleadoresData = await res.json();
    renderPeleadoresTabla(filtrarPeleadores(buscarPeleador.value));
}

function filtrarPeleadores(q) {
    if (!q) return peleadoresData;
    return peleadoresData.filter(p => p.nombre.toLowerCase().includes(q.toLowerCase()) || p.descripcion.toLowerCase().includes(q.toLowerCase()));
}
buscarPeleador.oninput = () => renderPeleadoresTabla(filtrarPeleadores(buscarPeleador.value));

// --- Gestión de Eventos ---
const eventosTbody = document.getElementById('eventos-tbody');
const buscarEvento = document.getElementById('buscar-evento');
let eventosData = [];

function renderEventosTabla(data) {
    eventosTbody.innerHTML = '';
    data.forEach(evento => {
        const tr = crearElemento(`
            <tr>
                <td><img src="${evento.imagen}" alt="img" /></td>
                <td>${evento.nombre}</td>
                <td>${evento.fecha}</td>
                <td>${evento.lugar}</td>
                <td><a href="${evento.link}" target="_blank">Enlace</a></td>
                <td class="action-btns">
                    <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                    <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `);
        tr.querySelector('.edit-btn').onclick = () => abrirModalEvento(evento);
        tr.querySelector('.delete-btn').onclick = () => eliminarEvento(evento.id);
        eventosTbody.appendChild(tr);
    });
}

function abrirModalEvento(evento = null) {
    editId = evento ? evento.id : null;
    abrirModal(`
        <h2>${evento ? 'Editar' : 'Agregar'} Evento</h2>
        <input type="text" name="nombre" placeholder="Nombre del evento" required />
        <input type="date" name="fecha" required />
        <textarea name="descripcion" placeholder="Descripción" required></textarea>
        <input type="url" name="imagen" placeholder="URL de la imagen" required />
        <input type="text" name="lugar" placeholder="Lugar" required />
        <input type="url" name="link" placeholder="Enlace de detalles" required />
        <button type="submit">${evento ? 'Guardar Cambios' : 'Agregar Evento'}</button>
    `, async () => {
        const eventoObj = {
            nombre: modalContent.nombre.value,
            fecha: modalContent.fecha.value,
            descripcion: modalContent.descripcion.value,
            imagen: modalContent.imagen.value,
            lugar: modalContent.lugar.value,
            link: modalContent.link.value
        };
        let url = `${API_URL}/eventos`;
        let method = 'POST';
        if (editId) {
            url += '/' + editId;
            method = 'PUT';
        }
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventoObj)
        });
        await cargarEventos();
    }, evento || {});
}

async function eliminarEvento(id) {
    if (confirm('¿Eliminar este evento?')) {
        await fetch(`${API_URL}/eventos/` + id, { method: 'DELETE' });
        await cargarEventos();
    }
}

async function cargarEventos() {
    const res = await fetch(`${API_URL}/eventos`);
    eventosData = await res.json();
    renderEventosTabla(filtrarEventos(buscarEvento.value));
}

function filtrarEventos(q) {
    if (!q) return eventosData;
    return eventosData.filter(e => e.nombre.toLowerCase().includes(q.toLowerCase()) || e.lugar.toLowerCase().includes(q.toLowerCase()));
}
buscarEvento.oninput = () => renderEventosTabla(filtrarEventos(buscarEvento.value));

// --- Botón agregar ---
// addBtn.onclick = () => {
//     if (currentSection === 'noticias') abrirModalNoticia();
//     if (currentSection === 'peleadores') abrirModalPeleador();
//     if (currentSection === 'eventos') abrirModalEvento();
// };

// --- Inicialización ---
document.addEventListener('DOMContentLoaded', () => {
    cargarNoticias();
    cargarPeleadores();
    cargarEventos();
}); 