﻿using LearningStarter.Common;
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

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var response = new Response();
            
            var inventoriesToReturn = _dataContext
                .Inventories
                .Select (inventories => new InventoriesGetDto
                {
                    Id = inventories.Id,
                    Availabilty = inventories.Availabilty,
                    DateAdded = inventories.DateAdded,
                    ItemName = inventories.ItemName,
                    NetTotal = inventories.NetTotal,
                    OnlineStoreId = inventories.OnlineStoreId,
                    ProductionCost = inventories.ProductionCost,
                    Quantity = inventories.Quantity,
                    SiteListing = inventories.SiteListing,
                })
                .FirstOrDefault(inventories => inventories.Id == id);
            
            if (inventoriesToReturn == null)
            {
                response.AddError("id", "Entry not found.");
                return BadRequest(response);
            }
            response.Data = inventoriesToReturn;
            return Ok(response);

        }

        [HttpPost]
        public IActionResult Create([FromBody] InventoriesCreateDto inventoriesCreateDto)
        {
            var response = new Response();

            if(string.IsNullOrEmpty(inventoriesCreateDto.ItemName))
            {
                response.AddError("ItemName", "Item Name cannot be empty");
            }

            if (string.IsNullOrEmpty(inventoriesCreateDto.SiteListing))
            {
                response.AddError("SiteListing", "Site Listing cannot be empty");
            }

            if (string.IsNullOrEmpty(inventoriesCreateDto.Availabilty))
            {
                response.AddError("Availabilty", "Availabilty cannot be empty");
            }

            if (string.IsNullOrEmpty(inventoriesCreateDto.DateAdded))
            {
                response.AddError("DateAdded", "Date Added cannot be empty");
            }

            if (inventoriesCreateDto.ProductionCost < 0)
            {
                response.AddError("ProductionCost", "Production Cost Added cannot be empty");
            }

            if (inventoriesCreateDto.NetTotal < 0) 
            {
                response.AddError("NetTotal", "Net Total Cost Added cannot be empty");
            }

            if (inventoriesCreateDto.Quantity < 0)
            {
                response.AddError("Quantity", "Quantity Added cannot be empty");
            }


            if(inventoriesCreateDto.OnlineStoreId < 0)
            {
                response.AddError("OnlineStoreId", "Online Store Id Added cannot be empty");

            }

            if (response.HasErrors)
                { 
                    return BadRequest(response);
                }
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
            inventoriesToUpdate.Availabilty = inventoriesUpdateDto.Availabilty;
            inventoriesToUpdate.DateAdded = inventoriesUpdateDto.DateAdded;
            inventoriesToUpdate.ItemName = inventoriesUpdateDto.ItemName;
            inventoriesToUpdate.NetTotal = inventoriesUpdateDto.NetTotal;
            inventoriesToUpdate.ProductionCost = inventoriesUpdateDto.ProductionCost;
            inventoriesToUpdate.Quantity = inventoriesUpdateDto.Quantity;
            inventoriesToUpdate.SiteListing = inventoriesUpdateDto.SiteListing;
            inventoriesToUpdate.OnlineStoreId = inventoriesUpdateDto.OnlineStoreId;

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
        [HttpDelete("{id:int}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var response = new Response();

            var inventoriesToDelete = _dataContext
                .Inventories
                .FirstOrDefault(inventories => inventories.Id == id);

            if (inventoriesToDelete == null)

            {
                response.AddError("id", "Entry not found");
                return BadRequest(response);
            }

            _dataContext.Remove(inventoriesToDelete);
            _dataContext.SaveChanges();

            response.Data = true;
            return Ok(response);
        }
    }
}
