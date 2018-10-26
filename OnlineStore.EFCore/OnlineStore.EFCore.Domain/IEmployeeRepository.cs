using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineStore.EfCore.Domain
{
    public interface IEmployeeRepository 
        : IRepository<Employee>
    {
        //IEnumerable<Employee> GetEmployeeByDepartment(Guid departmentId);
    }
}
