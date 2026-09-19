# NOVADENT — demo strony wizytówki kliniki stomatologicznej

Statyczna strona jednostronicowa (HTML + CSS + vanilla JS), bez frameworków,
bundlera i zasobów z CDN. Wszystkie obrazy leżą w `assets/img/` i działają offline.

## Struktura

```
index.html      – cała treść i znaczniki (formularz Netlify, JSON-LD, Open Graph)
styles.css      – style, tokeny w :root, mobile-first (breakpointy 700px i 1024px)
data.js         – usługi, cennik, zespół, opinie
app.js          – render sekcji, filtr cennika, walidacja formularza, cookie, animacje
assets/img/     – ilustracje (hero, recepcja, portrety zespołu, og-image)
```

## Wdrożenie na Netlify

Przeciągnij katalog `projects/novadent/` na app.netlify.com/drop albo ustaw
w ustawieniach build: *publish directory* = `projects/novadent`, bez komendy build.

Formularz „Umów wizytę" korzysta z Netlify Forms (`data-netlify="true"`,
honeypot `bot-field`). Zgłoszenia pojawiają się w panelu Netlify → Forms →
`rezerwacja` po pierwszym deployu.

## Uwaga

Dane kliniki (nazwa, adres, telefon, NIP, nazwiska, opinie) są fikcyjne —
to projekt demonstracyjny do portfolio.
