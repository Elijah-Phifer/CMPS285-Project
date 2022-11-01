using System;
using System.Linq;
using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;

namespace LearningStarter.Controllers
{
    [ApiController]
    [Route("api/email-newsletter")]
    public class EmailNewslettersController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public EmailNewslettersController(
            DataContext dataContext)
        {
            _dataContext = dataContext;

        }

        [HttpGet]

        public IActionResult GetAll()
        {
            var response = new Response();
                var emailNewsletters = _dataContext
                .EmailNewsletters
                .Select(emailNewsletter => new EmailNewsletterGetDto
                {
                    Id = emailNewsletter.Id,
                    SubscriberId = emailNewsletter.SubscriberId,
                    Title = emailNewsletter.Title,
                    Message = emailNewsletter.Message,
                    DateSent = emailNewsletter.DateSent,
                })
                .ToList();

            response.Data = emailNewsletters;
            return Ok(response);
        }
	}
}
