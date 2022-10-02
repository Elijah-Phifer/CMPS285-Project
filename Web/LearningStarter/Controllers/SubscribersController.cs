using System;
using System.Linq;
using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;

namespace LearningStarter.Controllers
{
    [ApiController]
    [Route("api/subscriber")]
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
            .Select(subscriber => new SubscriberGetDto
            {
                Id = subscriber.Id,
                Name = subscriber.Title,
                Email = subscriber.Message,
                DateSubcribed = subscriber.DateSent,
            })
            .ToList();
            response.Data = subscribers;
            return Ok(response);
        }
        }
    }