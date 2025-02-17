using DAL1.interfaces;
using DAL1.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL1.func
{
    public class professionDal:IProfessionDal
    {

        ProjectdbContext projectdb;
        public professionDal(ProjectdbContext db)
        {

            projectdb = db;
        }

        public List<Profession> Getprofession()
        {

            return projectdb.Professions.ToList();
        }
    }
}
