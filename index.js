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
    }
  }

  // get spisakKorisnika() {
  //     return this.#sviKorisnici;
  // }
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
