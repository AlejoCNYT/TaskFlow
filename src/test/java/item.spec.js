// src/main/resources/static/js/tests/item.spec.js
describe('TaskFlow App - Async & DOM', () => {
    beforeEach(() => {
        document.body.innerHTML = '<ul id="list"></ul>';
    });

    it('loadItems() pinta elementos desde /api/items', async () => {
        spyOn(window, 'fetch').and.returnValue(Promise.resolve({
            ok: true,
            json: () => Promise.resolve([{ nombre: 'X', estado: 'DONE' }])
        }));

        await loadItems();
        const list = document.querySelectorAll('#list li');
        expect(list.length).toBe(1);
        expect(list[0].textContent).toContain('X');
        expect(list[0].textContent).toContain('DONE');
    });

    it('addItem() hace POST y luego recarga lista', async () => {
        // Simulamos POST y luego GET
        spyOn(window, 'fetch').and.callFake((url, opts) => {
            // POST /api/items
            if (url === '/api/items' && opts && opts.method === 'POST') {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ nombre: 'Bar', estado: 'PENDING' })
                });
            }
            // GET /api/items
            if (url === '/api/items' && (!opts || !opts.method)) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve([{ nombre: 'Bar', estado: 'PENDING' }])
                });
            }
            return Promise.resolve({ ok: true, json: () => Promise.resolve([]) });
        });

        await addItem('Bar', 'DescBar', 'PENDING');
        const list = document.querySelectorAll('#list li');
        expect(list.length).toBe(1);
        expect(list[0].textContent).toContain('Bar');
        expect(list[0].textContent).toContain('PENDING');
    });
});
