using System;
using System.Linq;
using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;

namespace LearningStarter.Controllers
{
    [ApiController]
    [Route("api/subscribers")]
    public class SubscribersController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public SubscribersController(
            DataContext dataContext)
        {
            _dataContext = dataContext;

        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var response = new Response();

            var subscribers = _dataContext
            .Subscribers
            .Select(subscribers => new SubcribersGetDto
            {
                Id = subscribers.Id,
                Name = subscribers.SubcriberId,
                Email = subscribers.Title,
                DateSubscribed = subscribers.DateSubscribed,
            })
            .ToList();

            response.Data = subscribers;
            return Ok(response);




        }
    }
}
