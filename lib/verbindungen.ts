export interface VerbindungenPuzzle {
  day: number;
  groups: { title: string; words: string[]; difficulty: 0 | 1 | 2 | 3 }[];
}

export const VERBINDUNGEN_PUZZLES: VerbindungenPuzzle[] = [
  { day: 1, groups: [
    { title: "Himmelsrichtungen", words: ["NORD", "SÜD", "OST", "WEST"], difficulty: 0 },
    { title: "Jahreszeiten", words: ["FRÜHLING", "SOMMER", "HERBST", "WINTER"], difficulty: 1 },
    { title: "___ Ball", words: ["FUß", "HAND", "BASKET", "VOLLEY"], difficulty: 2 },
    { title: "Grundfarben", words: ["ROT", "BLAU", "GRÜN", "GELB"], difficulty: 3 },
  ]},
  { day: 2, groups: [
    { title: "Haustiere", words: ["HUND", "KATZE", "MAUS", "VOGEL"], difficulty: 0 },
    { title: "Planeten", words: ["MARS", "VENUS", "SATURN", "NEPTUN"], difficulty: 1 },
    { title: "Deutsche Großstädte", words: ["BERLIN", "MÜNCHEN", "HAMBURG", "KÖLN"], difficulty: 2 },
    { title: "___ Wasser", words: ["MINERAL", "LEITUNGS", "QUELL", "MEER"], difficulty: 3 },
  ]},
  { day: 3, groups: [
    { title: "Werkzeuge", words: ["HAMMER", "SÄGE", "ZANGE", "HOBEL"], difficulty: 0 },
    { title: "Tanzstile", words: ["WALZER", "TANGO", "SALSA", "SAMBA"], difficulty: 1 },
    { title: "Deutsche Flüsse", words: ["RHEIN", "MOSEL", "MAIN", "ISAR"], difficulty: 2 },
    { title: "Deutsche Dichter", words: ["GOETHE", "SCHILLER", "HEINE", "RILKE"], difficulty: 3 },
  ]},
  { day: 4, groups: [
    { title: "Sportarten am Wasser", words: ["SURFEN", "SEGELN", "RUDERN", "TAUCHEN"], difficulty: 0 },
    { title: "Käsesorten", words: ["GOUDA", "BRIE", "FETA", "EDAMER"], difficulty: 1 },
    { title: "Vogelarten", words: ["ADLER", "FALKE", "STORCH", "PELIKAN"], difficulty: 2 },
    { title: "Deutsche Inseln", words: ["RÜGEN", "SYLT", "USEDOM", "FÖHR"], difficulty: 3 },
  ]},
  { day: 5, groups: [
    { title: "Brettspiele", words: ["SCHACH", "MÜHLE", "DAME", "HALMA"], difficulty: 0 },
    { title: "Desserts", words: ["TIRAMISU", "STRUDEL", "PUDDING", "PARFAIT"], difficulty: 1 },
    { title: "___ Suppe", words: ["TOMATEN", "LINSEN", "ERBSEN", "KÜRBIS"], difficulty: 2 },
    { title: "Griechische Buchstaben", words: ["ALPHA", "BETA", "GAMMA", "DELTA"], difficulty: 3 },
  ]},
  { day: 6, groups: [
    { title: "Bäume", words: ["EICHE", "BIRKE", "LINDE", "BUCHE"], difficulty: 0 },
    { title: "Meerestiere", words: ["DELFIN", "SEEHUND", "KRABBE", "QUALLE"], difficulty: 1 },
    { title: "Chemische Elemente", words: ["GOLD", "SILBER", "KUPFER", "EISEN"], difficulty: 2 },
    { title: "___ Wald", words: ["SCHWARZ", "TROP", "UR", "HOCH"], difficulty: 3 },
  ]},
  { day: 7, groups: [
    { title: "Körperteile (Gesicht)", words: ["NASE", "KINN", "WANGE", "STIRN"], difficulty: 0 },
    { title: "Kaffeespezialitäten", words: ["ESPRESSO", "CAPPUCCINO", "LATTE", "MOKKA"], difficulty: 1 },
    { title: "Edelsteine", words: ["RUBIN", "SMARAGD", "SAPHIR", "TOPAS"], difficulty: 2 },
    { title: "___ Zeit", words: ["FREI", "ARBEITS", "MITTAGS", "NACHT"], difficulty: 3 },
  ]},
  { day: 8, groups: [
    { title: "Tropische Früchte", words: ["MANGO", "KIWI", "PAPAYA", "GUAVE"], difficulty: 0 },
    { title: "Automarken", words: ["BMW", "AUDI", "PORSCHE", "OPEL"], difficulty: 1 },
    { title: "Tiere der Savanne", words: ["ZEBRA", "GIRAFFE", "GEPARD", "HYÄNE"], difficulty: 2 },
    { title: "Alte Währungen", words: ["MARK", "SCHILLING", "LIRA", "FRANC"], difficulty: 3 },
  ]},
  { day: 9, groups: [
    { title: "Musikinstrumente", words: ["GEIGE", "FLÖTE", "TUBA", "HARFE"], difficulty: 0 },
    { title: "Urlaubsinseln", words: ["MALLORCA", "KRETA", "IBIZA", "KORSIKA"], difficulty: 1 },
    { title: "Wetterwörter", words: ["REGEN", "SCHNEE", "HAGEL", "NEBEL"], difficulty: 2 },
    { title: "Philosophen", words: ["KANT", "HEGEL", "MARX", "LEIBNIZ"], difficulty: 3 },
  ]},
  { day: 10, groups: [
    { title: "Haushaltsgeräte", words: ["TOASTER", "MIXER", "HERD", "SPÜLER"], difficulty: 0 },
    { title: "Modestädte", words: ["PARIS", "MAILAND", "LONDON", "TOKIO"], difficulty: 1 },
    { title: "Alpenberühmtheiten", words: ["ZUGSPITZE", "MATTERHORN", "EIGER", "JUNGFRAU"], difficulty: 2 },
    { title: "Kartenspielbegriffe", words: ["TRUMPF", "BLATT", "STICH", "KREUZ"], difficulty: 3 },
  ]},
  { day: 11, groups: [
    { title: "Wintersportarten", words: ["SKIFAHREN", "RODELN", "EISLAUFEN", "CURLING"], difficulty: 0 },
    { title: "Gemüsesorten", words: ["SPINAT", "BROKKOLI", "LAUCH", "FENCHEL"], difficulty: 1 },
    { title: "Elektronik-Marken", words: ["SAMSUNG", "SONY", "APPLE", "HUAWEI"], difficulty: 2 },
    { title: "Literarische Figuren (deutsch)", words: ["FAUST", "WERTHER", "EFFI", "HEIDI"], difficulty: 3 },
  ]},
  { day: 12, groups: [
    { title: "Müll-Trennung", words: ["PAPIER", "GLAS", "PLASTIK", "METALL"], difficulty: 0 },
    { title: "Berufe", words: ["ARZT", "LEHRER", "BÄCKER", "PILOT"], difficulty: 1 },
    { title: "Fischarten", words: ["LACHS", "FORELLE", "HECHT", "ZANDER"], difficulty: 2 },
    { title: "Superhelden (Vornamen)", words: ["BATMAN", "IRONMAN", "THOR", "HULK"], difficulty: 3 },
  ]},
  { day: 13, groups: [
    { title: "Winterkleidung", words: ["MÜTZE", "SCHAL", "MANTEL", "STIEFEL"], difficulty: 0 },
    { title: "Soziale Medien", words: ["INSTAGRAM", "TIKTOK", "SNAPCHAT", "YOUTUBE"], difficulty: 1 },
    { title: "Klassische Komponisten", words: ["BACH", "MOZART", "BRAHMS", "LISZT"], difficulty: 2 },
    { title: "Architekturstile", words: ["BAROCK", "GOTIK", "ROKOKO", "JUGENDSTIL"], difficulty: 3 },
  ]},
  { day: 14, groups: [
    { title: "Raubkatzen", words: ["LÖWE", "TIGER", "LEOPARD", "JAGUAR"], difficulty: 0 },
    { title: "Süßigkeiten", words: ["GUMMIBÄR", "LAKRITZ", "MARZIPAN", "KARAMELL"], difficulty: 1 },
    { title: "Klimazonen", words: ["TROPEN", "STEPPE", "TUNDRA", "TAIGA"], difficulty: 2 },
    { title: "Wörter mit GEIST", words: ["WEIN", "POLTER", "SCHUTZ", "HEILIG"], difficulty: 3 },
  ]},
  { day: 15, groups: [
    { title: "Schulfächer", words: ["MATHE", "CHEMIE", "BIOLOGIE", "PHYSIK"], difficulty: 0 },
    { title: "Regionen Italiens", words: ["TOSKANA", "SIZILIEN", "VENETIEN", "SARDINIEN"], difficulty: 1 },
    { title: "Synonyme für ‚groß'", words: ["RIESIG", "ENORM", "GEWALTIG", "IMMENS"], difficulty: 2 },
    { title: "___ Brücke", words: ["GOLDEN GATE", "LONDON", "CHARLES", "BROOKLYN"], difficulty: 3 },
  ]},
  { day: 16, groups: [
    { title: "Frühstückszutaten", words: ["BUTTER", "MARMELADE", "HONIG", "QUARK"], difficulty: 0 },
    { title: "Deutschsprachige Länder", words: ["DEUTSCHLAND", "ÖSTERREICH", "SCHWEIZ", "LUXEMBURG"], difficulty: 1 },
    { title: "Würfelspiele", words: ["KNIFFEL", "BLUFF", "LUDO", "BACKGAMMON"], difficulty: 2 },
    { title: "Finanzprodukte", words: ["AKTIE", "FONDS", "ANLEIHE", "DEPOT"], difficulty: 3 },
  ]},
  { day: 17, groups: [
    { title: "Brotarten", words: ["BAGUETTE", "CIABATTA", "BREZEL", "TOAST"], difficulty: 0 },
    { title: "Wettereigenschaften", words: ["SONNIG", "BEWÖLKT", "STÜRMISCH", "SCHWÜL"], difficulty: 1 },
    { title: "Tiere im Winterschlaf", words: ["BÄR", "IGEL", "MURMELTIER", "SIEBENSCHLÄFER"], difficulty: 2 },
    { title: "HAND ___", words: ["SCHUH", "TASCHE", "TUCH", "WERK"], difficulty: 3 },
  ]},
  { day: 18, groups: [
    { title: "Sprachen Europas", words: ["POLNISCH", "UNGARISCH", "TÜRKISCH", "GRIECHISCH"], difficulty: 0 },
    { title: "Küstenformen", words: ["BUCHT", "KLIPPE", "LAGUNE", "FJORD"], difficulty: 1 },
    { title: "Gemüse (rund)", words: ["TOMATE", "ZWIEBEL", "RÜBE", "KOHLRABI"], difficulty: 2 },
    { title: "___ Spiel", words: ["KINDER", "MASSEN", "WORT", "FREI"], difficulty: 3 },
  ]},
  { day: 19, groups: [
    { title: "Hauptstädte Europas", words: ["WIEN", "PRAG", "WARSCHAU", "ZAGREB"], difficulty: 0 },
    { title: "Popstars (Vornamen)", words: ["MICHAEL", "MADONNA", "ADELE", "BEYONCÉ"], difficulty: 1 },
    { title: "Outdoor-Ausrüstung", words: ["RUCKSACK", "ZELT", "KOMPASS", "STIRNLAMPE"], difficulty: 2 },
    { title: "___ Recht", words: ["BÜRGER", "STRAF", "SOZIAL", "PATENT"], difficulty: 3 },
  ]},
  { day: 20, groups: [
    { title: "Teile eines Hauses", words: ["DACH", "KELLER", "FLUR", "DIELE"], difficulty: 0 },
    { title: "Computerbegriffe", words: ["RAM", "CACHE", "PIXEL", "BIT"], difficulty: 1 },
    { title: "Krankheiten (leichte)", words: ["SCHNUPFEN", "HUSTEN", "GRIPPE", "MASERN"], difficulty: 2 },
    { title: "Arten von Plänen", words: ["GRUND", "BAUM", "LAGE", "FLUG"], difficulty: 3 },
  ]},
  { day: 21, groups: [
    { title: "Monate (Herbst+)", words: ["SEPTEMBER", "OKTOBER", "NOVEMBER", "DEZEMBER"], difficulty: 0 },
    { title: "Synonyme für ‚rennen'", words: ["SPRINTEN", "JAGEN", "HETZEN", "FLITZEN"], difficulty: 1 },
    { title: "Müsli-Zutaten", words: ["HAFERFLOCKEN", "MANDELN", "ROSINEN", "KOKOSFLOCKEN"], difficulty: 2 },
    { title: "DUSCH ___", words: ["GEL", "KOPF", "VORHANG", "KABINE"], difficulty: 3 },
  ]},
  { day: 22, groups: [
    { title: "Pizza-Beläge", words: ["SALAMI", "THUNFISCH", "RUCOLA", "SCHINKEN"], difficulty: 0 },
    { title: "Währungen Asiens", words: ["YEN", "YUAN", "RUPIE", "BAHT"], difficulty: 1 },
    { title: "Haustier-Zubehör", words: ["HALSBAND", "NAPF", "KÄFIG", "KÖRBCHEN"], difficulty: 2 },
    { title: "Persönlichkeits-Adjektive", words: ["MUTIG", "GEDULDIG", "NEUGIERIG", "KREATIV"], difficulty: 3 },
  ]},
  { day: 23, groups: [
    { title: "Seen in Deutschland", words: ["BODENSEE", "CHIEMSEE", "TEGERNSEE", "AMMERSEE"], difficulty: 0 },
    { title: "Rechtsformen", words: ["GMBH", "AG", "GBR", "KG"], difficulty: 1 },
    { title: "Wörter mit HAUS", words: ["KRANKEN", "TREIB", "PFERDE", "WAREN"], difficulty: 2 },
    { title: "Deutsche Tortenklassiker", words: ["SCHWARZWÄLDER", "SACHERTORTE", "BIENENSTICH", "DONAUWELLEN"], difficulty: 3 },
  ]},
  { day: 24, groups: [
    { title: "Stoffe", words: ["SEIDE", "WOLLE", "LEINEN", "BAUMWOLLE"], difficulty: 0 },
    { title: "Synonyme für ‚sprechen'", words: ["REDEN", "QUATSCHEN", "FLÜSTERN", "MURMELN"], difficulty: 1 },
    { title: "Weine nach Rebsorte", words: ["RIESLING", "BURGUNDER", "MERLOT", "SHIRAZ"], difficulty: 2 },
    { title: "___ Fahrt", words: ["BERG", "HEIM", "RUND", "JUNGFERN"], difficulty: 3 },
  ]},
  { day: 25, groups: [
    { title: "Gewürze", words: ["KURKUMA", "KORIANDER", "ZIMT", "KARDAMOM"], difficulty: 0 },
    { title: "Europäische Gebirge", words: ["ALPEN", "PYRENÄEN", "KARPATEN", "APENNIN"], difficulty: 1 },
    { title: "Vögel die nicht fliegen", words: ["PINGUIN", "STRAUSS", "KIWI", "EMU"], difficulty: 2 },
    { title: "Typen von Humor", words: ["IRONIE", "SARKASMUS", "ZYNISMUS", "SATIRE"], difficulty: 3 },
  ]},
  { day: 26, groups: [
    { title: "Elektrische Geräte", words: ["HANDY", "TABLET", "LAPTOP", "SMARTWATCH"], difficulty: 0 },
    { title: "Teile des Auges", words: ["IRIS", "PUPILLE", "RETINA", "LINSE"], difficulty: 1 },
    { title: "___ Meister", words: ["WELT", "BÜRGER", "HAND", "ZUNFT"], difficulty: 2 },
    { title: "Philosophische Begriffe", words: ["ETHIK", "LOGIK", "ÄSTHETIK", "ONTOLOGIE"], difficulty: 3 },
  ]},
  { day: 27, groups: [
    { title: "Märchenfiguren", words: ["RAPUNZEL", "CINDERELLA", "RUMPELSTILZ", "SCHNEEWITTCHEN"], difficulty: 0 },
    { title: "Farben (aus dem Englischen)", words: ["PINK", "BEIGE", "ORANGE", "TÜRKIS"], difficulty: 1 },
    { title: "___ Berg", words: ["GOLD", "EIS", "HEIDEL", "FEUER"], difficulty: 2 },
    { title: "Mathematische Begriffe", words: ["INTEGRAL", "VEKTOR", "MATRIX", "TANGENTE"], difficulty: 3 },
  ]},
  { day: 28, groups: [
    { title: "Sportarten mit Ball (exotisch)", words: ["RUGBY", "POLO", "CRICKET", "LACROSSE"], difficulty: 0 },
    { title: "Teile einer Zeitung", words: ["TITEL", "LEITARTIKEL", "KOLUMNE", "RUBRIK"], difficulty: 1 },
    { title: "Arten von Energie", words: ["SOLAR", "WIND", "KERN", "GEOTHERMISCH"], difficulty: 2 },
    { title: "WASSER ___", words: ["FALL", "HAHN", "MANN", "STAND"], difficulty: 3 },
  ]},
  { day: 29, groups: [
    { title: "Sandwichfüllungen", words: ["KÄSE", "SCHINKEN", "THUNFISCH", "AVOCADO"], difficulty: 0 },
    { title: "Wochentage (erste vier)", words: ["MONTAG", "DIENSTAG", "MITTWOCH", "DONNERSTAG"], difficulty: 1 },
    { title: "Deutschen Nobelpreisträgern (Nachname)", words: ["GRASS", "HESSE", "BÖLL", "CANETTI"], difficulty: 2 },
    { title: "Stadtstaaten Deutschlands + 1 Außenseiter", words: ["BERLIN", "HAMBURG", "BREMEN", "BOCHUM"], difficulty: 3 },
  ]},
  { day: 30, groups: [
    { title: "Frühlingswörter", words: ["TULPE", "OSTERN", "SCHMETTERLING", "REGENSCHAUER"], difficulty: 0 },
    { title: "Autobahnraststätten-Artikel", words: ["KAFFEE", "BREZEL", "ZEITUNG", "TANKFÜLLUNG"], difficulty: 1 },
    { title: "Was fehlt nach KURZ-", words: ["TRIP", "SCHLUSS", "STRECKE", "ARBEIT"], difficulty: 2 },
    { title: "Wörter die auf -HEIT enden", words: ["SCHÖNHEIT", "FREIHEIT", "WAHRHEIT", "GESUNDHEIT"], difficulty: 3 },
  ]},
];

export const DIFFICULTY_COLORS = ["#f5dd63", "#a0c35a", "#b0c4ef", "#ba81c5"] as const;
export const DIFFICULTY_LABELS = ["Einfach", "Mittel", "Schwer", "Sehr schwer"] as const;

export function getDailyVerbindungen(): VerbindungenPuzzle {
  const epoch = new Date("2025-01-01");
  const today = new Date();
  const diff = Math.floor((today.getTime() - epoch.getTime()) / 86400000);
  return VERBINDUNGEN_PUZZLES[diff % VERBINDUNGEN_PUZZLES.length];
}
