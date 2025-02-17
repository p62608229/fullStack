using BLL.DTO;
using BLL.func;
using BLL.interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DaysForWorkController : ControllerBase
    {
        IDaysForWorkBll DaysForWorkBll;
        public DaysForWorkController(IDaysForWorkBll cl)
        {
            DaysForWorkBll =cl;
        }
        [HttpPut]
        public ActionResult<bool> AddDays(DaysToworkDTO c)
        {
            return Ok(DaysForWorkBll.AddDays(c));
        }
    }
    }
