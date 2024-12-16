

    class Hostel {
    ukupniBrojSoba;
    #sviKorisnici = [];
    sobe = [];

    constructor(ukupniBrojSoba) {
        this.ukupniBrojSoba = ukupniBrojSoba;

        
        for (let i = 1; i <= ukupniBrojSoba; i++) {
            let tip = i <= 3 ? "jednokrevetna" : i <= 6 ? "dvokrevetna" : "deluxe";
            this.sobe.push(new Soba(tip, i));
        }
    }

    provjeriDostupnostSobe(brojSobe) {
        let soba = this.sobe.find(s => s.redniBrojSobe === brojSobe);
        return soba && soba.jeSlobodna;
    }

    dodajKorisnika(korisnik, brojSobe) {
        let soba = this.sobe.find(s => s.redniBrojSobe === brojSobe);
        if (soba && soba.jeSlobodna) {
            soba.jeSlobodna = false;
            this.#sviKorisnici.push(korisnik);
            korisnik.brojSobe = brojSobe;
            console.log(`Korisnik ${korisnik.ime} je uspješno prijavljen u sobu broj ${brojSobe}.`);
        } else {
            console.log(`Soba broj ${brojSobe} nije dostupna.`);
        }
    }

    //odjaviKorisnika(brojLicneKarte) {
        //let korisnik = this.#sviKorisnici.find(k => k.brojLicneKarte === brojLicneKarte);
       // if (korisnik) {
        //    let soba = this.sobe.find(s => s.redniBrojSobe === korisnik.brojSobe);
         //   if (soba) soba.jeSlobodna = true;

          //  this.#sviKorisnici = this.#sviKorisnici.filter(k => k.brojLicneKarte !== brojLicneKarte);
           // console.log(`Korisnik ${korisnik.ime} je odjavljen.`);
     //   } else {
     //       console.log("Korisnik nije pronađen.");
      //  }
    //}

    ispisiSveKorisnike() {
        console.log("Trenutno prijavljeni korisnici:");
        this.#sviKorisnici.forEach(korisnik => {
            console.log(`${korisnik.ime} ${korisnik.prezime} - Soba: ${korisnik.brojSobe}`);
        });
    }

    // ispisiSveKorisnike() === get spisakKorisnika ?????????????????????
}


class Korisnik {
    //ime prezime, spol, broj licne karte, godine
    //Koliko je duzan hotelu,koliko dana je bio,koje usluge je koristio i koliko kostaju -metoda 1
    //rezervisi usluge - metoda 2
    //trazi promjenu sobe -metoda 3
    //odjava
    //Koliko je duzan hotelu,koliko dana je 
    // ime;
    // prezime;
    // spol;
    // brojLicneKarte;
    // godine;
    // jeOdjavljen = false;

    // constructor(ime, prezime, spol, brojLicneKarte, godine) {
    //     this.ime = ime;
    //     this.prezime = prezime;
    //     this.spol = spol;
    //     this.brojLicneKarte = brojLicneKarte;
    //     this.godine = godine;
    // }

    // brojNocenja(dani) { }  //ove ostale metode imamo dole u klasama pa ih ne bi dodatno ubacivao
    // rezervisiUslugu(usluga) { }
    // traziPromjenuSobe(soba) { }
    // odjaviSe() { this.jeOdjavljen = false}



    ime;
    prezime;
    spol;
    brojLicneKarte;
    godine;
    jeOdjavljen = false;
    usluge = [];
    datumPrijave;
    datumOdjave;
    trenutnaSoba;

    constructor(ime, prezime, spol, brojLicneKarte, godine, trenutnaSoba) {
        this.ime = ime;
        this.prezime = prezime;
        this.spol = spol;
        this.brojLicneKarte = brojLicneKarte;
        this.godine = godine;
        this.trenutnaSoba = trenutnaSoba;
    }

    dodajUslugu(usluga) {
        this.usluge.push(usluga);
    }

    postaviDatume(datumPrijave, datumOdjave) {
        this.datumPrijave = this.parsirajDatum(datumPrijave);
        this.datumOdjave = this.parsirajDatum(datumOdjave);
    }

