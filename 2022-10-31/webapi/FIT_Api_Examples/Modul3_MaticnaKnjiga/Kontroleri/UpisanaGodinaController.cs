using FIT_Api_Examples.Data;
using FIT_Api_Examples.Helper.AutentifikacijaAutorizacija;
using FIT_Api_Examples.Modul2.ViewModels;
using FIT_Api_Examples.Modul3_MaticnaKnjiga.Models;
using FIT_Api_Examples.Modul3_MaticnaKnjiga.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FIT_Api_Examples.Modul3_MaticnaKnjiga.Kontroleri
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class UpisanaGodinaController : Controller

    {
        private readonly ApplicationDbContext _dbContext;

        public UpisanaGodinaController(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        [HttpPost]
        public ActionResult<List<UpisanaGodina>> Add(UpisanaGodinaVM u)
        {
            if (!HttpContext.GetLoginInfo().isLogiran)
                return BadRequest("nije logiran");

            var student = _dbContext.Student.Where(s => s.id == u.StudentId).FirstOrDefault();
            var akademskaGodina = _dbContext.AkademskaGodina.Where(ak => ak.id == u.AkademskaGodinaId).FirstOrDefault();

            var novaUpisana = new UpisanaGodina()
            {
                StudentId = student.id,
                student = student,
                CijenaSkolarine = u.CijenaSkolarine,
                Obnova = u.Obnova,
                AkademskaGodinaId = akademskaGodina.id,
                akademska_godina = akademskaGodina
            };

            _dbContext.Add(novaUpisana);
            _dbContext.SaveChanges();

            return Ok();
        }
        [HttpGet]
        [Route("{studentId:int}")]
        public ActionResult<List<UpisanaGodina>> GetById(int studentId)
        {
            var upisaneGodine = _dbContext.UpisanaGodina.Where(upisana => upisana.StudentId == studentId).ToList();
            var student = _dbContext.Student.Where(s => s.id == studentId).FirstOrDefault();

            var obj = new
            {
                student,
                upisaneGodine
            };

            return Ok(obj);
        }
    }
}
