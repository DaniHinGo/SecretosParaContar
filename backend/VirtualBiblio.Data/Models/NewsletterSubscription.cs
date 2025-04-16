using System.ComponentModel.DataAnnotations;

namespace VirtualBiblio.Data.Models
{
    public class NewsletterSubscription
    {
        public int Id { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public DateTime SubscribedAt { get; set; }
    }
}