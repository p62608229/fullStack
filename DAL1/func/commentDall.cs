using DAL1.interfaces;
using DAL1.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace DAL1.func
{
    public class commentDAL1 : IcommentDal

    {
        ProjectdbContext projectdb;
        public commentDAL1(ProjectdbContext db)
        {

            projectdb = db;
        }

        public List<Comment> GetComments()
        {
            return projectdb.Comments.Skip(Math.Max(0, projectdb.Comments.Count() - 10)).Include(r => r.CommentUser).OrderByDescending(o => o.CommentCode).ToList();

            //return projectdb.Comments.Include(r => r.CommentUser).OrderByDescending
            //    (o => o.CommentCode).Skip(Math.Max(0, projectdb.Comments.Count() - 10)).ToList();
        }
        public Comment AddComment(Comment c)
        {
            User? u = projectdb.Users.FirstOrDefault((us) => us.Id == c.CommentUserId);
           
            try
            {
                if (u != null)
                {

                    projectdb.Comments.Add(c);
                    projectdb.SaveChanges();
                    return c;

                    //return projectdb.Comments.Skip(Math.Max(0,projectdb.Comments.Count() - 20)).ToList();
                    //return projectdb.Comments.Take(10).ToList();
                    //list.Skip(Math.max(list.Count() - 20))
                }
                return null;
            }
            catch
            {
                return null;
            }





        }
    }
    }
    