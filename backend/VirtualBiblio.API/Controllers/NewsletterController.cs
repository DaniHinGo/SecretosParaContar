using Microsoft.AspNetCore.Mvc;
using VirtualBiblio.Data;
using VirtualBiblio.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace VirtualBiblio.API.Controllers
{
    [Route("api/newsletter")]
    [ApiController]
    public class NewsletterController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NewsletterController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("subscribe")]
        public async Task<IActionResult> Subscribe([FromBody] NewsletterSubscription subscription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingSubscription = await _context.NewsletterSubscriptions
                .FirstOrDefaultAsync(s => s.Email == subscription.Email);
            if (existingSubscription != null)
            {
                return BadRequest(new { message = "Este correo ya está suscrito." });
            }

            subscription.SubscribedAt = DateTime.UtcNow;
            await _context.NewsletterSubscriptions.AddAsync(subscription);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Suscripción exitosa." });
        }
    }
}