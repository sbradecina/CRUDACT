using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace OnlineStore.EFCore.Domain.Models
{
    public class Category
    {
        public Guid CategoryID { get; set; }
        [Required]
        [MaxLength(100)]
        public string CategoryName { get; set; }
        [MaxLength(60)]
        public string Description { get; set; }
        public byte[] Picture { get; set; }


    }
}
