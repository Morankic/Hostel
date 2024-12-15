
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

