using VirtualBiblio.Data;
using VirtualBiblio.Business.Interfaces;
using VirtualBiblio.Business.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Http;
using VirtualBiblio.Data.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Agregar UnitOfWork y servicios
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IAuthorService, AuthorService>();

builder.Services.AddControllers();
//  Agregar la conexión a PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("PostgresConnection"),
        b => b.MigrationsAssembly("VirtualBiblio.Data")
    )
);

//  Registrar servicios y repositorios
builder.Services.AddScoped<AudiolibroService>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<UsuarioService>();
builder.Services.AddScoped<LibroService>();
builder.Services.AddScoped<IFileService, FileService>();


//  Configurar controladores y Swagger
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

var app = builder.Build();
app.UseRouting();
app.UseEndpoints(endpoints => endpoints.MapControllers());

//  Configuración del middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
