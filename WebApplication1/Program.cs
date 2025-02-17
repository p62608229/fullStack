using Azure.Core;
using BLL.func;
using BLL.interfaces;
using DALL.models;
using DALL.func;
using DALL.interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddScoped(typeof(IcommentBll), typeof(commentBll));
builder.Services.AddScoped(typeof(IcommentDal), typeof(commentDall));
builder.Services.AddScoped(typeof(InameBll), typeof(nameBll));
builder.Services.AddScoped(typeof(Iname), typeof(name));
builder.Services.AddScoped(typeof(IofferBll), typeof(offerBll));
builder.Services.AddScoped(typeof(IofferDal), typeof(offerDal));
builder.Services.AddScoped(typeof(IDaysForWorkBll), typeof(DaysForWorkBll));
builder.Services.AddScoped(typeof(IDaysForWork), typeof(DaysForWork));
builder.Services.AddScoped(typeof(IRequestBll), typeof(RequestBll));
builder.Services.AddScoped(typeof(IRequestDal), typeof(RequestDal));
builder.Services.AddDbContext<ProjectdbContext>(o=>o.UseSqlServer("Server=DESKTOP-R3M11OQ\\SQLEXPRESS;Database=projectdb;Trusted_Connection=True;TrustServerCertificate=True"));


var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
