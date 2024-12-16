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

    promjeniSobu(korisnik, hostel, novaSoba) {
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
    // get prikaziKorisnikovPassword(){ return this.#dodjeliPasswordKorisniku }
    // get prikaziRacun(){  return this.#izdajRacunKorisniku;} 
    // get spisakKorisnika(){return this.#sviKorisnici}
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

// admin.dodjeliSobu(Amer, Tuzla, 2)
// console.log(Amer.soba);
// console.log(Amer.vrijemePrijave);
// admin.dodjeliKorisnickoImeKorisniku(Amer)
// admin.dodjeliKorisnickoImeKorisniku(Belma)
// console.log(Amer.korisnickoIme)
// console.log(Belma.korisnickoIme)
// admin.dodjeliPasswordKorisniku(Amer)
// admin.dodjeliPasswordKorisniku(Belma)
// console.log(Amer.password)
// console.log(Belma.password)

