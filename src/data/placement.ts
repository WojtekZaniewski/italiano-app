import type { PlacementQuestion } from '../types';

export const placementQuestions: PlacementQuestion[] = [
  // ============================================================
  // A1 — 10 questions (5 vocab, 3 grammar, 2 translation) — 1 point each
  // ============================================================

  // A1 Vocab (5)
  {
    id: 'a1-v01',
    type: 'vocab',
    level: 'A1',
    question: 'Co oznacza włoskie słowo "acqua"?',
    options: ['Ogień', 'Woda', 'Ziemia', 'Powietrze'],
    correctIndex: 1,
    points: 1,
  },
  {
    id: 'a1-v02',
    type: 'vocab',
    level: 'A1',
    question: 'Jak po włosku powiemy "dom"?',
    options: ['Porta', 'Finestra', 'Casa', 'Strada'],
    correctIndex: 2,
    points: 1,
  },
  {
    id: 'a1-v03',
    type: 'vocab',
    level: 'A1',
    question: 'Co oznacza "grazie"?',
    options: ['Proszę', 'Przepraszam', 'Dziękuję', 'Cześć'],
    correctIndex: 2,
    points: 1,
  },
  {
    id: 'a1-v04',
    type: 'vocab',
    level: 'A1',
    question: 'Które słowo oznacza "chleb"?',
    options: ['Latte', 'Pane', 'Vino', 'Formaggio'],
    correctIndex: 1,
    points: 1,
  },
  {
    id: 'a1-v05',
    type: 'vocab',
    level: 'A1',
    question: 'Co oznacza "buongiorno"?',
    options: ['Dobranoc', 'Dzień dobry', 'Do widzenia', 'Dobry wieczór'],
    correctIndex: 1,
    points: 1,
  },

  // A1 Grammar (3)
  {
    id: 'a1-g01',
    type: 'grammar',
    level: 'A1',
    question: 'Uzupełnij: "Io ___ italiano." (essere)',
    options: ['è', 'sei', 'sono', 'siamo'],
    correctIndex: 2,
    points: 1,
  },
  {
    id: 'a1-g02',
    type: 'grammar',
    level: 'A1',
    question: 'Uzupełnij: "Maria ___ una ragazza simpatica." (essere)',
    options: ['sono', 'è', 'sei', 'siete'],
    correctIndex: 1,
    points: 1,
  },
  {
    id: 'a1-g03',
    type: 'grammar',
    level: 'A1',
    question: 'Który rodzajnik jest poprawny? "___ libro"',
    options: ['La', 'Il', 'Le', 'Lo'],
    correctIndex: 1,
    points: 1,
  },

  // A1 Translation (2)
  {
    id: 'a1-t01',
    type: 'translation',
    level: 'A1',
    question: 'Przetłumacz na włoski: "Mam na imię Anna."',
    options: ['Ho nome Anna.', 'Io Anna.', 'Mi chiamo Anna.', 'Sono nome Anna.'],
    correctIndex: 2,
    points: 1,
  },
  {
    id: 'a1-t02',
    type: 'translation',
    level: 'A1',
    question: 'Przetłumacz na polski: "Ho venti anni."',
    options: ['Mam dwadzieścia lat.', 'Jest dwudziesta.', 'Mam dwadzieścia euro.', 'Są dwadzieścia dni.'],
    correctIndex: 0,
    points: 1,
  },

  // ============================================================
  // A2 — 10 questions (4 vocab, 4 grammar, 2 translation) — 2 points each
  // ============================================================

  // A2 Vocab (4)
  {
    id: 'a2-v01',
    type: 'vocab',
    level: 'A2',
    question: 'Co oznacza "lavoro"?',
    options: ['Szkoła', 'Praca', 'Zabawa', 'Podróż'],
    correctIndex: 1,
    points: 2,
  },
  {
    id: 'a2-v02',
    type: 'vocab',
    level: 'A2',
    question: 'Jak po włosku powiemy "lekarz"?',
    options: ['Avvocato', 'Insegnante', 'Medico', 'Cuoco'],
    correctIndex: 2,
    points: 2,
  },
  {
    id: 'a2-v03',
    type: 'vocab',
    level: 'A2',
    question: 'Co oznacza "prenotazione"?',
    options: ['Prezentacja', 'Rezerwacja', 'Promocja', 'Przesyłka'],
    correctIndex: 1,
    points: 2,
  },
  {
    id: 'a2-v04',
    type: 'vocab',
    level: 'A2',
    question: 'Które słowo oznacza "stacja kolejowa"?',
    options: ['Aeroporto', 'Fermata', 'Stazione', 'Ufficio'],
    correctIndex: 2,
    points: 2,
  },

  // A2 Grammar (4)
  {
    id: 'a2-g01',
    type: 'grammar',
    level: 'A2',
    question: 'Uzupełnij: "Ieri io ___ al cinema." (andare, passato prossimo)',
    options: ['ho andato', 'sono andato', 'andavo', 'vado'],
    correctIndex: 1,
    points: 2,
  },
  {
    id: 'a2-g02',
    type: 'grammar',
    level: 'A2',
    question: 'Uzupełnij: "Noi ___ la pizza ogni venerdì." (mangiare)',
    options: ['mangia', 'mangiate', 'mangiamo', 'mangiano'],
    correctIndex: 2,
    points: 2,
  },
  {
    id: 'a2-g03',
    type: 'grammar',
    level: 'A2',
    question: 'Który przyimek jest poprawny? "Vado ___ scuola."',
    options: ['in', 'a', 'di', 'su'],
    correctIndex: 1,
    points: 2,
  },
  {
    id: 'a2-g04',
    type: 'grammar',
    level: 'A2',
    question: 'Uzupełnij: "Le ragazze ___ molto brave." (essere)',
    options: ['è', 'sono', 'siamo', 'sei'],
    correctIndex: 1,
    points: 2,
  },

  // A2 Translation (2)
  {
    id: 'a2-t01',
    type: 'translation',
    level: 'A2',
    question: 'Przetłumacz na włoski: "Chciałbym kawę, proszę."',
    options: [
      'Voglio caffè, grazie.',
      'Vorrei un caffè, per favore.',
      'Prendo caffè, prego.',
      'Mi piace un caffè, per favore.',
    ],
    correctIndex: 1,
    points: 2,
  },
  {
    id: 'a2-t02',
    type: 'translation',
    level: 'A2',
    question: 'Przetłumacz na polski: "Dov\'è la fermata dell\'autobus?"',
    options: [
      'Gdzie jest dworzec autobusowy?',
      'Gdzie jest parking?',
      'Gdzie jest przystanek autobusowy?',
      'Gdzie jest stacja metra?',
    ],
    correctIndex: 2,
    points: 2,
  },

  // ============================================================
  // B1 — 10 questions (3 vocab, 4 grammar, 3 translation) — 3 points each
  // ============================================================

  // B1 Vocab (3)
  {
    id: 'b1-v01',
    type: 'vocab',
    level: 'B1',
    question: 'Co oznacza "tuttavia"?',
    options: ['Zawsze', 'Jednakże', 'Również', 'Następnie'],
    correctIndex: 1,
    points: 3,
  },
  {
    id: 'b1-v02',
    type: 'vocab',
    level: 'B1',
    question: 'Jak po włosku powiemy "doświadczenie zawodowe"?',
    options: [
      'Esperimento lavorativo',
      'Esperienza professionale',
      'Esplorazione lavorativa',
      'Espressione professionale',
    ],
    correctIndex: 1,
    points: 3,
  },
  {
    id: 'b1-v03',
    type: 'vocab',
    level: 'B1',
    question: 'Co oznacza "il colloquio di lavoro"?',
    options: ['Umowa o pracę', 'Rozmowa kwalifikacyjna', 'Koleżanka z pracy', 'Spotkanie firmowe'],
    correctIndex: 1,
    points: 3,
  },

  // B1 Grammar (4)
  {
    id: 'b1-g01',
    type: 'grammar',
    level: 'B1',
    question: 'Uzupełnij: "Se piove, ___ a casa." (restare)',
    options: ['resto', 'restavo', 'resterò', 'resterei'],
    correctIndex: 0,
    points: 3,
  },
  {
    id: 'b1-g02',
    type: 'grammar',
    level: 'B1',
    question: 'Uzupełnij: "Quando ero piccolo, ___ sempre al parco." (giocare, imperfetto)',
    options: ['giocavo', 'ho giocato', 'giocherò', 'giocai'],
    correctIndex: 0,
    points: 3,
  },
  {
    id: 'b1-g03',
    type: 'grammar',
    level: 'B1',
    question: 'Uzupełnij: "Gli ho detto ___ venire domani."',
    options: ['a', 'di', 'che', 'per'],
    correctIndex: 1,
    points: 3,
  },
  {
    id: 'b1-g04',
    type: 'grammar',
    level: 'B1',
    question: 'Wskaż poprawne zdanie:',
    options: [
      'Ieri sono andato a il cinema.',
      'Ieri sono andato al cinema.',
      'Ieri ho andato al cinema.',
      'Ieri andato sono al cinema.',
    ],
    correctIndex: 1,
    points: 3,
  },

  // B1 Translation (3)
  {
    id: 'b1-t01',
    type: 'translation',
    level: 'B1',
    question: 'Przetłumacz na włoski: "Kiedy byłem dzieckiem, mieszkałem w Rzymie."',
    options: [
      'Quando sono stato bambino, ho vissuto a Roma.',
      'Quando ero bambino, vivevo a Roma.',
      'Quando fui bambino, vissi a Roma.',
      'Da bambino, ho vivuto a Roma.',
    ],
    correctIndex: 1,
    points: 3,
  },
  {
    id: 'b1-t02',
    type: 'translation',
    level: 'B1',
    question: 'Przetłumacz na polski: "Mi piacerebbe viaggiare in Italia quest\'estate."',
    options: [
      'Lubię podróżować po Włoszech latem.',
      'Podróżowałem po Włoszech tego lata.',
      'Chciałbym/Chciałabym podróżować po Włoszech tego lata.',
      'Będę podróżował po Włoszech tego lata.',
    ],
    correctIndex: 2,
    points: 3,
  },
  {
    id: 'b1-t03',
    type: 'translation',
    level: 'B1',
    question: 'Przetłumacz na włoski: "Musisz zadzwonić do lekarza."',
    options: [
      'Puoi chiamare il medico.',
      'Devi chiamare il medico.',
      'Vuoi chiamare il medico.',
      'Sai chiamare il medico.',
    ],
    correctIndex: 1,
    points: 3,
  },

  // ============================================================
  // B2 — 10 questions (3 vocab, 4 grammar, 3 translation) — 4 points each
  // ============================================================

  // B2 Vocab (3)
  {
    id: 'b2-v01',
    type: 'vocab',
    level: 'B2',
    question: 'Co oznacza "sfruttare"?',
    options: ['Sfrustrować', 'Wykorzystywać', 'Frustrować się', 'Oszukiwać'],
    correctIndex: 1,
    points: 4,
  },
  {
    id: 'b2-v02',
    type: 'vocab',
    level: 'B2',
    question: 'Jak po włosku powiemy "pomimo tego, że"?',
    options: ['Perché', 'Anche se', 'Nonostante', 'Siccome'],
    correctIndex: 2,
    points: 4,
  },
  {
    id: 'b2-v03',
    type: 'vocab',
    level: 'B2',
    question: 'Co oznacza "il capoluogo"?',
    options: ['Kapitał', 'Stolica regionu', 'Kapitan', 'Kapelan'],
    correctIndex: 1,
    points: 4,
  },

  // B2 Grammar (4)
  {
    id: 'b2-g01',
    type: 'grammar',
    level: 'B2',
    question: 'Uzupełnij: "Penso che lui ___ ragione." (avere, congiuntivo presente)',
    options: ['ha', 'abbia', 'avrebbe', 'aveva'],
    correctIndex: 1,
    points: 4,
  },
  {
    id: 'b2-g02',
    type: 'grammar',
    level: 'B2',
    question: 'Uzupełnij: "Se avessi più tempo, ___ di più." (leggere, condizionale)',
    options: ['leggo', 'leggevo', 'leggerei', 'legga'],
    correctIndex: 2,
    points: 4,
  },
  {
    id: 'b2-g03',
    type: 'grammar',
    level: 'B2',
    question: 'Uzupełnij: "Nonostante ___ stanco, è andato a lavorare." (essere, congiuntivo)',
    options: ['è', 'era', 'fosse', 'sia'],
    correctIndex: 2,
    points: 4,
  },
  {
    id: 'b2-g04',
    type: 'grammar',
    level: 'B2',
    question: 'Wskaż zdanie z poprawnym użyciem zaimka "ne":',
    options: [
      'Ne ho comprato tre.',
      'Ho comprato ne tre.',
      'Ho ne comprato tre.',
      'Tre ne ho comprato.',
    ],
    correctIndex: 0,
    points: 4,
  },

  // B2 Translation (3)
  {
    id: 'b2-t01',
    type: 'translation',
    level: 'B2',
    question: 'Przetłumacz na włoski: "Gdybym wiedział wcześniej, powiedziałbym ci."',
    options: [
      'Se sapevo prima, ti dicevo.',
      'Se avessi saputo prima, te lo avrei detto.',
      'Se sapessi prima, te lo direi.',
      'Se ho saputo prima, ti ho detto.',
    ],
    correctIndex: 1,
    points: 4,
  },
  {
    id: 'b2-t02',
    type: 'translation',
    level: 'B2',
    question: 'Przetłumacz na polski: "Bisogna che tu faccia attenzione."',
    options: [
      'Musisz być ostrożny.',
      'Trzeba, żebyś uważał.',
      'Bądź ostrożny.',
      'Powinieneś uważać.',
    ],
    correctIndex: 1,
    points: 4,
  },
  {
    id: 'b2-t03',
    type: 'translation',
    level: 'B2',
    question: 'Przetłumacz na włoski: "Ta książka została napisana w XIX wieku."',
    options: [
      'Questo libro si ha scritto nel XIX secolo.',
      'Questo libro è stato scritto nel XIX secolo.',
      'Questo libro ha scritto nel XIX secolo.',
      'Questo libro fu scrivendo nel XIX secolo.',
    ],
    correctIndex: 1,
    points: 4,
  },

  // ============================================================
  // C1 — 5 questions (2 vocab, 2 grammar, 1 translation) — 5 points each
  // ============================================================

  // C1 Vocab (2)
  {
    id: 'c1-v01',
    type: 'vocab',
    level: 'C1',
    question: 'Co oznacza "caparbio"?',
    options: ['Kapryśny', 'Uparty', 'Zdolny', 'Kapitalny'],
    correctIndex: 1,
    points: 5,
  },
  {
    id: 'c1-v02',
    type: 'vocab',
    level: 'C1',
    question: 'Jak po włosku powiemy "pogodzić się z czymś" (zaakceptować)?',
    options: ['Raccogliersi', 'Rassegnarsi', 'Raccomandarsi', 'Raddoppiarsi'],
    correctIndex: 1,
    points: 5,
  },

  // C1 Grammar (2)
  {
    id: 'c1-g01',
    type: 'grammar',
    level: 'C1',
    question: 'Uzupełnij: "Qualora ___ problemi, non esiti a contattarci." (esserci, congiuntivo)',
    options: ['ci sono', 'ci fossero', 'ci sarebbero', 'ci siano'],
    correctIndex: 1,
    points: 5,
  },
  {
    id: 'c1-g02',
    type: 'grammar',
    level: 'C1',
    question: 'Wskaż poprawne zdanie z "periodo ipotetico della irrealtà":',
    options: [
      'Se avrei potuto, sarei venuto.',
      'Se potessi, verrei.',
      'Se potevo, venivo.',
      'Se potrò, verrò.',
    ],
    correctIndex: 1,
    points: 5,
  },

  // C1 Translation (1)
  {
    id: 'c1-t01',
    type: 'translation',
    level: 'C1',
    question: 'Przetłumacz na polski: "Per quanto la questione possa sembrare irrilevante, merita un\'analisi approfondita."',
    options: [
      'Chociaż kwestia może wydawać się nieistotna, zasługuje na pogłębioną analizę.',
      'Ponieważ kwestia jest nieistotna, nie wymaga analizy.',
      'Jeśli kwestia wydaje się nieistotna, nie warto jej analizować.',
      'Dopóki kwestia jest nieistotna, analiza jest zbędna.',
    ],
    correctIndex: 0,
    points: 5,
  },

  // ============================================================
  // C2 — 5 questions (2 vocab, 2 grammar, 1 translation) — 6 points each
  // ============================================================

  // C2 Vocab (2)
  {
    id: 'c2-v01',
    type: 'vocab',
    level: 'C2',
    question: 'Co oznacza "l\'arzigogolo"?',
    options: ['Zagadka', 'Zawiłość / Wykręt', 'Artykuł', 'Ornament'],
    correctIndex: 1,
    points: 6,
  },
  {
    id: 'c2-v02',
    type: 'vocab',
    level: 'C2',
    question: 'Jak po włosku powiemy "bełkotać / mówić nieskładnie"?',
    options: ['Farfugliare', 'Favoleggiare', 'Fantasticare', 'Familiarizzare'],
    correctIndex: 0,
    points: 6,
  },

  // C2 Grammar (2)
  {
    id: 'c2-g01',
    type: 'grammar',
    level: 'C2',
    question: 'Wskaż poprawne użycie "congiuntivo trapassato": "Magari ___!"',
    options: [
      'fosse venuto',
      'veniva',
      'sarebbe venuto',
      'era venuto',
    ],
    correctIndex: 0,
    points: 6,
  },
  {
    id: 'c2-g02',
    type: 'grammar',
    level: 'C2',
    question: 'Uzupełnij: "Non ___ che tu abbia ragione, anzi, ne dubito fortemente."',
    options: ['direi', 'dico', 'dicessi', 'dissi'],
    correctIndex: 0,
    points: 6,
  },

  // C2 Translation (1)
  {
    id: 'c2-t01',
    type: 'translation',
    level: 'C2',
    question: 'Przetłumacz na włoski: "Niezależnie od tego, jak bardzo by się starał, nie zdoła przekonać komisji o słuszności swojej tezy."',
    options: [
      'Non importa come prova, non può convincere la commissione della sua tesi.',
      'Per quanto si sforzi, non riuscirà a convincere la commissione della fondatezza della propria tesi.',
      'Anche se prova molto, non convince la commissione della sua idea.',
      'Se si sforzasse di più, convincerebbe la commissione della tesi.',
    ],
    correctIndex: 1,
    points: 6,
  },
];
