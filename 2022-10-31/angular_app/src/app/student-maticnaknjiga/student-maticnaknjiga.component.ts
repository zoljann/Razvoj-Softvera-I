import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MojConfig} from "../moj-config";
import {HttpClient} from "@angular/common/http";

declare function porukaSuccess(a: string):any;
declare function porukaError(a: string):any;

@Component({
  selector: 'app-student-maticnaknjiga',
  templateUrl: './student-maticnaknjiga.component.html',
  styleUrls: ['./student-maticnaknjiga.component.css']
})
export class StudentMaticnaknjigaComponent implements OnInit {

  constructor(private httpKlijent: HttpClient, private route: ActivatedRoute) {}

  studentId: any;
  prikaziFormuUpisa: boolean;
  datumUpisa: Date;
  godinaStudija: number;
  obnova: boolean;
  cijenaSkolarine: number;
  akademskeGodine: any;
  odabranaGodina: any;
  getAllupisaneGodine: any;
  ime: any;
  prezime: any;


  ovjeriLjetni(s:any) {

  }

  upisLjetni(s:any) {

  }

  ovjeriZimski(s:any) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.studentId = +params['id'];
      this.getUpisanaGodinaPodaci();
      this.getAkademskeGodine();
    });

  }

  otvoriZatvoriFormuUpisa() {
    this.prikaziFormuUpisa = !this.prikaziFormuUpisa;
  }

  getUpisanaGodinaPodaci() {
    this.httpKlijent.get(MojConfig.adresa_servera + `/UpisanaGodina/GetById/${this.studentId}`)
    .subscribe((x:any) => {
      this.getAllupisaneGodine = x.upisaneGodine;
      this.ime = x.student.ime;
      this.prezime = x.student.prezime;
    }
    )
  }

  getAkademskeGodine() {
    this.httpKlijent.get(MojConfig.adresa_servera + "/AkademskeGodine/GetAll_ForCmb", MojConfig.http_opcije())
    .subscribe((x) => {
      this.akademskeGodine = x;
    }
    )
  }

  upisiGodinu() {
    let godinaId = 0;
    this.akademskeGodine.forEach((godina: any) => {
      if (this.odabranaGodina == godina.opis)
      godinaId = godina.id;
    })

    var upisiStudenta = {
      StudentId: this.studentId,
      GodinaStudija: this.godinaStudija,
      Obnova: this.obnova,
      CijenaSkolarine: this.cijenaSkolarine,
      AkademskaGodinaId: godinaId
    }

    this.httpKlijent.post(MojConfig.adresa_servera + "/UpisanaGodina/Add", upisiStudenta, MojConfig.http_opcije())
    .subscribe(() => {
      porukaSuccess("Uspjesno upisan!")
    }
    )

  }
}
