using LearningStarter.Common;
using LearningStarter.Data;
using LearningStarter.Entities;
using LearningStarter.Entities.LearningStarter.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace LearningStarter.Controllers
{

    [ApiController]
    [Route("api/Inventories")]
    public class InventoriesController : ControllerBase
    {
        private readonly DataContext _dataContext;
        public InventoriesController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var response = new Response();
            var Inventories = _dataContext
                .Inventories
                .Select(Inventory => new InventoriesGetDto
                {
                    Id = Inventory.Id,
                    Availabilty = Inventory.Availabilty,
                    DateAdded = Inventory.DateAdded,
                    ItemName = Inventory.ItemName,
                    NetTotal = Inventory.NetTotal,
                    OnlineStoreId = Inventory.OnlineStoreId,
                    ProductionCost = Inventory.ProductionCost,
                    Quantity = Inventory.Quantity,
                    SiteListing = Inventory.SiteListing,
                })
                .ToList();
            response.Data = Inventories;
            return Ok(response);
        }

        [HttpPost]
        public IActionResult Create([FromBody] InventoriesCreateDto inventoriesCreateDto)
        {
            var response = new Response();

            var inventoriesToAdd = new Inventories()
            {
                Availabilty = inventoriesCreateDto.Availabilty,
                DateAdded = inventoriesCreateDto.DateAdded,
                ItemName = inventoriesCreateDto.ItemName,
                NetTotal = inventoriesCreateDto.NetTotal,
                OnlineStoreId = inventoriesCreateDto.OnlineStoreId,
                ProductionCost = inventoriesCreateDto.ProductionCost,
                Quantity = inventoriesCreateDto.Quantity,
                SiteListing = inventoriesCreateDto.SiteListing,
            };
            _dataContext.Inventories.Add(inventoriesToAdd);
            _dataContext.SaveChanges();

            var inventoriesToReturn = new InventoriesGetDto
            {
                Id = inventoriesToAdd.Id,
                Availabilty = inventoriesToAdd.Availabilty,
                DateAdded = inventoriesToAdd.DateAdded,
                ItemName = inventoriesToAdd.ItemName,
                NetTotal = inventoriesToAdd.NetTotal,
                OnlineStoreId = inventoriesToAdd.OnlineStoreId,
                ProductionCost = inventoriesToAdd.ProductionCost,
                Quantity = inventoriesToAdd.Quantity,
                SiteListing = inventoriesToAdd.SiteListing,

            };
            response.Data = inventoriesToReturn;
            return Created("", response);
        }
        [HttpPut("{id:int}")]
        public IActionResult Update(
            [FromRoute] int id,
            [FromBody] InventoriesUpdateDto inventoriesUpdateDto)
        {
            var response = new Response();

            var inventoriesToUpdate = _dataContext
                .Inventories
                .FirstOrDefault(inventories => inventories.Id == id);

            if (inventoriesToUpdate == null)

            {
                response.AddError("id", "Entry not found");
                return BadRequest(response);
            }
            inventoriesToUpdate.Availabilty = inventoriesToUpdate.Availabilty;
            inventoriesToUpdate.DateAdded = inventoriesToUpdate.DateAdded;
            inventoriesToUpdate.ItemName = inventoriesToUpdate.ItemName;
            inventoriesToUpdate.NetTotal = inventoriesToUpdate.NetTotal;
            inventoriesToUpdate.ProductionCost = inventoriesToUpdate.ProductionCost;
            inventoriesToUpdate.Quantity = inventoriesToUpdate.Quantity;    
            inventoriesToUpdate.SiteListing = inventoriesToUpdate.SiteListing;  
            inventoriesToUpdate.OnlineStoreId = inventoriesToUpdate.OnlineStoreId;            
            _dataContext.SaveChanges();

            var inventoriesToRetrun = new InventoriesGetDto
            {
                Id = inventoriesToUpdate.Id,
                Availabilty = inventoriesToUpdate.Availabilty,
                DateAdded = inventoriesToUpdate.DateAdded,
                ItemName = inventoriesToUpdate.ItemName,
                NetTotal = inventoriesToUpdate.NetTotal,
                OnlineStoreId = inventoriesToUpdate.OnlineStoreId,
                ProductionCost = inventoriesToUpdate.ProductionCost,
                Quantity = inventoriesToUpdate.Quantity,
                SiteListing = inventoriesToUpdate.SiteListing,
            };

            response.Data = inventoriesToRetrun;
            return Ok(response);
        }
    }
}
