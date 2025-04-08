using LebenChallenge.Application.DTO;
using LebenChallenge.Application.Interfaces;
using LebenChallenge.Application.UseCases;
using LebenChallenge.Domain;
using Microsoft.AspNetCore.Mvc;

namespace LebenChallenge.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TaskItemController : ControllerBase
{
    private readonly ICreateTaskUseCase _createTaskUseCase;
    private readonly IGetAllTasksUseCase _getAllTasksUseCase;
    private readonly ICompleteTaskUseCase _completeTaskUseCase;
    private readonly IGetTaskByIdUseCase _getTaskByIdUseCase;
    private readonly IDeleteTaskUseCase _deleteTaskUseCase;
    private readonly IUpdateTaskUseCase _updateTaskUseCase;
    private readonly IUpdateTaskPriorityUseCase _updateTaskPriorityUseCase;

    public TaskItemController(
        ICreateTaskUseCase createTaskUseCase,
        ICompleteTaskUseCase completeTaskUseCase,
        IGetAllTasksUseCase getAllTasksUseCase,
        IGetTaskByIdUseCase getTaskByIdUseCase,
        IDeleteTaskUseCase deleteTaskUseCase,
        IUpdateTaskUseCase updateTaskUseCase,
        IUpdateTaskPriorityUseCase updateTaskPriorityUseCase
    )
    {
        _createTaskUseCase = createTaskUseCase;
        _completeTaskUseCase = completeTaskUseCase;
        _getAllTasksUseCase = getAllTasksUseCase;
        _getTaskByIdUseCase = getTaskByIdUseCase;
        _deleteTaskUseCase = deleteTaskUseCase;
        _updateTaskUseCase = updateTaskUseCase;
        _updateTaskPriorityUseCase = updateTaskPriorityUseCase;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var tasks = await _getAllTasksUseCase.ExecuteAsync();
        return Ok(tasks);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        TaskItem taskItem = await _getTaskByIdUseCase.ExecuteAsync(id);
        if (taskItem == null)
        {
            return NotFound();
        }
        return Ok(taskItem);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTaskDTO dto)
    {
        TaskItem newTaskItem = await _createTaskUseCase.ExecuteAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = newTaskItem.Id }, newTaskItem);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var deleteTask = new DeleteTaskDTO { Id = id };
            await _deleteTaskUseCase.ExecuteAsync(deleteTask);
            return NoContent();
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpPut("{id}/complete")]
    public async Task<IActionResult> Complete([FromBody] CompleteTaskDTO dto)
    {
        try
        {
            var completedTask = await _completeTaskUseCase.ExecuteAsync(dto);
            return Ok(completedTask);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateTaskDTO dto)
    {
        try
        {
            TaskItem task = await _updateTaskUseCase.ExecuteAsync(id, dto);
            return Ok(task);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }

    [HttpPut("{id}/priority")]
    public async Task<IActionResult> UpdatePriority(int id, [FromBody] UpdateTaskPriorityDTO dto)
    {
        try
        {
            var updatedTask = await _updateTaskPriorityUseCase.ExecuteAsync(id, dto);
            return Ok(updatedTask);
        }
        catch (Exception ex)
        {
            return NotFound(ex.Message);
        }
    }
}
