using System;
using System.Data;

namespace LearningStarter.Entities
{
    public class EmailNewsletter
    {
        public int Id { get; set; }
        public int SubscriberId { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public DateTimeOffset DateSent { get; set; }

    }
    public class EmailNewsletterGetDto
    {
        public int Id { get; set; }
        public int SubscriberId { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public DateTimeOffset DateSent { get; set; }

    }

    public class EmailNewsletterCreateDto
    {
        public string Title { get; set; }
        public string Message { get; set; }
        public DateTimeOffset DateSent { get; set; }
    }
    public class EmailNewsletterUpdateDto
    {
        public string Title { get; set; }
        public string Message { get; set; }
        public DateTimeOffset DateSent { get; set; }
    }


}