    parsirajDatum(datum) {
        let godina = 0;
        let mjesec = 0;
        let dan = 0;

        for (let i = 0; i < 4; i++) {
            godina = godina * 10 + (datum.charCodeAt(i) - 48);
        }

        for (let i = 5; i < 7; i++) {
            mjesec = mjesec * 10 + (datum.charCodeAt(i) - 48);
        }

        for (let i = 8; i < 10; i++) {
            dan = dan * 10 + (datum.charCodeAt(i) - 48);
        }

        return [godina, mjesec, dan];
    }

    brojDanaUMjesecu(mjesec, godina) {
        const mjeseci = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (mjesec === 2 && (godina % 4 === 0 && (godina % 100 !== 0 || godina % 400 === 0))) {
            return 29;
        }
        return mjeseci[mjesec - 1];
    }

    brojNocenja() {
        const [godina1, mjesec1, dan1] = this.datumPrijave;
        const [godina2, mjesec2, dan2] = this.datumOdjave;

        let brojDana = 0;

        if (godina1 === godina2) {
            if (mjesec1 === mjesec2) {
                brojDana = dan2 - dan1;
            } else {
                brojDana += this.brojDanaUMjesecu(mjesec1, godina1) - dan1; 
                for (let m = mjesec1 + 1; m < mjesec2; m++) {
                    brojDana += this.brojDanaUMjesecu(m, godina1); 
                }
                brojDana += dan2; 
            }
        } else {
            brojDana += this.brojDanaUMjesecu(mjesec1, godina1) - dan1;
            for (let m = mjesec1 + 1; m <= 12; m++) {
                brojDana += this.brojDanaUMjesecu(m, godina1);
            }
            for (let g = godina1 + 1; g < godina2; g++) {
                brojDana += (g % 4 === 0 && (g % 100 !== 0 || g % 400 === 0)) ? 366 : 365;
            }
            for (let m = 1; m < mjesec2; m++) {
                brojDana += this.brojDanaUMjesecu(m, godina2);
            }
            brojDana += dan2;
        }

        return brojDana;
    }

    naplatiNocenja() {
        const cjenovnikPoNoci = 50; 
        const brojDana = this.brojNocenja();
        return brojDana * cjenovnikPoNoci;
    }

    traziPromjenuSobe(novaSoba) {
        console.log(`Promjena sobe za korisnika ${this.ime} ${this.prezime}`);
        console.log(`Trenutna soba: ${this.trenutnaSoba}`);
        console.log(`Nova soba: ${novaSoba}`);

        this.trenutnaSoba = novaSoba;
        console.log("Promjena sobe uspješno izvršena.");
    }
}


// Testiranje
const korisnik = new Korisnik('Amer', 'Mustafa', 'Musko', 'OK7421953', 31);
const usluga1 = new Usluga('Sauna', 10);
const usluga2 = new Usluga('Bazen', 15);
const usluga3 = new Usluga('Restoran', 20);
korisnik.postaviDatume("2024-12-10", "2024-12-14");

korisnik.dodajUslugu(usluga1);
korisnik.dodajUslugu(usluga2);
korisnik.dodajUslugu(usluga3);

console.log(`Broj noćenja: ${korisnik.brojNocenja()}`);
console.log(`Ukupan iznos za noćenja: ${korisnik.naplatiNocenja()} KM`);
korisnik.traziPromjenuSobe("Soba 205");
console.log(`Trenutna soba: ${korisnik.trenutnaSoba}`);

