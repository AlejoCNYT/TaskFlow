package edu.workshop.todo.service;


import edu.workshop.todo.model.Item;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ItemService {
    private final Map<Long, Item> storage = new ConcurrentHashMap<>();
    private final AtomicLong counter = new AtomicLong(1);

    public List<Item> findAll() {
        return new ArrayList<>(storage.values());
    }

    public void save(Item item) {
        if (item.getId() == null) {
            item.setId(counter.getAndIncrement());
        }
        storage.put(item.getId(), item);
    }

    public Item findById(Long id) {
        return storage.get(id);
    }

    public void delete(Long id) {
        storage.remove(id);
    }
}
