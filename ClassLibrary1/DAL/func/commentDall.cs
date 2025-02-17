using DALL.interfaces;
using DALL.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace DALL.func
{
    public class commentDall : IcommentDal

    {
        ProjectdbContext projectdb;
        public commentDall(ProjectdbContext db)
        {

        projectdb= db;                         
        }

        public List<Comment> GetComments()
        {
            
            return projectdb.Comments.Include(r => r.CommentUser).OrderByDescending
                (o => o.CommentCode).Take(20).ToList();
        }
        public bool AddComment(Comment c)
        {
            try
            {
                projectdb.Comments.Add(c);
                projectdb.SaveChanges();

                return true;
            }
            catch {
                return false;
            }





        }
    }
}