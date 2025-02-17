using BLL.DTO;
using DAL1.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.interfaces
{
    public interface IcommentBll
    {
        public List<CommentDTO> GetComments();
        public  CommentDTO AddComment(CommentDTO c);

        //public List<User> GetUsers();

        //public UserDTO GetUsers(string id);

    }
}
