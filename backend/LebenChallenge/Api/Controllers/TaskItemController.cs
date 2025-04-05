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

    public TaskItemController(
        ICreateTaskUseCase createTaskUseCase,
        ICompleteTaskUseCase completeTaskUseCase,
        IGetAllTasksUseCase getAllTasksUseCase
    )
    {
        _createTaskUseCase = createTaskUseCase;
        _completeTaskUseCase = completeTaskUseCase;
        _getAllTasksUseCase = getAllTasksUseCase;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var tasks = await _getAllTasksUseCase.ExecuteAsync();
        return Ok(tasks);
    }

    [HttpGet("{id}")]
    public Task<IActionResult> GetById(int id)
    {
        throw new NotImplementedException("GetById method not implemented");
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTaskDTO dto)
    {
        TaskItem newTaskItem = await _createTaskUseCase.ExecuteAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = newTaskItem.Id }, newTaskItem);
    }

    [HttpDelete("{id}")]
    public Task<IActionResult> Delete(int id)
    {
        throw new NotImplementedException("Delete method not implemented");
    }

    [HttpPut("{id}/complete")]
    public Task<IActionResult> Complete(int id)
    {
        throw new NotImplementedException("Complete method not implemented");
    }
}
