using OnlineStore.EFCore.Domain.Models;
using OnlineStore.EFCore.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using OnlineStore.EfCore.Domain;
using System.Linq;

namespace OnlineStore.EFCore.Infra
{
    public class EmployeeRepository
        : RepositoryBase<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(OnlineStoreDbContext context)
            : base(context)
        {

        }
        //public IEnumerable<Employee> GetEmployeeByDepartment(Guid departmentId)
        //{
        //    //return base.context.Employees
        //    //           .Where(e => e.DepartmentID == departmentId)
        //    //           .ToList();
        //}
    }
}
