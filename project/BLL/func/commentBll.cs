using AutoMapper;
using BLL.DTO;
using BLL.interfaces;
using DALL.models;
using DALL.func;
using DALL.interfaces;

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


        public bool AddComment(CommentDTO c)
        {

            return commentdal.AddComment(m.Map<CommentDTO,Comment>(c));
            }
        }
        }
        //    Comment? comment = commentdal.GetComments(c).FirstOrDefault();
        //    if (comment == null)
        //    {
        //        return commentdal.AddComment(m.Map<CommentDTO, Comment>(c));
        //    }

        //    return false;

        



      

    



