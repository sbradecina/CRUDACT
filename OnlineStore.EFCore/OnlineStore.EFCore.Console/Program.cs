using Microsoft.EntityFrameworkCore;
using OnlineStore.EFCore.Domain.Models;
using OnlineStore.EFCore.Infra;
using OnlneStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OnlineStore.EFCore.Console
{

    public class Program
    {
        static void Main(string[] args)
        {
            var context = new OnlineStoreDbContext();

            //Customer
            var emp = new CustomerRepository(context);
            var customer1 = new Customer
            {
                CustomerID = Guid.NewGuid(),
                CustomerName = "Vandolph",
                CreditLimit = 1000,
                IsActive = true
            };

            emp.Create(customer1);

            var customer2 = new Customer
            {
                CustomerID = Guid.NewGuid(),
                CustomerName = "Vandolph",
                CreditLimit = 1000,
                IsActive = true
            };
            var emp2 = new CustomerRepository(context);

            emp.Delete(customer2);

            var customers = from c in context.Departments
                              select c;

            var page2 = customers.Skip(40)
                                   .Take(40)
                                   .ToList();
            

           


            context.Dispose();

           


            //Add Department
            var tmg = new Department
            {
                DepartmentID = Guid.NewGuid(),
                DepartmentName = "Technology Management",
                IsActive = true
            };

           
            var bdg = new Department
            {
                DepartmentID = Guid.NewGuid(),
                DepartmentName = "Business Development",
                IsActive = true
            };
            context.Departments.Add(tmg);
            context.Departments.Add(bdg);
            context.SaveChanges();

            #region Add Employee
            var simon = new Employee
            {
                EmployeeID = Guid.NewGuid(),
                FirstName = "Simon",
                MiddleName = "D.",
                LastName = "Bradecina",
                Department = tmg

            };
            var bjae = new Employee
            {
                EmployeeID = Guid.NewGuid(),
                FirstName = "Bjae",
                MiddleName = "A.",
                LastName = "Bradecina",
                Department = tmg

            };

            //product
            var prod = new Product
            {
                ProductID = Guid.NewGuid(),
                ProductName = "Candy",
                IsActive = true

            };
            context.Product.Add(prod);
            context.SaveChanges();
            #endregion

            #region Create Record
            context.Employees.Add(simon);
            context.Employees.Add(bjae);
            context.SaveChanges();
            #endregion

            #region Delete Record

            var s = new Employee
            {
                EmployeeID = Guid.NewGuid(),
                FirstName = "Vicente",
                MiddleName = "B.",
                LastName = "Bradecina",
                Department = tmg


        };
            context.Employees.Add(s);
            context.SaveChanges();
            
            var b = new Employee
            {
                EmployeeID = Guid.NewGuid(),
                FirstName = "Roselyn",
                MiddleName = "D.",
                LastName = "Bradecina",
                Department = tmg

            };

            s = context.Employees.Find(s.EmployeeID);
            context.Employees.Remove(s);
            context.SaveChanges();
            #endregion

            #region Update Record
            var n = new Employee
            {
                EmployeeID = Guid.NewGuid(),
                FirstName = "Annabeth",
                MiddleName = "G..",
                LastName = "Susvilla",
                Department = tmg

            };
            var e = new Employee
            {
                EmployeeID = Guid.NewGuid(),
                FirstName = "Ezekiel",
                MiddleName = "D.",
                LastName = "Bradecina",
                Department = tmg

            };

            context.Employees.Add(e);
          
            context.SaveChanges();

            s = context.Employees.Find(e.EmployeeID);
            context.Employees.Update(e);
            context.SaveChanges();

            #endregion

            #region Retrieve Records

            var departments = from d in context.Departments
                              select d;

            var page3 = departments.Skip(40)
                                   .Take(40)
                                   .ToList();

            var tmgEmployees = from empl in context.Employees
                               join d in context.Departments
                               on empl.DepartmentID equals d.DepartmentID
                               where d.DepartmentName.Equals("Technollogy Management")
                               orderby e.LastName 
                               select new
                               {
                                   FullName = empl.FirstName + "" +
                                              empl.MiddleName.Substring(0, 1),
                                              empl.LastName,
                                   Department = d.DepartmentName
                               };
            
            var result = tmgEmployees.ToList();


            context.Dispose();

        }
        #endregion


    }
}
