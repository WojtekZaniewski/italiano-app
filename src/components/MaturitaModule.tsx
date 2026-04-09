import { useState, useEffect, useRef } from 'react';
import { speakItalian, isSpeechSupported, startSpeechRecognition } from '../engine/tts';

// Types
interface EssayPrompt {
  id: string;
  type: 'tema' | 'analisi' | 'saggio';
  title: string;
  titlePl: string;
  prompt: string;
  level: 'standard' | 'advanced';
  timeMinutes: number;
  wordCount: { min: number; max: number };
  tips: string[];
  exampleStructure: string[];
}

interface LiteratureQuiz {
  id: string;
  author: string;
  work: string;
  period: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  explanationPl: string;
}

interface MaturitaVocab {
  id: string;
  italian: string;
  polish: string;
  category: string;
  usage: string;
}

// Inline data
const ESSAY_PROMPTS: EssayPrompt[] = [
  {
    id: 'e01', type: 'tema', title: 'Tecnologia e giovani', titlePl: 'Technologia i młodzież',
    prompt: 'La tecnologia digitale ha trasformato profondamente la vita dei giovani di oggi. Illustra i cambiamenti avvenuti, analizzando vantaggi e svantaggi, e proponi riflessioni personali sul rapporto tra tecnologia e crescita umana.',
    level: 'standard', timeMinutes: 120, wordCount: { min: 450, max: 600 },
    tips: ['Inizia con una definizione o un dato statistico', 'Struttura: intro → vantaggi → svantaggi → conclusione personale', 'Usa connettivi: d\'altro canto, tuttavia, in conclusione'],
    exampleStructure: ['Introduzione: definizione del tema e tesi', 'Paragrafo 1: vantaggi della tecnologia', 'Paragrafo 2: svantaggi e rischi', 'Paragrafo 3: riflessione personale', 'Conclusione: proposta/giudizio finale'],
  },
  {
    id: 'e02', type: 'tema', title: 'L\'ambiente e il futuro', titlePl: 'Środowisko i przyszłość',
    prompt: 'Il cambiamento climatico rappresenta la sfida più urgente del nostro tempo. Analizza le cause del fenomeno, le conseguenze già visibili e le possibili soluzioni, esprimendo la tua posizione personale sulla responsabilità individuale e collettiva.',
    level: 'standard', timeMinutes: 120, wordCount: { min: 450, max: 600 },
    tips: ['Usa dati scientifici', 'Distingui cause naturali da cause antropiche', 'Proponi soluzioni concrete a livello locale e globale'],
    exampleStructure: ['Introduzione al problema', 'Cause del cambiamento climatico', 'Conseguenze attuali e future', 'Soluzioni possibili', 'Responsabilità individuale vs collettiva', 'Conclusione'],
  },
  {
    id: 'e03', type: 'tema', title: 'Social media e solitudine', titlePl: 'Media społecznościowe i samotność',
    prompt: 'Siamo più connessi che mai eppure sempre più soli: questa è la paradosso dell\'era digitale. Rifletti sul rapporto tra i social media e il senso di comunità, analizzando come le piattaforme digitali abbiano modificato le relazioni umane.',
    level: 'standard', timeMinutes: 120, wordCount: { min: 450, max: 600 },
    tips: ['Inizia con il paradosso come hook', 'Cita esempi concreti di come i social cambiano le relazioni', 'Analizza il fenomeno FOMO, echo chambers'],
    exampleStructure: ['Hook: il paradosso della connettività', 'Come i social media modificano le relazioni', 'Il problema della solitudine digitale', 'Benefici reali della connessione digitale', 'Verso un uso consapevole', 'Conclusione'],
  },
  {
    id: 'e04', type: 'tema', title: 'Il valore della cultura', titlePl: 'Wartość kultury',
    prompt: 'In un\'epoca dominata dall\'utile e dal profitto, qual è il valore della cultura umanistica? Rifletti sull\'importanza delle arti, della letteratura e della filosofia nella formazione dell\'individuo e della società.',
    level: 'advanced', timeMinutes: 150, wordCount: { min: 500, max: 700 },
    tips: ['Definisci "cultura umanistica"', 'Contrasta con il pensiero utilitarista', 'Cita autori che hai studiato', 'Usa il concetto di formazione dell\'individuo (Bildung)'],
    exampleStructure: ['Definizione di cultura umanistica', 'La critica utilitarista', 'Il valore formativo delle humanae litterae', 'Esempi dalla letteratura italiana', 'La cultura come bene comune', 'Conclusione personale'],
  },
  {
    id: 'e05', type: 'tema', title: 'Immigrazione e identità', titlePl: 'Imigracja i tożsamość',
    prompt: 'L\'immigrazione è uno dei fenomeni più complessi del mondo contemporaneo. Analizza le cause dei flussi migratori, l\'impatto sulle società di accoglienza e le possibili politiche di integrazione, esprimendo la tua visione di una società plurale.',
    level: 'standard', timeMinutes: 120, wordCount: { min: 450, max: 600 },
    tips: ['Distingui emigrazione da immigrazione', 'Usa dati demografici', 'Analizza sia la prospettiva del migrante che della società ospitante'],
    exampleStructure: ['Introduzione al fenomeno', 'Cause delle migrazioni', 'Sfide per le società di accoglienza', 'Modelli di integrazione', 'La ricchezza del pluralismo', 'Conclusione'],
  },
  {
    id: 'e06', type: 'analisi', title: 'Analisi: L\'Infinito di Leopardi', titlePl: 'Analiza: L\'Infinito Leopardiego',
    prompt: 'Leggi attentamente la poesia "L\'Infinito" di Giacomo Leopardi e rispondi alle domande di analisi testuale. Considera gli aspetti formali (metrica, figure retoriche) e di contenuto (temi, filosofia leopardiana).\n\n"Sempre caro mi fu quest\'ermo colle,\ne questa siepe, che da tanta parte\ndell\'ultimo orizzonte il guardo esclude.\nMa sedendo e mirando, interminati\nspazi di là da quella, e sovrumani\nsilenzi, e profondissima quiete\nio nel pensier mi fingo; ove per poco\nil cor non si spaura. E come il vento\novo tra queste piante, io quello infinito\nsilenzio a questa voce vo comparando:\ne mi sovvien l\'eterno, e le morte stagioni,\ne la presente e viva, e il suon di lei.\nCosì tra questa immensità s\'annega\nil pensier mio: e il naufragar m\'è dolce in questo mare."',
    level: 'standard', timeMinutes: 90, wordCount: { min: 300, max: 500 },
    tips: ['Analizza la struttura metrica (endecasillabi sciolti)', 'Identifica le figure retoriche: sinestesia, ossimoro, personificazione', 'Collega alla filosofia del "nulla" leopardiana', 'Contrasta il "colle" reale con l\'"infinito" immaginato'],
    exampleStructure: ['Parafrasi del testo', 'Analisi formale (metrica, ritmo)', 'Figure retoriche principali', 'Temi: infinito, immaginazione, nulla', 'Collocazione nel contesto leopardiano', 'Valutazione critica'],
  },
  {
    id: 'e07', type: 'analisi', title: 'Analisi: I Promessi Sposi', titlePl: 'Analiza: Narzeczeni Manzoniego',
    prompt: 'Analizza il brano dell\'Addio ai monti da "I Promessi Sposi" di Alessandro Manzoni, considerando il ruolo della Provvidenza, il tema dell\'esilio e la tecnica narrativa del romanzo storico.',
    level: 'standard', timeMinutes: 90, wordCount: { min: 300, max: 500 },
    tips: ['Il tema della Provvidenza è centrale in Manzoni', 'Analizza la tecnica del narratore onnisciente', 'Collega alla storia del Seicento lombardo', 'Confronta Lucia e Renzo come personaggi'],
    exampleStructure: ['Contestualizzazione del brano', 'Analisi del narratore e punto di vista', 'Il tema della Provvidenza divina', 'La tecnica del romanzo storico', 'L\'uso della lingua (Manzoni e il fiorentino)', 'Valutazione critica'],
  },
  {
    id: 'e08', type: 'saggio', title: 'Saggio: Libertà e responsabilità', titlePl: 'Esej: Wolność i odpowiedzialność',
    prompt: 'Partendo dalla riflessione filosofica sulla libertà (da Kant a Sartre, passando per la tradizione italiana), scrivi un saggio argomentativo in cui analizzi il rapporto tra libertà individuale e responsabilità verso la comunità.',
    level: 'advanced', timeMinutes: 150, wordCount: { min: 500, max: 700 },
    tips: ['Cita almeno due filosofi', 'Definisci: libertà positiva vs negativa (Berlin)', 'Usa esempi storici e attuali', 'Costruisci un\'argomentazione coerente con tesi e antitesi'],
    exampleStructure: ['Tesi principale', 'Libertà: definizioni filosofiche', 'Il contratto sociale e la responsabilità', 'Casi concreti: libertà di espressione vs hate speech', 'Sintesi e posizione personale', 'Conclusione'],
  },
];

