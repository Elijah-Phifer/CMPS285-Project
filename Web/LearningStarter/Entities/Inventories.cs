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
            public double NetTotal { get; set; }
            public string Availabilty { get; set; }
            public double SiteListing { get; set; }
            public string DateAdded { get; set; }
            [ForeignKey("OnlineStores")]
            public int OnlineStoreId { get; set; }
            
            public onlineStores OnlineStores { get; set; }
            public List<onlineStores> onlineStores { get; set; } = new List<onlineStores>();
    }

    public class InventoriesCreateDto
    {
        public string ItemName { get; set; }
        public double ProductionCost { get; set; }
        public int Quantity { get; set; }
        public double NetTotal { get; set; }
        public string Availabilty { get; set; }
        public int OnlineStoreId { get; set; }
        public double SiteListing { get; set; }
        public string DateAdded { get; set; }
        public int onlineStores {get; set;}
    }
    public class InventoriesGetDto
        {
            public int Id { get; set; }
            public string ItemName { get; set; }
            public double ProductionCost { get; set; }
            public int Quantity { get; set; }
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
            public double NetTotal { get; set; }
            public string Availabilty { get; set; }
            public int OnlineStoreId { get; set; }
            public double SiteListing { get; set; }
            public string DateAdded { get; set; }
        }
    }

