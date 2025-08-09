// Filtro de la tabla (ya existente)
function filterItems() {
    const filter = document.getElementById('search')?.value?.toLowerCase() || '';
    const rows = document.querySelectorAll('#itemsTable tbody tr');
    rows.forEach(row => {
        const text = row.children[0]?.textContent?.toLowerCase() || '';
        row.style.display = text.includes(filter) ? '' : 'none';
    });
}

// Ejemplo JS Object + JS Patterns (ya existente)
const ItemController = (function () {
    const items = [];
    return {
        add(item) { items.push(item); },
        getAll() { return [...items]; }
    };
})();

// ---------------- Asíncronos con Fetch para la vista dinámica ----------------

async function loadItems() {
    const res = await fetch('/api/items');
    if (!res.ok) throw new Error('Error al cargar items');
    const data = await res.json();

    const ul = document.getElementById('list');
    if (!ul) return;
    ul.innerHTML = '';
    for (const it of data) {
        const li = document.createElement('li');
        li.textContent = `${it.nombre} – ${it.estado ?? 'PENDING'}`;
        ul.appendChild(li);
    }
}

async function addItem(nombre, descripcion, estado = 'PENDING') {
    const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, descripcion, estado })
    });
    if (!res.ok) throw new Error('Error al crear item');
    const created = await res.json();
    await loadItems();
    return created;
}

// Hook inicial para páginas que usen #list o el formulario de alta
window.addEventListener('DOMContentLoaded', () => {
    // Si existe una lista dinámica, la cargamos
    if (document.getElementById('list')) {
        loadItems().catch(err => console.error(err));
    }

    // Si existe el formulario de alta dinámica (#crearBtn), enganchamos submit
    const btn = document.getElementById('crearBtn');
    if (btn) {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const nombre = document.getElementById('nombre')?.value || '';
            const descripcion = document.getElementById('descripcion')?.value || '';
            const estado = document.getElementById('estado')?.value || 'PENDING';
            if (!nombre) return alert('Nombre requerido');
            try {
                await addItem(nombre, descripcion, estado);
                document.getElementById('nombre').value = '';
                document.getElementById('descripcion').value = '';
            } catch (err) {
                console.error(err);
                alert('No se pudo crear el item');
            }
        });
    }
});

// Export para tests Jasmine (si corres el runner en navegador)
window.loadItems = loadItems;
window.addItem = addItem;
