namespace LebenChallenge.Domain
{
    public class TaskItem
    {
        public int Id { get; }
        public string Name { get; }
        public string Description { get; }
        public DateTime DueDate { get; }
        public bool IsCompleted { get; private set; }

        public TaskItem()
        {
            // Default constructor for ORM or serialization purposes
        }

        public TaskItem(string name, string description, DateTime dueDate)
        {
            Name = name;
            Description = description;
            DueDate = dueDate;
            IsCompleted = false;
        }

        public void MarkAsCompleted()
        {
            IsCompleted = true;
        }
    }
}
