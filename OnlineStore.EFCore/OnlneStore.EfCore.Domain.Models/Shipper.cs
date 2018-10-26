using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace OnlineStore.EFCore.Domain.Models
{
    public class Shipper
    {
        [Key]
        public Guid ShipperID { get; set; }
        [MaxLength(60)]
        public string CompanyName { get; set; }
        [MaxLength(15)]
        public string Phone { get; set; }
    }
}