console.log(`Ukupan račun za korisnika: ${korisnik.izracunajUkupanRacun()} KM`);

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
  jeSlobodna = true;

  constructor(tipSobe, redniBrojSobe) {
    this.tipSobe = tipSobe;
    this.redniBrojSobe = redniBrojSobe;
  }

  promjeniDostupnost(trenutnoStanje) {
    if (trenutnoStanje == "slobodna") {
      this.jeSlobodna = true;
    } else if (trenutnoStanje == "zauzeta") {
      this.jeSlobodna = false;
    } else {
      console.log(`Nepravilan unos za stanje sobe`);
      return null;


    get spisakKorisnika() {
        return this.#sviKorisnici;
    }
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

    constructor() {
        this.brojac = 1;
        this.brojacZaPassword = 1;
        this.redniBrojSobe = 1;
        this.jeOdjavljen = false;
    }

    dodjeliKorisnickoImeKorisniku(korisnik) {
        korisnik.korisnickoIme = `korisnik${this.brojac}`;
        this.brojac++;
    }

    dodjeliPasswordKorisniku(korisnik) {
        korisnik.password = this.formatirajSifru(this.brojacZaPassword);
        this.brojacZaPassword++;
    }
    formatirajSifru(broj) {
        let trenutniBroj = broj.toString();
        while (trenutniBroj.length < 4) {
            trenutniBroj = '0' + trenutniBroj;
        }
        return trenutniBroj;
    }

    dodjeliSobu(korisnik, hostel, brojGostiju) {
        const tipSobe = brojGostiju === 1 ? 'jednokrevetna' : brojGostiju === 2 ? 'dvokrevetna' : 'deluxe';
        const slobodneSobe = hostel.dostupneSobe.filter(soba => soba.tipSobe === tipSobe && soba.jeSlobodna);

        if (slobodneSobe.length > 0) {
            const soba = slobodneSobe[0];
            soba.jeSlobodna = false;
            korisnik.soba = soba;
            korisnik.vrijemePrijave = new Date();
            console.log(`Vrijeme prijave korisnika je ${korisnik.vrijemePrijave}`);
            console.log(`Korisniku ${korisnik.ime} dodijeljena je soba broj ${soba.redniBrojSobe}, tipSobe: ${soba.tipSobe}.`);
        } else {
            console.log(`Nema slobodnih soba za ${brojGostiju} gosta.`);
        }
        if (!hostel.spisakKorisnika.includes(korisnik)) {
            hostel.spisakKorisnika.push(korisnik);
        }
    }

    promjeniSobu(korisnik,hostel, novaSoba) {
        if (novaSoba.toLowerCase() === 'jednokrevetna' || novaSoba.toLowerCase() === 'dvokrevetna' || novaSoba.toLowerCase() === 'deluxe') {
            if (novaSoba.toLowerCase() === korisnik.soba.tipSobe.toLowerCase()) {
                console.log("Trenutno se nalazite u trazenom tipu sobe")
                return;
            }
            else {
                const zamjenjenaSoba = hostel.dostupneSobe.filter(soba => soba.tipSobe.toLowerCase() === novaSoba.toLowerCase() && soba.jeSlobodna === true && soba.redniBrojSobe !== korisnik.soba.redniBrojSobe);

                korisnik.soba.jeSlobodna = true;

                if (zamjenjenaSoba.length > 0) {
                    korisnik.soba = zamjenjenaSoba[0];
                    zamjenjenaSoba[0].jeSlobodna = false;
                    console.log(`Soba korisnika je promijenjena u sobu broj ${zamjenjenaSoba[0].redniBrojSobe}, tip: ${zamjenjenaSoba[0].tipSobe}.`);

                } else {
                    console.log(`Nema slobodnih soba za tip ${novaSoba}.`);
                }
            }
        } else {
            console.log("Nevalidan tip sobe.");
        }
    }

    odjaviKorisnika(korisnik) {
        if (!korisnik.jeOdjavljen) {
            korisnik.jeOdjavljen = true;
            if (korisnik.soba) korisnik.soba.jeSlobodna = true;
            console.log(`Korisnik ${korisnik.ime} je uspjesno odjavljen.`);
        } else {
            console.log(`Korisnik ${korisnik.ime} je vec odjavljen.`);
        }
    }

    provjeriJeLiPrijavljen(korisnik) {
        const ispis = !korisnik.jeOdjavljen;
        console.log(`Korisnik ${korisnik.ime} je prijavljen: ${ispis}`);
    }

    izlogujSve(hostel) {
        hostel.spisakKorisnika.forEach(korisnik => {
            if (!korisnik.jeOdjavljen) {
                korisnik.jeOdjavljen = true;
                console.log(`Korisnik ${korisnik.ime} je uspjesno izlogovan.`);
            }
        });
    }

    izlogujIndividualno(korisnik) {
        if (!korisnik.jeOdjavljen) {
            korisnik.jeOdjavljen = true;
            console.log(`Korisnik ${korisnik.ime} je uspjesno izlogovan.`);
        } else {
            console.log(`Korisnik ${korisnik.ime} je vec odjavljen.`);
        }
    }

    ugasiSistem(hostel) {
        hostel.dostupneSobe.forEach(soba => {
            soba.jeSlobodna = true;
        });
        hostel.spisakKorisnika.forEach(korisnik => {
            if (!korisnik.jeOdjavljen) {
                korisnik.jeOdjavljen = true;
                if (korisnik.soba) {
                    korisnik.soba.jeSlobodna = true;
                }
                console.log(`Korisnik ${korisnik.ime} je odjavljen jer je sistem ugasen.`);
            }
        });
        console.log("Sistem je uspjeno ugasen.");
    }

    pretraziKorisnika(korisnici, parametar) {
        const pretraga = parametar.toLowerCase();
        return korisnici.filter(korisnik =>
            korisnik.username.toLowerCase().includes(pretraga) ||
            korisnik.ime.toLowerCase().includes(pretraga) ||
            korisnik.brojLicneKarte.toLowerCase().includes(pretraga)
        );
     
    }


    // azurirajIskoristeneUslugeKorisniku(usluga) {}  

    // #izdajRacunKorisniku() { }  da li da prebacimo u class Racun?


    // get prikaziKorisnikovPassword(){
    //     return this.#dodjeliPasswordKorisniku;
    // }

    // get prikaziRacun(){
    //     return this.#izdajRacunKorisniku;
    // } 
    get spisakKorisnika(){
        return this.#sviKorisnici;
    }
}
    }
    console.log(
      `Promjenili ste stanje sobe ${this.redniBrojSobe} u ${
        this.jeSlobodna ? "slobodna" : "zauzeta"
      }`
    );
    return this.jeSlobodna;
  }
}


