using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using VirtualBiblio.Data;
using VirtualBiblio.Data.Models;

namespace VirtualBiblio.Business.Services
{
    public class AudiolibroService
    {
        private readonly AppDbContext _context;

        public AudiolibroService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Audiolibro>> GetAudiolibros()
        {
            return await _context.Audiolibros.ToListAsync();
        }

        public async Task<Audiolibro> GetAudiolibroById(int id)
        {
            return await _context.Audiolibros.FindAsync(id);
        }

        public async Task AddAudiolibro(Audiolibro audiolibro)
        {
            _context.Audiolibros.Add(audiolibro);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateAudiolibro(Audiolibro audiolibro)
        {
            var existe = await _context.Audiolibros.AnyAsync(a => a.Id == audiolibro.Id);
            if (!existe) return false;

            _context.Audiolibros.Update(audiolibro);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAudiolibro(int id)
        {
            var audiolibro = await _context.Audiolibros.FindAsync(id);
            if (audiolibro == null) return false;

            _context.Audiolibros.Remove(audiolibro);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Audiolibro>> SearchAudiolibros(string titulo = null, string autor = null, string genero = null, string narrador = null)
        {
            var query = _context.Audiolibros.AsQueryable();

            if (!string.IsNullOrEmpty(titulo))
                query = query.Where(a => a.Titulo.Contains(titulo));

            if (!string.IsNullOrEmpty(autor))
                query = query.Where(a => a.AutorId.ToString() == autor);

            if (!string.IsNullOrEmpty(genero))
                query = query.Where(a => a.Genero.Contains(genero));

            if (!string.IsNullOrEmpty(narrador))
                query = query.Where(a => a.NarradorId.ToString() == narrador);

            return await query.ToListAsync();
        }
    }
}
