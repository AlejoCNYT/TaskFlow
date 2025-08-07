function filterItems() {
    const filter = document.getElementById('search').value.toLowerCase();
    const rows = document.querySelectorAll('#itemsTable tbody tr');
    rows.forEach(row => {
        const text = row.children[0].textContent.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
    });
}

// Ejemplo JS Object + JS Patterns
const ItemController = (function() {
    const items = [];
    return {
        add(item) { items.push(item); },
        getAll() { return [...items]; }
    };
})();
