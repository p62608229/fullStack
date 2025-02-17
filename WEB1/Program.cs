using BLL.func;
using BLL.interfaces;
using BLL.func;
using DAL1.func;
using DAL1.interfaces;
using DAL1.models;
using Microsoft.EntityFrameworkCore;
using BLL1.func;
using WebApi.Controllers;
using BLL1.interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddScoped(typeof(IcommentBll), typeof(commentBll));
builder.Services.AddScoped(typeof(IcommentDal), typeof(commentDAL1));
builder.Services.AddScoped(typeof(InameBll), typeof(nameBll));
builder.Services.AddScoped(typeof(Iname), typeof(name));
builder.Services.AddScoped(typeof(IUserDal), typeof(UserDal));
builder.Services.AddScoped(typeof(IUserBll), typeof(UserBll));
builder.Services.AddScoped(typeof(IofferBll), typeof(offerBll));
builder.Services.AddScoped(typeof(IofferDal), typeof(offerDal));
builder.Services.AddScoped(typeof(IDaysForWorkBll), typeof(DaysForWorkBll));
builder.Services.AddScoped(typeof(IDaysForWork), typeof(DaysForWork));
builder.Services.AddScoped(typeof(IRequestBll), typeof(RequestBll));
builder.Services.AddScoped(typeof(IRequestDal), typeof(RequestDal));
builder.Services.AddScoped(typeof(IProfessionDal), typeof(professionDal));
builder.Services.AddScoped(typeof(IprofessionBll), typeof(professionBll));

builder.Services.AddDbContext<ProjectdbContext>(o => o.UseSqlServer("\"Server=LAPTOP-8AAN4BN0\\\\SQLEXPRESS;Database=projectdb;Trusted_Connection=True;TrustServerCertificate=True"));

builder.Services.AddCors(opotion => opotion.AddPolicy("AllowAll",//????? ?? ??????
                p => p.AllowAnyOrigin()//????? ?? ????
                .AllowAnyMethod()//?? ????? - ???????
                .AllowAnyHeader()));//??? ????? ???????



var app = builder.Build();
app.UseCors("AllowAll");

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
