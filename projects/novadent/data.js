/* =========================================================================
   NOVADENT — dane treściowe strony.
   Wszystko, co się zmienia najczęściej (usługi, cennik, zespół, opinie),
   trzymamy tutaj. app.js tylko to renderuje.
   ========================================================================= */

/* Kategorie wspólne dla sekcji „Usługi" i filtra w cenniku. */
const KATEGORIE = [
  { id: 'zachowawcza',  nazwa: 'Stomatologia zachowawcza' },
  { id: 'endodoncja',   nazwa: 'Leczenie kanałowe' },
  { id: 'implanty',     nazwa: 'Implanty' },
  { id: 'protetyka',    nazwa: 'Protetyka' },
  { id: 'ortodoncja',   nazwa: 'Ortodoncja' },
  { id: 'higienizacja', nazwa: 'Higienizacja i wybielanie' },
  { id: 'chirurgia',    nazwa: 'Chirurgia' },
  { id: 'dzieci',       nazwa: 'Stomatologia dziecięca' }
];

const USLUGI = [
  {
    kat: 'zachowawcza',
    ikona: 'zab',
    tytul: 'Stomatologia zachowawcza',
    opis: 'Leczenie próchnicy wypełnieniami kompozytowymi dobieranymi kolorem do sąsiednich zębów. Znieczulenie komputerowe podajemy standardowo, także przy małych ubytkach.'
  },
  {
    kat: 'endodoncja',
    ikona: 'mikroskop',
    tytul: 'Leczenie kanałowe pod mikroskopem',
    opis: 'Mikroskop pokazuje kanały, których nie widać gołym okiem — dlatego ząb częściej udaje się uratować niż usunąć. Po leczeniu robimy zdjęcie kontrolne i pokazujemy je na monitorze.'
  },
  {
    kat: 'implanty',
    ikona: 'implant',
    tytul: 'Implanty',
    opis: 'Odbudowa brakujących zębów na wszczepach tytanowych. Planujemy na podstawie tomografii, koronę zakładamy po wygojeniu kości, zwykle po trzech–czterech miesiącach.'
  },
  {
    kat: 'protetyka',
    ikona: 'korona',
    tytul: 'Protetyka',
    opis: 'Korony pełnoceramiczne, licówki, mosty i protezy. Współpracujemy z laboratorium na Krzykach, więc poprawki wracają do nas w jeden dzień.'
  },
  {
    kat: 'ortodoncja',
    ikona: 'nakladka',
    tytul: 'Ortodoncja — nakładki i aparaty',
    opis: 'Nakładki przezroczyste i aparaty stałe dla dorosłych i nastolatków. Na konsultacji pokazujemy symulację ustawienia zębów, zanim zdecydujesz się na leczenie.'
  },
  {
    kat: 'higienizacja',
    ikona: 'iskra',
    tytul: 'Higienizacja i wybielanie',
    opis: 'Skaling, piaskowanie i fluoryzacja w jednej wizycie — około godziny. Wybielanie proponujemy dopiero po wyleczeniu ubytków, bo inaczej boli i nie trzyma koloru.'
  },
  {
    kat: 'chirurgia',
    ikona: 'skalpel',
    tytul: 'Chirurgia stomatologiczna',
    opis: 'Usuwanie zębów, w tym ósemek i zębów zatrzymanych. Dzień po zabiegu dzwonimy i pytamy, jak minęła noc — bez dopłat za kontrolę.'
  },
  {
    kat: 'dzieci',
    ikona: 'dziecko',
    tytul: 'Stomatologia dziecięca',
    opis: 'Pierwsza wizyta to samo oswojenie z gabinetem: liczenie zębów, przejażdżka fotelem, żadnego leczenia na siłę. Rodzic zostaje w gabinecie przez cały czas.'
  }
];

