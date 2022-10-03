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
            public double ListingFees { get; set; }
            public double SellingFees { get; set; }
            public double Taxes { get; set; }
            public string Country { get; set; }
            public string Region { get; set; }
            //public Inventories Inventories { get; set; }
            //public List<Inventories> Invnetories { get; set; } = new List<Inventories>();
        }
        public class OnlineStoresGetDto
        {
            public int Id { get; set; }
            public string StoreName { get; set; }
            public double ListingFees { get; set; }
            public double SellingFees { get; set; }
            public double Taxes { get; set; }
            public string Country { get; set; }
            public string Region { get; set; }
        }

        public class OnlinestoresCreateDto
        {
            public string StoreName { get; set; }
            public double ListingFees { get; set; }
            public double SellingFees { get; set; }
            public double Taxes { get; set; }
            public string Country { get; set; }
            public string Region { get; set; }
        }

        public class OnlinestoresUpdateDto
        {
            public string StoreName { get; set; }
            public double ListingFees { get; set; }
            public double SellingFees { get; set; }
            public double Taxes { get; set; }
            public string Country { get; set; }
            public string Region { get; set; }
        }

    }
}
