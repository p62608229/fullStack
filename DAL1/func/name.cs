using DAL1.interfaces;
using DAL1.models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL1.func
{
    public class name : Iname
    {
        ProjectdbContext db;
        public name(ProjectdbContext pname)
        {
            pname = db;
        }

        public models.User GetUsers()
    {
            return null;//db.User.to();
            //return db.Users.Select(l=>l.FirstName);
        }
    }
}

