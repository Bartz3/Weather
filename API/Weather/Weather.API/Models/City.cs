using System.ComponentModel.DataAnnotations;

namespace Weather.API.Models
{
    public class City
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public int Population { get; set; }

    }
}
