using Microsoft.EntityFrameworkCore;
using VirtualBiblio.Data;
using VirtualBiblio.Business.Services;

var builder = WebApplication.CreateBuilder(args);

//  Agregar la conexión a PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("PostgresConnection"),
        b => b.MigrationsAssembly("VirtualBiblio.Data")
    )
);

//  Registrar servicios y repositorios
builder.Services.AddScoped<AudiolibroService>();

//  Configurar controladores y Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

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
