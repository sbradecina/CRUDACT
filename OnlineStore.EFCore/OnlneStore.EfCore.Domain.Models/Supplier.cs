using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace OnlineStore.EFCore.Domain.Models
{
    [Table("Supplier")]
    public class Supplier
    {
        [Key]
        public Guid SupplierID { get; set; }
        [MaxLength(60)]
        public string CompanyName { get; set; }
        [MaxLength(60)]
        public string ContactName { get; set; }
        public string Country { get; set; }
        [MaxLength(60)]
        public string ContactTitle { get; set; }
        [MaxLength(60)]
        public string Address { get; set; }
        [MaxLength(100)]
        public string Title { get; set; }
        [MaxLength(60)]
        public string City { get; set; }
        public int PostalCode { get; set; }
        [MaxLength(60)]
        public string HomePage { get; set; }
        [MaxLength(15)]
        public string Fax { get; set; }
        public int Phone { get; set; }
        [MaxLength(100)]
        public string Region { get; set; }
        
    }
}
