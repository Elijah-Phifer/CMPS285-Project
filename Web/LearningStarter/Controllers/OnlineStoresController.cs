using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using LearningStarter.Entities.LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace LearningStarter.Controllers
{

    [ApiController]
    [Route("api/OnlineStores")]
    public class OnlineStoresController : ControllerBase
    {
        private readonly DataContext _dataContext;
        
        public OnlineStoresController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var response = new Response();
            var OnlineStores = _dataContext
                .Onlinestores
                .Select(OnlineStores => new OnlineStoresGetDto
                {
                    Id = OnlineStores.Id,
                    StoreName = OnlineStores.StoreName,
                    ListingFees = OnlineStores.ListingFees,
                    SellingFees = OnlineStores.SellingFees,
                    Taxes = OnlineStores.Taxes,
                    Country = OnlineStores.Country,
                    State = OnlineStores.State
                })
            .ToList();
            response.Data = OnlineStores;
            return Ok(response);

        }
        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var response = new Response();

            var onlineStoresToReturn = _dataContext
                .Onlinestores
                .Select(onlineStores => new OnlineStoresGetDto
                {
                    Id = onlineStores.Id,
                    StoreName = onlineStores.StoreName,
                    ListingFees = onlineStores.ListingFees,
                    SellingFees = onlineStores.SellingFees,
                    Taxes = onlineStores.Taxes,
                    Country = onlineStores.Country,
                    State = onlineStores.State,

                })
                .FirstOrDefault(onlineStores => onlineStores.Id == id);

            if (onlineStoresToReturn == null)
            {
                response.AddError("id", "Store not found");
                return BadRequest(response);
            }
            response.Data = onlineStoresToReturn;
            return Ok(response);
        }

        [HttpPost]
        public IActionResult Create([FromBody] OnlinestoresCreateDto onlinestoresCreateDto)
        {
            var response = new Response();
            var onlineStoresToAdd = new OnlineStores()
            {
                StoreName = onlinestoresCreateDto.StoreName,
                ListingFees = onlinestoresCreateDto.ListingFees,
                SellingFees = onlinestoresCreateDto.SellingFees,
                Taxes = onlinestoresCreateDto.Taxes,
                Country = onlinestoresCreateDto.Country,
                State = onlinestoresCreateDto.State,
            };
            _dataContext.Onlinestores.Add(onlineStoresToAdd);
            _dataContext.SaveChanges();

            var onlineStoresToReturn = new OnlineStoresGetDto
            {
                StoreName = onlineStoresToAdd.StoreName,
                ListingFees = onlineStoresToAdd.ListingFees,
                SellingFees = onlineStoresToAdd.SellingFees,
                Taxes = onlineStoresToAdd.Taxes,
                Country = onlineStoresToAdd.Country,
                State = onlineStoresToAdd.State,
            };
            response.Data = onlineStoresToReturn;
            return Created("", response);

        }
        [HttpPut("{id:int}")]
        public IActionResult Update(
            [FromRoute]int id,
            [FromBody] OnlinestoresUpdateDto onlineStoresUpdateDto)
        {
            var response = new Response();

            var onlineStoreToUpdate = _dataContext
                .Onlinestores
                .FirstOrDefault(onlineStore => onlineStore.Id == id);

            if (onlineStoreToUpdate == null)
            {

                response.AddError("id", "Entry not found.");
                return BadRequest();
            }
            onlineStoreToUpdate.StoreName = onlineStoreToUpdate.StoreName;
            onlineStoreToUpdate.ListingFees = onlineStoreToUpdate.ListingFees;
            onlineStoreToUpdate.SellingFees = onlineStoreToUpdate.SellingFees;
            onlineStoresUpdateDto.Taxes = onlineStoreToUpdate.Taxes;
            onlineStoreToUpdate.Country = onlineStoreToUpdate.Country;
            onlineStoreToUpdate.State = onlineStoreToUpdate.State;

            _dataContext.SaveChanges();

            var onlineStoreToReturn = new OnlineStoresGetDto
            {
                Id = onlineStoreToUpdate.Id,
                StoreName = onlineStoreToUpdate.StoreName,
                ListingFees = onlineStoreToUpdate.ListingFees,
                SellingFees = onlineStoreToUpdate.SellingFees,
                Country = onlineStoreToUpdate.Country,
                State = onlineStoreToUpdate.State,
                Taxes = onlineStoreToUpdate.Taxes,

            };
            response.Data = onlineStoreToReturn;
            return Ok(response);
        }
        [HttpDelete("{id:int}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var response = new Response();
            
            var onlineStoreToDelete = _dataContext
                .Onlinestores
                .FirstOrDefault(onlineStores => onlineStores.Id == id);

            if (onlineStoreToDelete == null)
            {
                response.AddError("id", "Entry not found");
                return BadRequest(response);
            }
            _dataContext.Remove(onlineStoreToDelete);
            _dataContext.SaveChanges();

            response.Data = true;
            return Ok(response);
        }
    }
}
