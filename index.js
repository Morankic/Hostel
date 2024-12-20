class Hostel {
    ukupniBrojSoba;
    #sviKorisnici = [];
    sobe = [];
    slobodneSobe = [];

    constructor(ukupniBrojSoba) {
        this.ukupniBrojSoba = ukupniBrojSoba;

        for (let i = 1; i <= ukupniBrojSoba; i++) {
            let tip = i <= 3 ? "jednokrevetna" : i <= 6 ? "dvokrevetna" : "deluxe";
            this.sobe.push(new Soba(tip, i));
        }
    }

    provjeriDostupnostSobe(brojSobe) {
        let soba = this.sobe.find(s => s.redniBrojSobe === brojSobe);
        if (!soba) {
            console.log("Nema pronadjenih soba");
            return false;
        }
        console.log(`Pronađena soba broj: ${soba.redniBrojSobe} i ona je ${soba.jeSlobodna ? 'dostupna' : 'nedostupna'} `);
        return soba.jeSlobodna;
    }

    ispisiSveKorisnike() {
        console.log("Trenutno prijavljeni korisnici:");
        this.spisakKorisnika.forEach(korisnik => {
            console.log(`${korisnik.ime} - Soba: ${korisnik.soba.redniBrojSobe}`);
        });
    }

    prikaziSveSobe() {
        this.sobe.forEach(soba => {
            console.log(`Soba ${soba.redniBrojSobe} (${soba.tipSobe}) - ${soba.jeSlobodna ? 'Slobodna' : 'Zauzeta'}`);
        });
    }

    dostupneSobe() {
        this.sobe.filter(soba => {
            if (soba.jeSlobodna) {
            this.slobodneSobe.push(`Soba ${soba.redniBrojSobe} (${soba.tipSobe}) - ${soba.jeSlobodna}`)
            }
        });
        return this.slobodneSobe ;
    }

    get spisakKorisnika() {
        return this.#sviKorisnici;
    }
}

class Korisnik {
    ime;
    prezime;
    spol;
    brojLicneKarte;
    godine;
    jeOdjavljen = false;
    sveUsluge = [];
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
        this.sveUsluge.push(usluga);
        console.log(`Usluga ${usluga.naziv} je slobodna za koristenje`);
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

