using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace OnlineStore.EFCore.Domain.Models
{

    [Table("Order")]
    public class Orders
    {
        [Key]
        public Guid OrderID { get; set; }
        [ForeignKey("CustomerID")]
        public Guid CustomerID { get; set; }
        public Customer Customer { get; set; }
        public string CustomerName { get; set; }
        [ForeignKey("EmployeeID")]
        public Guid EmployeeID { get; set; }
        public Employee Employee { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime RequiredDate { get; set; }
        public DateTime ShipDate { get; set; }
       
        public decimal Freight { get; set; }
        public Guid ShipperID { get; set; }
        [ForeignKey("ShipperID")]
        public Shipper Shipper { get; set; }
        public Shipper ShipVia { get; set; }
        
        public string ShipName { get; set; }
        [MaxLength(60)]
        public string ShipAddress { get; set; }
        [MaxLength(60)]
        public string ShipCity { get; set; }
        [MaxLength(60)]
        public string ShipRegion { get; set; }
        public int PostalCode { get; set; }
        [MaxLength(15)]
        public string Country { get; set; }

    }
}
