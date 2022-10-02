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
                    Region = OnlineStores.Region
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
                    Region = onlineStores.Region,

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

            if (string.IsNullOrEmpty(onlinestoresCreateDto.StoreName))
            {
                response.AddError("StoreName", "Store Name cannot be empty");
            }

            if (string.IsNullOrEmpty(onlinestoresCreateDto.Country))
            {
                response.AddError("Country", "Country cannot be empty");
            }

            if (string.IsNullOrEmpty(onlinestoresCreateDto.Region))
            {
                response.AddError("Region", "Region cannot be empty");
            }

            if (onlinestoresCreateDto.ListingFees < 0)
            {
                response.AddError("ListingFees", "Listing Fees cannot be less than zero");
            }

            if (onlinestoresCreateDto.Taxes < 0)
            {
                response.AddError("Taxes", "Taxes Fees cannot be less than zero");
            }

            if (onlinestoresCreateDto.SellingFees < 0)
            {
                response.AddError("SellingFees", "Selling Fees Fees cannot be less than zero");
            }

            if (response.HasErrors)
            {
                return BadRequest(response);
            }
            var onlineStoresToAdd = new onlineStores()
            {
                StoreName = onlinestoresCreateDto.StoreName,
                ListingFees = onlinestoresCreateDto.ListingFees,
                SellingFees = onlinestoresCreateDto.SellingFees,
                Taxes = onlinestoresCreateDto.Taxes,
                Country = onlinestoresCreateDto.Country,
                Region = onlinestoresCreateDto.Region,
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
                Region = onlineStoresToAdd.Region,
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
            onlineStoreToUpdate.Region = onlineStoreToUpdate.Region;

            _dataContext.SaveChanges();

            var onlineStoreToReturn = new OnlineStoresGetDto
            {
                Id = onlineStoreToUpdate.Id,
                StoreName = onlineStoreToUpdate.StoreName,
                ListingFees = onlineStoreToUpdate.ListingFees,
                SellingFees = onlineStoreToUpdate.SellingFees,
                Country = onlineStoreToUpdate.Country,
                Region = onlineStoreToUpdate.Region,
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
