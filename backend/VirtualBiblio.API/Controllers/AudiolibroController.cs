using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using VirtualBiblio.Business.Services;
using VirtualBiblio.Data.Models;

namespace VirtualBiblio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AudiolibroController : ControllerBase
    {
        private readonly AudiolibroService _service;

        public AudiolibroController(AudiolibroService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IEnumerable<Audiolibro>> GetAudiolibros()
        {
            return await _service.GetAudiolibros();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Audiolibro>> GetAudiolibroById(int id)
        {
            var audiolibro = await _service.GetAudiolibroById(id);
            if (audiolibro == null) return NotFound();
            return audiolibro;
        }

        [HttpPost]
        public async Task<ActionResult<Audiolibro>> AddAudiolibro(Audiolibro audiolibro)
        {
            await _service.AddAudiolibro(audiolibro);
            return CreatedAtAction(nameof(GetAudiolibroById), new { id = audiolibro.Id }, audiolibro);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAudiolibro(int id, Audiolibro audiolibro)
        {
            if (id != audiolibro.Id) return BadRequest();
            var actualizado = await _service.UpdateAudiolibro(audiolibro);
            if (!actualizado) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAudiolibro(int id)
        {
            var eliminado = await _service.DeleteAudiolibro(id);
            if (!eliminado) return NotFound();
            return NoContent();
        }

        [HttpGet("search")]
        public async Task<IEnumerable<Audiolibro>> SearchAudiolibros([FromQuery] string titulo, [FromQuery] string autor, [FromQuery] string genero, [FromQuery] string narrador)
        {
            return await _service.SearchAudiolibros(titulo, autor, genero, narrador);
        }
    }
}
