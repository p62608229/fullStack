using DAL1.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL1.interfaces
{
    public interface IcommentDal
    {

        public List<Comment> GetComments();
        public Comment AddComment(Comment c);

        //public List <Comments> AddComment(Comments c);


    }
}


