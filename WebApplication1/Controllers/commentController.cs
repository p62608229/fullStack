using BLL.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using System.Windows.Input;
using BLL.func;
using BLL.interfaces;
namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class commentController : ControllerBase

    {       
        IcommentBll commentBll;

        public commentController(IcommentBll cbll)
        {
            commentBll= cbll;
        }

     
        [HttpGet]
        public ActionResult<List<CommentDTO>> get()
        {
            return Ok(commentBll.GetComments());
        }
        [HttpPost]
        public ActionResult<bool> add(CommentDTO c) 
        { 
            return Ok(commentBll.AddComment(c));
        }
            

    }
}
