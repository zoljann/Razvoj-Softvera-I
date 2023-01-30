using FIT_Api_Examples.Modul2.Models;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace FIT_Api_Examples.Modul3_MaticnaKnjiga.Models
{
    public class UpisanaGodina
    {
        public int Id { get; set; }
        public DateTime DatumUpisa { get; set; }
        [ForeignKey("StudentId")]
        public int StudentId { get; set; }
        public virtual Student student { get; set; }
        [ForeignKey("AkademskaGodinaId")]
        public int? AkademskaGodinaId { get; set; }
        public AkademskaGodina akademska_godina { get; set; }
        public float CijenaSkolarine { get; set; }
        public bool Obnova { get; set; }
        public DateTime DatumOvjere { get; set; }
        public string NapomenaOvjera { get; set; }


    }
}
