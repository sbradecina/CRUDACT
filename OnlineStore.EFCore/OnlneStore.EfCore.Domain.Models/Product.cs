using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace OnlineStore.EFCore.Domain.Models
{
    public class Product
    {
        public Guid ProductID { get; set; }
        [MaxLength(100)]
        public string ProductName { get; set; }
        public Guid SupplierID { get; set; }
        public Guid CategoryID { get; set; }
        public decimal QuantityPerUnit { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal UnitStock { get; set; }
        public decimal UnitsOnOrder { get; set; }
        public string ReorderLevel { get; set; }
        public bool Discontinued { get; set; }
    }
}
