using OnlineStore.EFCore.Domain;
using OnlineStore.EFCore.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace OnlineStore.EFCore.Infra
{
    public class PositionRepository : RepositoryBase<Position>, IPositionRepository
    {
        public PositionRepository(OnlineStoreDbContext context) : base(context)
        {
        }
        public PaginationResult<Position> RetrievePositionWithPagination(int page, int itemPerPage, string filter)
        {
            PaginationResult<Position> result = new PaginationResult<Position>();
            if (string.IsNullOrEmpty(filter))
            {
                result.Results = context.Set<Position>().OrderBy(x => x.PositionName)
              .Skip(page).Take(itemPerPage).ToList();
                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Position>().Count();
                }


            }
            else
            {
                result.Results = context.Set<Position>()
                .Where(x => x.PositionName.ToLower().Contains(filter.ToLower()))
                    .OrderBy(x => x.PositionName)
               .Skip(page).Take(itemPerPage).ToList();
                if (result.Results.Count > 0)
                {
                    result.TotalRecords = context.Set<Position>().Where(x => x.PositionName.ToLower().Contains(filter.ToLower()))
                        .Count();
                }
            }

            return result;
        }
    }
    }
