using OnlineStore.EFCore.Domain.Models;
using OnlineStore.EfCore.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.EFCore.Domain
{
    public interface IDepartmentRepository : IRepository<Department>
    {
      
    }
}
