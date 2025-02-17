using BLL.DTO;
using DAL1.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.interfaces
{
    public interface IDaysForWorkBll
    {
        public bool AddDays(DaysToworkDTO d);

    }
}