/* Cennik. Ceny w złotych, część orientacyjna („od"). */
const CENNIK = [
  { kat: 'zachowawcza',  nazwa: 'Przegląd z planem leczenia',                 cena: '0 zł' },
  { kat: 'zachowawcza',  nazwa: 'Wypełnienie kompozytowe',                    cena: '250–450 zł' },
  { kat: 'zachowawcza',  nazwa: 'Odbudowa zęba po leczeniu kanałowym',        cena: 'od 550 zł' },
  { kat: 'zachowawcza',  nazwa: 'Znieczulenie komputerowe',                   cena: 'w cenie zabiegu' },
  { kat: 'zachowawcza',  nazwa: 'Wizyta bólowa (doraźna pomoc)',              cena: '200 zł' },

  { kat: 'endodoncja',   nazwa: 'Leczenie kanałowe pod mikroskopem — 1 kanał', cena: 'od 900 zł' },
  { kat: 'endodoncja',   nazwa: 'Leczenie kanałowe pod mikroskopem — 2 kanały', cena: 'od 1 200 zł' },
  { kat: 'endodoncja',   nazwa: 'Leczenie kanałowe pod mikroskopem — 3 kanały', cena: 'od 1 500 zł' },
  { kat: 'endodoncja',   nazwa: 'Powtórne leczenie kanałowe',                 cena: 'od 1 800 zł' },
  { kat: 'endodoncja',   nazwa: 'Zdjęcie punktowe RTG',                       cena: '60 zł' },

  { kat: 'implanty',     nazwa: 'Konsultacja implantologiczna z tomografią',  cena: '250 zł' },
  { kat: 'implanty',     nazwa: 'Wszczepienie implantu',                      cena: 'od 2 800 zł' },
  { kat: 'implanty',     nazwa: 'Implant z koroną (komplet)',                 cena: 'od 4 500 zł' },
  { kat: 'implanty',     nazwa: 'Podniesienie dna zatoki',                    cena: 'od 2 000 zł' },
  { kat: 'implanty',     nazwa: 'Pantomogram',                                cena: '130 zł' },

  { kat: 'protetyka',    nazwa: 'Korona pełnoceramiczna',                     cena: 'od 1 800 zł' },
  { kat: 'protetyka',    nazwa: 'Licówka ceramiczna',                         cena: 'od 1 900 zł' },
  { kat: 'protetyka',    nazwa: 'Proteza akrylowa',                           cena: 'od 1 600 zł' },
  { kat: 'protetyka',    nazwa: 'Proteza szkieletowa',                        cena: 'od 2 800 zł' },
  { kat: 'protetyka',    nazwa: 'Naprawa protezy',                            cena: 'od 250 zł' },

  { kat: 'ortodoncja',   nazwa: 'Konsultacja ortodontyczna ze skanem',        cena: '150 zł' },
  { kat: 'ortodoncja',   nazwa: 'Nakładki ortodontyczne — pełne leczenie',    cena: 'od 9 000 zł' },
  { kat: 'ortodoncja',   nazwa: 'Aparat stały metalowy — jeden łuk',          cena: 'od 2 200 zł' },
  { kat: 'ortodoncja',   nazwa: 'Aparat samoligaturujący — jeden łuk',        cena: 'od 3 200 zł' },
  { kat: 'ortodoncja',   nazwa: 'Wizyta kontrolna w trakcie leczenia',        cena: '180 zł' },

  { kat: 'higienizacja', nazwa: 'Higienizacja: skaling, piaskowanie, fluoryzacja', cena: '350 zł' },
  { kat: 'higienizacja', nazwa: 'Wybielanie nakładkowe (nakładki + żel)',     cena: '900 zł' },
  { kat: 'higienizacja', nazwa: 'Wybielanie lampą w gabinecie',               cena: '1 400 zł' },
  { kat: 'higienizacja', nazwa: 'Usunięcie przebarwień po paleniu',           cena: 'od 400 zł' },

  { kat: 'chirurgia',    nazwa: 'Usunięcie zęba',                             cena: 'od 300 zł' },
  { kat: 'chirurgia',    nazwa: 'Usunięcie ósemki',                           cena: 'od 600 zł' },
  { kat: 'chirurgia',    nazwa: 'Chirurgiczne usunięcie zęba zatrzymanego',   cena: 'od 900 zł' },
  { kat: 'chirurgia',    nazwa: 'Resekcja wierzchołka korzenia',              cena: 'od 1 200 zł' },

  { kat: 'dzieci',       nazwa: 'Wizyta adaptacyjna',                         cena: '0 zł' },
  { kat: 'dzieci',       nazwa: 'Lakowanie bruzd (jeden ząb)',                cena: '180 zł' },
  { kat: 'dzieci',       nazwa: 'Lakierowanie całego uzębienia',              cena: '150 zł' },
  { kat: 'dzieci',       nazwa: 'Wypełnienie w zębie mlecznym',               cena: '220 zł' },
  { kat: 'dzieci',       nazwa: 'Leczenie kanałowe zęba mlecznego',           cena: 'od 350 zł' }
];