        return [dan, mjesec, godina];
    }

    brojDanaUMjesecu(mjesec, godina) {
        const mjeseci = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (mjesec === 2 && (godina % 4 === 0 && (godina % 100 !== 0 || godina % 400 === 0))) {
            return 29;
        }
        return mjeseci[mjesec - 1];
    }

    brojNocenja() {
        const [dan1, mjesec1, godina1] = this.datumPrijave;
        const [dan2, mjesec2, godina2] = this.datumOdjave;

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

    traziPromjenuSobe() {
        console.log(`Zatrazena je promjena sobe za korisnika ${this.ime} koji se nalazi u sobi broj: ${this.soba.redniBrojSobe} tipa ${this.soba.tipSobe}`);
        console.log('Molimo vas da se obratite adminu za promjenu sobe');
    }

    ukupanRacun() {
        let suma = 0
        for (let i = 0; i < this.sveUsluge.length; i++) {
            suma += this.sveUsluge[i].cijena
        }
        return console.log(`Ukupan racun za dodatne usluge je: ${suma}KM`)
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
        const slobodneSobe = hostel.sobe.filter(soba => soba.jeSlobodna && soba.tipSobe === tipSobe);

        if (slobodneSobe.length > 0) {
            const soba = slobodneSobe[0];
            soba.jeSlobodna = false;
            korisnik.soba = soba;
            hostel.spisakKorisnika.push(korisnik);
            korisnik.vrijemePrijave = korisnik.datumPrijave;
            console.log(`Datum prijave korisnika je ${korisnik.datumPrijave[0]}.${korisnik.datumPrijave[1]}.${korisnik.datumPrijave[2]}`);
            console.log(`Korisniku ${korisnik.ime} dodijeljena je soba broj ${soba.redniBrojSobe}, tipSobe: ${soba.tipSobe}.`);
        } else {
            console.log(`Nema slobodnih soba za broj gostiju: ${brojGostiju}.`);
        }
    }

    promjeniSobu(korisnik, hostel, novaSoba) {
        if (novaSoba.toLowerCase() === 'jednokrevetna' || novaSoba.toLowerCase() === 'dvokrevetna' || novaSoba.toLowerCase() === 'deluxe') {
            if (novaSoba.toLowerCase() === korisnik.soba.tipSobe.toLowerCase()) {
                console.log("Trenutno se nalazite u trazenom tipu sobe")
                return;
            }
            else {
                const zamjenjenaSoba = hostel.dostupneSobe().filter(soba => soba.tipSobe.toLowerCase() === novaSoba.toLowerCase() && soba.jeSlobodna === true && soba.redniBrojSobe !== korisnik.soba.redniBrojSobe);

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

            if (korisnik.soba) {
                korisnik.soba.jeSlobodna = true;
                korisnik.soba = null;
            }
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
        hostel.dostupneSobe().forEach(soba => {
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

    naplatiNocenja(korisnik) {
        const cjenaPoNocenju = korisnik.soba.cijena;
        const brojDana = this.brojNocenja();
        return brojDana * cjenaPoNocenju;
    }
}

class Racun {
    //ukupni racun, historija usluga
    #ukupniRacun = 0;
    historijaUsluga = [];

    bezDodatnihUsluga() {
        for (let i = 0; i < this.historijaUsluga.length; i++) {
            console.log(
                `${i + 1}. ${this.historijaUsluga[i].usluga} - ${this.historijaUsluga[i].cijena
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

class Usluga {
    naziv;
    cijena;

    constructor(naziv, cijena) {
        this.naziv = naziv;
        this.cijena = cijena;
    }

    // ponovoIskoristiUslugu(naziv) {
    //     if (this.naziv === naziv) {

    //         console.log(
    //             `Usluga ${ this.naziv } je iskorištena ${ this.brojac } puta, cijena usluge iznosi ${ this.cijena } KM`
    //         );
    //     } else {
    //         console.log(`Usluga koju ste tražili ne postoji`);
    //     }
    // }
}

class Soba {
    // tip sobe, da li je slobodna, broj sobe
    tipSobe;
    redniBrojSobe;
    jeSlobodna = true;

    constructor(tipSobe, redniBrojSobe) {
        this.tipSobe = tipSobe;
        this.redniBrojSobe = redniBrojSobe;

        if (this.tipSobe === "jednokrevetna") {
            this.cijena = 20;
        } else if (this.tipSobe === "dvokrevetna") {
            this.cijena = 40;
        } else if (this.tipSobe === "deluxe") {
            this.cijena = 60;
        }
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
}

const Tuzla = new Hostel(7);

const Amer = new Korisnik("Amer", "Musko", "OK7421953", 31);
const Belma = new Korisnik("Belma", "Zensko", "OK342923", 27);
const Sanela = new Korisnik("Sanela", "Zensko", "OK122529", 42);
const Hamza = new Korisnik("Hamza", "Musko", "OK1431666", 44);
const Elmir = new Korisnik("Elmir", "Musko", "OK1214943", 18);
const Semir = new Korisnik("Semir", "Musko", "OK4801953", 21);
const korisnik = new Korisnik('Nerko', 'Mustafa', 'Musko', 'OK7421953', 31);

const teretana = new Usluga("teretana", 10);
const kino = new Usluga("kino", 10);
const restoran = new Usluga("restoran", 20);
const bazen = new Usluga("bazen", 15);
const sauna = new Usluga("sauna", 10);
const admin = new Admin()

// Tuzla.provjeriDostupnostSobe(1)
// admin.dodjeliSobu(Belma,Tuzla,2)
// Tuzla.ispisiSveKorisnike()
// Tuzla.prikaziSveSobe()
// Tuzla.dostupneSobe()
// Amer.dodajUslugu(sauna)
// Amer.dodajUslugu(bazen)
// Amer.dodajUslugu(sauna)
// console.log(Amer.sveUsluge);
Amer.postaviDatume("2024-12-10", "2024-12-14");
Amer.brojNocenja(3) // ne radi tacno
console.log(Amer.datumOdjave);
admin.dodjeliSobu(Amer, Tuzla, 8)
Amer.traziPromjenuSobe('jednokrevetna', Tuzla)
// console.log(Amer.soba.cijena);
// Amer.naplatiNocenja(Amer)
// Amer.ukupanRacun()





// admin.dodjeliKorisnickoImeKorisniku(Amer)
// admin.dodjeliKorisnickoImeKorisniku(Belma)
// console.log(Amer.korisnickoIme)
// console.log(Belma.korisnickoIme)
// admin.dodjeliPasswordKorisniku(Amer)
// admin.dodjeliPasswordKorisniku(Belma)
// console.log(Amer.password)
// console.log(Belma.password)


// console.log(`Broj noćenja: ${ korisnik.brojNocenja() } `);
// console.log(`Ukupan iznos za noćenja: ${ korisnik.naplatiNocenja() } KM`);
// korisnik.traziPromjenuSobe("Soba 205");
// console.log(`Trenutna soba: ${ korisnik.trenutnaSoba } `);
// // console.log(`Ukupan račun za korisnika: ${ korisnik.izracunajUkupanRacun() } KM`);
// Tuzla.provjeriDostupnostSobe('jednokrevetna')
// console.log(korisnik.usluge);
// console.log(korisnik.ukupanRacun());
// Tuzla.ispisiSveKorisnike()
// Tuzla.dodajKorisnika(Belma,2)



// console.log(Tuzla.dostupneSobe())
// jednokrevetna soba 20 KM
// dvokrevetna soba 40 KM
// apartman 60 KM
// Teretana 10 KM
// Kino 10 KM
// Restoran 20 KM
// Bazen 10 KM
// Sauna 10
// Tuzla.ubaciKorisnika(Amer)
