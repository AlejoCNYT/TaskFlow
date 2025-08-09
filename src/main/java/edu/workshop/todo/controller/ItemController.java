package edu.workshop.todo.controller;

import edu.workshop.todo.model.Item;
import edu.workshop.todo.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class ItemController {

    @Autowired
    private ItemService service;

    // Inicio (estadísticas)
    @GetMapping({"/", "/home"})
    public String home(Model model) {
        var items = service.findAll();
        model.addAttribute("total", items.size());
        long activos = items.stream()
                .filter(i -> !"completado".equalsIgnoreCase(i.getEstado()))
                .count();
        model.addAttribute("activos", activos);
        return "home";
    }

    // Listar (Consultar Ítems) - vista Thymeleaf
    @GetMapping("/items")
    public String list(Model model) {
        model.addAttribute("items", service.findAll());
        return "list";
    }

    // Mostrar formulario nuevo/editar
    @GetMapping({"/item/form", "/item/form/{id}"})
    public String form(@PathVariable(required = false) Long id, Model model) {
        if (id != null) {
            model.addAttribute("item", service.findById(id));
        } else {
            model.addAttribute("item", new Item());
        }
        return "form";
    }

    // Guardar (nuevo o editar)
    @PostMapping("/item/save")
    public String save(@ModelAttribute Item item) {
        service.save(item);
        return "redirect:/items";
    }

    // Eliminar
    @GetMapping("/item/delete/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "redirect:/items";
    }

    // ------------------ API JSON para llamadas asíncronas (Fetch) ------------------

    // GET /api/items -> lista JSON
    @GetMapping("/api/items")
    @ResponseBody
    public List<Item> apiList() {
        return service.findAll();
    }

    // POST /api/items -> crea y devuelve el item en JSON
    @PostMapping("/api/items")
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    public Item apiCreate(@RequestBody Item item) {
        service.save(item);
        return item;
    }
}
