import { useState, useRef, useEffect } from 'react';
import type { CEFRLevel } from '../types';
import { speakItalian, stopSpeaking, isSpeechSupported } from '../engine/tts';

interface ListeningClip {
  id: string;
  title: string;
  level: CEFRLevel;
  italian: string;
  polish: string;
  questions: { question: string; options: string[]; correct: number; explanation: string }[];
  vocabulary: { word: string; meaning: string }[];
}

const CLIPS: ListeningClip[] = [
  {
    id: 'l01', title: 'Benvenuto al mercato', level: 'A1',
    italian: 'Buongiorno! Vorrei un chilo di pomodori e mezzo chilo di mele, per favore. Quanto costano? I pomodori costano due euro al chilo e le mele un euro e cinquanta. Ecco tre euro e cinquanta. Grazie mille! Prego, buona giornata!',
    polish: 'Dzień dobry! Poproszę kilogram pomidorów i pół kilograma jabłek. Ile kosztują? Pomidory kosztują dwa euro za kilogram, a jabłka euro pięćdziesiąt. Proszę trzy euro pięćdziesiąt. Dziękuję bardzo! Proszę, miłego dnia!',
    questions: [
      { question: 'Ile kilo pomidorów kupuje klient?', options: ['Pół kilograma', 'Jeden kilogram', 'Dwa kilogramy', 'Trzy kilogramy'], correct: 1, explanation: 'Klient mówi "un chilo di pomodori" — jeden kilogram pomidorów.' },
      { question: 'Ile kosztują jabłka za kilogram?', options: ['1€', '1,50€', '2€', '3,50€'], correct: 1, explanation: '"Le mele un euro e cinquanta" — jabłka kosztują euro pięćdziesiąt za kg.' },
      { question: 'Ile łącznie płaci klient?', options: ['2€', '3€', '3,50€', '4€'], correct: 2, explanation: 'Klient daje "tre euro e cinquanta" — trzy euro pięćdziesiąt.' },
    ],
    vocabulary: [{ word: 'vorrei', meaning: 'chciałbym/chciałabym' }, { word: 'chilo', meaning: 'kilogram' }, { word: 'pomodori', meaning: 'pomidory' }, { word: 'costano', meaning: 'kosztują' }, { word: 'prego', meaning: 'proszę/nie ma za co' }],
  },
  {
    id: 'l02', title: 'Una telefonata', level: 'A1',
    italian: 'Pronto? Chi parla? Sono Mario. Posso parlare con Luigi? Luigi non c\'è in questo momento. Vuoi lasciare un messaggio? Sì, digli di richiamarmi quando torna. D\'accordo, glielo dico. Grazie, arrivederci!',
    polish: 'Halo? Kto mówi? Jestem Mario. Czy mogę rozmawiać z Luigim? Luigi nie ma go teraz. Chcesz zostawić wiadomość? Tak, powiedz mu żeby do mnie oddzwonił kiedy wróci. Dobrze, powiem mu. Dziękuję, do widzenia!',
    questions: [
      { question: 'Jak nazywa się osoba dzwoniąca?', options: ['Luigi', 'Mario', 'Marco', 'Anna'], correct: 1, explanation: '"Sono Mario" — dzwoniący przedstawia się jako Mario.' },
      { question: 'Co chce zrobić Mario?', options: ['Zostawić wiadomość', 'Przyjść osobiście', 'Wysłać email', 'Zadzwonić później'], correct: 0, explanation: 'Mario chce zostawić wiadomość: "Vuoi lasciare un messaggio? Sì".' },
      { question: 'Co ma zrobić Luigi?', options: ['Napisać emaila', 'Oddzwonić do Maria', 'Przyjść do biura', 'Zadzwonić do kogoś innego'], correct: 1, explanation: '"Digli di richiamarmi" — powiedz mu żeby do mnie oddzwonił.' },
    ],
    vocabulary: [{ word: 'pronto', meaning: 'halo (przez telefon)' }, { word: 'chi parla', meaning: 'kto mówi' }, { word: 'lasciare un messaggio', meaning: 'zostawić wiadomość' }, { word: 'richiamarmi', meaning: 'oddzwonić do mnie' }, { word: 'd\'accordo', meaning: 'dobrze/zgadzam się' }],
  },
  {
    id: 'l03', title: 'Prenotazione al ristorante', level: 'A2',
    italian: 'Ristorante La Bella Italia, buonasera. Buonasera, vorrei prenotare un tavolo per quattro persone per sabato sera alle otto. Un momento... Sì, abbiamo disponibilità. A che nome? Rossi, Marco Rossi. Perfetto, signor Rossi. Tavolo per quattro sabato alle venti. Confermiamo la prenotazione. Grazie mille, a sabato!',
    polish: 'Restauracja La Bella Italia, dobry wieczór. Dobry wieczór, chciałbym zarezerwować stolik dla czterech osób na sobotni wieczór na godzinę ósmą. Chwilę... Tak, mamy wolne miejsca. Na jakie nazwisko? Rossi, Marco Rossi. Doskonale, panie Rossi. Stolik dla czterech osób w sobotę o dwudziestej. Potwierdzamy rezerwację. Dziękuję bardzo, do soboty!',
    questions: [
      { question: 'Na ile osób jest rezerwacja?', options: ['Dwie', 'Trzy', 'Cztery', 'Pięć'], correct: 2, explanation: '"Un tavolo per quattro persone" — stolik dla czterech osób.' },
      { question: 'Na który dzień jest rezerwacja?', options: ['Piątek', 'Sobota', 'Niedziela', 'Środa'], correct: 1, explanation: '"Per sabato sera" — na sobotni wieczór.' },
      { question: 'Na która godzinę?', options: ['19:00', '20:00', '21:00', '22:00'], correct: 1, explanation: '"Alle otto" = 20:00 w systemie 24-godzinnym — o dwudziestej.' },
    ],
    vocabulary: [{ word: 'prenotare', meaning: 'zarezerwować' }, { word: 'tavolo', meaning: 'stolik' }, { word: 'disponibilità', meaning: 'dostępność' }, { word: 'confermiamo', meaning: 'potwierdzamy' }, { word: 'a sabato', meaning: 'do soboty' }],
  },
  {
    id: 'l04', title: 'In farmacia', level: 'A2',
    italian: 'Buongiorno, posso aiutarla? Sì, ho mal di testa da due giorni. Ho anche la febbre, trentotto e mezzo. Ha altri sintomi? Sì, ho il naso che cola e mi fa male la gola. Capisco. Le do un antidolorifico e uno sciroppo per la tosse. Deve prendere una compressa ogni sei ore. Se la febbre non passa in due giorni, vada dal medico.',
    polish: 'Dzień dobry, czy mogę pomóc? Tak, mam ból głowy od dwóch dni. Mam też gorączkę, trzydzieści osiem i pół. Czy ma pan inne objawy? Tak, mam katar i boli mnie gardło. Rozumiem. Dam panu środek przeciwbólowy i syrop na kaszel. Musi pan brać jedną tabletkę co sześć godzin. Jeśli gorączka nie minie w ciągu dwóch dni, proszę pójść do lekarza.',
    questions: [
      { question: 'Od ilu dni pacjent ma ból głowy?', options: ['Jednego dnia', 'Dwóch dni', 'Trzech dni', 'Tygodnia'], correct: 1, explanation: '"Da due giorni" — od dwóch dni.' },
      { question: 'Jaka jest temperatura pacjenta?', options: ['37,5°C', '38°C', '38,5°C', '39°C'], correct: 2, explanation: '"Trentotto e mezzo" — trzydzieści osiem i pół stopnia.' },
      { question: 'Jak często brać tabletkę?', options: ['Co 4 godziny', 'Co 6 godzin', 'Co 8 godzin', 'Co 12 godzin'], correct: 1, explanation: '"Ogni sei ore" — co sześć godzin.' },
    ],
    vocabulary: [{ word: 'mal di testa', meaning: 'ból głowy' }, { word: 'febbre', meaning: 'gorączka' }, { word: 'naso che cola', meaning: 'katar' }, { word: 'antidolorifico', meaning: 'środek przeciwbólowy' }, { word: 'compressa', meaning: 'tabletka' }],
  },
  {
    id: 'l05', title: 'Il meteo', level: 'A2',
    italian: 'Buonasera, ecco le previsioni del tempo per domani. Al nord Italia avremo cielo nuvoloso con possibilità di pioggia nel pomeriggio. Temperature tra i dieci e i quindici gradi. Al centro Italia sole e bel tempo, con temperature gradevoli intorno ai venti gradi. Al sud e nelle isole invece avremo vento forte e mare agitato. Portate un ombrello se siete al nord!',
    polish: 'Dobry wieczór, oto prognoza pogody na jutro. Na północy Włoch będzie zachmurzone niebo z możliwością deszczu po południu. Temperatury między dziesięć a piętnaście stopni. W środkowych Włoszech słońce i ładna pogoda, z przyjemnymi temperaturami około dwudziestu stopni. Na południu i na wyspach natomiast będzie silny wiatr i wzburzone morze. Weźcie parasol jeśli jesteście na północy!',
    questions: [
      { question: 'Jaka pogoda będzie na północy Włoch?', options: ['Słoneczna', 'Pochmurna z deszczem', 'Wietrzna', 'Śnieżna'], correct: 1, explanation: '"Cielo nuvoloso con possibilità di pioggia" — pochmurne niebo z możliwością deszczu.' },
      { question: 'Jaka temperatura w środkowych Włoszech?', options: ['10-15°C', 'Około 20°C', '25-30°C', 'Poniżej 10°C'], correct: 1, explanation: '"Intorno ai venti gradi" — około dwudziestu stopni.' },
      { question: 'Co zaleca prezenter dla osób na północy?', options: ['Krem do opalania', 'Parasol', 'Ciepły płaszcz', 'Buty gumowe'], correct: 1, explanation: '"Portate un ombrello se siete al nord" — weźcie parasol jeśli jesteście na północy.' },
    ],
    vocabulary: [{ word: 'previsioni del tempo', meaning: 'prognoza pogody' }, { word: 'nuvoloso', meaning: 'pochmurny' }, { word: 'pioggia', meaning: 'deszcz' }, { word: 'vento forte', meaning: 'silny wiatr' }, { word: 'mare agitato', meaning: 'wzburzone morze' }],
  },
  {
    id: 'l06', title: 'Notizie dal giornale radio', level: 'B1',
    italian: 'Buongiorno, sono le otto di mattina e queste sono le principali notizie. Il governo ha approvato ieri il nuovo piano economico che prevede investimenti per venti miliardi di euro nelle infrastrutture del paese. Il Parlamento dovrà ora ratificare il provvedimento entro la fine del mese. Sul fronte internazionale, i leader dei paesi del G7 si riuniranno la prossima settimana per discutere della crisi climatica. In campo sportivo, la nazionale italiana di calcio ha vinto tre a uno contro la Spagna in una partita amichevole disputata ieri sera a Milano.',
    polish: 'Dzień dobry, jest godzina ósma rano i oto główne wiadomości. Rząd zatwierdził wczoraj nowy plan ekonomiczny przewidujący inwestycje o wartości dwudziestu miliardów euro w infrastrukturę kraju. Parlament musi teraz ratyfikować przepis do końca miesiąca. Na arenie międzynarodowej, przywódcy krajów G7 spotkają się w przyszłym tygodniu, aby omówić kryzys klimatyczny. W sporcie, włoska reprezentacja w piłce nożnej wygrała trzy do jednego z Hiszpanią w meczu towarzyskim rozgrywanym wczoraj wieczorem w Mediolanie.',
    questions: [
      { question: 'Ile miliardów euro przewiduje plan ekonomiczny?', options: ['Dziesięć', 'Piętnaście', 'Dwadzieścia', 'Trzydzieści'], correct: 2, explanation: '"Venti miliardi di euro" — dwadzieścia miliardów euro.' },
      { question: 'Kiedy musi ratyfikować Parlament?', options: ['Do końca tygodnia', 'Do końca miesiąca', 'Do końca roku', 'Za trzy miesiące'], correct: 1, explanation: '"Entro la fine del mese" — do końca miesiąca.' },
      { question: 'Jaki wynik miał mecz Włochy-Hiszpania?', options: ['1:0', '2:1', '3:0', '3:1'], correct: 3, explanation: '"Ha vinto tre a uno" — wygrała trzy do jednego.' },
    ],
    vocabulary: [{ word: 'ha approvato', meaning: 'zatwierdził' }, { word: 'provvedimento', meaning: 'przepis/zarządzenie' }, { word: 'ratificare', meaning: 'ratyfikować' }, { word: 'crisi climatica', meaning: 'kryzys klimatyczny' }, { word: 'partita amichevole', meaning: 'mecz towarzyski' }],
  },
  {
    id: 'l07', title: 'Una conferenza universitaria', level: 'B1',
    italian: 'Oggi parleremo dell\'impatto dei social media sulla salute mentale dei giovani. Le ricerche degli ultimi anni mostrano una correlazione significativa tra l\'uso eccessivo dei social network e l\'aumento dei casi di ansia e depressione tra gli adolescenti. Uno studio pubblicato recentemente ha seguito duemila ragazzi tra i quattordici e i diciotto anni per tre anni. I risultati indicano che chi usa i social più di tre ore al giorno ha il doppio delle probabilità di sviluppare problemi psicologici rispetto a chi li usa meno di un\'ora.',
    polish: 'Dziś porozmawiamy o wpływie mediów społecznościowych na zdrowie psychiczne młodych ludzi. Badania z ostatnich lat pokazują znaczącą korelację między nadmiernym korzystaniem z sieci społecznościowych a wzrostem przypadków lęku i depresji wśród nastolatków. Badanie opublikowane niedawno śledziło dwa tysiące nastolatków między czternastym a osiemnastym rokiem życia przez trzy lata. Wyniki wskazują, że osoby używające mediów społecznościowych więcej niż trzy godziny dziennie mają dwa razy większe prawdopodobieństwo rozwinięcia problemów psychologicznych w porównaniu z tymi, którzy używają ich mniej niż godzinę.',
    questions: [
      { question: 'Ile nastolatków wzięło udział w badaniu?', options: ['Tysiąc', 'Dwa tysiące', 'Pięć tysięcy', 'Dziesięć tysięcy'], correct: 1, explanation: '"Duemila ragazzi" — dwa tysiące nastolatków.' },
      { question: 'Jak długo trwało badanie?', options: ['Rok', 'Dwa lata', 'Trzy lata', 'Pięć lat'], correct: 2, explanation: '"Per tre anni" — przez trzy lata.' },
      { question: 'Ile godzin dziennie mediów społecznościowych zwiększa ryzyko?', options: ['Więcej niż godzinę', 'Więcej niż dwie godziny', 'Więcej niż trzy godziny', 'Więcej niż cztery godziny'], correct: 2, explanation: '"Chi usa i social più di tre ore al giorno" — kto używa więcej niż trzy godziny dziennie.' },
    ],
    vocabulary: [{ word: 'salute mentale', meaning: 'zdrowie psychiczne' }, { word: 'correlazione', meaning: 'korelacja' }, { word: 'adolescenti', meaning: 'nastolatkowie' }, { word: 'probabilità', meaning: 'prawdopodobieństwo' }, { word: 'sviluppare', meaning: 'rozwinąć' }],
  },
  {
    id: 'l08', title: 'Dibattito politico', level: 'B2',
    italian: 'La questione migratoria rimane uno dei temi più divisivi del panorama politico europeo. Da un lato, le organizzazioni umanitarie sostengono che l\'Europa abbia il dovere morale di accogliere chi fugge da guerre e persecuzioni. Dall\'altro, i partiti sovranisti affermano che un\'accoglienza illimitata metterebbe a rischio la coesione sociale e la sicurezza dei cittadini. Il dibattito si è acuito negli ultimi mesi dopo che diversi paesi hanno annunciato misure più restrittive ai confini. Gli esperti avvertono che senza una politica comune europea, ogni stato membro adotterà soluzioni frammentate che non risolveranno il problema alla radice.',
    polish: 'Kwestia migracyjna pozostaje jednym z najbardziej dzielących tematów na europejskiej scenie politycznej. Z jednej strony organizacje humanitarne twierdzą, że Europa ma moralny obowiązek przyjmowania osób uciekających z wojen i prześladowań. Z drugiej strony partie suwerenistyczne twierdzą, że nieograniczone przyjmowanie zagroziłoby spójności społecznej i bezpieczeństwu obywateli. Debata nasiliła się w ostatnich miesiącach po tym, jak kilka krajów ogłosiło bardziej restrykcyjne środki na granicach. Eksperci ostrzegają, że bez wspólnej europejskiej polityki każde państwo członkowskie przyjmie fragmentaryczne rozwiązania, które nie rozwiążą problemu u korzeni.',
    questions: [
      { question: 'Czego bronią organizacje humanitarne?', options: ['Restrykcji granicznych', 'Prawa azylu dla migrantów', 'Deportacji', 'Zamknięcia granic'], correct: 1, explanation: '"L\'Europa abbia il dovere morale di accogliere" — Europa ma moralny obowiązek przyjmowania.' },
      { question: 'Przed czym ostrzegają eksperci?', options: ['Przed wojną', 'Przed kryzysem ekonomicznym', 'Przed fragmentarycznymi rozwiązaniami bez wspólnej polityki', 'Przed zamknięciem granic'], correct: 2, explanation: '"Senza una politica comune... soluzioni frammentate" — bez wspólnej polityki fragmentaryczne rozwiązania.' },
    ],
    vocabulary: [{ word: 'migratoria', meaning: 'migracyjna' }, { word: 'umanitarie', meaning: 'humanitarne' }, { word: 'accogliere', meaning: 'przyjmować/gościć' }, { word: 'sovranisti', meaning: 'suwerenistyczni' }, { word: 'coesione sociale', meaning: 'spójność społeczna' }],
  },
  {
    id: 'l09', title: 'Documentario sulla cucina italiana', level: 'B2',
    italian: 'La cucina italiana non è semplicemente un insieme di ricette: è un patrimonio culturale che riflette secoli di storia, tradizioni regionali e identità collettiva. Ogni regione ha sviluppato le proprie specialità in base al clima, alle risorse locali e alle influenze storiche. La pasta al nord tende ad essere all\'uovo, mentre al sud prevale quella di semola di grano duro. L\'olio d\'oliva domina il sud, mentre il burro era tradizionalmente più comune nelle cucine settentrionali. Quello che accomuna tutte le tradizioni regionali è il rispetto per la qualità degli ingredienti e il rifiuto delle scorciatoie: la cucina italiana prende tempo, ma i risultati ripagano ogni sforzo.',
    polish: 'Kuchnia włoska to nie tylko zbiór przepisów: to dziedzictwo kulturowe odzwierciedlające wieki historii, regionalne tradycje i zbiorową tożsamość. Każdy region rozwinął własne specjalności w zależności od klimatu, lokalnych zasobów i historycznych wpływów. Makaron na północy ma tendencję do bycia jajecznym, podczas gdy na południu dominuje semolina z twardej pszenicy. Oliwa z oliwek dominuje na południu, podczas gdy masło było tradycyjnie bardziej powszechne w kuchniach północnych. To co łączy wszystkie regionalne tradycje to szacunek dla jakości składników i odrzucenie skrótów: włoska kuchnia wymaga czasu, ale wyniki wynagradzają każdy wysiłek.',
    questions: [
      { question: 'Co różni makaron północny od południowego?', options: ['Rozmiar', 'Kolor', 'Składniki (jajka vs semolina)', 'Metoda gotowania'], correct: 2, explanation: '"Al nord all\'uovo, al sud semola di grano duro" — na północy jajeczna, na południu z semoliny.' },
      { question: 'Co dominuje w kuchni południowej?', options: ['Masło', 'Oliwa z oliwek', 'Śmietana', 'Tłuszcz zwierzęcy'], correct: 1, explanation: '"L\'olio d\'oliva domina il sud" — oliwa z oliwek dominuje na południu.' },
    ],
    vocabulary: [{ word: 'patrimonio culturale', meaning: 'dziedzictwo kulturowe' }, { word: 'semola di grano duro', meaning: 'semolina z twardej pszenicy' }, { word: 'scorciatoie', meaning: 'skróty' }, { word: 'ripagano', meaning: 'wynagradzają' }, { word: 'accomuna', meaning: 'łączy' }],
  },
  {
    id: 'l10', title: 'Saggio filosofico', level: 'C1',
    italian: 'Il concetto di libertà nella filosofia occidentale ha subito trasformazioni radicali nel corso dei secoli. Per gli antichi Greci, la libertà era essenzialmente politica: era il privilegio del cittadino maschio adulto di partecipare alla vita della polis, contrapposta alla condizione dello schiavo. Con l\'avvento del Cristianesimo, emerge una dimensione interiore della libertà: il libero arbitrio, la capacità dell\'anima di scegliere tra il bene e il male indipendentemente dalle circostanze esterne. La modernità, da Descartes a Kant, sposta ancora il focus: la libertà diventa autonomia della ragione, la capacità del soggetto pensante di darsi la propria legge morale. Oggi, nel contesto del neoliberismo, la libertà viene spesso ridotta alla libertà di consumo e di scelta nel mercato, una concezione che i filosofi critici considerano una forma sottile di alienazione.',
    polish: 'Koncepcja wolności w zachodniej filozofii przeszła radykalne transformacje na przestrzeni wieków. Dla starożytnych Greków wolność była zasadniczo polityczna: był to przywilej dorosłego mężczyzny-obywatela do uczestniczenia w życiu polis, w przeciwieństwie do kondycji niewolnika. Wraz z nadejściem chrześcijaństwa pojawia się wewnętrzny wymiar wolności: wolna wola, zdolność duszy do wyboru między dobrem a złem niezależnie od okoliczności zewnętrznych. Nowoczesność, od Kartezjusza do Kanta, przesuwa znowu centrum: wolność staje się autonomią rozumu, zdolnością podmiotu myślącego do nadawania sobie własnego prawa moralnego. Dziś, w kontekście neoliberalizmu, wolność jest często redukowana do wolności konsumpcji i wyboru na rynku, koncepcji, którą filozofowie krytyczni uważają za subtelną formę alienacji.',
    questions: [
      { question: 'Czym była wolność dla starożytnych Greków?', options: ['Wolnością religijną', 'Wolnością polityczną obywatela polis', 'Wolnością wyboru moralnego', 'Wolnością rynkową'], correct: 1, explanation: '"Privilegio del cittadino maschio adulto di partecipare alla vita della polis" — przywilej uczestniczenia w życiu polis.' },
      { question: 'Jak nowoczesność (Kant) definiuje wolność?', options: ['Jako uczestnictwo polityczne', 'Jako wolną wolę moralną', 'Jako autonomię rozumu', 'Jako wolność rynkową'], correct: 2, explanation: '"Autonomia della ragione, la capacità del soggetto pensante di darsi la propria legge morale" — autonomia rozumu.' },
    ],
    vocabulary: [{ word: 'libero arbitrio', meaning: 'wolna wola' }, { word: 'autonomia', meaning: 'autonomia' }, { word: 'neoliberismo', meaning: 'neoliberalizm' }, { word: 'alienazione', meaning: 'alienacja' }, { word: 'polis', meaning: 'starożytne miasto-państwo greckie' }],
  },
  {
    id: 'l11', title: 'Intervista a un artista', level: 'B1',
    italian: 'Quando hai capito che volevi fare l\'artista? Fin da bambino disegnavo ovunque, sui muri, sui quaderni. Ma la vera decisione è arrivata a sedici anni, quando ho visto una mostra di Modigliani a Firenze. Quella visione mi ha cambiato la vita. I tuoi genitori ti hanno supportato? Mio padre avrebbe voluto che facessi medicina o legge. Mia madre invece ha sempre creduto in me. Mi comprò i primi colori professionali quando avevo diciassette anni. Com\'è oggi il mercato dell\'arte in Italia? Difficile ma affascinante. Il digitale ha aperto nuove possibilità: vendo opere online in tutto il mondo. Ma manca ancora il riconoscimento istituzionale per i giovani artisti italiani.',
    polish: 'Kiedy zrozumiałeś, że chcesz być artystą? Od dziecka rysowałem wszędzie, na ścianach, w zeszytach. Ale prawdziwa decyzja przyszła w wieku szesnastu lat, kiedy zobaczyłem wystawę Modiglianiego we Florencji. Ten widok zmienił moje życie. Czy rodzice cię wspierali? Mój ojciec chciałby żebym studiował medycynę lub prawo. Moja mama natomiast zawsze wierzyła we mnie. Kupiła mi pierwsze profesjonalne farby gdy miałem siedemnaście lat. Jaki jest dziś rynek sztuki we Włoszech? Trudny ale fascynujący. Cyfrowy świat otworzył nowe możliwości: sprzedaję dzieła online na całym świecie. Ale nadal brakuje instytucjonalnego uznania dla młodych włoskich artystów.',
    questions: [
      { question: 'Co skłoniło artystę do wyboru tej drogi?', options: ['Kurs w szkole', 'Wystawa Modiglianiego we Florencji', 'Namowa rodziców', 'Nagroda artystyczna'], correct: 1, explanation: '"Una mostra di Modigliani a Firenze... mi ha cambiato la vita" — wystawa Modiglianiego zmieniła jego życie.' },
      { question: 'Co dała artyście mama gdy miał 17 lat?', options: ['Pieniądze na szkołę', 'Pierwsze profesjonalne farby', 'Tablet do rysowania', 'Bilet do Florencji'], correct: 1, explanation: '"Mi comprò i primi colori professionali quando avevo diciassette anni" — kupiła mu pierwsze profesjonalne farby.' },
    ],
    vocabulary: [{ word: 'mostra', meaning: 'wystawa' }, { word: 'supportato', meaning: 'wspierany' }, { word: 'mercato', meaning: 'rynek' }, { word: 'riconoscimento', meaning: 'uznanie' }, { word: 'istituzionale', meaning: 'instytucjonalny' }],
  },
  {
    id: 'l12', title: 'Podcast sulla letteratura', level: 'C1',
    italian: 'Leopardi è spesso considerato il poeta del pessimismo, ma questa etichetta rischia di semplificare eccessivamente il suo pensiero. Il suo pessimismo non è passivo o rassegnato: è piuttosto il risultato di un\'analisi lucida e coraggiosa della condizione umana. Nell\'opera Zibaldone, il diario intellettuale che Leopardi tenne per anni, emergono le fondamenta del suo sistema filosofico. Egli distingue tra felicità immaginata, quella che gli antichi potevano ancora illudersi di raggiungere grazie alla loro maggiore vicinanza alla natura, e la disillusa consapevolezza dei moderni, condannati a conoscere troppo per poter sperare. Eppure, persino in questa visione cupa, Leopardi trova la solidarietà umana come unica risposta possibile: il famoso invito alla "social catena" con cui si chiude La Ginestra.',
    polish: 'Leopardi jest często uważany za poetę pesymizmu, ale ta etykieta ryzykuje nadmiernym uproszczeniem jego myśli. Jego pesymizm nie jest pasywny ani pogodzony: jest raczej wynikiem jasnej i odważnej analizy ludzkiej kondycji. W dziele Zibaldone, intelektualnym dzienniku, który Leopardi prowadził przez lata, wyłaniają się fundamenty jego systemu filozoficznego. Rozróżnia między szczęściem wyobrażonym, którym starożytni mogli się jeszcze łudzić dzięki ich większej bliskości z naturą, a rozczarow świadomością nowoczesnych, skazanych na zbyt dużą wiedzę by móc mieć nadzieję. Jednak nawet w tej mrocznej wizji Leopardi znajduje ludzką solidarność jako jedyną możliwą odpowiedź: słynne zaproszenie do "społecznego łańcucha" którym kończy się La Ginestra.',
    questions: [
      { question: 'Jak autor charakteryzuje pesymizm Leopardiego?', options: ['Jako pasywny i ślepy', 'Jako aktywny wynik analizy kondycji ludzkiej', 'Jako religijny', 'Jako polityczny'], correct: 1, explanation: '"Risultato di un\'analisi lucida e coraggiosa della condizione umana" — wynik jasnej i odważnej analizy.' },
      { question: 'Czym jest Zibaldone?', options: ['Powieścią', 'Zbiorem wierszy', 'Intelektualnym dziennikiem', 'Listem'], correct: 2, explanation: '"Il diario intellettuale che Leopardi tenne per anni" — intelektualny dziennik prowadzony przez lata.' },
    ],
    vocabulary: [{ word: 'pessimismo', meaning: 'pesymizm' }, { word: 'etichetta', meaning: 'etykieta' }, { word: 'lucida', meaning: 'jasna/klarowna' }, { word: 'solidarietà', meaning: 'solidarność' }, { word: 'consapevolezza', meaning: 'świadomość' }],
  },
];

