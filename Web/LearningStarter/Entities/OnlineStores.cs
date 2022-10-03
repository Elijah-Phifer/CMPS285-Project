namespace LearningStarter.Entities
{
    using System;
    using System.Collections.Generic;

    namespace LearningStarter.Entities
    {
        public class OnlineStores
        {
            public int Id { get; set; }
            public string StoreName { get; set; }
            public int ListingFees { get; set; }
            public int SellingFees { get; set; }
            public int Taxes { get; set; }
            public string Country { get; set; }
            public string State { get; set; }
            public List<Inventories> Invnetories { get; set; } = new List<Inventories>();
        }
        public class OnlineStoresGetDto
        {
            public int Id { get; set; }
            public string StoreName { get; set; }
            public int ListingFees { get; set; }
            public int SellingFees { get; set; }
            public int Taxes { get; set; }
            public string Country { get; set; }
            public string State { get; set; }
        }

        public class OnlinestoresCreateDto
        {
            public string StoreName { get; set; }
            public int ListingFees { get; set; }
            public int SellingFees { get; set; }
            public int Taxes { get; set; }
            public string Country { get; set; }
            public string State { get; set; }
        }

        public class OnlinestoresUpdateDto
        {
            public string StoreName { get; set; }
            public int ListingFees { get; set; }
            public int SellingFees { get; set; }
            public int Taxes { get; set; }
            public string Country { get; set; }
            public string State { get; set; }
        }

    }
}
