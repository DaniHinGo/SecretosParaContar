# 📚 Fundación Secretos para Contar

Una plataforma web que promueve la lectura y el acceso libre a libros, permitiendo a los usuarios explorar títulos y realizar donaciones para apoyar la causa.

---

## 🚀 Descripción

**Fundación Secretos para Contar** es una iniciativa digital desarrollada con tecnologías modernas que busca:

- Facilitar el acceso gratuito a libros desde cualquier parte del mundo.
- Permitir a los usuarios donar libros o fondos para seguir promoviendo la lectura.
- Gestionar el contenido y las transacciones de manera segura y eficiente.
- Conectar a lectores con comunidades rurales a través de la literatura.

---

## 🧰 Tecnologías utilizadas

### Frontend
- **Framework:** [React](https://reactjs.org/) con [Remix](https://remix.run/)
- **Estilos:** Tailwind CSS
- **Gestión de estado:** React Context API
- **Formularios:** React Hook Form
- **Validación:** Zod
- **Autenticación:** JWT

### Backend
- **Framework:** [.NET 7+](https://dotnet.microsoft.com/)
- **Base de Datos:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** Entity Framework Core
- **API:** RESTful con autenticación JWT
- **Documentación:** Swagger/OpenAPI

### Despliegue
- **Frontend:** Vercel
- **Backend:** Azure / Railway / Render
- **Base de datos:** PostgreSQL en servicio administrado

---

## 📂 Estructura del Proyecto

```
📁 frontend/                # Proyecto de frontend (Remix)
│   📁 Katrina/             # Aplicación principal
│   │   📁 app/             # Componentes y rutas de la aplicación
│   │   │   📁 components/  # Componentes reutilizables
│   │   │   📁 routes/      # Páginas y rutas de la aplicación
│   │   │   📁 context/     # Contextos de React para gestión de estado
│   │   │   📁 utils/       # Utilidades y funciones auxiliares
│   │   └── ...
│   └── ...
│
📁 backend/                 # Proyecto de backend (.NET API)
│   📁 SecretosParaContar.API/  # API principal
│   │   📁 Controllers/     # Controladores de la API
│   │   📁 Models/          # Modelos de datos
│   │   📁 Services/        # Servicios de negocio
│   │   📁 Data/            # Configuración de base de datos
│   │   └── ...
│   └── ...
│
📁 database/                # Migraciones y scripts de la base de datos PostgreSQL
└── README.md               # Documentación principal
```

---

## 💻 Instalación y ejecución

### 🔧 Frontend (React + Remix)

```bash
# Navegar al directorio del frontend
cd frontend/Katrina

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:3000
```

### 🖥️ Backend (.NET API)

```bash
# Navegar al directorio del backend
cd backend/SecretosParaContar.API

# Restaurar paquetes NuGet
dotnet restore

# Compilar el proyecto
dotnet build

# Ejecutar el backend
dotnet run

# La API estará disponible en http://localhost:5000
```

### 🗄️ Base de datos

```bash
# Navegar al directorio de la base de datos
cd database

# Ejecutar migraciones
dotnet ef database update

# O ejecutar scripts SQL manualmente
psql -U tu_usuario -d secretos_para_contar -f init.sql
```

---

## 📱 Características principales

### Frontend
- **Interfaz de usuario intuitiva** con diseño responsivo
- **Catálogo de libros** con búsqueda y filtros
- **Sistema de autenticación** para usuarios
- **Formulario de contacto** para consultas
- **Proceso de donación** integrado
- **Páginas informativas** sobre la fundación

### Backend
- **API RESTful** con endpoints seguros
- **Autenticación JWT** para usuarios
- **Gestión de libros** (CRUD completo)
- **Procesamiento de donaciones**
- **Almacenamiento de archivos** para libros digitales
- **Sistema de notificaciones** por email

---

## 🔒 Seguridad

- Autenticación JWT para proteger endpoints
- Validación de datos en frontend y backend
- Protección contra ataques CSRF y XSS
- Encriptación de datos sensibles
- Políticas de CORS configuradas

---

## 👥 Equipo

<table>
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Rol</th>
      <th>GitHub</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Fabio Torres</td>
      <td>Full Stack Dev</td>
      <td><a href="https://github.com/Fabiotcelr">@Fabiotcelr</a></td>
    </tr>
    <tr>
      <td>Laura Sánchez</td>
      <td>Frontend Dev</td>
      <td><a href="https://github.com/laurasdev">@laurasdev</a></td>
    </tr>
    <tr>
      <td>Camilo Ríos</td>
      <td>Backend Dev</td>
      <td><a href="https://github.com/camilorios">@camilorios</a></td>
    </tr>
  </tbody>
</table>

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir qué te gustaría cambiar.

1. Haz fork del proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request 