interface Props {
  userLevel: CEFRLevel;
  onXp: (xp: number) => void;
}

type Phase = 'list' | 'listen' | 'quiz' | 'result';

const LEVEL_ORDER: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export function ListeningModule({ userLevel, onXp }: Props) {
  const [phase, setPhase] = useState<Phase>('list');
  const [selectedClip, setSelectedClip] = useState<ListeningClip | null>(null);
  const [speed, setSpeed] = useState<0.75 | 1 | 1.25>(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [listenCount, setListenCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      stopSpeaking();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const userLevelIndex = LEVEL_ORDER.indexOf(userLevel);

  const availableClips = CLIPS.filter(c => {
    const clipIndex = LEVEL_ORDER.indexOf(c.level);
    return clipIndex <= userLevelIndex + 1;
  });

  const playClip = () => {
    if (!selectedClip) return;
    stopSpeaking();
    setIsPlaying(true);
    speakItalian(selectedClip.italian, speed);
    setListenCount(n => n + 1);
    // Estimate speaking duration and reset playing state
    const wordCount = selectedClip.italian.split(' ').length;
    const estimatedMs = (wordCount / (speed * 2.5)) * 1000 + 500;
    setTimeout(() => setIsPlaying(false), estimatedMs);
  };

  const startQuiz = () => {
    if (!selectedClip) return;
    stopSpeaking();
    setIsPlaying(false);
    setQuizAnswers(new Array(selectedClip.questions.length).fill(null));
    setQuizSubmitted(false);
    setPhase('quiz');
  };

  const submitQuiz = () => {
    if (!selectedClip) return;
    const correct = selectedClip.questions.filter((q, i) => quizAnswers[i] === q.correct).length;
    setScore(correct);
    setQuizSubmitted(true);
    const xp = correct * 15 + (listenCount <= 2 ? 20 : 0);
    onXp(xp);
    setPhase('result');
  };

  const reset = () => {
    stopSpeaking();
    setPhase('list');
    setSelectedClip(null);
    setShowTranscript(false);
    setShowTranslation(false);
    setQuizAnswers([]);
    setQuizSubmitted(false);
    setListenCount(0);
  };

  if (phase === 'list') {
    const grouped = (['A1', 'A2', 'B1', 'B2', 'C1'] as CEFRLevel[]).reduce((acc, level) => {
      const clips = availableClips.filter(c => c.level === level);
      if (clips.length) acc[level] = clips;
      return acc;
    }, {} as Record<string, ListeningClip[]>);

    return (
      <div className="animate-fade-in">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-text-bright mb-1">Słuchanie</h2>
          <p className="text-text-dim text-sm">Ćwicz rozumienie ze słuchu w tempie naturalnym lub spowolnionym (0.75x)</p>
        </div>

        {Object.entries(grouped).map(([level, clips]) => (
          <div key={level} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-accent/20 text-accent">{level}</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid gap-3">
              {clips.map(clip => (
                <button
                  key={clip.id}
                  onClick={() => { setSelectedClip(clip); setPhase('listen'); }}
                  className="w-full text-left bg-bg-card rounded-xl p-4 border border-border hover:border-accent/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-text-bright">{clip.title}</div>
                      <div className="text-sm text-text-dim mt-1">{clip.questions.length} pytania • {clip.vocabulary.length} słów</div>
                    </div>
                    <div className="text-accent text-2xl">🎧</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (phase === 'listen' && selectedClip) {
    return (
      <div className="animate-fade-in">
        <button onClick={reset} className="text-text-dim text-sm mb-4 hover:text-text flex items-center gap-1">
          ← Powrót
        </button>
        <h2 className="text-xl font-bold text-text-bright mb-1">{selectedClip.title}</h2>
        <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent">{selectedClip.level}</span>

        {/* Player */}
        <div className="bg-bg-card rounded-2xl p-6 border border-border mt-4">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-6xl">{isPlaying ? '🔊' : '🎧'}</div>
          </div>

          {/* Speed selector */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-sm text-text-dim">Prędkość:</span>
            {([0.75, 1, 1.25] as const).map(s => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  speed === s ? 'bg-accent text-bg' : 'bg-bg text-text border border-border hover:border-accent/50'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          <button
            onClick={playClip}
            disabled={!isSpeechSupported()}
            className={`w-full py-4 rounded-xl font-bold text-lg mb-3 transition-colors ${
              isPlaying ? 'bg-warning/20 text-warning border border-warning/30' :
              'bg-accent text-bg hover:bg-accent-dim'
            }`}
          >
            {isPlaying ? '⏸ Odtwarzanie...' : listenCount === 0 ? '▶ Odtwórz nagranie' : '↻ Odtwórz ponownie'}
          </button>

          {!isSpeechSupported() && (
            <p className="text-text-dim text-sm text-center mb-3">TTS niedostępny w tej przeglądarce</p>
          )}

          {listenCount > 0 && (
            <div className="text-center text-xs text-text-dim mb-4">
              Odsłuchano: {listenCount}x
              {listenCount > 2 && ' • Bonus XP za pierwsze 2 odsłuchania'}
            </div>
          )}

          {/* Transcript toggle */}
          <div className="space-y-2">
            <button
              onClick={() => setShowTranscript(t => !t)}
              className="w-full py-2 bg-bg border border-border rounded-lg text-text text-sm hover:border-accent/50"
            >
              {showTranscript ? '▲ Ukryj transkrypcję' : '▼ Pokaż transkrypcję'}
            </button>

            {showTranscript && (
              <div className="bg-bg rounded-xl p-4 border border-border animate-fade-in">
                <p className="text-text leading-relaxed italic">"{selectedClip.italian}"</p>
                <button
                  onClick={() => setShowTranslation(t => !t)}
                  className="mt-3 text-accent text-sm hover:underline"
                >
                  {showTranslation ? 'Ukryj tłumaczenie' : 'Pokaż tłumaczenie'}
                </button>
                {showTranslation && (
                  <p className="text-text-dim text-sm leading-relaxed mt-2 animate-fade-in">"{selectedClip.polish}"</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Vocabulary preview */}
        <div className="bg-bg-card rounded-2xl p-4 border border-border mt-4">
          <div className="text-sm font-semibold text-text-bright mb-3">Kluczowe słownictwo</div>
          <div className="grid grid-cols-2 gap-2">
            {selectedClip.vocabulary.map((v, i) => (
              <div key={i} className="bg-bg rounded-lg p-2 border border-border">
                <div className="text-accent text-sm font-medium">{v.word}</div>
                <div className="text-text-dim text-xs">{v.meaning}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={startQuiz}
          className="w-full mt-4 py-4 bg-accent text-bg font-bold rounded-xl hover:bg-accent-dim"
        >
          Przejdź do pytań →
        </button>
      </div>
    );
  }

  if (phase === 'quiz' && selectedClip) {
    const allAnswered = quizAnswers.every(a => a !== null);

    return (
      <div className="animate-fade-in">
        <h2 className="text-xl font-bold text-text-bright mb-1">{selectedClip.title}</h2>
        <p className="text-text-dim text-sm mb-6">Odpowiedz na pytania bez zaglądania do transkrypcji</p>

        <div className="space-y-6">
          {selectedClip.questions.map((q, qi) => (
            <div key={qi} className="bg-bg-card rounded-2xl p-5 border border-border">
              <div className="font-semibold text-text-bright mb-4">{qi + 1}. {q.question}</div>
              <div className="space-y-2">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => {
                      const newAnswers = [...quizAnswers];
                      newAnswers[qi] = oi;
                      setQuizAnswers(newAnswers);
                    }}
                    disabled={quizSubmitted}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-colors ${
                      quizAnswers[qi] === oi
                        ? 'border-accent bg-accent/10 text-text-bright'
                        : 'border-border bg-bg text-text hover:border-accent/50'
                    }`}
                  >
                    {String.fromCharCode(65 + oi)}. {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={submitQuiz}
          disabled={!allAnswered}
          className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition-colors ${
            allAnswered ? 'bg-accent text-bg hover:bg-accent-dim' : 'bg-bg text-text-dim border border-border cursor-not-allowed'
          }`}
        >
          Sprawdź odpowiedzi
        </button>
      </div>
    );
  }

  if (phase === 'result' && selectedClip) {
    const total = selectedClip.questions.length;
    const pct = Math.round((score / total) * 100);

    return (
      <div className="animate-slide-up text-center py-6">
        <div className="text-5xl mb-3">{pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '📚'}</div>
        <h2 className="text-xl font-bold text-text-bright mb-1">{selectedClip.title}</h2>
        <div className="text-3xl font-bold text-accent mb-1">{score}/{total}</div>
        <div className="text-text-dim text-sm mb-6">{pct}% poprawnych odpowiedzi</div>

        {/* Answers review */}
        <div className="space-y-4 text-left mb-6">
          {selectedClip.questions.map((q, qi) => {
            const userAns = quizAnswers[qi];
            const correct = userAns === q.correct;
            return (
              <div key={qi} className={`rounded-xl p-4 border ${correct ? 'bg-accent/10 border-accent/30' : 'bg-danger/10 border-danger/30'}`}>
                <div className="font-semibold text-text-bright text-sm mb-2">{qi + 1}. {q.question}</div>
                <div className={`text-sm font-medium mb-1 ${correct ? 'text-accent' : 'text-danger'}`}>
                  {correct ? '✓ Poprawnie' : `✗ Błąd → ${q.options[q.correct]}`}
                </div>
                <div className="text-xs text-text-dim italic">{q.explanation}</div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => { setPhase('listen'); setQuizAnswers([]); setQuizSubmitted(false); }}
            className="flex-1 py-3 bg-bg border border-border rounded-xl text-text font-semibold hover:border-accent/50"
          >
            Posłuchaj ponownie
          </button>
          <button
            onClick={reset}
            className="flex-1 py-3 bg-accent text-bg rounded-xl font-semibold hover:bg-accent-dim"
          >
            Inne nagrania
          </button>
        </div>
      </div>
    );
  }

  return null;
}
