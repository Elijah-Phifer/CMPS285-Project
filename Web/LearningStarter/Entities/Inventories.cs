using LearningStarter.Entities.LearningStarter.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace LearningStarter.Entities
    {
        public class Inventories
        {
            public int Id { get; set; }
            public string ItemName { get; set; }
            public double ProductionCost { get; set; }
            public int Quantity { get; set; }
            public double GrossTotal { get; set; }
            public double NetTotal { get; set; }
            public string Availabilty { get; set; }
            public double SiteListing { get; set; }
            public string DateAdded { get; set; }
            public int OnlineStoreId { get; set; }    
            public OnlineStores OnlineStores { get; set; }
            public List<OnlineStores> OnlineStoresList { get; set; } = new List<OnlineStores>();
    }

    public class InventoriesCreateDto
    {
        public string ItemName { get; set; }
        public double ProductionCost { get; set; }
        public int Quantity { get; set; }
        public double GrossTotal { get; set; }
        public string Availabilty { get; set; }
        public int OnlineStoreId { get; set; }
        public double SiteListing { get; set; }
        public string DateAdded { get; set; }
        public int OnlineStores {get; set;}
    }
    public class InventoriesGetDto
        {
            public int Id { get; set; }
            public string ItemName { get; set; }
            public double ProductionCost { get; set; }
            public int Quantity { get; set; }
            public double GrossTotal { get; set; }
            public double NetTotal { get; set; }
            public string Availabilty { get; set; }
            public int OnlineStoreId { get; set; }
            public double SiteListing { get; set; }
            public string DateAdded { get; set; }
        }

        public class InventoriesUpdateDto
        {
            public string ItemName { get; set; }
            public double ProductionCost { get; set; }
            public int Quantity { get; set; }
            public double GrossTotal { get; set; }
            public double NetTotal { get; set; }
            public string Availabilty { get; set; }
            public int OnlineStoreId { get; set; }
            public double SiteListing { get; set; }
            public string DateAdded { get; set; }
        }
    }

