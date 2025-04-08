namespace LebenChallenge.Domain
{
    public class TaskItem
    {
        public int Id { get; private set; }
        public string Name { get; private set; }
        public string Description { get; private set; }
        public DateTime DueDate { get; private set; }
        public bool IsCompleted { get; private set; }
        public int Priority { get; private set; }
        public TaskItem()
        {
            // Default constructor for ORM or serialization purposes
        }

        public TaskItem(string name, string description, DateTime dueDate, int priority)
        {
            Name = name;
            Description = description;
            DueDate = dueDate;
            IsCompleted = false;
            Priority = 1;
        }

        public void MarkAsCompleted()
        {
            IsCompleted = true;
        }
        public void UpdateTask(string name, string description, DateTime dueDate)
        {
            Name = name;
            Description = description;
            DueDate = dueDate;
        }

        public void SetPriority(int priority)
        {
            if (priority < 1 || priority > 5)
            {
                throw new ArgumentOutOfRangeException(nameof(priority), "Priority must be between 1 and 5.");
            }
            Priority = priority;
        }
    }
}
