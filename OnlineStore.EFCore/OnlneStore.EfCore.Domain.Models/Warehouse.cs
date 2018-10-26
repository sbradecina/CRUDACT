using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace OnlineStore.EFCore.Domain.Models
{
    public class Warehouse
    {
        [Key]
        public Guid WarehouseID { get; set; }
        public string WarehouseName { get; set; }
        public string Region { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string PhoneNumber { get; set; }
        public string ItemNumber { get; set; }
        public string IsActiveItem { get; set; }
    }
}
