using System;

namespace FIT_Api_Examples.Modul3_MaticnaKnjiga.ViewModels
{
    public class UpisanaGodinaVM
    {
        public int? AkademskaGodinaId { get; set; }
        public int StudentId { get; set; }
        public int GodinaStudija { get; set; }
        public bool Obnova { get; set; }
        public float CijenaSkolarine { get; set; }
        public DateTime? DatumUpisa { get; set; }

    }
}
