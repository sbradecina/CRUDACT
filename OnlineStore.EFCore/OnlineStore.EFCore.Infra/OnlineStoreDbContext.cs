using Microsoft.EntityFrameworkCore;
using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineStore.EFCore.Infra
{
    public class OnlineStoreDbContext
        : DbContext
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Supplier> Supplier { get; set; }
        public DbSet<Orders> Order { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Shipper> Shippers { get; set; }
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Warehouse> Warehouse { get; set; }
        public  DbSet<Person> Person { get; set; }
        public DbSet<Position> Position { get; set; }



        public object Customer { get; set; }

        public OnlineStoreDbContext(
            DbContextOptions<OnlineStoreDbContext> options)
            : base(options)
        {

        }

        public OnlineStoreDbContext()
        {

        }



        protected override void OnConfiguring(
                    DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = "Server=.;Database=OnlineStoreDB;Integrated Security=true;";
            optionsBuilder.UseSqlServer(connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
                        .ToTable("Employee");
            modelBuilder.Entity<Department>()
                        .ToTable("Department");
            modelBuilder.Entity<Customer>()
                        .ToTable("Customer");
            modelBuilder.Entity<Category>()
                        .ToTable("Category");
            modelBuilder.Entity<Product>()
                         .ToTable("Product");
            modelBuilder.Entity<OrderDetail>()
                         .ToTable("Order Details");
            modelBuilder.Entity<Shipper>()
                         .ToTable("Shipper");
            modelBuilder.Entity<Orders>()
                         .ToTable("Order");
            modelBuilder.Entity<Supplier>()
                         .ToTable("Supplier");
            modelBuilder.Entity<Driver>()
                        .ToTable("Driver");
            modelBuilder.Entity<Warehouse>()
                        .ToTable("Warehouse");
            modelBuilder.Entity<Person>()
                       .ToTable("Person");
            modelBuilder.Entity<Position>()
                      .ToTable("Position");
            base.OnModelCreating(modelBuilder);
        }
    }
}
