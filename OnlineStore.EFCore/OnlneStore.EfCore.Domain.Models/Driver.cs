using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace OnlineStore.EFCore.Domain.Models
{
    [Table("Driver")]
    public class Driver 
    {
        [Key]
        public Guid DriversID { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string Religion { get; set; }
        public string LicenseType { get; set; }
        public bool isActive { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
    }
}
