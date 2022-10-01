using System;

namespace LearningStarter.Entities
{
    public class Subscribers
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTimeOffset DateSubscribed { get; set; }

    }

    public class SubcribersGetDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTimeOffset DateSubscribed { get; set; }

    }
    public class SubscribersCreateDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTimeOffset DateSubscribed { get; set; }

    }
    public class SubscribersUpdateDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTimeOffset DateSubscribed { get; set; }
    }
}