const LITERATURE_QUIZZES: LiteratureQuiz[] = [
  { id: 'lq01', author: 'Dante Alighieri', work: 'Divina Commedia — Inferno', period: 'Dolce Stil Novo / Medioevo', question: 'Chi è la guida di Dante nell\'Inferno e nel Purgatorio?', options: ['Beatrice', 'Virgilio', 'San Pietro', 'Cicerone'], correctIndex: 1, explanation: 'Virgilio, il grande poeta latino dell\'Eneide, guida Dante attraverso Inferno e Purgatorio. Beatrice invece lo guida nel Paradiso.', explanationPl: 'Wergiliusz, wielki poeta łaciński, prowadzi Dantego przez Piekło i Czyściec. Beatrycze prowadzi go przez Raj.' },
  { id: 'lq02', author: 'Dante Alighieri', work: 'Divina Commedia', period: 'Medioevo', question: 'In quale anno è ambientata la Divina Commedia?', options: ['1265', '1300', '1321', '1289'], correctIndex: 1, explanation: 'Il viaggio di Dante è ambientato nel 1300, anno del Giubileo, quando Dante aveva 35 anni ("nel mezzo del cammin di nostra vita").', explanationPl: 'Podróż Dantego rozgrywa się w 1300 roku, roku Jubileuszu, gdy Dante miał 35 lat.' },
  { id: 'lq03', author: 'Dante Alighieri', work: 'Inferno', period: 'Medioevo', question: 'Quali peccatori sono puniti nel Canto V dell\'Inferno?', options: ['Gli avari', 'I lussuriosi', 'I violenti', 'Gli eretici'], correctIndex: 1, explanation: 'Nel Canto V sono puniti i lussuriosi, trascinati da un turbine infernale. I più famosi sono Paolo e Francesca.', explanationPl: 'W Pieśni V karani są lubieżnicy, porywani przez piekielną wichurę. Najsłynniejsi to Paolo i Francesca.' },
  { id: 'lq04', author: 'Giacomo Leopardi', work: 'Canti — L\'Infinito', period: 'Romanticismo', question: 'Cosa rappresenta la "siepe" nella poesia L\'Infinito?', options: ['Un ostacolo fisico che delimita il paesaggio reale', 'Un simbolo del confine tra vita e morte', 'La realtà concreta che stimola l\'immaginazione infinita', 'Una metafora della poesia stessa'], correctIndex: 2, explanation: 'La siepe nasconde l\'orizzonte fisico e paradossalmente stimola la fantasia di Leopardi verso spazi infiniti e sovrumani silenzi.', explanationPl: 'Żywopłot zasłania horyzont fizyczny i paradoksalnie pobudza fantazję Leopardiego ku nieskończonym przestrzeniom.' },
  { id: 'lq05', author: 'Giacomo Leopardi', work: 'Zibaldone', period: 'Romanticismo', question: 'Cosa sostiene Leopardi nel suo "pessimismo cosmico"?', options: ['La natura è benigna e provvidenziale', 'Il progresso porta inevitabilmente alla felicità', 'La natura è indifferente alla sofferenza umana e la felicità è illusoria', 'Solo la fede religiosa può dare senso alla vita'], correctIndex: 2, explanation: 'Nel pessimismo cosmico, Leopardi vede la natura come una forza cieca e indifferente. La felicità è sempre illusoria e il dolore è la condizione universale.', explanationPl: 'W pesymizmie kosmicznym Leopardi postrzega naturę jako ślepą i obojętną siłę. Szczęście jest zawsze złudne.' },
  { id: 'lq06', author: 'Alessandro Manzoni', work: 'I Promessi Sposi', period: 'Romanticismo', question: 'Chi è l\'Innominato nei Promessi Sposi?', options: ['Il cugino di Don Rodrigo', 'Un potente signore malvagio che si converte', 'Il capo dei Lanzichenecchi', 'Il padre di Lucia'], correctIndex: 1, explanation: 'L\'Innominato è un potente signore del male che, dopo una crisi spirituale causata anche dall\'incontro con Lucia, si converte grazie alla visita del Cardinale Federigo Borromeo.', explanationPl: 'Nieznajomy to potężny pan zła, który po kryzysie duchowym nawraca się dzięki wizycie Kardynała Boromeusza.' },
  { id: 'lq07', author: 'Alessandro Manzoni', work: 'I Promessi Sposi', period: 'Romanticismo', question: 'Quale problema linguistico affrontò Manzoni scrivendo i Promessi Sposi?', options: ['La scelta tra latino e italiano', 'La riscrittura in fiorentino colto dell\'edizione del 1840', 'La traduzione dal francese', 'La censura austriaca'], correctIndex: 1, explanation: 'Manzoni riscrisse completamente il romanzo nell\'edizione del 1840 "sciacquando i panni in Arno", ovvero adottando il fiorentino parlato dalle classi colte come modello linguistico nazionale.', explanationPl: 'Manzoni przepisał powieść w 1840 r., przyjmując florentczyński mówiony przez wykształcone klasy jako model językowy.' },
  { id: 'lq08', author: 'Giovanni Verga', work: 'I Malavoglia', period: 'Verismo', question: 'Qual è il principio cardine del Verismo di Verga?', options: ['L\'autore deve esprimere le sue emozioni', 'L\'eclissi del narratore — totale oggettività', 'La centralità dell\'eroe romantico', 'La descrizione della borghesia'], correctIndex: 1, explanation: 'Verga adotta la tecnica dell\'eclissi del narratore: la storia sembra raccontarsi da sola, come vista dall\'interno della comunità dei personaggi, senza interventi del narratore.', explanationPl: 'Verga stosuje technikę zaćmienia narratora: historia jakby opowiada się sama, widziana z wewnątrz wspólnoty postaci.' },
  { id: 'lq09', author: 'Luigi Pirandello', work: 'Il fu Mattia Pascal', period: 'Novecento', question: 'Qual è il tema centrale de "Il fu Mattia Pascal"?', options: ['La storia d\'amore impossibile', 'La crisi dell\'identità nella società moderna', 'La critica al fascismo', 'Il conflitto tra classi sociali'], correctIndex: 1, explanation: 'Il romanzo esplora la crisi dell\'identità: Mattia Pascal si scopre "morto" e tenta di costruire una nuova identità (Adriano Meis), scoprendo che è impossibile vivere al di fuori dei legami sociali.', explanationPl: 'Powieść bada kryzys tożsamości: Pascal odkrywa, że jest "martwy" i próbuje zbudować nową tożsamość, odkrywając niemożność życia poza więzami społecznymi.' },
  { id: 'lq10', author: 'Luigi Pirandello', work: 'Sei personaggi in cerca d\'autore', period: 'Novecento', question: 'Qual è l\'innovazione teatrale di "Sei personaggi in cerca d\'autore"?', options: ['L\'uso di costumi storici elaborati', 'Il metatteatro: personaggi che invadono il palco cercando un autore', 'La recitazione in dialetto siciliano', 'L\'eliminazione della scenografia'], correctIndex: 1, explanation: 'Pirandello rompe la quarta parete con il metateatr: sei personaggi entrano in un teatro durante una prova e chiedono agli attori di interpretare la loro storia.', explanationPl: 'Pirandello przełamuje czwartą ścianę: sześć postaci wkracza do teatru podczas próby i prosi aktorów o odegranie ich historii.' },
  { id: 'lq11', author: 'Italo Svevo', work: 'La coscienza di Zeno', period: 'Novecento', question: 'Quale tecnica narrativa usa Svevo ne "La coscienza di Zeno"?', options: ['Il narratore onnisciente in terza persona', 'Il flusso di coscienza e il monologo interiore', 'La lettera epistolare', 'Il narratore oggettivo verista'], correctIndex: 1, explanation: 'Svevo usa il monologo interiore e la narrazione in prima persona inaffidabile: Zeno è un narratore inattendibile che si autoinganna continuamente, riflettendo le teorie freudiane.', explanationPl: 'Svevo stosuje monolog wewnętrzny i pierwszoosobową narrację zawodnego narratora: Zeno ciągle się samooszukuje, odzwierciedlając teorie freudowskie.' },
  { id: 'lq12', author: 'Giuseppe Ungaretti', work: 'Allegria di naufragi', period: 'Ermetismo', question: 'Cosa caratterizza la poesia di Ungaretti stilisticamente?', options: ['Versi lunghi e elaborati, ricchi di aggettivi', 'Verso breve, abolizione della punteggiatura, essenzialità estrema', 'L\'uso del dialetto napoletano', 'Rime obbligate e struttura fissa'], correctIndex: 1, explanation: 'Ungaretti riduce la poesia all\'essenziale: versi brevissimi (talvolta una sola parola), assenza di punteggiatura, parole assolute cariche di significato. La guerra ispira questa urgenza espressiva.', explanationPl: 'Ungaretti redukuje poezję do essencji: bardzo krótkie wersy (niekiedy jedno słowo), brak interpunkcji, absolutne słowa ładunku semantycznego.' },
  { id: 'lq13', author: 'Eugenio Montale', work: 'Ossi di seppia', period: 'Ermetismo', question: 'Cosa rappresenta il "male di vivere" nella poetica di Montale?', options: ['Una malattia fisica', 'Il senso di disagio esistenziale e impossibilità della felicità', 'La critica alla guerra', 'La nostalgia per la giovinezza'], correctIndex: 1, explanation: 'Il "male di vivere" è il sentimento fondamentale della poetica montaliana: l\'esistenza è dolore, la felicità è irraggiungibile, e la natura riflette questa condizione di disagio esistenziale.', explanationPl: '"Ból istnienia" to fundamentalne uczucie poetyki Montalego: egzystencja jest bólem, szczęście jest nieosiągalne.' },
  { id: 'lq14', author: 'Italo Calvino', work: 'Se una notte d\'inverno un viaggiatore', period: 'Postmoderno', question: 'Qual è l\'innovazione narrativa di Calvino in questo romanzo?', options: ['Il narratore è un robot', 'Il lettore diventa personaggio del romanzo (narratore in seconda persona)', 'Il romanzo è scritto a ritroso', 'I personaggi parlano dialetto veneto'], correctIndex: 1, explanation: 'Calvino usa la seconda persona ("Tu") per fare del lettore il protagonista del romanzo, creando un metaromanzo che riflette sul processo della lettura stessa.', explanationPl: 'Calvino używa drugiej osoby, czyniąc czytelnika bohaterem powieści — metapowieść reflektująca nad samym procesem czytania.' },
  { id: 'lq15', author: 'Primo Levi', work: 'Se questo è un uomo', period: 'Letteratura della memoria', question: 'Quale è l\'approccio narrativo di Primo Levi in "Se questo è un uomo"?', options: ['Romanzo d\'amore tra prigionieri', 'Testimonianza lucida e scientifica dell\'esperienza nei lager nazisti', 'Saggio filosofico sull\'esistenza', 'Racconto di finzione ispirato alla Shoah'], correctIndex: 1, explanation: 'Levi adotta uno stile lucido, quasi scientifico, per testimoniare l\'esperienza di Auschwitz. La chiarezza del linguaggio chimico diventa strumento di resistenza alla disumanizzazione.', explanationPl: 'Levi przyjmuje klarowny, niemal naukowy styl, aby dać świadectwo Auschwitz. Jasność języka chemika staje się narzędziem oporu.' },
];