const ZESPOL = [
  {
    imie: 'lek. dent. Marta Kowalska',
    rola: 'Stomatologia zachowawcza i leczenie kanałowe',
    zdanie: 'Prowadzi gabinet od 2011 roku. Leczy kanałowo pod mikroskopem i najczęściej to ona przyjmuje pacjentów, którzy od lat odkładali wizytę.',
    foto: 'assets/img/zespol-kowalska.jpg',
    alt: 'Portret lekarki dentystki Marty Kowalskiej w ciemnozielonym fartuchu'
  },
  {
    imie: 'lek. dent. Paweł Nowak',
    rola: 'Implantologia i chirurgia stomatologiczna',
    zdanie: 'Wszczepia implanty i usuwa zęby zatrzymane. Przed zabiegiem tłumaczy przebieg krok po kroku na zdjęciu z tomografii.',
    foto: 'assets/img/zespol-nowak.jpg',
    alt: 'Portret lekarza dentysty Pawła Nowaka w ciemnozielonym fartuchu'
  },
  {
    imie: 'lek. dent. Anna Wiśniewska',
    rola: 'Ortodoncja',
    zdanie: 'Zajmuje się nakładkami przezroczystymi i aparatami stałymi. Pokazuje symulację efektu, zanim pacjent zdecyduje o leczeniu.',
    foto: 'assets/img/zespol-wisniewska.jpg',
    alt: 'Portret lekarki dentystki Anny Wiśniewskiej w okularach i ciemnozielonym fartuchu'
  },
  {
    imie: 'Karolina Zając',
    rola: 'Higienistka, opieka nad najmłodszymi',
    zdanie: 'Robi higienizację i prowadzi wizyty adaptacyjne dzieci. Uczy mycia zębów na modelu, a nie na ulotce.',
    foto: 'assets/img/zespol-zajac.jpg',
    alt: 'Portret higienistki Karoliny Zając w ciemnozielonym fartuchu'
  }
];

const OPINIE = [
  {
    autor: 'Magdalena K.',
    ocena: 5,
    tresc: 'Bałam się dentysty od dziecka i przez osiem lat nie byłam na przeglądzie. Pani doktor najpierw wszystko pokazała na zdjęciu, dopiero potem zaczęła leczyć. Wyszłam z planem na trzy wizyty i bez ściśniętego żołądka.'
  },
  {
    autor: 'Tomasz W.',
    ocena: 5,
    tresc: 'Implant w miejscu ósemki, którą usunięto mi lata temu. Wycena była podana na piśmie przed pierwszym zabiegiem i na końcu zgodziła się co do złotówki. Korona siedzi, nic nie uwiera.'
  },
  {
    autor: 'Anna P.',
    ocena: 5,
    tresc: 'Syn ma sześć lat i po poprzedniej klinice bał się nawet wejść do budynku. Tutaj pierwsza wizyta to było liczenie zębów i jazda fotelem. Za drugim razem sam wszedł do gabinetu.'
  },
  {
    autor: 'Krzysztof M.',
    ocena: 4,
    tresc: 'Leczenie kanałowe pod mikroskopem, dwie wizyty po godzinie. Ząb, który dwóch dentystów kazało usunąć, stoi już drugi rok. Jedyny minus to parking, który w piątek po 17 bywa zapchany.'
  },
  {
    autor: 'Joanna S.',
    ocena: 5,
    tresc: 'Higienizacja bez pośpiechu i bez tego nieprzyjemnego skrobania na siłę. Przy okazji dostałam konkretną informację, które zęby myję za mocno — nikt mi wcześniej tego nie powiedział.'
  },
  {
    autor: 'Rafał D.',
    ocena: 5,
    tresc: 'Zadzwoniłem w sobotę rano z pękniętym zębem, przyjęli mnie tego samego dnia przed zamknięciem. Tymczasowe wypełnienie dotrwało do wtorku, na spokojnie zrobili resztę.'
  }
];
