using AutoMapper;
using BLL.DTO;
using BLL.interfaces;
using DALL.models;
using DALL.func;
using DALL.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.func
{
    public class DaysForWorkBll:IDaysForWorkBll
    {
        IDaysForWork DaysForWork;
        IMapper m;

        public DaysForWorkBll(IDaysForWork idal)
        {
            DaysForWork = idal;
            var confign = new MapperConfiguration(cgf =>
            {
                cgf.AddProfile<mapper>();
            });
            m = confign.CreateMapper();
        }
        public bool AddDays(DaysToworkDTO d)

            {
                return DaysForWork.AddDays(m.Map<DaysToworkDTO, DaysTowork>(d));
            
          
        }
      

    }
}
