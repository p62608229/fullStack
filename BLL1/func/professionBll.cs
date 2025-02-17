using AutoMapper;
using BLL.DTO;
using BLL1.interfaces;
using DAL1.func;
using DAL1.interfaces;
using DAL1.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL1.func
{
    public class professionBll : IprofessionBll
    {


        IProfessionDal professionDal;
        IMapper m;

        public professionBll(IProfessionDal idal)
        {
            professionDal = idal;
            var confign = new MapperConfiguration(cgf =>
            {
                cgf.AddProfile<mapper>();
            });
            m = confign.CreateMapper();
        }



        public List<ProfessionDTO> Getprofession()
        {


            return m.Map<List<Profession>, List<ProfessionDTO>>(professionDal.Getprofession().ToList());
        }


    }
}
