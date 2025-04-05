using LebenChallenge.Application.Interfaces;
using LebenChallenge.Application.UseCases;
using LebenChallenge.Infrastructure.Persistence;
using LebenChallenge.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

builder.Services.AddDbContext<InMemoryDbContext>(options =>
    options.UseInMemoryDatabase("LebenChallengeDb")
);

builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<IGetAllTasksUseCase, GetAllTasksUseCase>();
builder.Services.AddScoped<IGetTaskByIdUseCase, GetTaskByIdUseCase>();
builder.Services.AddScoped<ICompleteTaskUseCase, CompleteTaskUseCase>();
builder.Services.AddScoped<ICreateTaskUseCase, CreateTaskUseCase>();
builder.Services.AddScoped<IDeleteTaskUseCase, DeleteTaskUseCase>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
