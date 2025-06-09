using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using VirtualBiblio.Data;
using VirtualBiblio.Business.Services;
using VirtualBiblio.Business.Interfaces;
using VirtualBiblio.Data.Repositories;
using Microsoft.Extensions.FileProviders;
using VirtualBiblio.Data.Models;

// Crea el builder de la aplicación
var builder = WebApplication.CreateBuilder(args);

// Agregar la conexión a PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("PostgresConnection"),
        b => b.MigrationsAssembly("VirtualBiblio.Data")
    )
);

// Configuración de JWT
var key = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]);
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });

// Registrar servicios y repositorios
builder.Services.AddScoped<AudiolibroService>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<UsuarioService>();
builder.Services.AddScoped<LibroService>();
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IAuthorService, AuthorService>();
builder.Services.AddScoped<AuthService>();

// Configurar controladores y Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configurar Kestrel para aceptar archivos grandes (100 MB en este caso)
builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxRequestBodySize = 100_000_000; // 100 MB
});

// Configurar formularios para permitir archivos grandes
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 100_000_000; // 100 MB
});

// Configura CORS aquí
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Construye la aplicación
var app = builder.Build();

// Seeder de datos
using (var scope = app.Services.CreateScope())
{
    try
    {
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        if (!context.Libros.Any())
        {
            context.Libros.Add(new Libro
            {
                Titulo = "Cuentos y pasatiempos_Secretos para contar",
                Portada = "Cuentosypasatiempos.jpg",
                Path = "Cuentos y pasatiempos_Secretos para contar.pdf",
                ISBN13 = "9781234567890",
                Editorial = "Editorial Ejemplo",
                AnioPublicacion = 2023,
                Formato = "PDF",
                Genero = "Cuento",
                Idioma = "Español",
                Edicion = "1ª",
                ContraPortada = "Descripción...",
                Descargas = 0,
                FechaSubida = DateTime.UtcNow
            });
            context.SaveChanges();
            Console.WriteLine("Seeder: Libro insertado exitosamente.");
        }
        else
        {
            Console.WriteLine("Seeder: La tabla Libros ya contiene datos.");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Seeder: Error al insertar datos: {ex.Message}");
    }
}

// Habilitar archivos estáticos para acceder a los libros
var librosPath = Path.Combine(Directory.GetCurrentDirectory(), "ArchivosSubidos");
if (!Directory.Exists(librosPath))
    Directory.CreateDirectory(librosPath);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "ArchivosSubidos")),
    RequestPath = "/ArchivosSubidos"
});

// Configuración del middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting(); 
app.UseCors();    
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers(); 

app.Run();