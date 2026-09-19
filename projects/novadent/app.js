/* =========================================================================
   NOVADENT — logika strony.
   Renderowanie sekcji z data.js, filtr cennika, walidacja formularza,
   baner cookie, menu mobilne i subtelne wejścia sekcji.
   ========================================================================= */
(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /** Ucieczka znaków HTML — dane wchodzą do innerHTML. */
  function esc(tekst) {
    return String(tekst)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ---------------------------------------------------------------------
     Ikony usług — rysowane ręcznie, bez zewnętrznych zestawów.
     --------------------------------------------------------------------- */
  const IKONY = {
    zab: '<path d="M12 5.4c-2.6 0-3.3-1.6-5.5-1.6C4.5 3.8 3.3 5.7 3.3 8.4c0 3.3 1.3 4.4 2 8.1.5 2.7 1 4.9 2.3 4.9s1.6-2.1 2.1-4.5c.4-1.6.8-2.2 2.3-2.2s1.9.6 2.3 2.2c.5 2.4.8 4.5 2.1 4.5s1.8-2.2 2.3-4.9c.7-3.7 2-4.8 2-8.1 0-2.7-1.2-4.6-3.2-4.6-2.2 0-2.9 1.6-5.5 1.6z"/>',
    mikroskop: '<path d="M9 18h10"/><path d="M6 21h14"/><path d="M11 18a6 6 0 0 0 5.6-8.1"/><path d="M8.6 4.7l-2 1.2 3.6 6.2 2-1.2z"/><path d="M10.6 10.9l1.7 3"/><path d="M7.4 2.9l1.2 1.8"/>',
    implant: '<path d="M12 2.6v7"/><path d="M9.2 5h5.6"/><path d="M9.2 7.6h5.6"/><path d="M12 9.6c-2.2 0-3.6 1.6-3.6 3.8 0 2.6 1.2 3.6 1.7 6.2.3 1.4.6 2.3 1.2 2.3s.7-1.2.7-2.6c0-1.4.3-2 .8-2s.8.6.8 2c0 1.4.1 2.6.7 2.6s.9-.9 1.2-2.3c.5-2.6 1.7-3.6 1.7-6.2 0-2.2-1.4-3.8-3.6-3.8z"/>',
    korona: '<path d="M4.4 9.2l3 2.6 2.9-4.4 2.9 4.4 3-2.6-1 8.6H5.4z"/><path d="M6.3 20.4h11.4"/>',
    nakladka: '<path d="M12 3.6c-4.4 0-7.6 2.6-7.6 6.2 0 4.6 2.6 7.4 4.4 9.4 1 1.1 2 1.6 3.2 1.6s2.2-.5 3.2-1.6c1.8-2 4.4-4.8 4.4-9.4 0-3.6-3.2-6.2-7.6-6.2z"/><path d="M7.4 10.2c3 1.4 6.2 1.4 9.2 0"/><path d="M12 3.8v6.9"/>',
    iskra: '<path d="M12 2.8l1.7 4.4 4.5 1.6-4.5 1.7-1.7 4.4-1.7-4.4-4.5-1.7 4.5-1.6z"/><path d="M18.4 15l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9z"/><path d="M5.6 14.4l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>',
    skalpel: '<path d="M4 20l5.6-5.6"/><path d="M9.8 14.6l7.4-10.2c.5-.7 1.6-.3 1.6.6v6.3c0 .6-.3 1.1-.8 1.4l-5.8 3.4z"/><path d="M12.2 16.1l2.1 2.1"/>',
    dziecko: '<circle cx="12" cy="8.2" r="4.4"/><path d="M10.4 7.6h.02"/><path d="M13.6 7.6h.02"/><path d="M10.6 9.8c.9.7 1.9.7 2.8 0"/><path d="M5.2 21.2c.6-3.7 3.4-5.8 6.8-5.8s6.2 2.1 6.8 5.8"/>'
  };

  const ikonaSVG = (nazwa) =>
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    (IKONY[nazwa] || IKONY.zab) + '</svg>';

  const nazwaKategorii = (id) => {
    const k = KATEGORIE.find((k) => k.id === id);
    return k ? k.nazwa : '';
  };

  /* ---------------------------------------------------------------------
     Usługi
     --------------------------------------------------------------------- */
  function renderUslugi() {
    const lista = $('#lista-uslug');
    if (!lista) return;
    lista.innerHTML = USLUGI.map((u) => `
      <li class="card reveal">
        <span class="card-ikona">${ikonaSVG(u.ikona)}</span>
        <h3>${esc(u.tytul)}</h3>
        <p>${esc(u.opis)}</p>
      </li>`).join('');
  }

  /* ---------------------------------------------------------------------
     Cennik z filtrem
     --------------------------------------------------------------------- */
  function renderCennik() {
    const box   = $('#filtry-cennika');
    const body  = $('#cennik-body');
    if (!box || !body) return;

    const filtry = [{ id: 'wszystkie', nazwa: 'Wszystkie' }].concat(KATEGORIE);
    box.innerHTML = filtry.map((f, i) => `
      <button class="filtr" type="button" data-kat="${esc(f.id)}"
              aria-pressed="${i === 0 ? 'true' : 'false'}">${esc(f.nazwa)}</button>`).join('');

    function pokaz(kat) {
      const wiersze = kat === 'wszystkie' ? CENNIK : CENNIK.filter((p) => p.kat === kat);
      body.innerHTML = wiersze.length
        ? wiersze.map((p) => `
            <tr>
              <td class="col-nazwa">${esc(p.nazwa)}</td>
              <td class="col-kat">${esc(nazwaKategorii(p.kat))}</td>
              <td class="col-cena">${esc(p.cena)}</td>
            </tr>`).join('')
        : '<tr><td colspan="3" class="pusto">Brak pozycji w tej kategorii.</td></tr>';
    }

    box.addEventListener('click', (e) => {
      const btn = e.target.closest('.filtr');
      if (!btn) return;
      $$('.filtr', box).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      pokaz(btn.dataset.kat);
    });

    pokaz('wszystkie');
  }

  /* ---------------------------------------------------------------------
     Zespół
     --------------------------------------------------------------------- */
  function renderZespol() {
    const lista = $('#lista-zespolu');
    if (!lista) return;
    lista.innerHTML = ZESPOL.map((o) => `
      <li class="osoba reveal">
        <img src="${esc(o.foto)}" width="900" height="900" loading="lazy" alt="${esc(o.alt)}">
        <div class="osoba-tresc">
          <h3>${esc(o.imie)}</h3>
          <p class="rola">${esc(o.rola)}</p>
          <p class="opis">${esc(o.zdanie)}</p>
        </div>
      </li>`).join('');
  }

  /* ---------------------------------------------------------------------
     Opinie
     --------------------------------------------------------------------- */
  const GWIAZDKA = '<path d="M12 2.6l2.9 6 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5L2.6 9.5l6.5-.9z"/>';

  function gwiazdki(ocena) {
    let html = `<div class="gwiazdki" role="img" aria-label="Ocena ${ocena} na 5">`;
    for (let i = 1; i <= 5; i++) {
      html += `<svg viewBox="0 0 24 24" class="${i <= ocena ? '' : 'pusta'}" aria-hidden="true" focusable="false">${GWIAZDKA}</svg>`;
    }
    return html + '</div>';
  }

  function renderOpinie() {
    const lista = $('#lista-opinii');
    if (!lista) return;
    lista.innerHTML = OPINIE.map((o) => `
      <li>
        <figure class="opinia reveal">
          ${gwiazdki(o.ocena)}
          <blockquote>${esc(o.tresc)}</blockquote>
          <figcaption>${esc(o.autor)}</figcaption>
        </figure>
      </li>`).join('');
  }

  /* ---------------------------------------------------------------------
     Lista usług w formularzu
     --------------------------------------------------------------------- */
  function wypelnijSelectUslug() {
    const select = $('#usluga');
    if (!select) return;
    const opcje = USLUGI.map((u) => `<option value="${esc(u.tytul)}">${esc(u.tytul)}</option>`).join('');
    select.insertAdjacentHTML('beforeend', opcje +
      '<option value="Nie wiem, proszę o poradę">Nie wiem, proszę o poradę</option>');
  }

  /* ---------------------------------------------------------------------
     Walidacja formularza — komunikaty pod polem, bez alertów
     --------------------------------------------------------------------- */
  function obsluzFormularz() {
    const form = $('.formularz');
    if (!form) return;
    const status = $('#form-status');

    const REGULY = {
      imie: (v) => {
        if (!v.trim()) return 'Podaj imię, żebyśmy wiedzieli, jak się do Ciebie zwracać.';
        if (v.trim().length < 2) return 'Imię jest za krótkie.';
        return '';
      },
      kontakt: (v) => {
        const t = v.trim();
        if (!t) return 'Zostaw telefon albo e-mail — inaczej nie oddzwonimy.';
        const cyfry = t.replace(/[^0-9]/g, '');
        const email = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(t);
        if (email) return '';
        if (cyfry.length >= 9 && /^[0-9+\s()-]+$/.test(t)) return '';
        return 'To nie wygląda na numer telefonu ani adres e-mail.';
      },
      usluga: (v) => (v ? '' : 'Wybierz, czego ma dotyczyć wizyta.'),
      termin: (v) => (v ? '' : 'Wybierz porę dnia, która Ci pasuje.'),
      wiadomosc: (v) => (v.length > 1000 ? 'Wiadomość jest za długa — zmieść się w 1000 znakach.' : '')
    };

    const pola = {
      imie: $('#imie'),
      kontakt: $('#kontakt-do'),
      usluga: $('#usluga'),
      termin: $('#termin'),
      wiadomosc: $('#wiadomosc')
    };

    function sprawdz(klucz) {
      const pole = pola[klucz];
      const cel  = $(`.blad[data-dla="${klucz}"]`);
      if (!pole || !cel) return true;
      const komunikat = REGULY[klucz](pole.value);
      cel.textContent = komunikat;
      pole.setAttribute('aria-invalid', komunikat ? 'true' : 'false');
      return !komunikat;
    }

    Object.keys(pola).forEach((klucz) => {
      const pole = pola[klucz];
      if (!pole) return;
      pole.addEventListener('blur', () => sprawdz(klucz));
      pole.addEventListener('input', () => {
        if (pole.getAttribute('aria-invalid') === 'true') sprawdz(klucz);
      });
      pole.addEventListener('change', () => {
        if (pole.tagName === 'SELECT') sprawdz(klucz);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const klucze = Object.keys(pola);
      const wyniki = klucze.map(sprawdz);
      const pierwszyBlad = klucze[wyniki.indexOf(false)];

      if (pierwszyBlad) {
        status.textContent = '';
        pola[pierwszyBlad].focus();
        return;
      }

      status.textContent = 'Wysyłamy zgłoszenie…';

      /* Netlify Forms przyjmuje zwykły POST na adres strony. */
      const dane = new URLSearchParams(new FormData(form)).toString();
      fetch(form.getAttribute('action') || window.location.pathname, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: dane
      })
        .then((odp) => {
          if (!odp.ok) throw new Error('Serwer odrzucił zgłoszenie');
          form.reset();
          $$('.blad', form).forEach((b) => { b.textContent = ''; });
          status.textContent = 'Dziękujemy — zgłoszenie dotarło. Oddzwonimy w godzinach pracy recepcji.';
        })
        .catch(() => {
          status.textContent = 'Nie udało się wysłać formularza. Zadzwoń: 71 340 22 15.';
        });
    });
  }

  /* ---------------------------------------------------------------------
     Menu mobilne
     --------------------------------------------------------------------- */
  function obsluzMenu() {
    const przycisk = $('#nav-toggle');
    const nav = $('#nav-main');
    if (!przycisk || !nav) return;

    const zamknij = () => {
      nav.classList.remove('otwarte');
      przycisk.setAttribute('aria-expanded', 'false');
    };

    przycisk.addEventListener('click', () => {
      const otwarte = nav.classList.toggle('otwarte');
      przycisk.setAttribute('aria-expanded', String(otwarte));
    });

    nav.addEventListener('click', (e) => {
      if (e.target.closest('a')) zamknij();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('otwarte')) {
        zamknij();
        przycisk.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) zamknij();
    });
  }

  /* ---------------------------------------------------------------------
     Baner cookie — wybór zapamiętany w localStorage
     --------------------------------------------------------------------- */
  const KLUCZ_COOKIE = 'nd-cookies-choice';

  function obsluzCookies() {
    const baner = $('#cookies');
    if (!baner) return;

    let wybor = null;
    try {
      wybor = window.localStorage.getItem(KLUCZ_COOKIE);
    } catch (e) {
      wybor = null;                       // tryb prywatny lub zablokowane dane
    }
    if (wybor) return;

    baner.hidden = false;

    function zapisz(wartosc) {
      try {
        window.localStorage.setItem(KLUCZ_COOKIE, wartosc);
      } catch (e) {
        /* brak zapisu nie może psuć strony — po prostu chowamy baner */
      }
      baner.hidden = true;
    }

    $('#cookies-wszystkie').addEventListener('click', () => zapisz('wszystkie'));
    $('#cookies-niezbedne').addEventListener('click', () => zapisz('niezbedne'));
  }

  /* ---------------------------------------------------------------------
     Delikatne wejścia sekcji
     --------------------------------------------------------------------- */
  function obsluzAnimacje() {
    const lubiRuch = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elementy = $$('.section-head, .card, .osoba, .opinia, .kroki li, .faq details, .formularz-box, .dojazd, .trust-item');

    if (!lubiRuch || !('IntersectionObserver' in window)) {
      elementy.forEach((el) => el.classList.remove('reveal'));
      return;
    }

    elementy.forEach((el) => el.classList.add('reveal'));

    const obserwator = new IntersectionObserver((wpisy) => {
      wpisy.forEach((wpis) => {
        if (!wpis.isIntersecting) return;
        wpis.target.classList.add('widoczne');
        obserwator.unobserve(wpis.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

    elementy.forEach((el) => obserwator.observe(el));
  }

  /* --------------------------------------------------------------------- */
  function start() {
    renderUslugi();
    renderCennik();
    renderZespol();
    renderOpinie();
    wypelnijSelectUslug();
    obsluzFormularz();
    obsluzMenu();
    obsluzCookies();
    obsluzAnimacje();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
