using AutoMapper;
using BLL.DTO;
using BLL.interfaces;
using DAL1.models;
using DAL1.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.func
{
    public class nameBll:InameBll
    {
            
        Iname name;
        IMapper m;

        public nameBll(Iname idal)
        {
            name = idal;
            var confign = new MapperConfiguration(cgf =>
            {
                cgf.AddProfile<mapper>();
            });
            m = confign.CreateMapper();
        }
        public User GetUsers()
        { 
            return name.GetUsers(); }
        

    }
}
