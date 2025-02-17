using AutoMapper;
using BLL.DTO;
using BLL.interfaces;
using DAL1.models;
using DAL1.func;
using DAL1.interfaces;
using System.Linq.Expressions;

namespace BLL.func
{
    public class commentBll : IcommentBll

    {
        IcommentDal commentdal;
        IMapper m;

        public commentBll(IcommentDal idal)
        {
            commentdal = idal;
            var confign = new MapperConfiguration(cgf =>
            {
                cgf.AddProfile<mapper>();
            });
            m = confign.CreateMapper();
        }

        public List<CommentDTO> GetComments()
        {


            return m.Map<List<Comment>, List<CommentDTO>>(commentdal.GetComments());
        }




        public CommentDTO AddComment(CommentDTO c)
        {
            
            
                Comment e = m.Map<CommentDTO, Comment>(c);

            //return m.Map<Comments>, List<CommentDTO>>(commentdal.AddComment(e));
            return m.Map<Comment,CommentDTO>(commentdal.AddComment(e));





        }
    }

}












