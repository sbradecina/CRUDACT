using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace OnlineStore.EFCore.Domain.Models
{
    public class Position
    {
        [Key]
        public Guid PositionID { get; set; }
        [Required]
        public string PositionName { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public bool isActive { get; set; }
        [Required]
        public DateTime DateCreated { get; set; }
    }
}
