using System.Threading.Tasks;
using LebenChallenge.Application.DTO;
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
        if (task.Priority < 1 || task.Priority > 5)
        {
            throw new ArgumentException("La prioridad debe estar entre 1 y 5.");
        }
        TaskItem taskItem = new TaskItem(task.Name, task.Description, task.DueDate, task.Priority);
        _context.Tasks.Add(taskItem);

        await _context.SaveChangesAsync();

        return taskItem;
    }

    public async Task DeleteAsync(int id)
    {
        TaskItem deleteTask = await _context.Tasks.FindAsync(id);
        if (deleteTask == null)
        {
            throw new Exception("Task not found");
        }
        _context.Tasks.Remove(deleteTask);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<TaskItem>> GetAllAsync()
    {
        return await _context.Tasks.ToListAsync();
    }

    public async Task<TaskItem> GetByIdAsync(int id)
    {
        return await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<TaskItem> UpdateAsync(TaskItem task)
    {
        _context.Tasks.Update(task);
        await _context.SaveChangesAsync();
        return task;
    }
}
