using System.Collections.Generic;

namespace LearningStarter.Entities
{
    public class Inventories
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
        public string ProductionCost { get; set; }
        public int Quantity { get; set; }
        public int NetTotal { get; set; }
        public string Availabilty { get; set; }
        public int OnlineStoreId { get; set; }
        public OnlineStores OnlineStores { get; set; }
        public string SiteListing { get; set; }
        public string DateAdded { get; set; }
        public List<Inventories> Invnetories { get; set; } = new List<Inventories>();
    }
    public class InventoriesGetDto
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
        public string ProductionCost { get; set; }
        public int Quantity { get; set; }
        public int NetTotal { get; set; }
        public string Availabilty { get; set; }
        public int OnlineStoreId { get; set; }
        public string SiteListing { get; set; }
        public string DateAdded { get; set; }
    }

    public class InventoriesCreateDto
    {
        public string ItemName { get; set; }
        public string ProductionCost { get; set; }
        public int Quantity { get; set; }
        public int NetTotal { get; set; }
        public string Availabilty { get; set; }
        public int OnlineStoreId { get; set; }
        public string SiteListing { get; set; }
        public string DateAdded { get; set; }
    }

    public class InventoriesUpdateDto 
    {
        public string ItemName { get; set; }
        public string ProductionCost { get; set; }
        public int Quantity { get; set; }
        public int NetTotal { get; set; }
        public string Availabilty { get; set; }
        public int OnlineStoreId { get; set; }
        public string SiteListing { get; set; }
        public string DateAdded { get; set; }
    }
}
