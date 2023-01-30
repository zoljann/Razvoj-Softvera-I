import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MojConfig } from "../moj-config";
import { Router } from "@angular/router";
declare function porukaSuccess(a: string): any;
declare function porukaError(a: string): any;

@Component({
  selector: 'app-studenti',
  templateUrl: './studenti.component.html',
  styleUrls: ['./studenti.component.css']
})
export class StudentiComponent implements OnInit {

  title: string = 'angularFIT2';
  ime_prezime: string = '';
  opstina: string = '';
  studentPodaci: any;
  filter_ime_prezime: boolean;
  filter_opstina: boolean;

  prikaziDodavanjeStudentaFormu: boolean;
  prikaziEditovanjeStudentaFormu: boolean;
  ime: string;
  prezime: string;
  sveOpstine: any;
  odabranaOpstina: any;
  odabraniStudent: any;


  constructor(private httpKlijent: HttpClient, private router: Router) {
  }

  testirajWebApi(): void {
    this.httpKlijent.get(MojConfig.adresa_servera + "/Student/GetAll", MojConfig.http_opcije()).subscribe(x => {
      this.studentPodaci = x;
    });
  }

  getAllOpstine() {
    this.httpKlijent.get(MojConfig.adresa_servera + "/Opstina/GetByAll", MojConfig.http_opcije()).subscribe(x => {
      this.sveOpstine = x;
    });
  }

  ngOnInit(): void {
    this.testirajWebApi();
    this.getAllOpstine();
  }

  filtrirajStudente() {
    if (this.ime_prezime === '' && this.opstina == '')
      return this.studentPodaci;

    return this.studentPodaci.filter((s: any) =>
      ((s.ime + ' ' + s.prezime).toLowerCase().startsWith(this.ime_prezime) ||
        (s.prezime + ' ' + s.ime).toLowerCase().startsWith(this.ime_prezime)) &&
      (s.opstina_rodjenja.description).startsWith(this.opstina)
    )
  }

  otvoriZatvoriFormuZaDodavanjeStudenta() {
    this.prikaziDodavanjeStudentaFormu = !this.prikaziDodavanjeStudentaFormu;
  }

  otvoriZatvoriFormuZaEditovanjeStudenta() {
    this.prikaziEditovanjeStudentaFormu = !this.prikaziEditovanjeStudentaFormu;
  }

  pripremiEditovanjeStudenta(student: any) {
    this.odabraniStudent = student;
    this.sveOpstine.forEach((opstina: any) => {
      if (this.odabraniStudent.opstina_rodjenja.id == opstina.id)
        this.odabranaOpstina = opstina.opis;
    })
  }

  dodajNovogStudenta() {
    let opstinaId = 0;
    this.sveOpstine.forEach((opstina: any) => {
      if (this.odabranaOpstina == opstina.opis)
        opstinaId = opstina.id;
    })

    if (this.ime === '' || this.prezime === '' || opstinaId === 0) {
      porukaError('Obavezno unjeti sva polja!');
    }
    else {
      let noviStudent = {
        ime: this.ime,
        prezime: this.prezime,
        opstina_rodjenja_id: opstinaId,
      }
      this.httpKlijent.post(MojConfig.adresa_servera + "/Student/Add", noviStudent, MojConfig.http_opcije())
        .subscribe(() => {
          porukaSuccess("Uspjesno dodan student!")
          this.testirajWebApi();
          this.otvoriZatvoriFormuZaDodavanjeStudenta();
        }
        )
    }
  }

  urediPostojecegStudenta() {
    if (this.ime === '' || this.prezime === '') {
      porukaError('Obavezno unjeti sva polja!');
    } else {
      let opstinaId = 0;
      this.sveOpstine.forEach((opstina: any) => {
        if (this.odabranaOpstina == opstina.opis)
          opstinaId = opstina.id;
      })

      let editovaniStudent = {
        StudentId: this.odabraniStudent.id,
        ime: this.odabraniStudent.ime,
        prezime: this.odabraniStudent.prezime,
        opstina_rodjenja_id: opstinaId
      }
      this.httpKlijent.put(MojConfig.adresa_servera + "/Student/Edit", editovaniStudent, MojConfig.http_opcije())
        .subscribe(() => {
          porukaSuccess("Uspjesno editovan student!")
          this.testirajWebApi();
          this.otvoriZatvoriFormuZaEditovanjeStudenta();
        }
        )
    }
  }

  otvoriMaticnuKnjigu(studentId:any) {
    this.router.navigateByUrl(`/student-maticnaknjiga/${studentId}`);
  }
}
