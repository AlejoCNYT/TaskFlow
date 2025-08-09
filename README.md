# TaskFlowApp – Resumen técnico y guía de sustentación

## Descripción general
**TaskFlowApp** es una aplicación web simple para gestionar tareas (*Items*) con campos **nombre**, **descripcion** y **estado**.  
Incluye:
- Vistas con **Thymeleaf** (lista, formulario, estadísticas).
- API REST JSON para operaciones asíncronas:  
  `GET /api/items` y `POST /api/items`.
- Lógica en **servicio** con almacenamiento en memoria.
- **JavaScript** para filtrar en la tabla y para **fetch** (listar/crear sin recargar).
- **Pruebas**: JUnit (backend) y Jasmine (frontend).

<img width="1024" height="1536" alt="ChatGPT Image 9 ago 2025, 09_29_56 a m" src="https://github.com/user-attachments/assets/f3fbe40a-8cc1-4dbc-90bf-37a9f884f683" />

---

## Patrón de Diseño y Arquitectura

### Arquitectura en Capas (Layered Architecture)
La aplicación sigue **Controlador–Servicio–Repositorio**:

1. **Controllers**  
   - Manejan peticiones HTTP.  
   - Validan entrada y convierten DTO ↔ Entidad (cuando aplica).  
   - No contienen lógica de negocio.

2. **Services**  
   - Implementan lógica de negocio.  
   - Orquestan validaciones y llamadas a repositorios.  
   - Pueden lanzar `ResponseStatusException` para errores HTTP.

3. **Repositories**  
   - (Para esta demo el “repositorio” es un **mapa en memoria**; en producción sería `JpaRepository<T,ID>`).  
   - Encapsulan acceso a datos, CRUD y consultas.

### DTO (Data Transfer Object)
- Separan la representación externa (JSON) de las entidades.  
- Evitan exponer directamente entidades JPA.  
- Pueden incluir validaciones (`jakarta.validation.constraints`).

### Inversión de Control / Inyección de Dependencias
- Spring crea e inyecta beans (`@Controller`, `@Service`, `@Repository`).  
- Facilita **test unitarios** con mocks.

### Ventajas
- **Separation of Concerns**: responsabilidades claras.  
- **Testabilidad**: controladores y servicios probados de forma aislada.  
- **Mantenibilidad** y **escalabilidad**.

Arquitectura

> **Diagrama de conceptos (3+ entidades)**  

> ```mermaid
> classDiagram
>   class Item {
>     Long id
>     String nombre
>     String descripcion
>     String estado
>   }
>   class Usuario {
>     Long id
>     String nombre
>   }
>   class Proyecto {
>     Long id
>     String titulo
>   }
>   Usuario "1" --> "many" Item : crea
>   Proyecto "1" --> "many" Item : agrupa
> ```

---

<img width="1902" height="879" alt="imagen" src="https://github.com/user-attachments/assets/5fb3beb7-8347-40e5-a95e-496927b18def" />

---

## Cómo ejecutar y demostrar
<img width="953" height="981" alt="Captura de pantalla 2025-08-09 091556" src="https://github.com/user-attachments/assets/9e4d613b-4c64-4a21-8af8-00a2ffc4fc09" />
<img width="953" height="976" alt="Captura de pantalla 2025-08-09 091602" src="https://github.com/user-attachments/assets/b72385f0-3a8e-4b01-a1fb-363419487cbb" />
<img width="957" height="973" alt="Captura de pantalla 2025-08-09 091607" src="https://github.com/user-attachments/assets/49efe744-a9e8-4d2b-8f45-e08d988d58bd" />

### Ejecutar aplicación
```bash
mvn clean package
mvn spring-boot:run
# Por defecto corre en 8081 (según tu log)
# Cambiar puerto: src/main/resources/application.properties
# server.port=8080