const MATURITA_VOCAB: MaturitaVocab[] = [
  { id: 'mv001', italian: 'tuttavia', polish: 'jednak/niemniej', category: 'essay_connector', usage: 'Il fenomeno è positivo; tuttavia, presenta anche aspetti critici.' },
  { id: 'mv002', italian: 'pertanto', polish: 'zatem/dlatego też', category: 'essay_connector', usage: 'L\'inquinamento aumenta; pertanto, è necessario agire.' },
  { id: 'mv003', italian: 'nonostante', polish: 'pomimo/mimo', category: 'essay_connector', usage: 'Nonostante le difficoltà, il paese ha superato la crisi.' },
  { id: 'mv004', italian: 'in conclusione', polish: 'podsumowując/na zakończenie', category: 'essay_connector', usage: 'In conclusione, possiamo affermare che...' },
  { id: 'mv005', italian: 'd\'altro canto', polish: 'z drugiej strony', category: 'essay_connector', usage: 'D\'altro canto, non bisogna trascurare i rischi.' },
  { id: 'mv006', italian: 'ciononostante', polish: 'mimo to', category: 'essay_connector', usage: 'La situazione era difficile; ciononostante, si trovò una soluzione.' },
  { id: 'mv007', italian: 'in merito a', polish: 'w odniesieniu do/co do', category: 'essay_connector', usage: 'In merito alla questione ambientale, si propone di...' },
  { id: 'mv008', italian: 'alla luce di', polish: 'w świetle', category: 'essay_connector', usage: 'Alla luce delle ultime ricerche, emerge che...' },
  { id: 'mv009', italian: 'è bene sottolineare', polish: 'warto podkreślić', category: 'essay_connector', usage: 'È bene sottolineare che il fenomeno non è recente.' },
  { id: 'mv010', italian: 'a tal proposito', polish: 'w tym kontekście/w tej kwestii', category: 'essay_connector', usage: 'A tal proposito, risulta significativa la ricerca di...' },
  { id: 'mv011', italian: 'allegoria', polish: 'alegoria', category: 'literary_term', usage: 'La Divina Commedia è un\'allegoria del percorso spirituale dell\'uomo.' },
  { id: 'mv012', italian: 'metafora', polish: 'metafora', category: 'literary_term', usage: 'Leopardi usa la metafora del "naufragio" per descrivere l\'abbandono all\'infinito.' },
  { id: 'mv013', italian: 'similitudine', polish: 'porównanie', category: 'literary_term', usage: 'La similitudine crea un paragone esplicito mediante "come" o "quanto".' },
  { id: 'mv014', italian: 'personificazione', polish: 'personifikacja', category: 'literary_term', usage: 'Leopardi personifica la Natura come una matrigna indifferente.' },
  { id: 'mv015', italian: 'anastrofe', polish: 'anastrofa (inwersja)', category: 'literary_term', usage: 'Nell\'anastrofe, l\'ordine normale delle parole viene invertito.' },
  { id: 'mv016', italian: 'sinestesia', polish: 'synestezja', category: 'literary_term', usage: 'Montale usa la sinestesia: "odore di limoni" evoca sensazioni multiple.' },
  { id: 'mv017', italian: 'ossimoro', polish: 'oksymoron', category: 'literary_term', usage: '"Il naufragar m\'è dolce" è un ossimoro: opposti uniti in un\'unica immagine.' },
  { id: 'mv018', italian: 'anafora', polish: 'anafora', category: 'literary_term', usage: 'La ripetizione di una parola all\'inizio di versi successivi si chiama anafora.' },
  { id: 'mv019', italian: 'endecasillabo', polish: 'hendekasylabus (11 sylab)', category: 'literary_term', usage: 'L\'endecasillabo è il metro più usato nella tradizione poetica italiana.' },
  { id: 'mv020', italian: 'narratore onnisciente', polish: 'narrator wszechwiedzący', category: 'analysis_term', usage: 'Il narratore onnisciente conosce pensieri e sentimenti di tutti i personaggi.' },
  { id: 'mv021', italian: 'flusso di coscienza', polish: 'strumień świadomości', category: 'analysis_term', usage: 'Svevo usa il flusso di coscienza per rappresentare i pensieri di Zeno.' },
  { id: 'mv022', italian: 'focalizzazione', polish: 'fokalizacja', category: 'analysis_term', usage: 'La focalizzazione interna limita la narrazione al punto di vista di un personaggio.' },
  { id: 'mv023', italian: 'tempo della storia', polish: 'czas historii (fabuła)', category: 'analysis_term', usage: 'Il tempo della storia è la successione cronologica degli eventi narrati.' },
  { id: 'mv024', italian: 'tesi', polish: 'teza', category: 'academic', usage: 'La tesi principale dell\'autore è che il progresso non coincide con la felicità.' },
  { id: 'mv025', italian: 'argomentare', polish: 'argumentować', category: 'academic', usage: 'È necessario argomentare la propria posizione con prove concrete.' },
  { id: 'mv026', italian: 'confutare', polish: 'obalać/zbijać argument', category: 'academic', usage: 'Il saggio deve anche confutare le tesi contrarie.' },
  { id: 'mv027', italian: 'derivata', polish: 'pochodna', category: 'math', usage: 'La derivata di una funzione misura il tasso di variazione istantaneo.' },
  { id: 'mv028', italian: 'integrale', polish: 'całka', category: 'math', usage: 'L\'integrale definito calcola l\'area sotto una curva.' },
  { id: 'mv029', italian: 'probabilità', polish: 'prawdopodobieństwo', category: 'math', usage: 'La probabilità di un evento varia tra 0 e 1.' },
  { id: 'mv030', italian: 'disequazione', polish: 'nierówność (matematyczna)', category: 'math', usage: 'La disequazione esprime una relazione di ordine tra espressioni algebriche.' },
];