class Usluga {
  naziv;
  cijena;
  brojac = 0;

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

  ponovoIskoristiUslugu(naziv) {
    if (this.naziv === naziv) {
      this.brojac++;
      console.log(
        `Usluga ${this.naziv} je iskorištena ${this.brojac} puta, cijena usluge iznosi ${this.cijena}KM`
      );
    } else {
      console.log(`Usluga koju ste tražili ne postoji`);
    }
  }
}

class Racun {
  //ukupni racun, historija usluga
  #ukupniRacun = 0;
  historijaUsluga = [];

  bezDodatnihUsluga() {
    for (let i = 0; i < this.historijaUsluga.length; i++) {
      console.log(
        `${i + 1}. ${this.historijaUsluga[i].usluga} - ${
          this.historijaUsluga[i].cijena
        } KM`
      );
    }
  } //broj nocenja

  dodajCijeneDodatnihUsluga(usluga, cijena) {
    this.#ukupniRacun += cijena;
    this.historijaUsluga.push({ usluga, cijena });
  }

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
const admin = new Admin()

admin.dodjeliSobu(Amer, Tuzla, 2)
console.log(Amer.soba);
console.log(Amer.vrijemePrijave);


//soba1.promjeniDostupnost("slobodna");
//soba2.promjeniDostupnost("zauzeta");
//teretana.ponovoIskoristiUslugu("teretana");
//teretana.ponovoIskoristiUslugu("teretana");
//kino.ponovoIskoristiUslugu("kino");
// admin.dodjeliKorisnickoImeKorisniku(Amer)
// admin.dodjeliKorisnickoImeKorisniku(Belma)
// console.log(Amer.korisnickoIme)
// console.log(Belma.korisnickoIme)
// admin.dodjeliPasswordKorisniku(Amer)
// admin.dodjeliPasswordKorisniku(Belma)
// console.log(Amer.password)
// console.log(Belma.password)

