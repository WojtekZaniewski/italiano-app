import type { GrammarLesson } from '../types';

export const grammarLessons: GrammarLesson[] = [
  // ============================================================
  // A1 - LESSONS 1-12
  // ============================================================

  // LESSON 1: Articles
  {
    id: 'a1-articles',
    title: 'Articoli determinativi e indeterminativi',
    titlePl: 'Rodzajniki określone i nieokreślone',
    level: 'A1',
    order: 1,
    concept: 'Italian articles change based on gender, number, and the first letter of the following word.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: kot',
        answer: 'il gatto',
        components: ['il', 'gatto'],
        hint: 'Rzeczowniki męskie zaczynające się od spółgłoski używają "il"',
      },
      {
        prompt: 'Jak powiesz: dom',
        answer: 'la casa',
        components: ['la', 'casa'],
        hint: 'Rzeczowniki żeńskie używają "la"',
      },
      {
        prompt: 'Jak powiesz: przyjaciel',
        answer: "l'amico",
        components: ["l'", 'amico'],
        hint: 'Przed samogłoską "il" lub "la" skraca się do "l\'"',
      },
      {
        prompt: 'Jak powiesz: student',
        answer: 'lo studente',
        components: ['lo', 'studente'],
        hint: 'Przed s+spółgłoska, z, gn, ps używamy "lo"',
      },
      {
        prompt: 'Jak powiesz: koty',
        answer: 'i gatti',
        components: ['i', 'gatti'],
        hint: 'Liczba mnoga rodzajnika "il" to "i"',
      },
      {
        prompt: 'Jak powiesz: domy',
        answer: 'le case',
        components: ['le', 'case'],
        hint: 'Liczba mnoga rodzajnika "la" to "le"',
      },
      {
        prompt: 'Jak powiesz: studenci',
        answer: 'gli studenti',
        components: ['gli', 'studenti'],
        hint: 'Liczba mnoga rodzajnika "lo" to "gli"',
      },
      {
        prompt: 'Jak powiesz: (jakiś) książka',
        answer: 'un libro',
        components: ['un', 'libro'],
        hint: 'Rodzajnik nieokreślony męski to "un"',
      },
      {
        prompt: 'Jak powiesz: (jakaś) dziewczyna',
        answer: 'una ragazza',
        components: ['una', 'ragazza'],
        hint: 'Rodzajnik nieokreślony żeński to "una"',
      },
      {
        prompt: 'Jak powiesz: chłopiec i dziewczyna',
        answer: 'il ragazzo e la ragazza',
        components: ['il', 'ragazzo', 'e', 'la', 'ragazza'],
      },
    ],
    explanation:
      'Articoli determinativi (rodzajniki określone): il (m.sg.), la (f.sg.), lo (m.sg. przed s+spółgłoska, z, gn, ps), l\' (przed samogłoską), i (m.pl.), le (f.pl.), gli (pl. od lo i l\'). Articoli indeterminativi (rodzajniki nieokreślone): un (m.), una (f.), uno (m. przed s+spółgłoska, z), un\' (f. przed samogłoską).',
    explanationPl:
      'Rodzajniki określone: il (r.m. l.poj.), la (r.ż. l.poj.), lo (r.m. l.poj. przed s+spółgłoska, z, gn, ps), l\' (przed samogłoską), i (r.m. l.mn.), le (r.ż. l.mn.), gli (l.mn. od lo i l\'). Rodzajniki nieokreślone: un (r.m.), una (r.ż.), uno (r.m. przed s+spółgłoska, z), un\' (r.ż. przed samogłoską). W odróżnieniu od polskiego, we włoskim rodzajniki są obowiązkowe przy rzeczownikach.',
  },

  // LESSON 2: Essere
  {
    id: 'a1-essere',
    title: 'Il verbo essere',
    titlePl: 'Czasownik być (essere)',
    level: 'A1',
    order: 2,
    concept: 'Essere is one of the two most important Italian verbs. It is irregular and must be memorized.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Ja jestem',
        answer: 'Io sono',
        components: ['io', 'sono'],
        hint: 'Zaimek "io" jest opcjonalny - "sono" wystarczy',
      },
      {
        prompt: 'Jak powiesz: Ty jesteś',
        answer: 'Tu sei',
        components: ['tu', 'sei'],
      },
      {
        prompt: 'Jak powiesz: On jest',
        answer: 'Lui è',
        components: ['lui', 'è'],
      },
      {
        prompt: 'Jak powiesz: My jesteśmy',
        answer: 'Noi siamo',
        components: ['noi', 'siamo'],
      },
      {
        prompt: 'Jak powiesz: Wy jesteście',
        answer: 'Voi siete',
        components: ['voi', 'siete'],
      },
      {
        prompt: 'Jak powiesz: Oni są',
        answer: 'Loro sono',
        components: ['loro', 'sono'],
      },
      {
        prompt: 'Jak powiesz: Jestem Włochem',
        answer: 'Sono italiano',
        components: ['sono', 'italiano'],
        hint: 'Zaimek "io" jest często pomijany',
      },
      {
        prompt: 'Jak powiesz: Ona jest nauczycielką',
        answer: 'Lei è un\'insegnante',
        components: ['lei', 'è', "un'", 'insegnante'],
      },
      {
        prompt: 'Jak powiesz: Jesteśmy szczęśliwi',
        answer: 'Siamo felici',
        components: ['siamo', 'felici'],
      },
      {
        prompt: 'Jak powiesz: Oni są tutaj',
        answer: 'Loro sono qui',
        components: ['loro', 'sono', 'qui'],
      },
    ],
    explanation:
      'Il verbo "essere" è irregolare: io sono, tu sei, lui/lei è, noi siamo, voi siete, loro sono. Si usa per descrivere identità, nazionalità, professione, stati d\'animo e posizione.',
    explanationPl:
      'Czasownik "essere" (być) jest nieregularny: io sono, tu sei, lui/lei è, noi siamo, voi siete, loro sono. Używa się go do opisywania tożsamości, narodowości, zawodu, stanów emocjonalnych i położenia. W odróżnieniu od polskiego, zaimki osobowe (io, tu, lui...) są zazwyczaj pomijane, bo forma czasownika wskazuje osobę.',
  },

  // LESSON 3: Avere
  {
    id: 'a1-avere',
    title: 'Il verbo avere',
    titlePl: 'Czasownik mieć (avere)',
    level: 'A1',
    order: 3,
    concept: 'Avere is used for possession and in many idiomatic expressions.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Ja mam',
        answer: 'Io ho',
        components: ['io', 'ho'],
        hint: '"Ho" - litera h jest niema we włoskim',
      },
      {
        prompt: 'Jak powiesz: Ty masz',
        answer: 'Tu hai',
        components: ['tu', 'hai'],
      },
      {
        prompt: 'Jak powiesz: On ma',
        answer: 'Lui ha',
        components: ['lui', 'ha'],
      },
      {
        prompt: 'Jak powiesz: My mamy',
        answer: 'Noi abbiamo',
        components: ['noi', 'abbiamo'],
      },
      {
        prompt: 'Jak powiesz: Wy macie',
        answer: 'Voi avete',
        components: ['voi', 'avete'],
      },
      {
        prompt: 'Jak powiesz: Oni mają',
        answer: 'Loro hanno',
        components: ['loro', 'hanno'],
      },
      {
        prompt: 'Jak powiesz: Mam samochód',
        answer: 'Ho una macchina',
        components: ['ho', 'una', 'macchina'],
      },
      {
        prompt: 'Jak powiesz: Jestem głodny (dosł. mam głód)',
        answer: 'Ho fame',
        components: ['ho', 'fame'],
        hint: 'Włoski używa "avere" (mieć) zamiast "essere" (być) z głodem, pragnieniem itp.',
      },
      {
        prompt: 'Jak powiesz: Mam 25 lat',
        answer: 'Ho venticinque anni',
        components: ['ho', 'venticinque', 'anni'],
        hint: 'Wiek wyraża się przez "avere" (mam X lat)',
      },
      {
        prompt: 'Jak powiesz: Masz rację',
        answer: 'Hai ragione',
        components: ['hai', 'ragione'],
        hint: '"Mieć rację" dosłownie — avere ragione',
      },
    ],
    explanation:
      'Il verbo "avere" è irregolare: io ho, tu hai, lui/lei ha, noi abbiamo, voi avete, loro hanno. Espressioni idiomatiche: avere fame (głód), avere sete (pragnienie), avere sonno (senność), avere ragione (racja), avere paura (strach), avere freddo/caldo (zimno/gorąco), avere X anni (mieć X lat).',
    explanationPl:
      'Czasownik "avere" (mieć) jest nieregularny: io ho, tu hai, lui/lei ha, noi abbiamo, voi avete, loro hanno. Uwaga: litera "h" jest niema. Ważne wyrażenia idiomatyczne z "avere": avere fame (być głodnym), avere sete (być spragniony), avere sonno (być sennym), avere ragione (mieć rację), avere paura (bać się), avere freddo/caldo (być zimno/gorąco), avere X anni (mieć X lat).',
  },

  // LESSON 4: Present tense -are verbs
  {
    id: 'a1-present-are',
    title: 'Presente indicativo: verbi in -are',
    titlePl: 'Czas teraźniejszy: czasowniki na -are',
    level: 'A1',
    order: 4,
    concept: 'First conjugation (-are) verbs follow a regular pattern.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Ja mówię',
        answer: 'Io parlo',
        components: ['io', 'parlo'],
        hint: 'parlare → parl- + końcówka -o dla "io"',
      },
      {
        prompt: 'Jak powiesz: Ty mówisz',
        answer: 'Tu parli',
        components: ['tu', 'parli'],
      },
      {
        prompt: 'Jak powiesz: Ona mówi',
        answer: 'Lei parla',
        components: ['lei', 'parla'],
      },
      {
        prompt: 'Jak powiesz: My jemy',
        answer: 'Noi mangiamo',
        components: ['noi', 'mangiamo'],
        hint: 'mangiare → mangi- + końcówka -amo',
      },
      {
        prompt: 'Jak powiesz: Wy pracujecie',
        answer: 'Voi lavorate',
        components: ['voi', 'lavorate'],
        hint: 'lavorare → lavor- + końcówka -ate',
      },
      {
        prompt: 'Jak powiesz: Oni grają',
        answer: 'Loro giocano',
        components: ['loro', 'giocano'],
        hint: 'giocare → gioc- + końcówka -ano',
      },
      {
        prompt: 'Jak powiesz: Mówię po włosku',
        answer: 'Parlo italiano',
        components: ['parlo', 'italiano'],
      },
      {
        prompt: 'Jak powiesz: Jem pizzę',
        answer: 'Mangio una pizza',
        components: ['mangio', 'una', 'pizza'],
      },
      {
        prompt: 'Jak powiesz: Kupujemy chleb',
        answer: 'Compriamo il pane',
        components: ['compriamo', 'il', 'pane'],
        hint: 'comprare → compr- + końcówka -iamo',
      },
      {
        prompt: 'Jak powiesz: Ona słucha muzyki',
        answer: 'Lei ascolta la musica',
        components: ['lei', 'ascolta', 'la', 'musica'],
      },
    ],
    explanation:
      'I verbi regolari in -are (prima coniugazione) seguono questo schema: io -o, tu -i, lui/lei -a, noi -iamo, voi -ate, loro -ano. Esempi: parlare, mangiare, lavorare, giocare, comprare, ascoltare, guardare, studiare.',
    explanationPl:
      'Regularne czasowniki na -are (I koniugacja) odmieniają się według schematu: io -o, tu -i, lui/lei -a, noi -iamo, voi -ate, loro -ano. Odcinasz końcówkę -are od bezokolicznika i dodajesz odpowiednią końcówkę osobową. Przykłady: parlare (mówić), mangiare (jeść), lavorare (pracować), giocare (grać), comprare (kupować), ascoltare (słuchać).',
  },

  // LESSON 5: Present tense -ere verbs
  {
    id: 'a1-present-ere',
    title: 'Presente indicativo: verbi in -ere',
    titlePl: 'Czas teraźniejszy: czasowniki na -ere',
    level: 'A1',
    order: 5,
    concept: 'Second conjugation (-ere) verbs have slightly different endings.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Ja widzę',
        answer: 'Io vedo',
        components: ['io', 'vedo'],
        hint: 'vedere → ved- + końcówka -o',
      },
      {
        prompt: 'Jak powiesz: Ty czytasz',
        answer: 'Tu leggi',
        components: ['tu', 'leggi'],
        hint: 'leggere → legg- + końcówka -i',
      },
      {
        prompt: 'Jak powiesz: On pisze',
        answer: 'Lui scrive',
        components: ['lui', 'scrive'],
        hint: 'scrivere → scriv- + końcówka -e',
      },
      {
        prompt: 'Jak powiesz: My bierzemy',
        answer: 'Noi prendiamo',
        components: ['noi', 'prendiamo'],
        hint: 'prendere → prend- + końcówka -iamo',
      },
      {
        prompt: 'Jak powiesz: Wy pijecie',
        answer: 'Voi bevete',
        components: ['voi', 'bevete'],
        hint: 'bere (bevere) → bev- + końcówka -ete',
      },
      {
        prompt: 'Jak powiesz: Oni biegną',
        answer: 'Loro corrono',
        components: ['loro', 'corrono'],
        hint: 'correre → corr- + końcówka -ono',
      },
      {
        prompt: 'Jak powiesz: Widzę morze',
        answer: 'Vedo il mare',
        components: ['vedo', 'il', 'mare'],
      },
      {
        prompt: 'Jak powiesz: Czytam książkę',
        answer: 'Leggo un libro',
        components: ['leggo', 'un', 'libro'],
      },
      {
        prompt: 'Jak powiesz: Piszesz list',
        answer: 'Scrivi una lettera',
        components: ['scrivi', 'una', 'lettera'],
      },
      {
        prompt: 'Jak powiesz: Bierzemy kawę',
        answer: 'Prendiamo un caffè',
        components: ['prendiamo', 'un', 'caffè'],
      },
    ],
    explanation:
      'I verbi regolari in -ere (seconda coniugazione): io -o, tu -i, lui/lei -e, noi -iamo, voi -ete, loro -ono. Attenzione: molti verbi in -ere sono irregolari (bere, sapere, ecc.).',
    explanationPl:
      'Regularne czasowniki na -ere (II koniugacja): io -o, tu -i, lui/lei -e, noi -iamo, voi -ete, loro -ono. Uwaga: wiele czasowników na -ere jest nieregularnych (bere - pić, sapere - wiedzieć). Różnica z I koniugacją: 3 os. l.poj. -e (zamiast -a), 2 os. l.mn. -ete (zamiast -ate), 3 os. l.mn. -ono (zamiast -ano).',
  },

  // LESSON 6: Present tense -ire verbs
  {
    id: 'a1-present-ire',
    title: 'Presente indicativo: verbi in -ire',
    titlePl: 'Czas teraźniejszy: czasowniki na -ire',
    level: 'A1',
    order: 6,
    concept: 'Third conjugation (-ire) verbs, some with -isc- infix.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Ja śpię',
        answer: 'Io dormo',
        components: ['io', 'dormo'],
        hint: 'dormire → dorm- + -o (typ regularny)',
      },
      {
        prompt: 'Jak powiesz: Ty wyjeżdżasz',
        answer: 'Tu parti',
        components: ['tu', 'parti'],
        hint: 'partire → part- + -i',
      },
      {
        prompt: 'Jak powiesz: On otwiera',
        answer: 'Lui apre',
        components: ['lui', 'apre'],
      },
      {
        prompt: 'Jak powiesz: Ja kończę',
        answer: 'Io finisco',
        components: ['io', 'finisco'],
        hint: 'finire → fin- + -isc- + -o (typ z -isc-)',
      },
      {
        prompt: 'Jak powiesz: Ty wolisz',
        answer: 'Tu preferisci',
        components: ['tu', 'preferisci'],
        hint: 'preferire → prefer- + -isc- + -i',
      },
      {
        prompt: 'Jak powiesz: Ona rozumie',
        answer: 'Lei capisce',
        components: ['lei', 'capisce'],
        hint: 'capire → cap- + -isc- + -e',
      },
      {
        prompt: 'Jak powiesz: My śpimy',
        answer: 'Noi dormiamo',
        components: ['noi', 'dormiamo'],
        hint: 'Forma "noi" i "voi" jest taka sama dla obu typów',
      },
      {
        prompt: 'Jak powiesz: Oni kończą',
        answer: 'Loro finiscono',
        components: ['loro', 'finiscono'],
      },
      {
        prompt: 'Jak powiesz: Nie rozumiem',
        answer: 'Non capisco',
        components: ['non', 'capisco'],
      },
      {
        prompt: 'Jak powiesz: Wyjeżdżamy jutro',
        answer: 'Partiamo domani',
        components: ['partiamo', 'domani'],
      },
    ],
    explanation:
      'I verbi in -ire (terza coniugazione) si dividono in due gruppi. Tipo 1 (regolare): dormire → dormo, dormi, dorme, dormiamo, dormite, dormono. Tipo 2 (con -isc-): finire → finisco, finisci, finisce, finiamo, finite, finiscono. Il suffisso -isc- appare in io, tu, lui/lei, loro.',
    explanationPl:
      'Czasowniki na -ire (III koniugacja) dzielą się na dwa typy. Typ 1 (regularny): dormire → dormo, dormi, dorme, dormiamo, dormite, dormono. Typ 2 (z -isc-): finire → finisco, finisci, finisce, finiamo, finite, finiscono. Wstawka -isc- pojawia się tylko w formach: io, tu, lui/lei, loro. Formy noi i voi są identyczne w obu typach. Typ z -isc-: capire, preferire, finire, pulire, spedire.',
  },

  // LESSON 7: Negation
  {
    id: 'a1-negation',
    title: 'La negazione',
    titlePl: 'Przeczenie',
    level: 'A1',
    order: 7,
    concept: 'Negation in Italian is simple: put "non" before the verb.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Nie mówię',
        answer: 'Non parlo',
        components: ['non', 'parlo'],
        hint: '"Non" zawsze przed czasownikiem',
      },
      {
        prompt: 'Jak powiesz: Nie jestem Włochem',
        answer: 'Non sono italiano',
        components: ['non', 'sono', 'italiano'],
      },
      {
        prompt: 'Jak powiesz: Nie mam czasu',
        answer: 'Non ho tempo',
        components: ['non', 'ho', 'tempo'],
      },
      {
        prompt: 'Jak powiesz: On nie pracuje',
        answer: 'Lui non lavora',
        components: ['lui', 'non', 'lavora'],
      },
      {
        prompt: 'Jak powiesz: Nie rozumiem nic',
        answer: 'Non capisco niente',
        components: ['non', 'capisco', 'niente'],
        hint: 'Podwójne przeczenie jest poprawne we włoskim!',
      },
      {
        prompt: 'Jak powiesz: Nigdy nie jem mięsa',
        answer: 'Non mangio mai la carne',
        components: ['non', 'mangio', 'mai', 'la', 'carne'],
        hint: 'non...mai = nigdy',
      },
      {
        prompt: 'Jak powiesz: Nie znam nikogo',
        answer: 'Non conosco nessuno',
        components: ['non', 'conosco', 'nessuno'],
        hint: 'non...nessuno = nikt',
      },
      {
        prompt: 'Jak powiesz: Nie chcę już',
        answer: 'Non voglio più',
        components: ['non', 'voglio', 'più'],
        hint: 'non...più = już nie',
      },
      {
        prompt: 'Jak powiesz: Nie jeszcze',
        answer: 'Non ancora',
        components: ['non', 'ancora'],
        hint: 'non ancora = jeszcze nie',
      },
      {
        prompt: 'Jak powiesz: Nie mam ani czasu, ani pieniędzy',
        answer: 'Non ho né tempo né soldi',
        components: ['non', 'ho', 'né', 'tempo', 'né', 'soldi'],
        hint: 'non...né...né = ani...ani',
      },
    ],
    explanation:
      'La negazione si forma mettendo "non" prima del verbo. Negazioni doppie: non...niente/nulla (nic), non...mai (nigdy), non...nessuno (nikt), non...più (już nie), non...ancora (jeszcze nie), non...né...né (ani...ani). In italiano la doppia negazione è corretta!',
    explanationPl:
      'Przeczenie tworzymy stawiając "non" przed czasownikiem. Podwójne przeczenia (w odróżnieniu od polskiego są obowiązkowe): non...niente/nulla (nic), non...mai (nigdy), non...nessuno (nikt), non...più (już nie), non...ancora (jeszcze nie), non...né...né (ani...ani). Uwaga: we włoskim podwójne przeczenie jest poprawne i wymagane!',
  },

  // LESSON 8: Questions
  {
    id: 'a1-questions',
    title: 'Le domande',
    titlePl: 'Pytania',
    level: 'A1',
    order: 8,
    concept: 'Questions can be formed by intonation or with question words.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Jak się masz?',
        answer: 'Come stai?',
        components: ['come', 'stai'],
        hint: 'come = jak',
      },
      {
        prompt: 'Jak powiesz: Gdzie jest bank?',
        answer: "Dov'è la banca?",
        components: ["dov'è", 'la', 'banca'],
        hint: 'dove = gdzie; dov\'è = dove + è',
      },
      {
        prompt: 'Jak powiesz: Kiedy przyjeżdżasz?',
        answer: 'Quando arrivi?',
        components: ['quando', 'arrivi'],
        hint: 'quando = kiedy',
      },
      {
        prompt: 'Jak powiesz: Dlaczego nie jesz?',
        answer: 'Perché non mangi?',
        components: ['perché', 'non', 'mangi'],
        hint: 'perché = dlaczego / dlatego że',
      },
      {
        prompt: 'Jak powiesz: Ile to kosztuje?',
        answer: 'Quanto costa?',
        components: ['quanto', 'costa'],
        hint: 'quanto = ile',
      },
      {
        prompt: 'Jak powiesz: Co robisz?',
        answer: 'Cosa fai?',
        components: ['cosa', 'fai'],
        hint: 'cosa = co; che cosa = co (formalnie)',
      },
      {
        prompt: 'Jak powiesz: Kto to jest?',
        answer: 'Chi è?',
        components: ['chi', 'è'],
        hint: 'chi = kto',
      },
      {
        prompt: 'Jak powiesz: Który wolisz?',
        answer: 'Quale preferisci?',
        components: ['quale', 'preferisci'],
        hint: 'quale = który/jaki',
      },
      {
        prompt: 'Jak powiesz: Mówisz po angielsku?',
        answer: "Parli inglese?",
        components: ['parli', 'inglese'],
        hint: 'Pytanie przez intonację - bez zmiany szyku zdania',
      },
      {
        prompt: 'Jak powiesz: Ile masz lat?',
        answer: 'Quanti anni hai?',
        components: ['quanti', 'anni', 'hai'],
      },
    ],
    explanation:
      'Le parole interrogative: come (jak), dove (gdzie), quando (kiedy), perché (dlaczego), quanto/a/i/e (ile), cosa/che cosa (co), chi (kto), quale/quali (który). Le domande si possono formare anche solo con l\'intonazione ascendente.',
    explanationPl:
      'Zaimki pytające: come (jak), dove (gdzie), quando (kiedy), perché (dlaczego/dlatego że), quanto/a/i/e (ile), cosa/che cosa (co), chi (kto), quale/quali (który/które). Pytania można tworzyć też samą intonacją, bez zmiany szyku zdania (jak w polskim "Mówisz po włosku?" vs "Czy mówisz po włosku?").',
  },

  // LESSON 9: Possessive adjectives
  {
    id: 'a1-possessives',
    title: 'Aggettivi possessivi',
    titlePl: 'Przymiotniki dzierżawcze',
    level: 'A1',
    order: 9,
    concept: 'Possessive adjectives agree with the possessed noun, not the possessor.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: mój dom',
        answer: 'la mia casa',
        components: ['la', 'mia', 'casa'],
        hint: 'Przymiotnik dzierżawczy zgadza się z rzeczownikiem, nie z posiadaczem. "Casa" jest żeńska.',
      },
      {
        prompt: 'Jak powiesz: twój samochód',
        answer: 'la tua macchina',
        components: ['la', 'tua', 'macchina'],
      },
      {
        prompt: 'Jak powiesz: jego książka',
        answer: 'il suo libro',
        components: ['il', 'suo', 'libro'],
        hint: '"Suo" może znaczyć jego/jej - zależy od kontekstu',
      },
      {
        prompt: 'Jak powiesz: nasz pies',
        answer: 'il nostro cane',
        components: ['il', 'nostro', 'cane'],
      },
      {
        prompt: 'Jak powiesz: wasi przyjaciele',
        answer: 'i vostri amici',
        components: ['i', 'vostri', 'amici'],
      },
      {
        prompt: 'Jak powiesz: ich dom',
        answer: 'la loro casa',
        components: ['la', 'loro', 'casa'],
        hint: '"Loro" jest nieodmienny - nie zmienia formy',
      },
      {
        prompt: 'Jak powiesz: moje dzieci',
        answer: 'i miei bambini',
        components: ['i', 'miei', 'bambini'],
      },
      {
        prompt: 'Jak powiesz: moja mama',
        answer: 'mia madre',
        components: ['mia', 'madre'],
        hint: 'Z rodziną w l.poj. NIE używamy rodzajnika (wyjątek: loro)',
      },
      {
        prompt: 'Jak powiesz: moi rodzice',
        answer: 'i miei genitori',
        components: ['i', 'miei', 'genitori'],
        hint: 'Z rodziną w l.mn. rodzajnik wraca',
      },
      {
        prompt: 'Jak powiesz: To jest moja torba',
        answer: 'Questa è la mia borsa',
        components: ['questa', 'è', 'la', 'mia', 'borsa'],
      },
    ],
    explanation:
      'Aggettivi possessivi: mio/mia/miei/mie, tuo/tua/tuoi/tue, suo/sua/suoi/sue, nostro/nostra/nostri/nostre, vostro/vostra/vostri/vostre, loro (invariabile). Sono preceduti dall\'articolo determinativo. Eccezione: con nomi di famiglia al singolare non si usa l\'articolo (mia madre, tuo padre).',
    explanationPl:
      'Przymiotniki dzierżawcze: mio/mia/miei/mie, tuo/tua/tuoi/tue, suo/sua/suoi/sue, nostro/nostra/nostri/nostre, vostro/vostra/vostri/vostre, loro (niezmienny). Zawsze z rodzajnikiem określonym. Wyjątek: z członkami rodziny w l.poj. bez rodzajnika (mia madre, tuo fratello). Uwaga: "suo/sua" może oznaczać jego/jej/Pana/Pani - zależy od kontekstu.',
  },

  // LESSON 10: Prepositions
  {
    id: 'a1-prepositions',
    title: 'Le preposizioni semplici',
    titlePl: 'Przyimki proste',
    level: 'A1',
    order: 10,
    concept: 'Italian prepositions and their articulated forms.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Idę do domu',
        answer: 'Vado a casa',
        components: ['vado', 'a', 'casa'],
        hint: 'a = do (kierunek)',
      },
      {
        prompt: 'Jak powiesz: Jestem z Warszawy',
        answer: 'Sono di Varsavia',
        components: ['sono', 'di', 'Varsavia'],
        hint: 'di = z (pochodzenie)',
      },
      {
        prompt: 'Jak powiesz: Idę od lekarza',
        answer: 'Vado dal dottore',
        components: ['vado', 'dal', 'dottore'],
        hint: 'da = od/do (osoby); dal = da + il',
      },
      {
        prompt: 'Jak powiesz: Mieszkam we Włoszech',
        answer: 'Vivo in Italia',
        components: ['vivo', 'in', 'Italia'],
        hint: 'in = w (kraje, regiony)',
      },
      {
        prompt: 'Jak powiesz: Idę z przyjacielem',
        answer: "Vado con un amico",
        components: ['vado', 'con', 'un', 'amico'],
        hint: 'con = z (towarzystwem)',
      },
      {
        prompt: 'Jak powiesz: Książka jest na stole',
        answer: 'Il libro è sul tavolo',
        components: ['il', 'libro', 'è', 'sul', 'tavolo'],
        hint: 'su = na; sul = su + il',
      },
      {
        prompt: 'Jak powiesz: To jest dla ciebie',
        answer: 'Questo è per te',
        components: ['questo', 'è', 'per', 'te'],
        hint: 'per = dla',
      },
      {
        prompt: 'Jak powiesz: Kawa z mlekiem',
        answer: 'Caffè con latte',
        components: ['caffè', 'con', 'latte'],
      },
      {
        prompt: 'Jak powiesz: Jadę do Rzymu',
        answer: 'Vado a Roma',
        components: ['vado', 'a', 'Roma'],
        hint: 'a = do (miasta)',
      },
      {
        prompt: 'Jak powiesz: Wychodzę z biura',
        answer: "Esco dall'ufficio",
        components: ['esco', "dall'", 'ufficio'],
        hint: 'da = z (wychodzenie); dall\' = da + l\'',
      },
    ],
    explanation:
      'Le preposizioni semplici: di (z/od - posiadanie, pochodzenie), a (do - kierunek, miasta), da (od/do osoby, z miejsca), in (w - kraje, regiony), con (z - towarzyszenie), su (na), per (dla/przez), tra/fra (między/za). Preposizioni articolate: di+il=del, a+il=al, da+il=dal, in+il=nel, su+il=sul, ecc.',
    explanationPl:
      'Przyimki proste: di (z/od - posiadanie, pochodzenie), a (do - kierunek, miasta), da (od/do osoby, z miejsca), in (w - kraje, regiony), con (z - towarzyszenie), su (na), per (dla/przez), tra/fra (między/za czas). Przyimki łączą się z rodzajnikami tworząc formy ściągnięte: di+il=del, a+il=al, da+il=dal, in+il=nel, su+il=sul itd.',
  },

  // LESSON 11: Numbers 1-100
  {
    id: 'a1-numbers',
    title: 'I numeri da 1 a 100',
    titlePl: 'Liczby od 1 do 100',
    level: 'A1',
    order: 11,
    concept: 'Italian numbers and how they are formed.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: jeden, dwa, trzy',
        answer: 'uno, due, tre',
        components: ['uno', 'due', 'tre'],
      },
      {
        prompt: 'Jak powiesz: cztery, pięć, sześć',
        answer: 'quattro, cinque, sei',
        components: ['quattro', 'cinque', 'sei'],
      },
      {
        prompt: 'Jak powiesz: siedem, osiem, dziewięć, dziesięć',
        answer: 'sette, otto, nove, dieci',
        components: ['sette', 'otto', 'nove', 'dieci'],
      },
      {
        prompt: 'Jak powiesz: jedenaście',
        answer: 'undici',
        components: ['undici'],
        hint: 'Liczby 11-16 mają specjalne formy',
      },
      {
        prompt: 'Jak powiesz: dwadzieścia',
        answer: 'venti',
        components: ['venti'],
      },
      {
        prompt: 'Jak powiesz: dwadzieścia jeden',
        answer: 'ventuno',
        components: ['ventuno'],
        hint: 'venti + uno = ventuno (gubimy końcowe -i)',
      },
      {
        prompt: 'Jak powiesz: trzydzieści trzy',
        answer: 'trentatré',
        components: ['trentatré'],
        hint: 'trenta + tre = trentatré',
      },
      {
        prompt: 'Jak powiesz: pięćdziesiąt',
        answer: 'cinquanta',
        components: ['cinquanta'],
      },
      {
        prompt: 'Jak powiesz: sto',
        answer: 'cento',
        components: ['cento'],
      },
      {
        prompt: 'Jak powiesz: Mam czterdzieści osiem lat',
        answer: 'Ho quarantotto anni',
        components: ['ho', 'quarantotto', 'anni'],
        hint: 'quaranta + otto = quarantotto',
      },
    ],
    explanation:
      'I numeri: 1-10: uno, due, tre, quattro, cinque, sei, sette, otto, nove, dieci. 11-19: undici, dodici, tredici, quattordici, quindici, sedici, diciassette, diciotto, diciannove. Decine: venti, trenta, quaranta, cinquanta, sessanta, settanta, ottanta, novanta, cento. Per comporre: venti+uno=ventuno, venti+otto=ventotto (la vocale finale della decina cade davanti a uno/otto).',
    explanationPl:
      'Liczby: 1-10: uno, due, tre, quattro, cinque, sei, sette, otto, nove, dieci. 11-19: undici, dodici, tredici, quattordici, quindici, sedici, diciassette, diciotto, diciannove. Dziesiątki: venti, trenta, quaranta, cinquanta, sessanta, settanta, ottanta, novanta, cento. Łączenie: venti+uno=ventuno, venti+otto=ventotto (końcowa samogłoska dziesiątki odpada przed uno/otto).',
  },

  // LESSON 12: Time expressions
  {
    id: 'a1-time-expressions',
    title: 'Espressioni di tempo',
    titlePl: 'Wyrażenia czasowe',
    level: 'A1',
    order: 12,
    concept: 'Essential time expressions for everyday communication.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: dzisiaj',
        answer: 'oggi',
        components: ['oggi'],
      },
      {
        prompt: 'Jak powiesz: jutro',
        answer: 'domani',
        components: ['domani'],
      },
      {
        prompt: 'Jak powiesz: wczoraj',
        answer: 'ieri',
        components: ['ieri'],
      },
      {
        prompt: 'Jak powiesz: teraz',
        answer: 'adesso',
        components: ['adesso'],
        hint: 'Także "ora" znaczy "teraz"',
      },
      {
        prompt: 'Jak powiesz: Dzisiaj jest poniedziałek',
        answer: 'Oggi è lunedì',
        components: ['oggi', 'è', 'lunedì'],
      },
      {
        prompt: 'Jak powiesz: Rano piję kawę',
        answer: 'La mattina bevo un caffè',
        components: ['la', 'mattina', 'bevo', 'un', 'caffè'],
        hint: 'la mattina = rano; il pomeriggio = po południu; la sera = wieczorem',
      },
      {
        prompt: 'Jak powiesz: Która jest godzina?',
        answer: 'Che ora è?',
        components: ['che', 'ora', 'è'],
        hint: 'Także: "Che ore sono?"',
      },
      {
        prompt: 'Jak powiesz: Jest trzecia',
        answer: 'Sono le tre',
        components: ['sono', 'le', 'tre'],
        hint: 'Godziny z rodzajnikiem l.mn. (wyjątek: è l\'una)',
      },
      {
        prompt: 'Jak powiesz: w zeszłym tygodniu',
        answer: 'la settimana scorsa',
        components: ['la', 'settimana', 'scorsa'],
      },
      {
        prompt: 'Jak powiesz: Zawsze jem o ósmej',
        answer: 'Mangio sempre alle otto',
        components: ['mangio', 'sempre', 'alle', 'otto'],
        hint: 'alle = a + le (o godzinie)',
      },
    ],
    explanation:
      'Espressioni di tempo: oggi (dzisiaj), domani (jutro), ieri (wczoraj), adesso/ora (teraz), sempre (zawsze), mai (nigdy), spesso (często), qualche volta (czasami), la mattina (rano), il pomeriggio (po południu), la sera (wieczorem), la notte (w nocy). Giorni: lunedì, martedì, mercoledì, giovedì, venerdì, sabato, domenica.',
    explanationPl:
      'Wyrażenia czasowe: oggi (dzisiaj), domani (jutro), ieri (wczoraj), adesso/ora (teraz), sempre (zawsze), mai (nigdy), spesso (często), qualche volta (czasami), la mattina (rano), il pomeriggio (po południu), la sera (wieczorem), la notte (w nocy). Dni tygodnia: lunedì (poniedziałek), martedì (wtorek), mercoledì (środa), giovedì (czwartek), venerdì (piątek), sabato (sobota), domenica (niedziela). Nie mają wielkich liter.',
  },

  // ============================================================
  // A2 - LESSONS 13-22
  // ============================================================

  // LESSON 13: Passato prossimo with avere
  {
    id: 'a2-passato-prossimo-avere',
    title: 'Passato prossimo con avere',
    titlePl: 'Czas przeszły dokonany z avere',
    level: 'A2',
    order: 13,
    concept: 'The most common past tense, formed with avere + past participle.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Jadłem (zjadłem)',
        answer: 'Ho mangiato',
        components: ['ho', 'mangiato'],
        hint: 'avere (odmienione) + participio passato (-ato dla -are)',
      },
      {
        prompt: 'Jak powiesz: Kupiłeś',
        answer: 'Hai comprato',
        components: ['hai', 'comprato'],
      },
      {
        prompt: 'Jak powiesz: Ona widziała',
        answer: 'Lei ha visto',
        components: ['lei', 'ha', 'visto'],
        hint: 'vedere → visto (nieregularne)',
      },
      {
        prompt: 'Jak powiesz: Czytaliśmy',
        answer: 'Abbiamo letto',
        components: ['abbiamo', 'letto'],
        hint: 'leggere → letto (nieregularne)',
      },
      {
        prompt: 'Jak powiesz: Zrobiliście',
        answer: 'Avete fatto',
        components: ['avete', 'fatto'],
        hint: 'fare → fatto (nieregularne)',
      },
      {
        prompt: 'Jak powiesz: Oni powiedzieli',
        answer: 'Loro hanno detto',
        components: ['loro', 'hanno', 'detto'],
        hint: 'dire → detto (nieregularne)',
      },
      {
        prompt: 'Jak powiesz: Kupiłem samochód',
        answer: 'Ho comprato una macchina',
        components: ['ho', 'comprato', 'una', 'macchina'],
      },
      {
        prompt: 'Jak powiesz: Napisałeś list?',
        answer: 'Hai scritto la lettera?',
        components: ['hai', 'scritto', 'la', 'lettera'],
        hint: 'scrivere → scritto',
      },
      {
        prompt: 'Jak powiesz: Nie zrozumiałem',
        answer: 'Non ho capito',
        components: ['non', 'ho', 'capito'],
      },
      {
        prompt: 'Jak powiesz: Co zrobiłeś wczoraj?',
        answer: 'Cosa hai fatto ieri?',
        components: ['cosa', 'hai', 'fatto', 'ieri'],
      },
    ],
    explanation:
      'Il passato prossimo si forma con il presente di avere + participio passato. Participi regolari: -are → -ato, -ere → -uto, -ire → -ito. Participi irregolari comuni: fare→fatto, dire→detto, leggere→letto, scrivere→scritto, vedere→visto, prendere→preso, mettere→messo, aprire→aperto, bere→bevuto, chiudere→chiuso.',
    explanationPl:
      'Passato prossimo tworzy się przez odmienioną formę avere + participio passato (imiesłów bierny). Regularne imiesłowy: -are → -ato, -ere → -uto, -ire → -ito. Nieregularne: fare→fatto, dire→detto, leggere→letto, scrivere→scritto, vedere→visto, prendere→preso, mettere→messo, aprire→aperto, bere→bevuto, chiudere→chiuso. Z avere imiesłów NIE zgadza się z podmiotem.',
  },

  // LESSON 14: Passato prossimo with essere
  {
    id: 'a2-passato-prossimo-essere',
    title: 'Passato prossimo con essere',
    titlePl: 'Czas przeszły dokonany z essere',
    level: 'A2',
    order: 14,
    concept: 'Some verbs use essere instead of avere - the participle must agree with the subject.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Poszedłem (m.)',
        answer: 'Sono andato',
        components: ['sono', 'andato'],
        hint: 'Z essere imiesłów zgadza się z podmiotem',
      },
      {
        prompt: 'Jak powiesz: Poszłam (f.)',
        answer: 'Sono andata',
        components: ['sono', 'andata'],
        hint: '-ato (m.), -ata (f.)',
      },
      {
        prompt: 'Jak powiesz: Przyjechałeś?',
        answer: 'Sei arrivato?',
        components: ['sei', 'arrivato'],
      },
      {
        prompt: 'Jak powiesz: Ona wyszła',
        answer: 'Lei è uscita',
        components: ['lei', 'è', 'uscita'],
        hint: 'uscire → uscito/uscita',
      },
      {
        prompt: 'Jak powiesz: Urodziłem się w 1990',
        answer: 'Sono nato nel 1990',
        components: ['sono', 'nato', 'nel', '1990'],
        hint: 'nascere → nato (urodzić się)',
      },
      {
        prompt: 'Jak powiesz: My przyjechaliśmy',
        answer: 'Siamo arrivati',
        components: ['siamo', 'arrivati'],
        hint: 'l.mn. męska: -ati',
      },
      {
        prompt: 'Jak powiesz: One zostały',
        answer: 'Loro sono rimaste',
        components: ['loro', 'sono', 'rimaste'],
        hint: 'l.mn. żeńska: -e; rimanere → rimasto/a',
      },
      {
        prompt: 'Jak powiesz: Wróciłem do domu',
        answer: 'Sono tornato a casa',
        components: ['sono', 'tornato', 'a', 'casa'],
      },
      {
        prompt: 'Jak powiesz: Co się stało?',
        answer: "Cosa è successo?",
        components: ['cosa', 'è', 'successo'],
        hint: 'succedere → successo',
      },
      {
        prompt: 'Jak powiesz: Pociąg przyjechał o ósmej',
        answer: 'Il treno è arrivato alle otto',
        components: ['il', 'treno', 'è', 'arrivato', 'alle', 'otto'],
      },
    ],
    explanation:
      'Alcuni verbi formano il passato prossimo con essere: verbi di movimento (andare, venire, arrivare, partire, tornare, uscire, entrare), di stato (stare, rimanere, restare), di cambiamento (nascere, morire, diventare, crescere). Con essere il participio concorda con il soggetto: -o (m.sg.), -a (f.sg.), -i (m.pl.), -e (f.pl.).',
    explanationPl:
      'Niektóre czasowniki tworzą passato prossimo z essere: czasowniki ruchu (andare, venire, arrivare, partire, tornare, uscire, entrare), stanu (stare, rimanere, restare), zmiany (nascere, morire, diventare, crescere). Z essere imiesłów MUSI się zgadzać z podmiotem: -o (m. l.poj.), -a (f. l.poj.), -i (m. l.mn.), -e (f. l.mn.).',
  },

  // LESSON 15: Imperfetto
  {
    id: 'a2-imperfetto',
    title: "L'imperfetto",
    titlePl: 'Czas przeszły niedokonany (imperfetto)',
    level: 'A2',
    order: 15,
    concept: 'The imperfetto describes habitual or ongoing past actions, descriptions, and states.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Kiedy byłem dzieckiem',
        answer: "Quando ero bambino",
        components: ['quando', 'ero', 'bambino'],
        hint: 'essere w imperfetto: ero, eri, era, eravamo, eravate, erano',
      },
      {
        prompt: 'Jak powiesz: Zawsze jadłem o ósmej',
        answer: 'Mangiavo sempre alle otto',
        components: ['mangiavo', 'sempre', 'alle', 'otto'],
        hint: '-are → -avo, -avi, -ava, -avamo, -avate, -avano',
      },
      {
        prompt: 'Jak powiesz: Ty czytałeś dużo',
        answer: 'Tu leggevi molto',
        components: ['tu', 'leggevi', 'molto'],
        hint: '-ere → -evo, -evi, -eva, -evamo, -evate, -evano',
      },
      {
        prompt: 'Jak powiesz: On spał',
        answer: 'Lui dormiva',
        components: ['lui', 'dormiva'],
        hint: '-ire → -ivo, -ivi, -iva, -ivamo, -ivate, -ivano',
      },
      {
        prompt: 'Jak powiesz: Padał deszcz',
        answer: 'Pioveva',
        components: ['pioveva'],
        hint: 'Opis pogody w przeszłości = imperfetto',
      },
      {
        prompt: 'Jak powiesz: Mieszkaliśmy w Rzymie',
        answer: 'Abitavamo a Roma',
        components: ['abitavamo', 'a', 'Roma'],
      },
      {
        prompt: 'Jak powiesz: Miałem 10 lat',
        answer: 'Avevo dieci anni',
        components: ['avevo', 'dieci', 'anni'],
      },
      {
        prompt: 'Jak powiesz: Chciałem jeść',
        answer: 'Volevo mangiare',
        components: ['volevo', 'mangiare'],
      },
      {
        prompt: 'Jak powiesz: Kiedy byłem mały, chodziłem do parku',
        answer: 'Quando ero piccolo, andavo al parco',
        components: ['quando', 'ero', 'piccolo', 'andavo', 'al', 'parco'],
      },
      {
        prompt: 'Jak powiesz: Było pięknie',
        answer: 'Era bello',
        components: ['era', 'bello'],
      },
    ],
    explanation:
      "L'imperfetto si usa per: azioni abituali nel passato, descrizioni, stati d'animo, condizioni fisiche, tempo atmosferico, età. Coniugazione: -are: -avo/-avi/-ava/-avamo/-avate/-avano. -ere: -evo/-evi/-eva/-evamo/-evate/-evano. -ire: -ivo/-ivi/-iva/-ivamo/-ivate/-ivano. Irregolari: essere (ero), fare (facevo), dire (dicevo), bere (bevevo).",
    explanationPl:
      'Imperfetto opisuje: czynności powtarzające się w przeszłości, opisy, stany emocjonalne, warunki fizyczne, pogodę, wiek. Odmiana: -are: -avo/-avi/-ava/-avamo/-avate/-avano. -ere: -evo/-evi/-eva/-evamo/-evate/-evano. -ire: -ivo/-ivi/-iva/-ivamo/-ivate/-ivano. Nieregularne: essere (ero), fare (facevo), dire (dicevo), bere (bevevo). Różnica z passato prossimo: imperfetto = tło, opis, nawyk; passato prossimo = zdarzenie jednorazowe, zakończone.',
  },

  // LESSON 16: Reflexive verbs
  {
    id: 'a2-reflexive',
    title: 'I verbi riflessivi',
    titlePl: 'Czasowniki zwrotne',
    level: 'A2',
    order: 16,
    concept: 'Reflexive verbs use reflexive pronouns and form compound tenses with essere.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Budzę się',
        answer: 'Mi sveglio',
        components: ['mi', 'sveglio'],
        hint: 'svegliarsi: mi sveglio, ti svegli, si sveglia...',
      },
      {
        prompt: 'Jak powiesz: Myjesz się',
        answer: 'Ti lavi',
        components: ['ti', 'lavi'],
      },
      {
        prompt: 'Jak powiesz: On ubiera się',
        answer: 'Lui si veste',
        components: ['lui', 'si', 'veste'],
      },
      {
        prompt: 'Jak powiesz: Nazywam się Marco',
        answer: 'Mi chiamo Marco',
        components: ['mi', 'chiamo', 'Marco'],
        hint: 'chiamarsi = nazywać się',
      },
      {
        prompt: 'Jak powiesz: Dobrze się bawię',
        answer: 'Mi diverto',
        components: ['mi', 'diverto'],
        hint: 'divertirsi = bawić się',
      },
      {
        prompt: 'Jak powiesz: Obudziłem się wcześnie',
        answer: 'Mi sono svegliato presto',
        components: ['mi', 'sono', 'svegliato', 'presto'],
        hint: 'Passato prossimo z essere! Imiesłów się zgadza.',
      },
      {
        prompt: 'Jak powiesz: Ona się ubrała',
        answer: 'Lei si è vestita',
        components: ['lei', 'si', 'è', 'vestita'],
        hint: 'vestita - forma żeńska',
      },
      {
        prompt: 'Jak powiesz: Kładziemy się o 23',
        answer: 'Ci corichiamo alle ventitre',
        components: ['ci', 'corichiamo', 'alle', 'ventitre'],
        hint: 'coricarsi = kłaść się',
      },
      {
        prompt: 'Jak powiesz: Musisz się pospieszyć',
        answer: 'Devi sbrigarti',
        components: ['devi', 'sbrigarti'],
        hint: 'Z czasownikami modalnymi zaimek łączy się z bezokolicznikiem',
      },
      {
        prompt: 'Jak powiesz: Oni się poznali wczoraj',
        answer: 'Si sono conosciuti ieri',
        components: ['si', 'sono', 'conosciuti', 'ieri'],
      },
    ],
    explanation:
      'I verbi riflessivi usano i pronomi riflessivi: mi, ti, si, ci, vi, si. Al passato prossimo si coniugano sempre con essere e il participio concorda con il soggetto. Con i verbi modali il pronome può andare prima del verbo modale (mi devo svegliare) o attaccato all\'infinito (devo svegliarmi).',
    explanationPl:
      'Czasowniki zwrotne używają zaimków zwrotnych: mi, ti, si, ci, vi, si. W passato prossimo ZAWSZE odmieniają się z essere, a imiesłów zgadza się z podmiotem (mi sono svegliato/a). Z czasownikami modalnymi zaimek może stać przed modalnym (mi devo svegliare) lub łączyć się z bezokolicznikiem (devo svegliarmi). Typowe: svegliarsi, lavarsi, vestirsi, chiamarsi, divertirsi, alzarsi, sedersi.',
  },

  // LESSON 17: Modal verbs
  {
    id: 'a2-modal-verbs',
    title: 'I verbi modali',
    titlePl: 'Czasowniki modalne (volere, potere, dovere)',
    level: 'A2',
    order: 17,
    concept: 'Modal verbs are followed by an infinitive and are essential for everyday communication.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Chcę jeść',
        answer: 'Voglio mangiare',
        components: ['voglio', 'mangiare'],
        hint: 'volere + infinito',
      },
      {
        prompt: 'Jak powiesz: Możesz mówić po włosku?',
        answer: 'Puoi parlare italiano?',
        components: ['puoi', 'parlare', 'italiano'],
        hint: 'potere + infinito',
      },
      {
        prompt: 'Jak powiesz: Muszę pracować',
        answer: 'Devo lavorare',
        components: ['devo', 'lavorare'],
        hint: 'dovere + infinito',
      },
      {
        prompt: 'Jak powiesz: Chcemy wyjść',
        answer: 'Vogliamo uscire',
        components: ['vogliamo', 'uscire'],
      },
      {
        prompt: 'Jak powiesz: Oni nie mogą przyjść',
        answer: 'Loro non possono venire',
        components: ['loro', 'non', 'possono', 'venire'],
      },
      {
        prompt: 'Jak powiesz: Musicie się uczyć',
        answer: 'Dovete studiare',
        components: ['dovete', 'studiare'],
      },
      {
        prompt: 'Jak powiesz: Chciałbym kawę',
        answer: 'Vorrei un caffè',
        components: ['vorrei', 'un', 'caffè'],
        hint: 'vorrei = chciałbym (condizionale - grzeczna forma)',
      },
      {
        prompt: 'Jak powiesz: Mógłbyś mi pomóc?',
        answer: 'Potresti aiutarmi?',
        components: ['potresti', 'aiutarmi'],
        hint: 'potresti = mógłbyś (condizionale)',
      },
      {
        prompt: 'Jak powiesz: Musiałem wyjść',
        answer: 'Ho dovuto uscire',
        components: ['ho', 'dovuto', 'uscire'],
        hint: 'Passato prossimo modali: avere/essere + participio + infinito',
      },
      {
        prompt: 'Jak powiesz: Nie chcę iść, ale muszę',
        answer: 'Non voglio andare, ma devo',
        components: ['non', 'voglio', 'andare', 'ma', 'devo'],
      },
    ],
    explanation:
      'I verbi modali (volere, potere, dovere) + infinito. Volere: voglio, vuoi, vuole, vogliamo, volete, vogliono. Potere: posso, puoi, può, possiamo, potete, possono. Dovere: devo, devi, deve, dobbiamo, dovete, devono. Condizionale (forma cortese): vorrei, potresti, dovrei.',
    explanationPl:
      'Czasowniki modalne (volere, potere, dovere) + bezokolicznik. Volere (chcieć): voglio, vuoi, vuole, vogliamo, volete, vogliono. Potere (móc): posso, puoi, può, possiamo, potete, possono. Dovere (musieć): devo, devi, deve, dobbiamo, dovete, devono. Tryb warunkowy (grzeczna forma): vorrei (chciałbym), potresti (mógłbyś), dovrei (powinienem). W passato prossimo z avere lub essere zależnie od infinitivu.',
  },

  // LESSON 18: Object pronouns
  {
    id: 'a2-object-pronouns',
    title: 'I pronomi oggetto',
    titlePl: 'Zaimki dopełnienia',
    level: 'A2',
    order: 18,
    concept: 'Direct and indirect object pronouns replace nouns to avoid repetition.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Widzę go',
        answer: 'Lo vedo',
        components: ['lo', 'vedo'],
        hint: 'lo = go (dopełnienie bliższe m.)',
      },
      {
        prompt: 'Jak powiesz: Widzę ją',
        answer: 'La vedo',
        components: ['la', 'vedo'],
        hint: 'la = ją (dopełnienie bliższe f.)',
      },
      {
        prompt: 'Jak powiesz: Kocham cię',
        answer: 'Ti amo',
        components: ['ti', 'amo'],
        hint: 'ti = cię/ci (dopełnienie bliższe i dalsze)',
      },
      {
        prompt: 'Jak powiesz: Słucham was',
        answer: 'Vi ascolto',
        components: ['vi', 'ascolto'],
      },
      {
        prompt: 'Jak powiesz: Daję mu książkę',
        answer: 'Gli do il libro',
        components: ['gli', 'do', 'il', 'libro'],
        hint: 'gli = jemu (dopełnienie dalsze m.)',
      },
      {
        prompt: 'Jak powiesz: Mówię jej',
        answer: 'Le dico',
        components: ['le', 'dico'],
        hint: 'le = jej (dopełnienie dalsze f.)',
      },
      {
        prompt: 'Jak powiesz: Widzę ich (m.)',
        answer: 'Li vedo',
        components: ['li', 'vedo'],
      },
      {
        prompt: 'Jak powiesz: Widziałem ją (w passato prossimo)',
        answer: "L'ho vista",
        components: ["l'", 'ho', 'vista'],
        hint: 'Z avere w passato prossimo imiesłów zgadza się z zaimkiem!',
      },
      {
        prompt: 'Jak powiesz: Chcę go zobaczyć',
        answer: 'Voglio vederlo',
        components: ['voglio', 'vederlo'],
        hint: 'Z bezokolicznikiem zaimek łączy się na końcu',
      },
      {
        prompt: 'Jak powiesz: Podoba mi się',
        answer: 'Mi piace',
        components: ['mi', 'piace'],
        hint: 'piacere: dop. dalsze + piace/piacciono',
      },
    ],
    explanation:
      "Pronomi diretti (dopełnienie bliższe): mi, ti, lo, la, ci, vi, li, le. Pronomi indiretti (dopełnienie dalsze): mi, ti, gli, le, ci, vi, gli (loro). Si mettono prima del verbo coniugato. Con l'infinito si attaccano alla fine (vederlo). Con il passato prossimo (avere) il participio concorda con il pronome diretto.",
    explanationPl:
      'Zaimki dopełnienia bliższego (kogo/co): mi, ti, lo, la, ci, vi, li, le. Zaimki dopełnienia dalszego (komu/czemu): mi, ti, gli (jemu), le (jej), ci, vi, gli (im). Stoją przed odmieniony czasownikiem. Z bezokolicznikiem łączą się na końcu (vederlo). W passato prossimo z avere imiesłów MUSI się zgadzać z zaimkiem dopełnienia bliższego (l\'ho vista = widziałem ją).',
  },

  // LESSON 19: Comparatives
  {
    id: 'a2-comparatives',
    title: 'Il comparativo',
    titlePl: 'Stopień wyższy (porównania)',
    level: 'A2',
    order: 19,
    concept: 'Comparing things using più...di, meno...di, and tanto...quanto.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Jestem wyższy od ciebie',
        answer: 'Sono più alto di te',
        components: ['sono', 'più', 'alto', 'di', 'te'],
        hint: 'più + przymiotnik + di = bardziej...niż',
      },
      {
        prompt: 'Jak powiesz: Ona jest mniej zmęczona od niego',
        answer: 'Lei è meno stanca di lui',
        components: ['lei', 'è', 'meno', 'stanca', 'di', 'lui'],
        hint: 'meno + przymiotnik + di = mniej...niż',
      },
      {
        prompt: 'Jak powiesz: Rzym jest większy od Florencji',
        answer: 'Roma è più grande di Firenze',
        components: ['Roma', 'è', 'più', 'grande', 'di', 'Firenze'],
      },
      {
        prompt: 'Jak powiesz: Ta pizza jest lepsza',
        answer: 'Questa pizza è migliore',
        components: ['questa', 'pizza', 'è', 'migliore'],
        hint: 'migliore = lepszy (nieregularny od buono)',
      },
      {
        prompt: 'Jak powiesz: Jest gorzej',
        answer: 'È peggio',
        components: ['è', 'peggio'],
        hint: 'peggio = gorzej (przysłówek, nieregularny od male)',
      },
      {
        prompt: 'Jak powiesz: Jest tak samo inteligentny jak ty',
        answer: 'È intelligente quanto te',
        components: ['è', 'intelligente', 'quanto', 'te'],
        hint: 'tanto...quanto / così...come = tak samo...jak',
      },
      {
        prompt: 'Jak powiesz: Marco jest starszy od Luci',
        answer: 'Marco è più grande di Lucia',
        components: ['Marco', 'è', 'più', 'grande', 'di', 'Lucia'],
      },
      {
        prompt: 'Jak powiesz: Ta książka jest ciekawsza od tamtej',
        answer: 'Questo libro è più interessante di quello',
        components: ['questo', 'libro', 'è', 'più', 'interessante', 'di', 'quello'],
      },
      {
        prompt: 'Jak powiesz: Jest najlepszy',
        answer: 'È il migliore',
        components: ['è', 'il', 'migliore'],
        hint: 'Stopień najwyższy: il/la + più/meno + przymiotnik LUB il/la + migliore',
      },
      {
        prompt: 'Jak powiesz: Jest najpiękniejszym miastem we Włoszech',
        answer: "È la città più bella d'Italia",
        components: ['è', 'la', 'città', 'più', 'bella', "d'", 'Italia'],
      },
    ],
    explanation:
      'Il comparativo: più + agg. + di (bardziej niż), meno + agg. + di (mniej niż), (tanto)...quanto / (così)...come (tak samo jak). Comparativi irregolari: buono→migliore, cattivo→peggiore, grande→maggiore, piccolo→minore. Il superlativo relativo: il/la più + agg. (najwyższy stopień).',
    explanationPl:
      'Porównania: più + przymiotnik + di (bardziej...niż), meno + przymiotnik + di (mniej...niż), (tanto)...quanto / (così)...come (tak samo...jak). "Di" używamy przed zaimkami, imionami, liczbami. "Che" używamy porównując dwa przymiotniki, przysłówki, rzeczowniki, czasowniki. Nieregularne: buono→migliore (lepszy), cattivo→peggiore (gorszy), grande→maggiore (większy), piccolo→minore (mniejszy). Stopień najwyższy: il/la + più + przymiotnik.',
  },

  // LESSON 20: Imperative
  {
    id: 'a2-imperative',
    title: "L'imperativo",
    titlePl: 'Tryb rozkazujący',
    level: 'A2',
    order: 20,
    concept: 'The imperative is used for commands, instructions, and suggestions.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Mów! (do przyjaciela)',
        answer: 'Parla!',
        components: ['parla'],
        hint: 'Imperativo tu (-are): -a',
      },
      {
        prompt: 'Jak powiesz: Jedz! (do przyjaciela)',
        answer: 'Mangia!',
        components: ['mangia'],
      },
      {
        prompt: 'Jak powiesz: Pisz! (do przyjaciela)',
        answer: 'Scrivi!',
        components: ['scrivi'],
        hint: 'Imperativo tu (-ere/-ire): jak presente',
      },
      {
        prompt: 'Jak powiesz: Słuchaj! (do przyjaciela)',
        answer: 'Ascolta!',
        components: ['ascolta'],
      },
      {
        prompt: 'Jak powiesz: Proszę mówić! (forma grzecznościowa)',
        answer: 'Parli!',
        components: ['parli'],
        hint: 'Forma Lei (-are): -i (odwrotnie niż tu!)',
      },
      {
        prompt: 'Jak powiesz: Proszę wejść! (forma grzecznościowa)',
        answer: 'Entri!',
        components: ['entri'],
      },
      {
        prompt: 'Jak powiesz: Jedzmy!',
        answer: 'Mangiamo!',
        components: ['mangiamo'],
        hint: 'Noi: jak presente',
      },
      {
        prompt: 'Jak powiesz: Nie mów! (do przyjaciela)',
        answer: 'Non parlare!',
        components: ['non', 'parlare'],
        hint: 'Przeczenie tu: non + bezokolicznik!',
      },
      {
        prompt: 'Jak powiesz: Powiedz mi!',
        answer: 'Dimmi!',
        components: ['dimmi'],
        hint: 'dire (tu) = di\'; di\' + mi = dimmi',
      },
      {
        prompt: 'Jak powiesz: Proszę, niech Pan usiądzie',
        answer: 'Si sieda, per favore',
        components: ['si', 'sieda', 'per', 'favore'],
      },
    ],
    explanation:
      "L'imperativo: Tu: -are → -a, -ere → -i, -ire → -i. Lei (formale): -are → -i, -ere → -a, -ire → -a. Noi: come il presente. Voi: come il presente. Negativo tu: non + infinito. Irregolari (tu): essere→sii, avere→abbi, andare→va'/vai, fare→fa'/fai, dare→da'/dai, dire→di', stare→sta'/stai.",
    explanationPl:
      'Tryb rozkazujący: Tu (ty): -are → -a, -ere → -i, -ire → -i. Lei (Pan/Pani): -are → -i, -ere → -a, -ire → -a (odwrotne końcówki!). Noi (my): jak czas teraźniejszy. Voi (wy): jak czas teraźniejszy. Przeczenie (tu): non + bezokolicznik (non parlare!). Przeczenie (Lei): non + forma rozkazująca (non parli!). Nieregularne (tu): andare→va\', fare→fa\', dare→da\', dire→di\', stare→sta\'.',
  },

  // LESSON 21: Future tense
  {
    id: 'a2-future',
    title: 'Il futuro semplice',
    titlePl: 'Czas przyszły prosty',
    level: 'A2',
    order: 21,
    concept: 'The future tense is used for future events, promises, and hypotheses.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Jutro będę mówił',
        answer: 'Domani parlerò',
        components: ['domani', 'parlerò'],
        hint: '-are: -erò, -erai, -erà, -eremo, -erete, -eranno',
      },
      {
        prompt: 'Jak powiesz: Będziesz czytał',
        answer: 'Leggerai',
        components: ['leggerai'],
        hint: '-ere: -erò, -erai, -erà, -eremo, -erete, -eranno',
      },
      {
        prompt: 'Jak powiesz: Ona wyjedzie',
        answer: 'Lei partirà',
        components: ['lei', 'partirà'],
        hint: '-ire: -irò, -irai, -irà, -iremo, -irete, -iranno',
      },
      {
        prompt: 'Jak powiesz: Będziemy jeść o 20',
        answer: 'Mangeremo alle venti',
        components: ['mangeremo', 'alle', 'venti'],
        hint: 'mangiare → mangerò (uwaga: -iare → -erò)',
      },
      {
        prompt: 'Jak powiesz: Będę miał czas',
        answer: 'Avrò tempo',
        components: ['avrò', 'tempo'],
        hint: 'avere → avrò (nieregularny)',
      },
      {
        prompt: 'Jak powiesz: Będziesz?',
        answer: 'Sarai?',
        components: ['sarai'],
        hint: 'essere → sarò (nieregularny)',
      },
      {
        prompt: 'Jak powiesz: Pójdziemy do kina',
        answer: 'Andremo al cinema',
        components: ['andremo', 'al', 'cinema'],
        hint: 'andare → andrò (nieregularny)',
      },
      {
        prompt: 'Jak powiesz: Zadzwonię do ciebie',
        answer: 'Ti chiamerò',
        components: ['ti', 'chiamerò'],
      },
      {
        prompt: 'Jak powiesz: Będzie pewnie w domu',
        answer: 'Sarà a casa',
        components: ['sarà', 'a', 'casa'],
        hint: 'Futuro może wyrażać przypuszczenie',
      },
      {
        prompt: 'Jak powiesz: Kiedy przyjdziesz, zadzwoń',
        answer: 'Quando arriverai, chiama',
        components: ['quando', 'arriverai', 'chiama'],
        hint: 'Po "quando" w przyszłości - futuro (inaczej niż po polsku)',
      },
    ],
    explanation:
      'Il futuro semplice: -are → -erò, -ere → -erò, -ire → -irò. Irregolari: essere→sarò, avere→avrò, andare→andrò, venire→verrò, fare→farò, potere→potrò, dovere→dovrò, volere→vorrò, sapere→saprò, vedere→vedrò, vivere→vivrò. Usi: azioni future, promesse, ipotesi, dubbio (Sarà vero?).',
    explanationPl:
      'Czas przyszły prosty: -are → -erò, -ere → -erò, -ire → -irò. Nieregularne: essere→sarò, avere→avrò, andare→andrò, venire→verrò, fare→farò, potere→potrò, dovere→dovrò, volere→vorrò, sapere→saprò, vedere→vedrò, vivere→vivrò. Użycie: przyszłe wydarzenia, obietnice, hipotezy, wątpliwości (Sarà vero? = Czy to prawda?). Po "quando" odnoszącym się do przyszłości = futuro (nie presente jak po polsku!).',
  },

  // LESSON 22: Conditional
  {
    id: 'a2-conditional',
    title: 'Il condizionale presente',
    titlePl: 'Tryb warunkowy teraźniejszy',
    level: 'A2',
    order: 22,
    concept: 'The conditional is used for polite requests, wishes, and hypothetical situations.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Chciałbym kawę',
        answer: 'Vorrei un caffè',
        components: ['vorrei', 'un', 'caffè'],
        hint: 'volere → vorrei (condizionale)',
      },
      {
        prompt: 'Jak powiesz: Mógłbyś mi pomóc?',
        answer: 'Potresti aiutarmi?',
        components: ['potresti', 'aiutarmi'],
      },
      {
        prompt: 'Jak powiesz: Powinienem studiować',
        answer: 'Dovrei studiare',
        components: ['dovrei', 'studiare'],
      },
      {
        prompt: 'Jak powiesz: Zjadłbym pizzę',
        answer: 'Mangerei una pizza',
        components: ['mangerei', 'una', 'pizza'],
        hint: '-are: -erei, -eresti, -erebbe, -eremmo, -ereste, -erebbero',
      },
      {
        prompt: 'Jak powiesz: On kupiłby dom',
        answer: 'Lui comprerebbe una casa',
        components: ['lui', 'comprerebbe', 'una', 'casa'],
      },
      {
        prompt: 'Jak powiesz: Pojechalibyśmy do Włoch',
        answer: 'Andremmo in Italia',
        components: ['andremmo', 'in', 'Italia'],
        hint: 'andare → andrei (nieregularny, jak futuro + końcówki)',
      },
      {
        prompt: 'Jak powiesz: Byłoby pięknie',
        answer: 'Sarebbe bello',
        components: ['sarebbe', 'bello'],
      },
      {
        prompt: 'Jak powiesz: Chciałbym pojechać do Rzymu',
        answer: 'Vorrei andare a Roma',
        components: ['vorrei', 'andare', 'a', 'Roma'],
      },
      {
        prompt: 'Jak powiesz: Na twoim miejscu studiowałbym więcej',
        answer: 'Al tuo posto studierei di più',
        components: ['al', 'tuo', 'posto', 'studierei', 'di', 'più'],
      },
      {
        prompt: 'Jak powiesz: Czy mógłby Pan powtórzyć?',
        answer: 'Potrebbe ripetere?',
        components: ['potrebbe', 'ripetere'],
      },
    ],
    explanation:
      'Il condizionale presente: stesse radici del futuro + desinenze -ei, -esti, -ebbe, -emmo, -este, -ebbero. Usi: desideri (vorrei), richieste cortesi (potrebbe), consigli (dovresti), ipotesi (sarebbe bello). Irregolari: come il futuro (essere→sarei, avere→avrei, andare→andrei, ecc.).',
    explanationPl:
      'Tryb warunkowy teraźniejszy: te same tematy co futuro + końcówki -ei, -esti, -ebbe, -emmo, -este, -ebbero. Użycie: życzenia (vorrei = chciałbym), grzeczne prośby (potrebbe = mógłby Pan), rady (dovresti = powinieneś), hipotezy (sarebbe bello = byłoby pięknie). Nieregularne: jak futuro (essere→sarei, avere→avrei, andare→andrei itd.).',
  },

  // ============================================================
  // B1 - LESSONS 23-32
  // ============================================================

  // LESSON 23: Subjunctive present
  {
    id: 'b1-congiuntivo-presente',
    title: 'Il congiuntivo presente',
    titlePl: 'Tryb łączący teraźniejszy',
    level: 'B1',
    order: 23,
    concept: 'The subjunctive is used after expressions of doubt, opinion, desire, emotion.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Myślę, że on jest miły',
        answer: 'Penso che lui sia gentile',
        components: ['penso', 'che', 'lui', 'sia', 'gentile'],
        hint: 'essere (congiuntivo): sia, sia, sia, siamo, siate, siano',
      },
      {
        prompt: 'Jak powiesz: Myślę, że on ma rację',
        answer: 'Penso che lui abbia ragione',
        components: ['penso', 'che', 'lui', 'abbia', 'ragione'],
        hint: 'avere (congiuntivo): abbia, abbia, abbia, abbiamo, abbiate, abbiano',
      },
      {
        prompt: 'Jak powiesz: Chcę, żebyś przyszedł',
        answer: 'Voglio che tu venga',
        components: ['voglio', 'che', 'tu', 'venga'],
        hint: 'venire (congiuntivo): venga',
      },
      {
        prompt: 'Jak powiesz: Cieszę się, że jesteś tutaj',
        answer: 'Sono contento che tu sia qui',
        components: ['sono', 'contento', 'che', 'tu', 'sia', 'qui'],
      },
      {
        prompt: 'Jak powiesz: Trzeba, żebyśmy mówili po włosku',
        answer: 'Bisogna che parliamo italiano',
        components: ['bisogna', 'che', 'parliamo', 'italiano'],
        hint: 'bisogna che + congiuntivo',
      },
      {
        prompt: 'Jak powiesz: Nie wierzę, że to prawda',
        answer: 'Non credo che sia vero',
        components: ['non', 'credo', 'che', 'sia', 'vero'],
      },
      {
        prompt: 'Jak powiesz: Boję się, że nie zdążymy',
        answer: 'Ho paura che non facciamo in tempo',
        components: ['ho', 'paura', 'che', 'non', 'facciamo', 'in', 'tempo'],
        hint: 'fare (congiuntivo): faccia, faccia, faccia, facciamo, facciate, facciano',
      },
      {
        prompt: 'Jak powiesz: Chociaż pada, wychodzę',
        answer: 'Sebbene piova, esco',
        components: ['sebbene', 'piova', 'esco'],
        hint: 'sebbene/benché + congiuntivo',
      },
      {
        prompt: 'Jak powiesz: Zanim wyjdą, chcę mówić',
        answer: 'Prima che escano, voglio parlare',
        components: ['prima', 'che', 'escano', 'voglio', 'parlare'],
        hint: 'prima che + congiuntivo',
      },
      {
        prompt: 'Jak powiesz: Wydaje mi się, że on rozumie',
        answer: 'Mi sembra che lui capisca',
        components: ['mi', 'sembra', 'che', 'lui', 'capisca'],
        hint: 'capire (congiuntivo): capisca',
      },
    ],
    explanation:
      'Il congiuntivo presente si usa dopo: opinioni (penso che, credo che), emozioni (sono felice che, ho paura che), desideri (voglio che), dubbi (dubito che), costruzioni impersonali (bisogna che, è necessario che), congiunzioni (sebbene, benché, prima che, affinché). Coniugazione: -are: -i, -i, -i, -iamo, -iate, -ino. -ere/-ire: -a, -a, -a, -iamo, -iate, -ano.',
    explanationPl:
      'Tryb łączący (congiuntivo) teraźniejszy używa się po: opiniach (penso che, credo che), emocjach (sono felice che, ho paura che), życzeniach (voglio che), wątpliwościach (dubito che), konstrukcjach bezosobowych (bisogna che, è necessario che), spójnikach (sebbene, benché, prima che, affinché). Odmiana: -are: -i, -i, -i, -iamo, -iate, -ino. -ere/-ire: -a, -a, -a, -iamo, -iate, -ano. Nieregularne: essere (sia), avere (abbia), fare (faccia), andare (vada), venire (venga), potere (possa), volere (voglia), dovere (debba).',
  },

  // LESSON 24: Combined pronouns
  {
    id: 'b1-combined-pronouns',
    title: 'I pronomi combinati',
    titlePl: 'Zaimki podwójne (kombinowane)',
    level: 'B1',
    order: 24,
    concept: 'When indirect + direct object pronouns combine, they form special double pronoun forms.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Daję ci to (m.)',
        answer: 'Te lo do',
        components: ['te', 'lo', 'do'],
        hint: 'ti + lo → te lo',
      },
      {
        prompt: 'Jak powiesz: Daję mu to (m.)',
        answer: 'Glielo do',
        components: ['glielo', 'do'],
        hint: 'gli + lo → glielo (pisze się razem)',
      },
      {
        prompt: 'Jak powiesz: Daję jej to (f.)',
        answer: 'Gliela do',
        components: ['gliela', 'do'],
        hint: 'le + la → gliela',
      },
      {
        prompt: 'Jak powiesz: Daj mi to! (m.)',
        answer: 'Dammelo!',
        components: ['dammelo'],
        hint: 'Da\' + mi + lo = dammelo (podwojona spółgłoska)',
      },
      {
        prompt: 'Jak powiesz: Mogę ci to powiedzieć',
        answer: 'Posso dirtelo',
        components: ['posso', 'dirtelo'],
        hint: 'Z bezokolicznikiem: dire + ti + lo = dirtelo',
      },
      {
        prompt: 'Jak powiesz: Powiem mu to jutro',
        answer: 'Glielo dirò domani',
        components: ['glielo', 'dirò', 'domani'],
      },
      {
        prompt: 'Jak powiesz: Dałem ci to wczoraj',
        answer: "Te l'ho dato ieri",
        components: ['te', "l'", 'ho', 'dato', 'ieri'],
        hint: 'W passato prossimo imiesłów zgadza się z dopełnieniem bliższym',
      },
      {
        prompt: 'Jak powiesz: Nie wysyłaj mu tego!',
        answer: 'Non glielo mandare!',
        components: ['non', 'glielo', 'mandare'],
        hint: 'Przeczenie imperatywu tu: non + infinito z zaimkami na końcu',
      },
      {
        prompt: 'Jak powiesz: Proszę nam to (f.) wyjaśnić',
        answer: 'Ce la spieghi, per favore',
        components: ['ce', 'la', 'spieghi', 'per', 'favore'],
        hint: 'ci + la → ce la',
      },
      {
        prompt: 'Jak powiesz: Pożyczyłem mu je (f.pl.)',
        answer: 'Gliele ho prestate',
        components: ['gliele', 'ho', 'prestate'],
      },
    ],
    explanation:
      'Quando un pronome indiretto precede un pronome diretto: mi→me, ti→te, ci→ce, vi→ve + lo/la/li/le/ne. Gli/le + lo/la/li/le/ne → glielo/gliela/glieli/gliele/gliene (scritti come una parola). Con l\'imperativo e l\'infinito i pronomi si attaccano al verbo.',
    explanationPl:
      'Gdy zaimek dopełnienia dalszego poprzedza zaimek dopełnienia bliższego: mi→me, ti→te, ci→ce, vi→ve + lo/la/li/le/ne. Gli/le + lo/la/li/le/ne → glielo/gliela/glieli/gliele/gliene (pisane razem). Z rozkazem i bezokolicznikiem zaimki łączą się z czasownikiem. W passato prossimo imiesłów zgadza się z dopełnieniem bliższym.',
  },

  // LESSON 25: Relative pronouns
  {
    id: 'b1-relative-pronouns',
    title: 'I pronomi relativi',
    titlePl: 'Zaimki względne',
    level: 'B1',
    order: 25,
    concept: 'Relative pronouns connect clauses and refer back to a noun.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Człowiek, który mówi',
        answer: "L'uomo che parla",
        components: ["l'", 'uomo', 'che', 'parla'],
        hint: 'che = który/która/które (podmiot lub dopełnienie bliższe)',
      },
      {
        prompt: 'Jak powiesz: Książka, którą czytam',
        answer: 'Il libro che leggo',
        components: ['il', 'libro', 'che', 'leggo'],
        hint: '"Che" zastępuje i podmiot, i dopełnienie bliższe',
      },
      {
        prompt: 'Jak powiesz: Kobieta, z którą mówię',
        answer: 'La donna con cui parlo',
        components: ['la', 'donna', 'con', 'cui', 'parlo'],
        hint: 'cui = z przyimkiem (di cui, a cui, con cui, in cui, per cui)',
      },
      {
        prompt: 'Jak powiesz: Miasto, w którym mieszkam',
        answer: 'La città in cui vivo',
        components: ['la', 'città', 'in', 'cui', 'vivo'],
      },
      {
        prompt: 'Jak powiesz: Powód, dla którego wyjechałem',
        answer: 'Il motivo per cui sono partito',
        components: ['il', 'motivo', 'per', 'cui', 'sono', 'partito'],
      },
      {
        prompt: 'Jak powiesz: Chłopak, którego ojciec jest lekarzem',
        answer: 'Il ragazzo il cui padre è medico',
        components: ['il', 'ragazzo', 'il', 'cui', 'padre', 'è', 'medico'],
        hint: 'il/la cui = którego/której (dzierżawcze)',
      },
      {
        prompt: 'Jak powiesz: To, co mówisz, jest prawdą',
        answer: 'Quello che dici è vero',
        components: ['quello', 'che', 'dici', 'è', 'vero'],
        hint: 'quello che / ciò che = to, co',
      },
      {
        prompt: 'Jak powiesz: Ktokolwiek przyjdzie, będzie mile widziany',
        answer: 'Chiunque venga sarà benvenuto',
        components: ['chiunque', 'venga', 'sarà', 'benvenuto'],
        hint: 'chiunque = ktokolwiek (+ congiuntivo)',
      },
      {
        prompt: 'Jak powiesz: Wszystko, czego potrzebuję',
        answer: 'Tutto ciò di cui ho bisogno',
        components: ['tutto', 'ciò', 'di', 'cui', 'ho', 'bisogno'],
      },
      {
        prompt: 'Jak powiesz: Film, który obejrzeliśmy, był piękny',
        answer: 'Il film che abbiamo visto era bello',
        components: ['il', 'film', 'che', 'abbiamo', 'visto', 'era', 'bello'],
      },
    ],
    explanation:
      'Pronomi relativi: "che" (soggetto o oggetto diretto: który/a/e), "cui" (con preposizione: di cui, a cui, con cui, in cui, per cui), "il/la quale, i/le quali" (forma formale di che/cui), "il/la cui" (possessivo: którego/której). "Quello che" / "ciò che" = to, co. "Chi" = ten, kto.',
    explanationPl:
      'Zaimki względne: "che" (podmiot lub dopełnienie bliższe - który/a/e), "cui" (z przyimkiem: di cui - o którym, a cui - któremu, con cui - z którym, in cui - w którym, per cui - dla którego), "il/la quale, i/le quali" (formalna forma che/cui), "il/la cui" (dzierżawczy - którego/której). "Quello che" / "ciò che" = to, co. "Chi" = ten, kto.',
  },

  // LESSON 26: Passato remoto
  {
    id: 'b1-passato-remoto',
    title: 'Il passato remoto',
    titlePl: 'Czas przeszły odległy',
    level: 'B1',
    order: 26,
    concept: 'The passato remoto is used for completed past actions, especially in literature and Southern Italy.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Powiedziałem (passato remoto)',
        answer: 'Dissi',
        components: ['dissi'],
        hint: 'dire → dissi (nieregularny)',
      },
      {
        prompt: 'Jak powiesz: On poszedł (passato remoto)',
        answer: 'Lui andò',
        components: ['lui', 'andò'],
        hint: 'andare → andai, andasti, andò, andammo, andaste, andarono',
      },
      {
        prompt: 'Jak powiesz: Ona była (passato remoto)',
        answer: 'Lei fu',
        components: ['lei', 'fu'],
        hint: 'essere → fui, fosti, fu, fummo, foste, furono',
      },
      {
        prompt: 'Jak powiesz: Miałem (passato remoto)',
        answer: 'Ebbi',
        components: ['ebbi'],
        hint: 'avere → ebbi, avesti, ebbe, avemmo, aveste, ebbero',
      },
      {
        prompt: 'Jak powiesz: Mówili (passato remoto)',
        answer: 'Parlarono',
        components: ['parlarono'],
        hint: '-are: -ai, -asti, -ò, -ammo, -aste, -arono',
      },
      {
        prompt: 'Jak powiesz: On napisał (passato remoto)',
        answer: 'Lui scrisse',
        components: ['lui', 'scrisse'],
        hint: 'scrivere → scrissi, scrivesti, scrisse...',
      },
      {
        prompt: 'Jak powiesz: Kolumb odkrył Amerykę',
        answer: "Colombo scoprì l'America",
        components: ['Colombo', 'scoprì', "l'", 'America'],
      },
      {
        prompt: 'Jak powiesz: Dante napisał Boską Komedię',
        answer: 'Dante scrisse la Divina Commedia',
        components: ['Dante', 'scrisse', 'la', 'Divina', 'Commedia'],
      },
      {
        prompt: 'Jak powiesz: Zrobili rewolucję',
        answer: 'Fecero la rivoluzione',
        components: ['fecero', 'la', 'rivoluzione'],
        hint: 'fare → feci, facesti, fece, facemmo, faceste, fecero',
      },
      {
        prompt: 'Jak powiesz: Urodził się w 1265',
        answer: 'Nacque nel 1265',
        components: ['nacque', 'nel', '1265'],
        hint: 'nascere → nacqui, nascesti, nacque...',
      },
    ],
    explanation:
      'Il passato remoto si usa per azioni completate nel passato, soprattutto nella lingua scritta e nell\'Italia meridionale. Coniugazione regolare: -are: -ai/-asti/-ò/-ammo/-aste/-arono. -ere: -ei(-etti)/-esti/-é(-ette)/-emmo/-este/-erono(-ettero). -ire: -ii/-isti/-ì/-immo/-iste/-irono. Irregolari comuni: essere (fui), avere (ebbi), fare (feci), dire (dissi), scrivere (scrissi), nascere (nacqui), venire (venni).',
    explanationPl:
      'Passato remoto używa się dla zakończonych czynności przeszłych, szczególnie w literaturze i w południowych Włoszech. W mowie potocznej północnych Włoch zastępuje je passato prossimo. Odmiana regularna: -are: -ai/-asti/-ò/-ammo/-aste/-arono. -ere: -ei(-etti)/-esti/-é(-ette)/-emmo/-este/-erono(-ettero). -ire: -ii/-isti/-ì/-immo/-iste/-irono. Nieregularne: essere (fui), avere (ebbi), fare (feci), dire (dissi), scrivere (scrissi), nascere (nacqui), venire (venni).',
  },

  // LESSON 27: Trapassato prossimo
  {
    id: 'b1-trapassato-prossimo',
    title: 'Il trapassato prossimo',
    titlePl: 'Czas zaprzeszły',
    level: 'B1',
    order: 27,
    concept: 'The trapassato prossimo expresses an action completed before another past action.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Już zjadłem (zanim przyszedłeś)',
        answer: 'Avevo già mangiato',
        components: ['avevo', 'già', 'mangiato'],
        hint: 'imperfetto di avere/essere + participio passato',
      },
      {
        prompt: 'Jak powiesz: Była już wyjechała',
        answer: 'Era già partita',
        components: ['era', 'già', 'partita'],
        hint: 'Z essere: imperfetto di essere + participio (zgadza się z podmiotem)',
      },
      {
        prompt: 'Jak powiesz: Kiedy przyjechałem, oni już poszli',
        answer: 'Quando sono arrivato, loro erano già andati',
        components: ['quando', 'sono', 'arrivato', 'loro', 'erano', 'già', 'andati'],
      },
      {
        prompt: 'Jak powiesz: Nie wiedziałem, że zadzwoniłeś',
        answer: 'Non sapevo che avevi chiamato',
        components: ['non', 'sapevo', 'che', 'avevi', 'chiamato'],
      },
      {
        prompt: 'Jak powiesz: Powiedział, że widział film',
        answer: 'Ha detto che aveva visto il film',
        components: ['ha', 'detto', 'che', 'aveva', 'visto', 'il', 'film'],
      },
      {
        prompt: 'Jak powiesz: Nigdy wcześniej nie byłem we Włoszech',
        answer: 'Non ero mai stato in Italia',
        components: ['non', 'ero', 'mai', 'stato', 'in', 'Italia'],
      },
      {
        prompt: 'Jak powiesz: Po tym jak skończyliśmy, wyszliśmy',
        answer: 'Dopo che avevamo finito, siamo usciti',
        components: ['dopo', 'che', 'avevamo', 'finito', 'siamo', 'usciti'],
      },
      {
        prompt: 'Jak powiesz: Znaleźli portfel, który zgubiłem',
        answer: 'Hanno trovato il portafoglio che avevo perso',
        components: ['hanno', 'trovato', 'il', 'portafoglio', 'che', 'avevo', 'perso'],
      },
      {
        prompt: 'Jak powiesz: Byliśmy zmęczeni, bo dużo pracowaliśmy',
        answer: 'Eravamo stanchi perché avevamo lavorato molto',
        components: ['eravamo', 'stanchi', 'perché', 'avevamo', 'lavorato', 'molto'],
      },
      {
        prompt: 'Jak powiesz: Zapomniałem, że jej obiecałem',
        answer: 'Avevo dimenticato che le avevo promesso',
        components: ['avevo', 'dimenticato', 'che', 'le', 'avevo', 'promesso'],
      },
    ],
    explanation:
      "Il trapassato prossimo si forma con l'imperfetto di avere/essere + participio passato. Si usa per indicare un'azione completata prima di un'altra azione passata. Con essere: il participio concorda con il soggetto.",
    explanationPl:
      'Trapassato prossimo (czas zaprzeszły) tworzy się przez imperfetto od avere/essere + participio passato. Używa się go do wskazania czynności zakończonej PRZED inną czynnością w przeszłości. Z essere: imiesłów zgadza się z podmiotem. Odpowiada polskiemu "byłem zrobił" / "już zrobiłem (zanim...)".',
  },

  // LESSON 28: Gerund and progressive
  {
    id: 'b1-gerund-progressive',
    title: 'Il gerundio e la forma progressiva',
    titlePl: 'Gerundium i forma ciągła (stare + gerundio)',
    level: 'B1',
    order: 28,
    concept: 'The gerund combined with stare creates the progressive form for ongoing actions.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Mówię (w tym momencie)',
        answer: 'Sto parlando',
        components: ['sto', 'parlando'],
        hint: 'stare + gerundio (-ando dla -are)',
      },
      {
        prompt: 'Jak powiesz: Co robisz? (właśnie teraz)',
        answer: 'Cosa stai facendo?',
        components: ['cosa', 'stai', 'facendo'],
        hint: 'fare → facendo (nieregularne)',
      },
      {
        prompt: 'Jak powiesz: On czyta (właśnie)',
        answer: 'Sta leggendo',
        components: ['sta', 'leggendo'],
        hint: '-ere → -endo',
      },
      {
        prompt: 'Jak powiesz: Oni śpią (teraz)',
        answer: 'Stanno dormendo',
        components: ['stanno', 'dormendo'],
        hint: '-ire → -endo',
      },
      {
        prompt: 'Jak powiesz: Pada deszcz (teraz)',
        answer: 'Sta piovendo',
        components: ['sta', 'piovendo'],
      },
      {
        prompt: 'Jak powiesz: Jadąc do domu, widziałem wypadek',
        answer: 'Andando a casa, ho visto un incidente',
        components: ['andando', 'a', 'casa', 'ho', 'visto', 'un', 'incidente'],
        hint: 'Gerundio samodzielny = "jadąc/idąc/robiąc"',
      },
      {
        prompt: 'Jak powiesz: Słuchając muzyki, pracuję lepiej',
        answer: 'Ascoltando la musica, lavoro meglio',
        components: ['ascoltando', 'la', 'musica', 'lavoro', 'meglio'],
      },
      {
        prompt: 'Jak powiesz: Pijąc kawę (forma)',
        answer: 'Bevendo un caffè',
        components: ['bevendo', 'un', 'caffè'],
        hint: 'bere → bevendo',
      },
      {
        prompt: 'Jak powiesz: Właśnie jadłem, kiedy zadzwonił telefon',
        answer: 'Stavo mangiando quando è squillato il telefono',
        components: ['stavo', 'mangiando', 'quando', 'è', 'squillato', 'il', 'telefono'],
        hint: 'stare w imperfetto + gerundio = byłem w trakcie...',
      },
      {
        prompt: 'Jak powiesz: Mówię do ciebie (z zaimkiem)',
        answer: 'Ti sto parlando',
        components: ['ti', 'sto', 'parlando'],
        hint: 'Zaimek przed stare LUB połączony z gerundio (sto parlandoti)',
      },
    ],
    explanation:
      'Il gerundio: -are → -ando, -ere → -endo, -ire → -endo. Irregolari: fare→facendo, bere→bevendo, dire→dicendo. La forma progressiva: stare (presente/imperfetto) + gerundio indica un\'azione in corso. Il gerundio autonomo esprime modo, causa, tempo (parlando = mówiąc). I pronomi possono precedere stare o attaccarsi al gerundio.',
    explanationPl:
      'Gerundium: -are → -ando, -ere → -endo, -ire → -endo. Nieregularne: fare→facendo, bere→bevendo, dire→dicendo. Forma ciągła: stare (presente/imperfetto) + gerundio wskazuje na czynność w trakcie wykonywania. Gerundium samodzielne wyraża sposób, przyczynę, czas (parlando = mówiąc). Zaimki mogą stać przed stare lub łączyć się z gerundium.',
  },

  // LESSON 29: Si impersonale
  {
    id: 'b1-si-impersonale',
    title: 'Il si impersonale e passivante',
    titlePl: 'Konstrukcja bezosobowa z "si"',
    level: 'B1',
    order: 29,
    concept: 'The impersonal "si" is used to express general truths, rules, and what "people" or "one" does.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Tutaj mówi się po włosku',
        answer: 'Qui si parla italiano',
        components: ['qui', 'si', 'parla', 'italiano'],
        hint: 'si + 3 os. l.poj. = bezosobowo (ludzie mówią / mówi się)',
      },
      {
        prompt: 'Jak powiesz: Jak się mówi "dom" po włosku?',
        answer: 'Come si dice "casa" in italiano?',
        components: ['come', 'si', 'dice', 'casa', 'in', 'italiano'],
      },
      {
        prompt: 'Jak powiesz: Tutaj nie wolno palić',
        answer: 'Qui non si può fumare',
        components: ['qui', 'non', 'si', 'può', 'fumare'],
      },
      {
        prompt: 'Jak powiesz: We Włoszech je się dobrze',
        answer: 'In Italia si mangia bene',
        components: ['in', 'Italia', 'si', 'mangia', 'bene'],
      },
      {
        prompt: 'Jak powiesz: Tutaj sprzedaje się książki',
        answer: 'Qui si vendono libri',
        components: ['qui', 'si', 'vendono', 'libri'],
        hint: 'si passivante: z l.mn. rzeczownika czasownik w l.mn.',
      },
      {
        prompt: 'Jak powiesz: Tutaj się dobrze żyje',
        answer: 'Qui si vive bene',
        components: ['qui', 'si', 'vive', 'bene'],
      },
      {
        prompt: 'Jak powiesz: Jak się dochodzi na dworzec?',
        answer: 'Come si arriva alla stazione?',
        components: ['come', 'si', 'arriva', 'alla', 'stazione'],
      },
      {
        prompt: 'Jak powiesz: Mówi się, że będzie padać',
        answer: 'Si dice che pioverà',
        components: ['si', 'dice', 'che', 'pioverà'],
      },
      {
        prompt: 'Jak powiesz: Kiedy jest się zmęczonym, trzeba odpocząć',
        answer: 'Quando si è stanchi, bisogna riposare',
        components: ['quando', 'si', 'è', 'stanchi', 'bisogna', 'riposare'],
        hint: 'Z "si" bezosobowym przymiotnik w l.mn.!',
      },
      {
        prompt: 'Jak powiesz: Szuka się kelnerów',
        answer: 'Si cercano camerieri',
        components: ['si', 'cercano', 'camerieri'],
      },
    ],
    explanation:
      "Il \"si\" impersonale + verbo alla 3a persona singolare esprime azioni generali (si dice, si mangia, si vive). Il \"si\" passivante si usa con un soggetto: si + verbo che concorda con il soggetto (si vendono libri). Con essere + aggettivo, l'aggettivo va al plurale (si è contenti).",
    explanationPl:
      'Konstrukcja "si" bezosobowe + czasownik w 3 os. l.poj. wyraża ogólne czynności (si dice = mówi się, si mangia = je się). "Si" pasywizujące z podmiotem: si + czasownik zgadzający się z podmiotem (si vendono libri = sprzedaje się książki). Z essere + przymiotnik, przymiotnik w l.mn. (si è contenti = jest się zadowolonym). Odpowiada polskim formom bezosobowym z "się".',
  },

  // LESSON 30: Congiuntivo imperfetto
  {
    id: 'b1-congiuntivo-imperfetto',
    title: 'Il congiuntivo imperfetto',
    titlePl: 'Tryb łączący w imperfetto',
    level: 'B1',
    order: 30,
    concept: 'The imperfect subjunctive is used for past wishes, hypotheses, and after past tense main verbs.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Gdybym był bogaty',
        answer: 'Se fossi ricco',
        components: ['se', 'fossi', 'ricco'],
        hint: 'essere (cong. imp.): fossi, fossi, fosse, fossimo, foste, fossero',
      },
      {
        prompt: 'Jak powiesz: Gdybym miał czas',
        answer: 'Se avessi tempo',
        components: ['se', 'avessi', 'tempo'],
        hint: 'avere (cong. imp.): avessi, avessi, avesse, avessimo, aveste, avessero',
      },
      {
        prompt: 'Jak powiesz: Chciałem, żebyś przyszedł',
        answer: 'Volevo che tu venissi',
        components: ['volevo', 'che', 'tu', 'venissi'],
        hint: 'venire (cong. imp.): venissi',
      },
      {
        prompt: 'Jak powiesz: Gdyby on mówił po włosku',
        answer: 'Se lui parlasse italiano',
        components: ['se', 'lui', 'parlasse', 'italiano'],
        hint: '-are: -assi, -assi, -asse, -assimo, -aste, -assero',
      },
      {
        prompt: 'Jak powiesz: Myślałem, że byłeś chory',
        answer: 'Pensavo che tu fossi malato',
        components: ['pensavo', 'che', 'tu', 'fossi', 'malato'],
      },
      {
        prompt: 'Jak powiesz: Gdybyśmy mogli podróżować',
        answer: 'Se potessimo viaggiare',
        components: ['se', 'potessimo', 'viaggiare'],
        hint: '-ere: -essi, -essi, -esse, -essimo, -este, -essero',
      },
      {
        prompt: 'Jak powiesz: Gdyby oni wiedzieli',
        answer: 'Se loro sapessero',
        components: ['se', 'loro', 'sapessero'],
      },
      {
        prompt: 'Jak powiesz: Oby padało!',
        answer: 'Magari piovesse!',
        components: ['magari', 'piovesse'],
        hint: 'magari + cong. imperfetto = oby / gdyby tak',
      },
      {
        prompt: 'Jak powiesz: Gdybym był na twoim miejscu',
        answer: 'Se fossi al tuo posto',
        components: ['se', 'fossi', 'al', 'tuo', 'posto'],
      },
      {
        prompt: 'Jak powiesz: Nie wiedziałem, że on tam mieszkał',
        answer: 'Non sapevo che lui abitasse lì',
        components: ['non', 'sapevo', 'che', 'lui', 'abitasse', 'lì'],
      },
    ],
    explanation:
      'Il congiuntivo imperfetto: -are: -assi/-assi/-asse/-assimo/-aste/-assero. -ere: -essi/-essi/-esse/-essimo/-este/-essero. -ire: -issi/-issi/-isse/-issimo/-iste/-issero. Irregolari: essere (fossi), avere (avessi), dare (dessi), stare (stessi), fare (facessi), dire (dicessi), bere (bevessi). Si usa dopo verbi al passato, nel periodo ipotetico (se + cong. imp., condizionale), con "magari" per desideri.',
    explanationPl:
      'Congiuntivo imperfetto: -are: -assi/-assi/-asse/-assimo/-aste/-assero. -ere: -essi/-essi/-esse/-essimo/-este/-essero. -ire: -issi/-issi/-isse/-issimo/-iste/-issero. Nieregularne: essere (fossi), avere (avessi), dare (dessi), stare (stessi), fare (facessi), dire (dicessi), bere (bevessi). Użycie: po czasownikach w przeszłości (pensavo che...), w zdaniach warunkowych (se fossi..., sarei...), z "magari" dla życzeń.',
  },

  // LESSON 31: Periodo ipotetico
  {
    id: 'b1-periodo-ipotetico',
    title: 'Il periodo ipotetico',
    titlePl: 'Zdania warunkowe (okres warunkowy)',
    level: 'B1',
    order: 31,
    concept: 'Italian has three types of conditional sentences for real, possible, and unreal conditions.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Jeśli pada, biorę parasol',
        answer: "Se piove, prendo l'ombrello",
        components: ['se', 'piove', 'prendo', "l'", 'ombrello'],
        hint: 'I tipo (realtà): se + presente, presente/futuro',
      },
      {
        prompt: 'Jak powiesz: Jeśli będziesz studiował, zdasz',
        answer: 'Se studierai, passerai',
        components: ['se', 'studierai', 'passerai'],
        hint: 'I tipo: se + futuro, futuro',
      },
      {
        prompt: 'Jak powiesz: Gdybym miał pieniądze, kupiłbym dom',
        answer: 'Se avessi soldi, comprerei una casa',
        components: ['se', 'avessi', 'soldi', 'comprerei', 'una', 'casa'],
        hint: 'II tipo (possibilità): se + cong. imperfetto, condizionale',
      },
      {
        prompt: 'Jak powiesz: Gdybym był na twoim miejscu, nie robiłbym tego',
        answer: 'Se fossi al tuo posto, non lo farei',
        components: ['se', 'fossi', 'al', 'tuo', 'posto', 'non', 'lo', 'farei'],
      },
      {
        prompt: 'Jak powiesz: Gdybym mógł, pojechałbym do Włoch',
        answer: 'Se potessi, andrei in Italia',
        components: ['se', 'potessi', 'andrei', 'in', 'Italia'],
      },
      {
        prompt: 'Jak powiesz: Gdybym wiedział, powiedziałbym ci',
        answer: 'Se lo sapessi, te lo direi',
        components: ['se', 'lo', 'sapessi', 'te', 'lo', 'direi'],
      },
      {
        prompt: 'Jak powiesz: Gdybyś był tu wczoraj, widziałbyś to (ale nie byłeś)',
        answer: 'Se fossi stato qui ieri, lo avresti visto',
        components: ['se', 'fossi', 'stato', 'qui', 'ieri', 'lo', 'avresti', 'visto'],
        hint: 'III tipo (irrealtà passata): se + cong. trapassato, condiz. passato',
      },
      {
        prompt: 'Jak powiesz: Gdybym studiował więcej, zdałbym egzamin',
        answer: "Se avessi studiato di più, avrei passato l'esame",
        components: ['se', 'avessi', 'studiato', 'di', 'più', 'avrei', 'passato', "l'", 'esame'],
      },
      {
        prompt: 'Jak powiesz: Jeśli chcesz, możemy wyjść',
        answer: 'Se vuoi, possiamo uscire',
        components: ['se', 'vuoi', 'possiamo', 'uscire'],
      },
      {
        prompt: 'Jak powiesz: Gdyby nie padało, poszlibyśmy na spacer',
        answer: 'Se non piovesse, andremmo a fare una passeggiata',
        components: ['se', 'non', 'piovesse', 'andremmo', 'a', 'fare', 'una', 'passeggiata'],
      },
    ],
    explanation:
      'Il periodo ipotetico ha tre tipi: I tipo (realtà): se + indicativo presente/futuro, indicativo presente/futuro/imperativo. II tipo (possibilità): se + congiuntivo imperfetto, condizionale presente. III tipo (irrealtà nel passato): se + congiuntivo trapassato, condizionale passato.',
    explanationPl:
      'Okres warunkowy ma trzy typy: I typ (realne warunki): se + indicativo presente/futuro, indicativo presente/futuro/imperativo. II typ (możliwość, hipoteza): se + congiuntivo imperfetto, condizionale presente. III typ (nierealność w przeszłości): se + congiuntivo trapassato, condizionale passato. Uwaga: po "se" NIGDY nie używamy condizionale (błąd częsty u obcokrajowców).',
  },

  // LESSON 32: Passive voice
  {
    id: 'b1-passive-voice',
    title: 'La forma passiva',
    titlePl: 'Strona bierna',
    level: 'B1',
    order: 32,
    concept: 'The passive voice shifts focus from the agent to the receiver of the action.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Pizza jest jedzona (je się)',
        answer: 'La pizza è mangiata',
        components: ['la', 'pizza', 'è', 'mangiata'],
        hint: 'essere + participio passato (zgadza się z podmiotem)',
      },
      {
        prompt: 'Jak powiesz: Książka została napisana przez Eco',
        answer: 'Il libro è stato scritto da Eco',
        components: ['il', 'libro', 'è', 'stato', 'scritto', 'da', 'Eco'],
        hint: 'da = przez (agent w stronie biernej)',
      },
      {
        prompt: 'Jak powiesz: Okno zostało otwarte',
        answer: 'La finestra è stata aperta',
        components: ['la', 'finestra', 'è', 'stata', 'aperta'],
      },
      {
        prompt: 'Jak powiesz: Muzeum zostanie zbudowane',
        answer: 'Il museo verrà costruito',
        components: ['il', 'museo', 'verrà', 'costruito'],
        hint: 'venire + participio = alternatywa dla essere w czasach prostych',
      },
      {
        prompt: 'Jak powiesz: Film został nagrodzony',
        answer: 'Il film è stato premiato',
        components: ['il', 'film', 'è', 'stato', 'premiato'],
      },
      {
        prompt: 'Jak powiesz: Dzieci były kochane przez rodziców',
        answer: 'I bambini erano amati dai genitori',
        components: ['i', 'bambini', 'erano', 'amati', 'dai', 'genitori'],
        hint: 'dai = da + i',
      },
      {
        prompt: 'Jak powiesz: Włoski jest mówiony we Włoszech',
        answer: "L'italiano viene parlato in Italia",
        components: ["l'", 'italiano', 'viene', 'parlato', 'in', 'Italia'],
      },
      {
        prompt: 'Jak powiesz: Drzwi zostały zamknięte',
        answer: 'La porta è stata chiusa',
        components: ['la', 'porta', 'è', 'stata', 'chiusa'],
      },
      {
        prompt: 'Jak powiesz: Ci studenci będą przyjęci',
        answer: 'Questi studenti verranno accettati',
        components: ['questi', 'studenti', 'verranno', 'accettati'],
      },
      {
        prompt: 'Jak powiesz: Tort został zrobiony przez mamę',
        answer: 'La torta è stata fatta dalla mamma',
        components: ['la', 'torta', 'è', 'stata', 'fatta', 'dalla', 'mamma'],
      },
    ],
    explanation:
      'La forma passiva: soggetto + essere/venire + participio passato (+ da + agente). Essere si usa in tutti i tempi. Venire si usa solo nei tempi semplici (presente, imperfetto, futuro, ecc.). Andare + participio passato esprime obbligo (va fatto = deve essere fatto). Il participio concorda sempre con il soggetto.',
    explanationPl:
      'Strona bierna: podmiot + essere/venire + participio passato (+ da + wykonawca). Essere używa się we wszystkich czasach. Venire używa się tylko w czasach prostych (presente, imperfetto, futuro). Andare + participio passato wyraża obowiązek (va fatto = musi być zrobione). Imiesłów zawsze zgadza się z podmiotem w rodzaju i liczbie.',
  },

  // ============================================================
  // B2+ - LESSONS 33-40
  // ============================================================

  // LESSON 33: Congiuntivo trapassato
  {
    id: 'b2-congiuntivo-trapassato',
    title: 'Il congiuntivo trapassato',
    titlePl: 'Tryb łączący zaprzeszły',
    level: 'B2',
    order: 33,
    concept: 'The past perfect subjunctive expresses unrealized past possibilities and regrets.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Gdybym był studiował (ale nie studiowałem)',
        answer: 'Se avessi studiato',
        components: ['se', 'avessi', 'studiato'],
        hint: 'cong. imperfetto di avere/essere + participio passato',
      },
      {
        prompt: 'Jak powiesz: Gdybym tam był pojechał',
        answer: 'Se fossi andato',
        components: ['se', 'fossi', 'andato'],
      },
      {
        prompt: 'Jak powiesz: Myślałem, że byłeś przyjechał',
        answer: 'Pensavo che tu fossi arrivato',
        components: ['pensavo', 'che', 'tu', 'fossi', 'arrivato'],
      },
      {
        prompt: 'Jak powiesz: Gdybym był wiedział, nie przyszedłbym',
        answer: 'Se avessi saputo, non sarei venuto',
        components: ['se', 'avessi', 'saputo', 'non', 'sarei', 'venuto'],
      },
      {
        prompt: 'Jak powiesz: Oby był zrozumiał!',
        answer: 'Magari avesse capito!',
        components: ['magari', 'avesse', 'capito'],
      },
      {
        prompt: 'Jak powiesz: Nie wierzyłem, że ona skończyła',
        answer: 'Non credevo che lei avesse finito',
        components: ['non', 'credevo', 'che', 'lei', 'avesse', 'finito'],
      },
      {
        prompt: 'Jak powiesz: Gdybyśmy byli wcześniej wiedzieli, uniknęlibyśmy problemu',
        answer: 'Se avessimo saputo prima, avremmo evitato il problema',
        components: ['se', 'avessimo', 'saputo', 'prima', 'avremmo', 'evitato', 'il', 'problema'],
      },
      {
        prompt: 'Jak powiesz: Był zaskoczony, że oni przyjechali',
        answer: 'Era sorpreso che loro fossero venuti',
        components: ['era', 'sorpreso', 'che', 'loro', 'fossero', 'venuti'],
      },
      {
        prompt: 'Jak powiesz: Gdyby nie padało wczoraj, wyszlibyśmy',
        answer: 'Se non avesse piovuto ieri, saremmo usciti',
        components: ['se', 'non', 'avesse', 'piovuto', 'ieri', 'saremmo', 'usciti'],
      },
      {
        prompt: 'Jak powiesz: Chociaż przeczytał książkę, nie zrozumiał',
        answer: 'Benché avesse letto il libro, non ha capito',
        components: ['benché', 'avesse', 'letto', 'il', 'libro', 'non', 'ha', 'capito'],
      },
    ],
    explanation:
      "Il congiuntivo trapassato si forma con il congiuntivo imperfetto di avere/essere + participio passato. Si usa: nel periodo ipotetico del III tipo (se avessi saputo...), dopo verbi di opinione al passato (pensavo che avesse...), con \"magari\" per rimpianti (magari fosse venuto!), dopo congiunzioni che richiedono il congiuntivo quando l'azione è anteriore.",
    explanationPl:
      'Congiuntivo trapassato tworzy się przez congiuntivo imperfetto od avere/essere + participio passato. Użycie: w III typie okresu warunkowego (se avessi saputo... = gdybym był wiedział...), po czasownikach opinii w przeszłości (pensavo che avesse... = myślałem, że...), z "magari" dla żalu (magari fosse venuto! = oby był przyszedł!), po spójnikach wymagających congiuntivo gdy czynność jest wcześniejsza.',
  },

  // LESSON 34: Concordanza dei tempi
  {
    id: 'b2-concordanza-tempi',
    title: 'La concordanza dei tempi',
    titlePl: 'Następstwo czasów',
    level: 'B2',
    order: 34,
    concept: 'The sequence of tenses determines which subjunctive/indicative tense to use in dependent clauses.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Myślę, że on jest chory (teraz)',
        answer: 'Penso che sia malato',
        components: ['penso', 'che', 'sia', 'malato'],
        hint: 'Zdanie główne w presente → cong. presente (jednoczesność)',
      },
      {
        prompt: 'Jak powiesz: Myślę, że on był chory (wcześniej)',
        answer: 'Penso che sia stato malato',
        components: ['penso', 'che', 'sia', 'stato', 'malato'],
        hint: 'Zdanie główne w presente → cong. passato (wcześniej)',
      },
      {
        prompt: 'Jak powiesz: Myślę, że on będzie chory (później)',
        answer: 'Penso che sarà malato',
        components: ['penso', 'che', 'sarà', 'malato'],
        hint: 'Zdanie główne w presente → futuro (później)',
      },
      {
        prompt: 'Jak powiesz: Myślałem, że on jest chory (jednocześnie)',
        answer: 'Pensavo che fosse malato',
        components: ['pensavo', 'che', 'fosse', 'malato'],
        hint: 'Zdanie główne w passato → cong. imperfetto (jednoczesność)',
      },
      {
        prompt: 'Jak powiesz: Myślałem, że on był chory (wcześniej)',
        answer: 'Pensavo che fosse stato malato',
        components: ['pensavo', 'che', 'fosse', 'stato', 'malato'],
        hint: 'Zdanie główne w passato → cong. trapassato (wcześniej)',
      },
      {
        prompt: 'Jak powiesz: Myślałem, że przyjdzie (później)',
        answer: 'Pensavo che sarebbe venuto',
        components: ['pensavo', 'che', 'sarebbe', 'venuto'],
        hint: 'Zdanie główne w passato → condizionale passato (później)',
      },
      {
        prompt: 'Jak powiesz: Powiedział, że jutro przyjdzie',
        answer: 'Ha detto che sarebbe venuto domani',
        components: ['ha', 'detto', 'che', 'sarebbe', 'venuto', 'domani'],
        hint: 'Zdanie podrzędne o przyszłości z perspektywy przeszłości = condizionale passato',
      },
      {
        prompt: 'Jak powiesz: Wiedziałem, że masz rację',
        answer: 'Sapevo che avevi ragione',
        components: ['sapevo', 'che', 'avevi', 'ragione'],
        hint: 'Po sapere, vedere = indicativo (nie congiuntivo)',
      },
      {
        prompt: 'Jak powiesz: Mam nadzieję, że zdasz',
        answer: "Spero che tu superi l'esame",
        components: ['spero', 'che', 'tu', 'superi', "l'", 'esame'],
      },
      {
        prompt: 'Jak powiesz: Miałem nadzieję, że zdasz',
        answer: "Speravo che tu superassi l'esame",
        components: ['speravo', 'che', 'tu', 'superassi', "l'", 'esame'],
      },
    ],
    explanation:
      "La concordanza dei tempi: se il verbo principale è al presente: contemporaneità → cong. presente, anteriorità → cong. passato, posteriorità → futuro/cong. presente. Se il verbo principale è al passato: contemporaneità → cong. imperfetto, anteriorità → cong. trapassato, posteriorità → condizionale passato. Con verbi di certezza (sapere, vedere) si usa l'indicativo.",
    explanationPl:
      'Następstwo czasów: gdy czasownik główny w presente: jednoczesność → cong. presente, wcześniej → cong. passato, później → futuro/cong. presente. Gdy czasownik główny w passato: jednoczesność → cong. imperfetto, wcześniej → cong. trapassato, później → condizionale passato. Po czasownikach pewności (sapere, vedere) używa się indicativo. Ta zasada nie istnieje w polskim, więc wymaga szczególnej uwagi.',
  },

  // LESSON 35: Discorso indiretto
  {
    id: 'b2-discorso-indiretto',
    title: 'Il discorso indiretto',
    titlePl: 'Mowa zależna',
    level: 'B2',
    order: 35,
    concept: 'Indirect speech reports what someone said, requiring tense and pronoun shifts.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: On mówi: "Jestem zmęczony" → On mówi, że jest zmęczony',
        answer: 'Dice che è stanco',
        components: ['dice', 'che', 'è', 'stanco'],
        hint: 'Zdanie główne w presente: czasy się nie zmieniają',
      },
      {
        prompt: 'Jak powiesz: Powiedział, że jest zmęczony',
        answer: 'Ha detto che era stanco',
        components: ['ha', 'detto', 'che', 'era', 'stanco'],
        hint: 'Zdanie główne w passato: presente → imperfetto',
      },
      {
        prompt: 'Jak powiesz: Powiedziała: "Kupię dom" → Powiedziała, że kupi dom',
        answer: 'Ha detto che avrebbe comprato una casa',
        components: ['ha', 'detto', 'che', 'avrebbe', 'comprato', 'una', 'casa'],
        hint: 'Futuro → condizionale passato',
      },
      {
        prompt: 'Jak powiesz: Powiedział: "Już zjadłem" → Powiedział, że już zjadł',
        answer: 'Ha detto che aveva già mangiato',
        components: ['ha', 'detto', 'che', 'aveva', 'già', 'mangiato'],
        hint: 'Passato prossimo → trapassato prossimo',
      },
      {
        prompt: 'Jak powiesz: Spytała: "Gdzie mieszkasz?" → Spytała, gdzie mieszkam',
        answer: 'Ha chiesto dove abitavo',
        components: ['ha', 'chiesto', 'dove', 'abitavo'],
        hint: 'Pytanie → że/gdzie/kiedy + indicativo',
      },
      {
        prompt: 'Jak powiesz: Powiedział mi, żebym przyszedł',
        answer: 'Mi ha detto di venire',
        components: ['mi', 'ha', 'detto', 'di', 'venire'],
        hint: 'Rozkaz w mowie zależnej: di + infinito',
      },
      {
        prompt: 'Jak powiesz: Spytał mnie, czy chcę kawę',
        answer: 'Mi ha chiesto se volevo un caffè',
        components: ['mi', 'ha', 'chiesto', 'se', 'volevo', 'un', 'caffè'],
        hint: 'Pytanie tak/nie: se + indicativo',
      },
      {
        prompt: 'Jak powiesz: Poprosił mnie, żebym nie wychodził',
        answer: 'Mi ha chiesto di non uscire',
        components: ['mi', 'ha', 'chiesto', 'di', 'non', 'uscire'],
      },
      {
        prompt: 'Jak powiesz: Obiecali, że przyjdą',
        answer: 'Hanno promesso che sarebbero venuti',
        components: ['hanno', 'promesso', 'che', 'sarebbero', 'venuti'],
      },
      {
        prompt: 'Jak powiesz: Ona twierdziła, że nie wiedziała',
        answer: 'Lei sosteneva che non sapeva',
        components: ['lei', 'sosteneva', 'che', 'non', 'sapeva'],
      },
    ],
    explanation:
      "Discorso indiretto: quando il verbo principale è al passato, i tempi cambiano: presente→imperfetto, passato prossimo→trapassato prossimo, futuro→condizionale passato, imperativo→di + infinito. Cambiano anche: questo→quello, qui→lì, oggi→quel giorno, domani→il giorno dopo, ieri→il giorno prima. Le domande si introducono con 'se' (sì/no) o con la parola interrogativa.",
    explanationPl:
      'Mowa zależna: gdy zdanie główne w przeszłości, czasy się przesuwają: presente→imperfetto, passato prossimo→trapassato prossimo, futuro→condizionale passato, imperativo→di + infinito. Zmieniają się też: questo→quello, qui→lì, oggi→quel giorno, domani→il giorno dopo, ieri→il giorno prima. Pytania wprowadza się przez "se" (tak/nie) lub zaimek pytający.',
  },

  // LESSON 36: Causative (fare + infinitive)
  {
    id: 'b2-causative',
    title: 'La costruzione causativa',
    titlePl: 'Konstrukcja sprawcza (fare/lasciare + bezokolicznik)',
    level: 'B2',
    order: 36,
    concept: 'Fare + infinitive expresses causing someone to do something; lasciare + infinitive means letting someone do something.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Naprawiam samochód (ktoś to robi za mnie)',
        answer: 'Faccio riparare la macchina',
        components: ['faccio', 'riparare', 'la', 'macchina'],
        hint: 'fare + infinito = zlecać, kazać zrobić',
      },
      {
        prompt: 'Jak powiesz: Daję dzieciom jeść (karmię dzieci)',
        answer: 'Faccio mangiare i bambini',
        components: ['faccio', 'mangiare', 'i', 'bambini'],
      },
      {
        prompt: 'Jak powiesz: Każę mu mówić',
        answer: 'Lo faccio parlare',
        components: ['lo', 'faccio', 'parlare'],
        hint: 'Zaimek przed fare (nie przed infinitivem)',
      },
      {
        prompt: 'Jak powiesz: Kazałem naprawić samochód mechanikowi',
        answer: 'Ho fatto riparare la macchina al meccanico',
        components: ['ho', 'fatto', 'riparare', 'la', 'macchina', 'al', 'meccanico'],
        hint: 'Wykonawca z "a" gdy jest też dopełnienie bliższe, z "da" w innych wypadkach',
      },
      {
        prompt: 'Jak powiesz: Pozwól mi mówić',
        answer: 'Lasciami parlare',
        components: ['lasciami', 'parlare'],
        hint: 'lasciare + infinito = pozwalać',
      },
      {
        prompt: 'Jak powiesz: Pozwolił dzieciom grać',
        answer: 'Ha lasciato giocare i bambini',
        components: ['ha', 'lasciato', 'giocare', 'i', 'bambini'],
      },
      {
        prompt: 'Jak powiesz: Ten film mnie rozśmieszył',
        answer: 'Quel film mi ha fatto ridere',
        components: ['quel', 'film', 'mi', 'ha', 'fatto', 'ridere'],
        hint: 'fare + infinito = sprawiać, że ktoś coś robi',
      },
      {
        prompt: 'Jak powiesz: Daj mi wiedzieć (daj znać)',
        answer: 'Fammi sapere',
        components: ['fammi', 'sapere'],
        hint: 'fa\' + mi = fammi',
      },
      {
        prompt: 'Jak powiesz: Kazał go wypuścić',
        answer: 'Lo ha fatto uscire',
        components: ['lo', 'ha', 'fatto', 'uscire'],
      },
      {
        prompt: 'Jak powiesz: Nie każę ci czekać',
        answer: 'Non ti faccio aspettare',
        components: ['non', 'ti', 'faccio', 'aspettare'],
      },
    ],
    explanation:
      'La costruzione causativa: "fare + infinito" esprime il far fare qualcosa a qualcuno. "Lasciare + infinito" esprime il permettere. I pronomi vanno prima di fare/lasciare (coniugato). Quando c\'è sia l\'oggetto diretto sia l\'agente: l\'oggetto con fare, l\'agente introdotto da "a" o "da". Al passato: fare usa sempre avere (ho fatto riparare).',
    explanationPl:
      'Konstrukcja sprawcza: "fare + bezokolicznik" wyraża kazanie / sprawianie, że ktoś coś robi. "Lasciare + bezokolicznik" wyraża pozwalanie. Zaimki stoją PRZED fare/lasciare (odmienionym). Gdy jest dopełnienie bliższe i wykonawca: dopełnienie bliższe normalnie, wykonawca z "a" lub "da". W passato prossimo fare zawsze z avere (ho fatto riparare). Nie mylić z polskim "robić" - to specjalna konstrukcja sprawcza.',
  },

  // LESSON 37: Advanced preposition usage
  {
    id: 'b2-advanced-prepositions',
    title: 'Le preposizioni: usi avanzati',
    titlePl: 'Zaawansowane użycie przyimków',
    level: 'B2',
    order: 37,
    concept: 'Advanced preposition usage including fixed expressions and verbs requiring specific prepositions.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Zaczynam pracować',
        answer: 'Comincio a lavorare',
        components: ['comincio', 'a', 'lavorare'],
        hint: 'cominciare/iniziare A + infinito',
      },
      {
        prompt: 'Jak powiesz: Przestaję palić',
        answer: 'Smetto di fumare',
        components: ['smetto', 'di', 'fumare'],
        hint: 'smettere/finire DI + infinito',
      },
      {
        prompt: 'Jak powiesz: Próbuję zrozumieć',
        answer: 'Cerco di capire',
        components: ['cerco', 'di', 'capire'],
        hint: 'cercare DI + infinito',
      },
      {
        prompt: 'Jak powiesz: Udaje mi się mówić po włosku',
        answer: 'Riesco a parlare italiano',
        components: ['riesco', 'a', 'parlare', 'italiano'],
        hint: 'riuscire A + infinito',
      },
      {
        prompt: 'Jak powiesz: Uczę się pływać',
        answer: 'Imparo a nuotare',
        components: ['imparo', 'a', 'nuotare'],
        hint: 'imparare A + infinito',
      },
      {
        prompt: 'Jak powiesz: Zainteresowany architekturą',
        answer: "Interessato all'architettura",
        components: ['interessato', "all'", 'architettura'],
        hint: 'interessato A',
      },
      {
        prompt: 'Jak powiesz: Zależy od pogody',
        answer: 'Dipende dal tempo',
        components: ['dipende', 'dal', 'tempo'],
        hint: 'dipendere DA',
      },
      {
        prompt: 'Jak powiesz: Mimo deszczu wyszedłem',
        answer: 'Nonostante la pioggia, sono uscito',
        components: ['nonostante', 'la', 'pioggia', 'sono', 'uscito'],
        hint: 'nonostante + rzeczownik (bez przyimka)',
      },
      {
        prompt: 'Jak powiesz: Dzięki twojej pomocy',
        answer: 'Grazie al tuo aiuto',
        components: ['grazie', 'al', 'tuo', 'aiuto'],
        hint: 'grazie A',
      },
      {
        prompt: 'Jak powiesz: Zamiast studiować, gra',
        answer: 'Invece di studiare, gioca',
        components: ['invece', 'di', 'studiare', 'gioca'],
        hint: 'invece di + infinito',
      },
    ],
    explanation:
      "Verbi + preposizione + infinito: A: cominciare a, riuscire a, imparare a, continuare a, andare a, provare a, aiutare a. DI: cercare di, smettere di, finire di, decidere di, sperare di, dimenticare di, avere paura di, avere bisogno di, avere voglia di. Espressioni: grazie a, invece di, nonostante (senza prep.), a causa di, in base a, rispetto a, di fronte a, a proposito di.",
    explanationPl:
      'Czasowniki + przyimek + bezokolicznik: A: cominciare a (zaczynać), riuscire a (udawać się), imparare a (uczyć się), continuare a (kontynuować), provare a (próbować), aiutare a (pomagać). DI: cercare di (szukać/próbować), smettere di (przestawać), finire di (kończyć), decidere di (decydować), sperare di (mieć nadzieję), dimenticare di (zapominać). Wyrażenia: grazie a (dzięki), invece di (zamiast), nonostante (mimo), a causa di (z powodu), in base a (na podstawie).',
  },

  // LESSON 38: Connettori del discorso
  {
    id: 'b2-connectors',
    title: 'I connettori del discorso',
    titlePl: 'Spójniki i łączniki wypowiedzi',
    level: 'B2',
    order: 38,
    concept: 'Discourse connectors elevate speech and writing by linking ideas logically.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Jednakże nie zgadzam się',
        answer: 'Tuttavia non sono d\'accordo',
        components: ['tuttavia', 'non', 'sono', "d'", 'accordo'],
        hint: 'tuttavia = jednakże, niemniej jednak',
      },
      {
        prompt: 'Jak powiesz: Dlatego muszę wyjechać',
        answer: 'Pertanto devo partire',
        components: ['pertanto', 'devo', 'partire'],
        hint: 'pertanto = dlatego, zatem (formalny)',
      },
      {
        prompt: 'Jak powiesz: Mimo że pada, wychodzę',
        answer: 'Nonostante piova, esco',
        components: ['nonostante', 'piova', 'esco'],
        hint: 'nonostante + congiuntivo',
      },
      {
        prompt: 'Jak powiesz: Ponadto chciałbym dodać',
        answer: 'Inoltre vorrei aggiungere',
        components: ['inoltre', 'vorrei', 'aggiungere'],
        hint: 'inoltre = ponadto, poza tym',
      },
      {
        prompt: 'Jak powiesz: Z jednej strony... z drugiej strony',
        answer: "Da un lato... dall'altro lato",
        components: ['da', 'un', 'lato', "dall'", 'altro', 'lato'],
      },
      {
        prompt: 'Jak powiesz: W rzeczywistości to nieprawda',
        answer: 'In realtà non è vero',
        components: ['in', 'realtà', 'non', 'è', 'vero'],
        hint: 'in realtà = w rzeczywistości',
      },
      {
        prompt: 'Jak powiesz: Co więcej, jest za drogo',
        answer: 'Per di più, è troppo caro',
        components: ['per', 'di', 'più', 'è', 'troppo', 'caro'],
        hint: 'per di più = co więcej',
      },
      {
        prompt: 'Jak powiesz: Krótko mówiąc',
        answer: 'In breve',
        components: ['in', 'breve'],
      },
      {
        prompt: 'Jak powiesz: Chociaż jest trudno, kontynuuję',
        answer: 'Pur essendo difficile, continuo',
        components: ['pur', 'essendo', 'difficile', 'continuo'],
        hint: 'pur + gerundio = chociaż/mimo że',
      },
      {
        prompt: 'Jak powiesz: Podsumowując, był to dobry rok',
        answer: 'In conclusione, è stato un buon anno',
        components: ['in', 'conclusione', 'è', 'stato', 'un', 'buon', 'anno'],
      },
    ],
    explanation:
      'Connettori avversativi: tuttavia, eppure, nonostante (ciò), comunque, malgrado, pur + gerundio. Connettori causali/consecutivi: pertanto, quindi, perciò, dunque, di conseguenza, dato che, visto che, poiché. Connettori aggiuntivi: inoltre, per di più, in aggiunta. Connettori conclusivi: in conclusione, in breve, insomma, in sostanza. Connettori esplicativi: cioè, ovvero, in realtà, infatti.',
    explanationPl:
      'Spójniki przeciwstawne: tuttavia (jednakże), eppure (a jednak), nonostante ciò (mimo to), comunque (w każdym razie), malgrado (mimo). Spójniki przyczynowo-skutkowe: pertanto (zatem), quindi (więc), perciò (dlatego), dunque (zatem), di conseguenza (w konsekwencji). Spójniki dodające: inoltre (ponadto), per di più (co więcej). Spójniki podsumowujące: in conclusione (podsumowując), in breve (krótko mówiąc), insomma (jednym słowem). Spójniki wyjaśniające: cioè (czyli), in realtà (w rzeczywistości), infatti (w istocie).',
  },

  // LESSON 39: Registro formale vs informale
  {
    id: 'b2-formal-informal',
    title: 'Registro formale e informale',
    titlePl: 'Rejestr formalny i nieformalny',
    level: 'B2',
    order: 39,
    concept: 'Italian distinguishes between formal (Lei) and informal (tu) registers in vocabulary and grammar.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Jak się masz? (nieformalnie)',
        answer: 'Come stai?',
        components: ['come', 'stai'],
        hint: 'Tu = nieformalny',
      },
      {
        prompt: 'Jak powiesz: Jak się Pan/Pani miewa? (formalnie)',
        answer: 'Come sta?',
        components: ['come', 'sta'],
        hint: 'Lei = formalny (3 os. l.poj.)',
      },
      {
        prompt: 'Jak powiesz: Proszę usiąść (formalnie)',
        answer: 'Si accomodi',
        components: ['si', 'accomodi'],
        hint: 'Imperativo formale: congiuntivo 3 os.',
      },
      {
        prompt: 'Jak powiesz: Usiądź (nieformalnie)',
        answer: 'Siediti',
        components: ['siediti'],
      },
      {
        prompt: 'Jak powiesz: Czy mógłby Pan mi powiedzieć...?',
        answer: 'Potrebbe dirmi...?',
        components: ['potrebbe', 'dirmi'],
        hint: 'Condizionale = grzeczniejszy',
      },
      {
        prompt: 'Jak powiesz: Szanowny Panie (w liście)',
        answer: 'Egregio Signore',
        components: ['egregio', 'signore'],
        hint: 'Egregio/a = szanowny/a (bardzo formalnie)',
      },
      {
        prompt: 'Jak powiesz: Pozdrawiam (w liście formalnym)',
        answer: 'Cordiali saluti',
        components: ['cordiali', 'saluti'],
      },
      {
        prompt: 'Jak powiesz: Cześć (pozdrowienia, w liście nieformalnym)',
        answer: 'Un abbraccio',
        components: ['un', 'abbraccio'],
        hint: 'Dosłownie: uścisk',
      },
      {
        prompt: 'Jak powiesz: Z poważaniem (bardzo formalnie)',
        answer: 'Distinti saluti',
        components: ['distinti', 'saluti'],
      },
      {
        prompt: 'Jak powiesz: Chciałbym Pana prosić o informację',
        answer: "Vorrei chiederLe un'informazione",
        components: ['vorrei', 'chiederLe', "un'", 'informazione'],
        hint: 'Le (wielka litera) = Panu/Pani (formalny zaimek)',
      },
    ],
    explanation:
      "Registro formale (Lei): usa la 3a persona singolare, congiuntivo per l'imperativo, condizionale per le richieste, pronomi Lei/Le/La (spesso maiuscoli). Formule formali: Egregio/a, Gentilissimo/a, La prego, Cordiali saluti, Distinti saluti. Registro informale (tu): usa la 2a persona, imperativo diretto, indicativo. Formule informali: Ciao, A presto, Un abbraccio, Baci.",
    explanationPl:
      'Rejestr formalny (Lei): 3 os. l.poj., congiuntivo w rozkazach, condizionale w prośbach, zaimki Lei/Le/La (często wielką literą). Formuły formalne: Egregio/a (szanowny/a), Gentilissimo/a (drogi/a), La prego (proszę), Cordiali saluti (pozdrowienia), Distinti saluti (z poważaniem). Rejestr nieformalny (tu): 2 os., bezpośredni rozkaźnik, indicativo. Formuły nieformalne: Ciao, A presto, Un abbraccio (uścisk), Baci (buziaki). Uwaga: we Włoszech forma Lei jest bardziej powszechna niż polski Pan/Pani - używa się jej nawet w sklepach.',
  },

  // LESSON 40: Subjunctive in complex clauses
  {
    id: 'b2-subjunctive-complex',
    title: 'Il congiuntivo nelle frasi complesse',
    titlePl: 'Congiuntivo w złożonych konstrukcjach zdaniowych',
    level: 'B2',
    order: 40,
    concept: 'The subjunctive appears in many complex clause types beyond basic opinion/emotion triggers.',
    buildingBlocks: [
      {
        prompt: 'Jak powiesz: Cokolwiek powiesz, nie zmienię zdania',
        answer: 'Qualunque cosa tu dica, non cambierò idea',
        components: ['qualunque', 'cosa', 'tu', 'dica', 'non', 'cambierò', 'idea'],
        hint: 'qualunque/qualsiasi + congiuntivo',
      },
      {
        prompt: 'Jak powiesz: Gdziekolwiek pójdziesz, pójdę z tobą',
        answer: 'Ovunque tu vada, verrò con te',
        components: ['ovunque', 'tu', 'vada', 'verrò', 'con', 'te'],
        hint: 'ovunque + congiuntivo = gdziekolwiek',
      },
      {
        prompt: 'Jak powiesz: Czekam, aż on przyjdzie',
        answer: 'Aspetto che lui arrivi',
        components: ['aspetto', 'che', 'lui', 'arrivi'],
        hint: 'aspettare che + congiuntivo',
      },
      {
        prompt: 'Jak powiesz: Jest to jedyna osoba, która to rozumie',
        answer: "È l'unica persona che lo capisca",
        components: ['è', "l'", 'unica', 'persona', 'che', 'lo', 'capisca'],
        hint: 'Po superlatywach i unico/solo + che + congiuntivo',
      },
      {
        prompt: 'Jak powiesz: Żebyś zrozumiał (cel)',
        answer: 'Affinché tu capisca',
        components: ['affinché', 'tu', 'capisca'],
        hint: 'affinché/perché (cel) + congiuntivo',
      },
      {
        prompt: 'Jak powiesz: Chyba że on zadzwoni',
        answer: 'A meno che lui non chiami',
        components: ['a', 'meno', 'che', 'lui', 'non', 'chiami'],
        hint: 'a meno che (non) + congiuntivo = chyba że',
      },
      {
        prompt: 'Jak powiesz: Pod warunkiem, że zgodzisz się',
        answer: 'A patto che tu sia d\'accordo',
        components: ['a', 'patto', 'che', 'tu', 'sia', "d'", 'accordo'],
        hint: 'a patto che / a condizione che + congiuntivo',
      },
      {
        prompt: 'Jak powiesz: Mówię wolno, żebyś zrozumiał',
        answer: 'Parlo lentamente affinché tu capisca',
        components: ['parlo', 'lentamente', 'affinché', 'tu', 'capisca'],
      },
      {
        prompt: 'Jak powiesz: Jest najpiękniejszym miastem, jakie kiedykolwiek widziałem',
        answer: 'È la città più bella che io abbia mai visto',
        components: ['è', 'la', 'città', 'più', 'bella', 'che', 'io', 'abbia', 'mai', 'visto'],
        hint: 'Po superlatywach + che + congiuntivo',
      },
      {
        prompt: 'Jak powiesz: Nie ma nikogo, kto mógłby mi pomóc',
        answer: 'Non c\'è nessuno che possa aiutarmi',
        components: ['non', "c'", 'è', 'nessuno', 'che', 'possa', 'aiutarmi'],
        hint: 'Po przeczeniu + pronome relativo + congiuntivo',
      },
    ],
    explanation:
      "Il congiuntivo si usa anche: dopo pronomi/aggettivi indefiniti (qualunque, chiunque, ovunque, comunque), dopo il superlativo relativo (è il più bello che abbia visto), dopo frasi negative + che (non c'è nessuno che...), dopo congiunzioni: affinché/perché (scopo), a meno che (non), a patto che, a condizione che, prima che, purché, senza che, nel caso che.",
    explanationPl:
      'Congiuntivo używa się również: po zaimkach/przymiotnikach nieokreślonych (qualunque = jakikolwiek, chiunque = ktokolwiek, ovunque = gdziekolwiek, comunque = jakkolwiek), po superlatywie względnym (è il più bello che abbia visto = najpiękniejszy, jaki widziałem), po przeczeniach + che (non c\'è nessuno che...), po spójnikach: affinché/perché + cong. (żeby - cel), a meno che non (chyba że), a patto che (pod warunkiem że), a condizione che (pod warunkiem że), prima che (zanim), purché (byle), senza che (bez tego, żeby), nel caso che (w razie gdyby).',
  },
];