type Tab = 'essays' | 'literature' | 'vocab' | 'oral';

export function MaturitaModule({ onXp }: { onXp: (xp: number) => void }) {
  const [tab, setTab] = useState<Tab>('essays');
  const [selectedEssay, setSelectedEssay] = useState<EssayPrompt | null>(null);
  const [essayText, setEssayText] = useState('');
  const [essayTimer, setEssayTimer] = useState(0);
  const [essayRunning, setEssayRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  // Literature quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizShowAnswer, setQuizShowAnswer] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Vocab state
  const [vocabIndex, setVocabIndex] = useState(0);
  const [vocabShowTranslation, setVocabShowTranslation] = useState(false);
  const [vocabFilter, setVocabFilter] = useState<string>('all');

  // Oral simulation
  const [oralQuestion, setOralQuestion] = useState('');
  const [oralAnswer, setOralAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recRef = useRef<{ stop: () => void } | null>(null);

  useEffect(() => {
    if (essayRunning) {
      timerRef.current = setInterval(() => setEssayTimer(t => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [essayRunning]);

  const tabs: Array<{ id: Tab; label: string; icon: string }> = [
    { id: 'essays', label: 'Esercitazioni scritte', icon: '✍️' },
    { id: 'literature', label: 'Letteratura', icon: '📚' },
    { id: 'vocab', label: 'Vocabolario maturità', icon: '🎓' },
    { id: 'oral', label: 'Simulazione orale', icon: '🎤' },
  ];

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const wordCount = essayText.trim().split(/\s+/).filter(Boolean).length;

  const ORAL_QUESTIONS = [
    'Parla della tua opera letteraria preferita studiata quest\'anno.',
    'Analizza il tema dell\'identità nella letteratura italiana del Novecento.',
    'Descrivi il ruolo della donna nella società italiana contemporanea.',
    'Quali sono le cause e le conseguenze del cambiamento climatico?',
    'Analizza il rapporto tra arte e società nell\'Italia del Risorgimento.',
    'Descrivi l\'evoluzione della lingua italiana da Dante ad oggi.',
    'Qual è il tuo giudizio sulla globalizzazione?',
    'Analizza il concetto di "progresso" nella filosofia e nella letteratura.',
    'Descrivi un\'opera d\'arte italiana che ritieni significativa.',
    'Come la tecnologia ha trasformato il modo di comunicare?',
  ];

  const renderEssays = () => {
    if (!selectedEssay) {
      const byType = (type: EssayPrompt['type']) => ESSAY_PROMPTS.filter(e => e.type === type);
      const typeLabels = { tema: 'Tema', analisi: 'Analisi del testo', saggio: 'Saggio breve' };
      return (
        <div className="space-y-6">
          {(['tema', 'analisi', 'saggio'] as const).map(type => (
            <div key={type}>
              <h3 className="text-sm font-semibold text-text-bright mb-3 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-accent/20 text-accent rounded text-xs">{typeLabels[type]}</span>
              </h3>
              <div className="space-y-2">
                {byType(type).map(prompt => (
                  <button key={prompt.id} onClick={() => { setSelectedEssay(prompt); setEssayText(''); setEssayTimer(0); setEssayRunning(false); }}
                    className="w-full text-left p-4 rounded-xl border border-border bg-bg-card hover:bg-bg-hover transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-text-bright">{prompt.title}</div>
                        <div className="text-sm text-text-dim">{prompt.titlePl}</div>
                      </div>
                      <div className="flex gap-2 shrink-0 ml-3 text-xs">
                        <span className="px-2 py-0.5 bg-bg rounded text-text-dim">{prompt.timeMinutes}min</span>
                        <span className={`px-2 py-0.5 rounded ${prompt.level === 'advanced' ? 'bg-warning/20 text-warning' : 'bg-accent/20 text-accent'}`}>
                          {prompt.level === 'advanced' ? 'Avanzato' : 'Standard'}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => { setSelectedEssay(null); setEssayRunning(false); }} className="text-text-dim hover:text-text text-sm">← Torna alla lista</button>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-mono ${essayRunning ? 'text-accent' : 'text-text-dim'}`}>{formatTime(essayTimer)}</span>
            <button onClick={() => setEssayRunning(r => !r)}
              className={`px-3 py-1 rounded text-sm ${essayRunning ? 'bg-danger/20 text-danger' : 'bg-accent/20 text-accent'}`}>
              {essayRunning ? '⏸ Pausa' : '▶ Avvia timer'}
            </button>
          </div>
        </div>

        {/* Prompt */}
        <div className="bg-bg-card rounded-xl p-5 border border-border mb-4">
          <div className="text-xs text-text-dim uppercase tracking-wide mb-2">
            {selectedEssay.type === 'tema' ? 'Tema' : selectedEssay.type === 'analisi' ? 'Analisi del testo' : 'Saggio breve'}
          </div>
          <div className="text-text leading-relaxed whitespace-pre-line">{selectedEssay.prompt}</div>
          <div className="flex gap-4 mt-3 text-xs text-text-dim">
            <span>⏱ {selectedEssay.timeMinutes} minuti</span>
            <span>📝 {selectedEssay.wordCount.min}–{selectedEssay.wordCount.max} parole</span>
          </div>
        </div>

        {/* Tips */}
        <details className="mb-4">
          <summary className="text-sm text-accent cursor-pointer hover:underline">💡 Consigli e struttura suggerita</summary>
          <div className="mt-3 space-y-3">
            <div className="bg-bg rounded-lg p-3">
              <div className="text-xs text-text-dim uppercase mb-2">Consigli</div>
              <ul className="space-y-1">
                {selectedEssay.tips.map((tip, i) => <li key={i} className="text-sm text-text flex gap-2"><span className="text-accent">•</span>{tip}</li>)}
              </ul>
            </div>
            <div className="bg-bg rounded-lg p-3">
              <div className="text-xs text-text-dim uppercase mb-2">Struttura consigliata</div>
              <ol className="space-y-1">
                {selectedEssay.exampleStructure.map((s, i) => <li key={i} className="text-sm text-text flex gap-2"><span className="text-accent font-mono">{i + 1}.</span>{s}</li>)}
              </ol>
            </div>
          </div>
        </details>

        {/* Writing area */}
        <textarea
          value={essayText}
          onChange={e => setEssayText(e.target.value)}
          onFocus={() => !essayRunning && setEssayRunning(true)}
          placeholder="Scrivi il tuo testo qui..."
          className="w-full h-80 px-4 py-3 bg-bg-input border border-border rounded-xl text-text placeholder-text-dim resize-none focus:outline-none focus:border-accent"
        />

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-4 text-sm">
            <span className={`${wordCount < selectedEssay.wordCount.min ? 'text-warning' : wordCount > selectedEssay.wordCount.max ? 'text-danger' : 'text-accent'}`}>
              {wordCount} parole
            </span>
            <span className="text-text-dim">(min: {selectedEssay.wordCount.min}, max: {selectedEssay.wordCount.max})</span>
          </div>
          <button
            onClick={() => { if (wordCount >= selectedEssay.wordCount.min) { onXp(50); setEssayRunning(false); } }}
            disabled={wordCount < selectedEssay.wordCount.min}
            className={`px-6 py-2 rounded-xl font-semibold text-sm transition-colors ${wordCount >= selectedEssay.wordCount.min ? 'bg-accent text-bg hover:bg-accent-dim' : 'bg-bg text-text-dim border border-border cursor-not-allowed'}`}>
            Consegna (+50 XP)
          </button>
        </div>
      </div>
    );
  };

  const renderLiterature = () => {
    if (quizIndex >= LITERATURE_QUIZZES.length) {
      return (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🏆</div>
          <h2 className="text-xl font-bold text-text-bright mb-2">Quiz completato!</h2>
          <div className="text-3xl font-bold text-accent mb-1">{quizScore}/{LITERATURE_QUIZZES.length}</div>
          <div className="text-text-dim mb-6">risposte corrette</div>
          <button onClick={() => { setQuizIndex(0); setQuizScore(0); setQuizSelected(null); setQuizShowAnswer(false); onXp(100); }}
            className="px-6 py-3 bg-accent text-bg font-bold rounded-xl hover:bg-accent-dim">
            Ricomincia
          </button>
        </div>
      );
    }

    const q = LITERATURE_QUIZZES[quizIndex];
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-text-dim">{quizIndex + 1}/{LITERATURE_QUIZZES.length}</div>
          <span className="text-sm text-accent">{quizScore} corrette</span>
        </div>
        <div className="w-full bg-bg-card rounded-full h-1.5 mb-6 overflow-hidden">
          <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${(quizIndex / LITERATURE_QUIZZES.length) * 100}%` }} />
        </div>

        <div className="bg-bg-card rounded-xl p-5 border border-border">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-2 py-0.5 bg-xp/20 text-xp rounded text-xs">{q.author}</span>
            <span className="px-2 py-0.5 bg-bg rounded text-text-dim text-xs">{q.work}</span>
            <span className="px-2 py-0.5 bg-bg rounded text-text-dim text-xs">{q.period}</span>
          </div>
          <div className="text-text-bright text-lg mb-5">{q.question}</div>
          <div className="space-y-2">
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => !quizShowAnswer && setQuizSelected(i)}
                disabled={quizShowAnswer}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm ${
                  quizShowAnswer && i === q.correctIndex ? 'border-accent bg-accent/10 text-accent' :
                  quizShowAnswer && i === quizSelected && i !== q.correctIndex ? 'border-danger bg-danger/10 text-danger' :
                  quizSelected === i ? 'border-accent bg-accent/10 text-accent' :
                  'border-border bg-bg hover:bg-bg-hover text-text'}`}>
                {opt}
              </button>
            ))}
          </div>
          {quizShowAnswer && (
            <div className="mt-4 p-4 bg-bg rounded-lg animate-fade-in space-y-2">
              <div className="text-sm text-text">{q.explanation}</div>
              <div className="text-sm text-text-dim italic">{q.explanationPl}</div>
            </div>
          )}
        </div>

        {!quizShowAnswer ? (
          <button onClick={() => { setQuizShowAnswer(true); if (quizSelected === q.correctIndex) setQuizScore(s => s + 1); }}
            disabled={quizSelected === null}
            className={`w-full mt-4 py-4 font-bold rounded-xl ${quizSelected !== null ? 'bg-accent text-bg hover:bg-accent-dim' : 'bg-bg-card text-text-dim border border-border cursor-not-allowed'}`}>
            Verifica
          </button>
        ) : (
          <button onClick={() => { setQuizIndex(i => i + 1); setQuizSelected(null); setQuizShowAnswer(false); }}
            className="w-full mt-4 py-4 bg-accent text-bg font-bold rounded-xl hover:bg-accent-dim">
            Prossima domanda →
          </button>
        )}
      </div>
    );
  };

  const filteredVocab = vocabFilter === 'all' ? MATURITA_VOCAB : MATURITA_VOCAB.filter(v => v.category === vocabFilter);
  const currentVocab = filteredVocab[vocabIndex % Math.max(filteredVocab.length, 1)];

  const renderVocab = () => (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {['all', 'essay_connector', 'literary_term', 'analysis_term', 'academic', 'math'].map(cat => (
          <button key={cat} onClick={() => { setVocabFilter(cat); setVocabIndex(0); setVocabShowTranslation(false); }}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${vocabFilter === cat ? 'bg-accent text-bg' : 'bg-bg-card text-text-dim hover:text-text border border-border'}`}>
            {cat === 'all' ? 'Tutti' : cat === 'essay_connector' ? 'Connettivi' : cat === 'literary_term' ? 'Termini letterari' : cat === 'analysis_term' ? 'Analisi testuale' : cat === 'academic' ? 'Accademico' : 'Matematica'}
          </button>
        ))}
      </div>

      {currentVocab && (
        <div>
          <div className="bg-bg-card rounded-2xl p-8 border border-border text-center min-h-[220px] flex flex-col justify-center cursor-pointer"
            onClick={() => setVocabShowTranslation(true)}>
            <div className="text-xs text-text-dim uppercase tracking-wide mb-3">{currentVocab.category}</div>
            <div className="text-2xl font-bold text-text-bright mb-4">{currentVocab.italian}</div>
            {isSpeechSupported() && (
              <button onClick={e => { e.stopPropagation(); speakItalian(currentVocab.italian); }} className="text-accent text-sm hover:underline mb-4 mx-auto">
                🔊 Ascolta
              </button>
            )}
            {!vocabShowTranslation ? (
              <div className="text-text-dim text-sm">Clicca per vedere la traduzione e l'uso</div>
            ) : (
              <div className="animate-fade-in space-y-3">
                <div className="h-px bg-border" />
                <div className="text-xl text-accent font-semibold">{currentVocab.polish}</div>
                <div className="bg-bg rounded-lg p-3 text-left">
                  <div className="text-xs text-text-dim mb-1">Esempio d'uso:</div>
                  <div className="text-sm text-text italic">"{currentVocab.usage}"</div>
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-3 mt-4">
            {vocabShowTranslation && (
              <button onClick={() => { setVocabIndex(i => (i + 1) % filteredVocab.length); setVocabShowTranslation(false); onXp(5); }}
                className="flex-1 py-3 bg-accent text-bg font-semibold rounded-xl hover:bg-accent-dim">
                Prossima →
              </button>
            )}
            {!vocabShowTranslation && (
              <button onClick={() => setVocabShowTranslation(true)}
                className="flex-1 py-3 bg-bg-card border border-border rounded-xl text-text hover:bg-bg-hover">
                Mostra traduzione
              </button>
            )}
          </div>
          <div className="text-center text-xs text-text-dim mt-2">{(vocabIndex % filteredVocab.length) + 1}/{filteredVocab.length}</div>
        </div>
      )}
    </div>
  );

  const renderOral = () => {
    const randomQuestion = () => {
      setOralQuestion(ORAL_QUESTIONS[Math.floor(Math.random() * ORAL_QUESTIONS.length)]);
      setOralAnswer('');
    };

    return (
      <div className="space-y-4">
        <div className="bg-bg-card rounded-xl p-4 border border-border">
          <p className="text-sm text-text-dim mb-3">
            Simula l'esame orale della maturità. Il sistema ti pone una domanda — rispondi a voce o per iscritto.
          </p>
          {!oralQuestion && (
            <button onClick={randomQuestion} className="w-full py-3 bg-accent text-bg font-semibold rounded-xl hover:bg-accent-dim">
              🎯 Inizia simulazione orale
            </button>
          )}
        </div>

        {oralQuestion && (
          <>
            <div className="bg-bg-card rounded-xl p-5 border border-accent/30">
              <div className="text-xs text-accent uppercase tracking-wide mb-2">Domanda del commissario</div>
              <div className="text-lg text-text-bright">{oralQuestion}</div>
              {isSpeechSupported() && (
                <button onClick={() => speakItalian(oralQuestion)} className="mt-2 text-sm text-accent hover:underline">
                  🔊 Ascolta la domanda
                </button>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (isRecording) { recRef.current?.stop(); } else {
                      const rec = startSpeechRecognition(
                        (text) => { setOralAnswer(text); setIsRecording(false); },
                        () => setIsRecording(false),
                      );
                      if (rec) { recRef.current = rec; setIsRecording(true); }
                    }
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isRecording ? 'bg-danger/20 text-danger animate-pulse' : 'bg-bg-hover text-text'}`}>
                  {isRecording ? '⏹ Stop' : '🎤 Parla'}
                </button>
                <span className="text-xs text-text-dim self-center">oppure scrivi qui sotto</span>
              </div>
              <textarea
                value={oralAnswer}
                onChange={e => setOralAnswer(e.target.value)}
                placeholder="Scrivi la tua risposta in italiano..."
                className="w-full h-40 px-4 py-3 bg-bg-input border border-border rounded-xl text-text placeholder-text-dim resize-none focus:outline-none focus:border-accent"
              />
            </div>

            <div className="flex gap-3">
              <button onClick={randomQuestion} className="flex-1 py-3 bg-bg-card border border-border rounded-xl text-text hover:bg-bg-hover text-sm">
                Prossima domanda
              </button>
              <button
                onClick={() => { if (oralAnswer.trim().length > 20) { onXp(30); randomQuestion(); } }}
                disabled={oralAnswer.trim().length < 20}
                className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-colors ${oralAnswer.trim().length >= 20 ? 'bg-accent text-bg hover:bg-accent-dim' : 'bg-bg-card text-text-dim border border-border cursor-not-allowed'}`}>
                Consegna risposta (+30 XP)
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-text-bright mb-1">Preparazione Maturità</h2>
        <p className="text-text-dim text-sm">Esercitazioni specifiche per l'esame di maturità italiano.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 border-b border-border pb-4">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${tab === t.id ? 'bg-accent text-bg font-semibold' : 'bg-bg-card text-text-dim hover:text-text border border-border'}`}>
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
      </div>

      {tab === 'essays' && renderEssays()}
      {tab === 'literature' && renderLiterature()}
      {tab === 'vocab' && renderVocab()}
      {tab === 'oral' && renderOral()}
    </div>
  );
}
