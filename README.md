## Patrón de Diseño y Arquitectura

### Arquitectura en Capas (Layered Architecture)

La aplicación sigue el patrón **Controlador–Servicio–Repositorio**:

1. **Controllers**  
   - Manejan las peticiones HTTP (`@RestController`).  
   - Validan entrada y convierten DTO ↔ Entidad.  
   - No contienen lógica de negocio.

2. **Services**  
   - Implementan la lógica de negocio.  
   - Orquestan validaciones, transacciones y llamadas a los repositorios.  
   - Lanzan excepciones `ResponseStatusException` para controlar errores HTTP.

3. **Repositories**  
   - Extienden `JpaRepository<T, ID>`.  
   - Encapsulan el acceso a la base de datos (DAO).  
   - Operaciones CRUD básicas y consultas personalizadas.

### DTO (Data Transfer Object)

- Separan la representación externa (JSON) de las entidades JPA.  
- Evitan exponer directamente las entidades al cliente.  
- Incluyen validaciones con anotaciones `jakarta.validation.constraints`.

### Inyección de Dependencias (Dependency Injection)

- Spring gestiona la construcción de beans (`@Service`, `@Repository`, `@Controller`)  
- Se desacopla el código y facilita los tests unitarios (se pueden mockear los servicios).

### Ventajas

- **Separation of Concerns**: cada capa tiene una responsabilidad clara.  
- **Testabilidad**: los servicios y controladores pueden probarse aisladamente.  
- **Mantenibilidad**: añadir nuevas entidades o endpoints es directo.  
- **Escalabilidad**: posibilidad de añadir nuevas capas (caching, eventos, etc.).

Con este patrón tu código es limpio, modular y fácil de extender.```
