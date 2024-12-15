class Hostel {
  /* ukupan broj soba,korisnici(niz), koje su sobe dostupne*/
  //provjeri dvokretne i jednokrevetne, deluxe -ukupno 7 soba
  ukupniBrojSoba;
  #sviKorisnici = [];
  dostupneSobe = [];

  constructor(ukupniBrojSoba) {
    this.ukupniBrojSoba = ukupniBrojSoba;
  }

  provjeriDostupnostSobe(unesenaSoba) {}

  ispisiSveKorisnike() {}

  get spisakKorisnika() {
    return this.#sviKorisnici;
  }
}

class Soba {
  // tip sobe, da li je slobodna, broj sobe
  tipSobe;
  redniBrojSobe;
  jeSlobodna = "true";

  constructor(tipSobe, redniBrojSobe) {
    this.tipSobe = tipSobe;
    this.redniBrojSobe = redniBrojSobe;
  }

  promjeniDostupnost(trenutnoStanje) {}
}

class Admin {
  //objekat, vrijeme prijave u hotel, korisnicko ime, password za korisnika ,broj i tip sobe-metoda 1(registruje)
  // promjena sobe i tipa sobe, dodatne usluge -metoda 2(dodatnaUsluga)
  //racun za usluge -metoda 3 (izdajRacun(imeKorisnika))
  //odjava korisnika i pullaj iz niza -metoda4 (odjaviKorisnika)
  //provjeri je li prijavljen-metoda 5.25 (jeLiUHotelu)
  //izloguj sve ili individualno - metoda 5.5()
  //metoda 5.75 (ugasiSistem)
  //pretrazi korisnika po imenu/br licne karte/username -metoda 6(pretraziKorisnika)

  dodjeliKorisnickoImeKorisniku(korisnik) {}
  #dodjeliPasswordKorisniku(korisnik) {}
  dodjeliBrojSobe() {}
  dodjeliTipSobe() {}
  unesiVrijemePrijaveUHotel() {}
  promjeniSobu() {}
  promjeniTipSobe() {}
  /* azurirajIskoristeneUslugeKorisniku(usluga) { }   da li da ubacimo u 
    class korisnik niz gdje cemo ubacivat sve iskoristene usluge?*/
  // #izdajRacunKorisniku() { }  da li da prebacimo u class Racun?
  odjaviKorisnika(korisnik) {}
  provjeriJeLiPrijavljen(korisnik) {}
  izlogujSve(korisnik) {}
  izlogujIndividualno(korisnik) {}
  ugasiSistem() {}
  pretraziKorisnika(parametar) {}

  get prikaziKorisnikovPassword() {
    return this.#dodjeliPasswordKorisniku;
  }

  // get prikaziRacun(){
  //     return this.#izdajRacunKorisniku;
  // }
}

class Korisnik {
  //ime prezime, spol, broj licne karte, godine
  //Koliko je duzan hotelu,koliko dana je bio,koje usluge je koristio i koliko kostaju -metoda 1
  //rezervisi usluge - metoda 2
  //trazi promjenu sobe -metoda 3
  //odjava

  ime;
  spol;
  brojLicneKarte;
  godine;
  jeOdjavljen = "false";

  constructor(ime, spol, brojLicneKarte, godine) {
    this.ime = ime;
    this.spol = spol;
    this.brojLicneKarte = brojLicneKarte;
    this.godine = godine;
  }

  brojNocenja(dani) {} //ove ostale metode imamo dole u klasama pa ih ne bi dodatno ubacivao
  rezervisiUslugu(usluga) {}
  traziPromjenuSobe(soba) {}
  odjaviSe() {}
}
class Usluga {
  naziv;
  cijena;
  // brojac = 0;

  constructor(naziv, cijena) {
    this.naziv = naziv;
    this.cijena = cijena;
  }

  //ubacit brojac u metodi ako se ponavlja ista usluga vise puta?
  // jednokrevetna soba 20 KM
  // dvokrevetna soba 40 KM
  // apartman 60 KM
  // Teretana 10 KM
  // Kino 10 KM
  // Restoran 20 KM
  // Bazen 10 KM
  // Sauna 10 KM

  ponovoIskoristiMetodu(naziv) {}
}

class Racun {
  //ukupni racun, historija usluga
  #ukupniRacun;
  historijaUsluga = [];

  bezDodatnihUsluga() {}
  dodajCijeneDodatnihUsluga(cijena) {}

  get prikaziRacun() {
    return this.#ukupniRacun;
  }
}

const Tuzla = new Hostel(7);

const soba1 = new Soba("jednokrevetna", 1);
const soba2 = new Soba("jednokrevetna", 2);
const soba3 = new Soba("jednokrevetna", 3);
const soba4 = new Soba("dvokrevetna", 4);
const soba5 = new Soba("dvokrevetna", 5);
const soba6 = new Soba("dvokrevetna", 6);
const soba7 = new Soba("deluxe", 7);

const Amer = new Korisnik("Amer", "Musko", "OK7421953", 31);
const Belma = new Korisnik("Belma", "Zensko", "OK342923", 27);
const Sanela = new Korisnik("Sanela", "Zensko", "OK122529", 42);
const Hamza = new Korisnik("Hamza", "Musko", "OK1431666", 44);
const Elmir = new Korisnik("Elmir", "Musko", "OK1214943", 18);
const Semir = new Korisnik("Semir", "Musko", "OK4801953", 21);

const teretana = new Usluga("teretana", 10);
const kino = new Usluga("kino", 10);
const restoran = new Usluga("restoran", 20);
const bazen = new Usluga("bazen", 15);
const sauna = new Usluga("sauna", 10);
