using LebenChallenge.Application.Interfaces;
using LebenChallenge.Domain;
using LebenChallenge.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace LebenChallenge.Infrastructure.Repositories;

public class TaskRepository : ITaskRepository
{
    private readonly InMemoryDbContext _context;

    public TaskRepository(InMemoryDbContext inMemoryDbContext)
    {
        _context = inMemoryDbContext;
    }

    public async Task<TaskItem> AddAsync(TaskItem task)
    {
        TaskItem taskItem = new TaskItem(task.Name, task.Description, task.DueDate);
        _context.Tasks.Add(taskItem);

        await _context.SaveChangesAsync();

        return taskItem;
    }

    public Task DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<TaskItem>> GetAllAsync()
    {
        return await _context.Tasks.ToListAsync();
    }

    public Task<TaskItem> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<TaskItem> UpdateAsync(TaskItem task)
    {
        throw new NotImplementedException();
    }
}
