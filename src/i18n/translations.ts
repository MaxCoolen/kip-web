import type { Lang } from '../context/LanguageContext'

// ── Nav ───────────────────────────────────────────────────────────────────────

export const nav = {
  nl: [
    { label: 'Over ons',     href: '/#over-ons' },
    { label: 'Menu',         href: '/#menu' },
    { label: 'Opwarmadvies', href: '/opwarmadvies' },
    // { label: 'Recepten', href: '/recepten' },  // tijdelijk verborgen
    { label: 'Locaties',     href: '/#locaties' },
    { label: 'Contact',      href: '/#contact' },
  ],
  en: [
    { label: 'About',            href: '/#over-ons' },
    { label: 'Menu',             href: '/#menu' },
    { label: 'Reheating Guide',  href: '/opwarmadvies' },
    // { label: 'Recipes', href: '/recepten' },  // temporarily hidden
    { label: 'Locations',        href: '/#locaties' },
    { label: 'Contact',          href: '/#contact' },
  ],
}

// ── Hero ──────────────────────────────────────────────────────────────────────

export const hero = {
  nl: {
    tagline: 'Vers gegrilde kip van het spit',
    cta1: 'BEKIJK MENU',
    cta2: 'VIND ONS',
  },
  en: {
    tagline: 'Freshly grilled chicken from the spit',
    cta1: 'VIEW MENU',
    cta2: 'FIND US',
  },
}

// ── About ─────────────────────────────────────────────────────────────────────

export const about = {
  nl: {
    label: '// Over ons',
    heading1: 'DE LEKKERSTE',
    heading2: 'KIP',
    heading3: 'VAN HET SPIT',
    body: "Kip 'N Grill is een foodtruck gespecialiseerd in vers gegrilde kip van het spit. Van hele kippen tot pulled chicken broodjes en kippeling — alles vers van de grill. Altijd bereid met passie, altijd met de beste ingrediënten.",
    features: [
      {
        title: 'Vers van de grill',
        description: 'Onze kippen worden de hele dag vers gegrild op het spit voor de perfecte smaak.',
      },
      {
        title: '100% biologische vrije uitloopkippen',
        description: "Bij Kip 'N Grill draait alles om kwaliteit en smaak. Onze kippen zijn biologisch, 100% anti biotica vrij en afkomstig van vrije uitloop, waardoor ze een eerlijke en volle smaak hebben.",
      },
      {
        title: 'Op locatie',
        description: 'Vind ons op markten, festivals of binnekort op jouw feest of evenement!',
      },
      {
        title: '100% Halal',
        description: 'Al onze producten zijn 100% halal gecertificeerd. Wij werken uitsluitend met gecertificeerde leveranciers zodat iedereen met een gerust hart kan genieten.',
      },
    ],
  },
  en: {
    label: '// About us',
    heading1: 'THE BEST',
    heading2: 'CHICKEN',
    heading3: 'FROM THE SPIT',
    body: "Kip 'N Grill is a food truck specialising in freshly grilled chicken from the spit. From whole chickens to pulled chicken sandwiches and chicken bites — everything fresh off the grill. Always prepared with passion, always with the finest ingredients.",
    features: [
      {
        title: 'Fresh from the grill',
        description: 'Our chickens are grilled fresh on the spit all day long for the perfect flavour.',
      },
      {
        title: '100% organic free-range chickens',
        description: "At Kip 'N Grill, everything revolves around quality and taste. Our chickens are organic, 100% antibiotic-free and free-range, giving them a rich and honest flavour.",
      },
      {
        title: 'On location',
        description: 'Find us at markets, festivals or soon at your party or event!',
      },
      {
        title: '100% Halal',
        description: 'All our products are 100% halal certified. We work exclusively with certified suppliers so everyone can enjoy with confidence.',
      },
    ],
  },
}

// ── Menu ──────────────────────────────────────────────────────────────────────

export const menu = {
  nl: {
    label: '// Ons menu',
    heading1: 'WAT ETEN',
    heading2: 'WE?',
    sub: 'Alles dagelijks vers bereid. Bekijk ons aanbod.',
    categories: ['Grill', 'Fried Chicken', 'Broodjes'] as const,
    tagFavoriet: 'Favoriet',
    tagBestseller: 'Bestseller',
    items: [
      { name: 'Hele gegrilde kip',      description: 'Langzaam gegrild op het spit, krokant van buiten en sappig van binnen.' },
      { name: 'Halve kip',              description: 'Een halve spitkip met keuze uit diverse sauzen.' },
      { name: 'Kippen Vleugels',        description: 'Krokante wings gemarineerd in onze signature kruiden.' },
      { name: 'Kippen Bouten',          description: 'Perfect gegrilde kippenbouten.' },
      { name: 'Drumsticks',             description: 'Perfect gegrilde drumsticks van het spit.' },
      { name: 'Kippeling',              description: 'Goudbruin gefrituurde Kippeling gemaakt van 100% kippendijfilets.' },
      { name: 'Crispy chicken strips',  description: 'Krokante kipstrips in een knapperig jasje.' },
      { name: 'Hot Wings',              description: 'Licht Pittige Wings in een krokant jasje.' },
      { name: 'Broodje pulled chicken', description: 'Zacht geplukte kip op een vers broodje met komkommer en saus naar keuze.' },
      { name: 'Lunch Deal! Broodje pulled chicken + Drinken', description: 'Zacht geplukte kip op een vers broodje met komkommer en saus naar keuze en een drankje.' },
    ],
    variantLabels: {
      'Medium': 'Medium', 'Large': 'Large',
      '6 stuks': '6 stuks', 'per stuk': 'per stuk',
      '4 stuks': '4 stuks', '6 Stuks': '6 Stuks',
      '8 Stuks': '8 Stuks', '4 Stuks': '4 Stuks',
      '5 Stuks': '5 Stuks', '10 Stuks': '10 Stuks',
      'Half Stokbrood': 'Half Stokbrood', 'Heel Stokbrood': 'Heel Stokbrood',
    },
  },
  en: {
    label: '// Our menu',
    heading1: 'WHAT ARE',
    heading2: "WE EATING?",
    sub: 'Everything freshly prepared daily. View our selection.',
    categories: ['Grill', 'Fried Chicken', 'Sandwiches'] as const,
    tagFavoriet: 'Favourite',
    tagBestseller: 'Bestseller',
    items: [
      { name: 'Whole grilled chicken',     description: 'Slowly grilled on the spit, crispy on the outside and juicy on the inside.' },
      { name: 'Half chicken',              description: 'A half spit-roasted chicken with a choice of various sauces.' },
      { name: 'Chicken Wings',             description: 'Crispy wings marinated in our signature spices.' },
      { name: 'Chicken Legs',              description: 'Perfectly grilled chicken legs.' },
      { name: 'Drumsticks',               description: 'Perfectly grilled drumsticks from the spit.' },
      { name: 'Chicken Bites',            description: 'Golden-fried chicken bites made from 100% chicken thigh fillets.' },
      { name: 'Crispy chicken strips',     description: 'Crispy chicken strips in a crunchy coating.' },
      { name: 'Hot Wings',                description: 'Mildly spicy wings in a crunchy coating.' },
      { name: 'Pulled chicken sandwich',  description: 'Tender pulled chicken on a fresh roll with cucumber and sauce of your choice.' },
      { name: 'Lunch Deal! Pulled chicken sandwich + Drink', description: 'Tender pulled chicken on a fresh roll with cucumber, sauce of your choice and a drink.' },
    ],
    variantLabels: {
      'Medium': 'Medium', 'Large': 'Large',
      '6 stuks': '6 pcs', 'per stuk': 'per pc',
      '4 stuks': '4 pcs', '6 Stuks': '6 pcs',
      '8 Stuks': '8 pcs', '4 Stuks': '4 pcs',
      '5 Stuks': '5 pcs', '10 Stuks': '10 pcs',
      'Half Stokbrood': 'Half baguette', 'Heel Stokbrood': 'Whole baguette',
    },
  },
}

// ── Location ──────────────────────────────────────────────────────────────────

export const location = {
  nl: {
    label: '// Locaties',
    heading1: 'WAAR',
    heading2: 'STAAN',
    heading3: 'WE?',
    marketsLabel: 'Vaste markten',
    days: { dinsdag: 'DINSDAG', woensdag: 'WOENSDAG' },
    extras: [
      {
        title: 'Festivals',
        description: "Van foodtruckfestivals tot muziekfestivals — wij zijn erbij met onze verse spitkip.",
        label: 'Seizoen',
      },
      {
        title: 'Evenementen',
        description: "Boek Kip 'N Grill voor jouw bedrijfsfeest, bruiloft of privé-evenement.",
        label: 'Op aanvraag',
      },
    ],
    bookBtn: 'BOEK ONS',
  },
  en: {
    label: '// Locations',
    heading1: 'WHERE',
    heading2: 'CAN YOU',
    heading3: 'FIND US?',
    marketsLabel: 'Regular markets',
    days: { dinsdag: 'TUESDAY', woensdag: 'WEDNESDAY' },
    extras: [
      {
        title: 'Festivals',
        description: "From food truck festivals to music festivals — we'll be there with our fresh spit chicken.",
        label: 'Seasonal',
      },
      {
        title: 'Events',
        description: "Book Kip 'N Grill for your corporate event, wedding or private party.",
        label: 'On request',
      },
    ],
    bookBtn: 'BOOK US',
  },
}

// ── Contact ───────────────────────────────────────────────────────────────────

export const contact = {
  nl: {
    label: '// Contact',
    heading1: 'NEEM',
    heading2: 'CONTACT',
    heading3: 'OP',
    sub: 'Vragen, boekingen of gewoon zin in kip? We horen graag van je.',
    bookingBtn: 'STUUR EEN BOEKINGSAANVRAAG',
    phone: 'Telefoon',
    email: 'E-mail',
  },
  en: {
    label: '// Contact',
    heading1: 'GET',
    heading2: 'IN',
    heading3: 'TOUCH',
    sub: "Questions, bookings or just craving chicken? We'd love to hear from you.",
    bookingBtn: 'SEND A BOOKING REQUEST',
    phone: 'Phone',
    email: 'E-mail',
  },
}

// ── Booking modal ─────────────────────────────────────────────────────────────

export const booking = {
  nl: {
    label: '// Boekingsaanvraag',
    title1: 'BOEK',
    title2: 'ONS',
    closeLabel: 'Sluiten',
    fields: {
      naam: 'Naam *',
      email: 'E-mail *',
      telefoon: 'Telefoonnummer *',
      type: 'Type evenement *',
      datum: 'Datum / Datums',
      gasten: 'Verwacht aantal gasten *',
      gastenMin: '(min. 50)',
      locatie: 'Locatie / Adres *',
      bericht: 'Bericht / Extra informatie',
    },
    placeholders: {
      naam: 'Jan de Vries',
      email: 'jan@email.nl',
      telefoon: '06 12345678',
      type: 'Kies een type...',
      datums: 'Kies datum(s)...',
      adres: 'Begin met typen...',
      bericht: 'Specifieke wensen, dieetwensen, overige informatie...',
    },
    datumSelected: (n: number) => `${n} datum${n > 1 ? 's' : ''} geselecteerd`,
    gastenLabel: 'gasten',
    eventTypes: ['Bedrijfsfeest', 'Bruiloft', 'Verjaardag / Privéfeest', 'Festival', 'Markt', 'Anders'],
    submitIdle: 'VERSTUUR AANVRAAG',
    submitSending: 'VERSTUREN...',
    successTitle: 'AANVRAAG ONTVANGEN',
    successBody: 'Bedankt! We nemen zo snel mogelijk contact met je op.',
    closeBtn: 'Sluiten →',
    errorMsg: 'Er ging iets mis. Probeer opnieuw of mail ons op kipngrill@gmail.com.',
    pastDate: 'Datum in het verleden',
    days: ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'],
    months: ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'],
    dateLocale: 'nl-NL',
  },
  en: {
    label: '// Booking request',
    title1: 'BOOK',
    title2: 'US',
    closeLabel: 'Close',
    fields: {
      naam: 'Name *',
      email: 'E-mail *',
      telefoon: 'Phone number *',
      type: 'Type of event *',
      datum: 'Date / Dates',
      gasten: 'Expected number of guests *',
      gastenMin: '(min. 50)',
      locatie: 'Location / Address *',
      bericht: 'Message / Additional information',
    },
    placeholders: {
      naam: 'John Smith',
      email: 'john@email.com',
      telefoon: '06 12345678',
      type: 'Choose a type...',
      datums: 'Choose date(s)...',
      adres: 'Start typing...',
      bericht: 'Specific requests, dietary requirements, other information...',
    },
    datumSelected: (n: number) => `${n} date${n > 1 ? 's' : ''} selected`,
    gastenLabel: 'guests',
    eventTypes: ['Corporate event', 'Wedding', 'Birthday / Private party', 'Festival', 'Market', 'Other'],
    submitIdle: 'SEND REQUEST',
    submitSending: 'SENDING...',
    successTitle: 'REQUEST RECEIVED',
    successBody: 'Thank you! We will get back to you as soon as possible.',
    closeBtn: 'Close →',
    errorMsg: 'Something went wrong. Please try again or email us at kipngrill@gmail.com.',
    pastDate: 'Date in the past',
    days: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    dateLocale: 'en-GB',
  },
}

// ── Footer ────────────────────────────────────────────────────────────────────

export const footer = {
  nl: { privacy: 'PRIVACY', terms: 'VOORWAARDEN' },
  en: { privacy: 'PRIVACY', terms: 'TERMS' },
}

// ── Opwarmadvies page ─────────────────────────────────────────────────────────

export const opwarm = {
  nl: {
    back: 'Terug naar home',
    label: '// Opwarmadvies',
    title1: 'OPWARM',
    title2: 'ADVIES',
    subtitle: 'Thuis net zo lekker — zo warm je het op.',
    categories: { Grill: 'Grill', 'Fried Chicken': 'Fried Chicken' },
    methods: { Magnetron: 'Magnetron', Oven: 'Oven', Airfryer: 'Airfryer' },
    methodLabel: 'Methode:',
    ratingLabels: { 1: 'Kan', 2: 'Goed', 3: 'Ideaal' },
    banner: {
      title: 'WARMHOUDZAK TIP',
      Magnetron: 'De warmhoudzak is magnetronbestendig — laat de kip gewoon in de gesloten zak zitten tijdens het opwarmen. Houd de zak gesloten zodat het vocht binnenin blijft en het vlees lekker sappig wordt. Pas op voor stoom bij het openen.',
      Oven: 'Grill-producten kunnen in de warmhoudzak worden opgewarmd in de oven — dit houdt het vlees extra sappig. Maximum temperatuur: 150°C. Boven 150°C altijd de warmhoudzak verwijderen en afdekken met aluminiumfolie.',
      Airfryer: 'Voor de airfryer: altijd de warmhoudzak verwijderen voor gebruik. De hoge luchtcirculatie beschadigt de zak. Leg de kip direct in de airfryer voor een krokant resultaat.',
    },
    footerNote: "Zorg er altijd voor dat de kerntemperatuur minimaal 75°C bereikt voordat je het gerecht serveert. Tijden zijn richtlijnen — ovens en apparaten kunnen variëren.",
    products: [
      {
        number: '01', name: 'Hele gegrilde kip', category: 'Grill' as const,
        advice: {
          Magnetron: { duration: '2–3 min per portie', temp: '700W', rating: 1 as const, steps: ['Laat de kip in de gesloten warmhoudzak zitten.', 'Verwarm op 700W gedurende 2–3 minuten per portie.', 'Laat de zak even rusten voor het openen — pas op voor stoom.'], tip: 'De gesloten warmhoudzak houdt het vlees extra sappig tijdens het opwarmen.' },
          Oven:      { duration: '20–25 min', temp: '140–150°C', rating: 3 as const, steps: ['Leg de kip in de warmhoudzak op een rooster.', 'Verwarm op 140–150°C hetelucht gedurende 20–25 minuten.', 'Zonder zak: 180°C, 15–20 min afgedekt met aluminiumfolie.'], tip: 'Warmhoudzak max 150°C — daarboven altijd verwijderen.' },
          Airfryer:  { duration: '12–15 min', temp: '160°C', rating: 2 as const, steps: ['Verwijder de warmhoudzak.', 'Verwarm op 160°C gedurende 12–15 minuten.', 'Halverwege omdraaien voor gelijkmatige warmteverdeling.'], tip: 'Ideaal voor een krokante buitenkant.' },
        },
      },
      {
        number: '02', name: 'Halve kip', category: 'Grill' as const,
        advice: {
          Magnetron: { duration: '3–4 min', temp: '700W', rating: 1 as const, steps: ['Laat de halve kip in de gesloten warmhoudzak zitten.', 'Verwarm op 700W gedurende 3–4 minuten.', 'Laat de zak even rusten voor het openen — pas op voor stoom.'], tip: 'De gesloten warmhoudzak houdt het vlees extra sappig tijdens het opwarmen.' },
          Oven:      { duration: '12–18 min', temp: '140–150°C', rating: 3 as const, steps: ['Leg de halve kip in de warmhoudzak op een rooster.', 'Verwarm op 140–150°C hetelucht gedurende 12–18 minuten.', 'Zonder zak: 180°C, 10–15 min afgedekt met folie.'], tip: 'Warmhoudzak max 150°C — daarboven altijd verwijderen.' },
          Airfryer:  { duration: '8–10 min', temp: '160°C', rating: 2 as const, steps: ['Verwijder de warmhoudzak.', 'Verwarm op 160°C gedurende 8–10 minuten.', 'Halverwege omdraaien.'], tip: undefined },
        },
      },
      {
        number: '03', name: 'Kippen Vleugels', category: 'Grill' as const,
        advice: {
          Magnetron: { duration: '2–3 min', temp: '700W', rating: 1 as const, steps: ['Laat de vleugels in de gesloten warmhoudzak zitten.', 'Verwarm op 700W gedurende 2–3 minuten.', 'Laat de zak even rusten voor het openen — pas op voor stoom.'], tip: 'De gesloten warmhoudzak houdt het vlees extra sappig tijdens het opwarmen.' },
          Oven:      { duration: '10–12 min', temp: '140–150°C', rating: 3 as const, steps: ['Leg de vleugels in de warmhoudzak op een rooster.', 'Verwarm op 140–150°C hetelucht gedurende 10–12 minuten.', 'Zonder zak: 190°C, 8–10 min voor extra krokant resultaat.'], tip: 'Warmhoudzak max 150°C — daarboven altijd verwijderen.' },
          Airfryer:  { duration: '5–7 min', temp: '180°C', rating: 3 as const, steps: ['Verwijder de warmhoudzak.', 'Verwarm op 180°C gedurende 5–7 minuten.', 'Halverwege schudden.'], tip: 'Worden heerlijk krokant!' },
        },
      },
      {
        number: '04', name: 'Kippen Bouten', category: 'Grill' as const,
        advice: {
          Magnetron: { duration: '3–4 min', temp: '700W', rating: 1 as const, steps: ['Laat de bouten in de gesloten warmhoudzak zitten.', 'Verwarm op 700W gedurende 3–4 minuten.', 'Laat de zak even rusten voor het openen — pas op voor stoom.'], tip: 'De gesloten warmhoudzak houdt het vlees extra sappig tijdens het opwarmen.' },
          Oven:      { duration: '15–20 min', temp: '140–150°C', rating: 3 as const, steps: ['Leg de bouten in de warmhoudzak op een rooster.', 'Verwarm op 140–150°C hetelucht gedurende 15–20 minuten.', 'Zonder zak: 180°C, 12–15 min afgedekt met folie.'], tip: 'Warmhoudzak max 150°C — daarboven altijd verwijderen.' },
          Airfryer:  { duration: '8–10 min', temp: '170°C', rating: 2 as const, steps: ['Verwijder de warmhoudzak.', 'Verwarm op 170°C gedurende 8–10 minuten.', 'Halverwege omdraaien.'], tip: undefined },
        },
      },
      {
        number: '05', name: 'Drumsticks', category: 'Grill' as const,
        advice: {
          Magnetron: { duration: '2–3 min', temp: '700W', rating: 1 as const, steps: ['Laat de drumsticks in de gesloten warmhoudzak zitten.', 'Verwarm op 700W gedurende 2–3 minuten.', 'Laat de zak even rusten voor het openen — pas op voor stoom.'], tip: 'De gesloten warmhoudzak houdt het vlees extra sappig tijdens het opwarmen.' },
          Oven:      { duration: '12–15 min', temp: '140–150°C', rating: 3 as const, steps: ['Leg de drumsticks in de warmhoudzak op een rooster.', 'Verwarm op 140–150°C hetelucht gedurende 12–15 minuten.', 'Zonder zak: 190°C, 10 min voor een krokante buitenkant.'], tip: 'Warmhoudzak max 150°C — daarboven altijd verwijderen.' },
          Airfryer:  { duration: '6–8 min', temp: '180°C', rating: 3 as const, steps: ['Verwijder de warmhoudzak.', 'Verwarm op 180°C gedurende 6–8 minuten.', 'Halverwege omdraaien.'], tip: 'Perfect voor een krokant resultaat.' },
        },
      },
      {
        number: '06', name: 'Kippeling', category: 'Fried Chicken' as const,
        advice: {
          Magnetron: { duration: '1–2 min', temp: '700W', rating: 1 as const, steps: ['Verwarm op 700W gedurende 1–2 minuten.'], tip: 'Let op: de krokante coating kan wat zachter worden.' },
          Oven:      { duration: '8–10 min', temp: '190°C', rating: 2 as const, steps: ['Verwarm op 190°C hetelucht gedurende 8–10 minuten op een rooster.'], tip: 'De coating blijft mooi krokant.' },
          Airfryer:  { duration: '4–5 min', temp: '180°C', rating: 3 as const, steps: ['Verwarm op 180°C gedurende 4–5 minuten.'], tip: 'Beste resultaat — coating blijft heerlijk krokant!' },
        },
      },
      {
        number: '07', name: 'Crispy Chicken Strips', category: 'Fried Chicken' as const,
        advice: {
          Magnetron: { duration: '1–2 min', temp: '700W', rating: 1 as const, steps: ['Verwarm op 700W gedurende 1–2 minuten.'], tip: 'De krokante coating kan zachter worden.' },
          Oven:      { duration: '8–10 min', temp: '190°C', rating: 2 as const, steps: ['Verwarm op 190°C hetelucht gedurende 8–10 minuten op een rooster.'], tip: 'Coating blijft krokant.' },
          Airfryer:  { duration: '4–6 min', temp: '180°C', rating: 3 as const, steps: ['Verwarm op 180°C gedurende 4–6 minuten.', 'Halverwege omdraaien.'], tip: 'Uitstekend resultaat!' },
        },
      },
      {
        number: '08', name: 'Hot Wings', category: 'Fried Chicken' as const,
        advice: {
          Magnetron: { duration: '1,5–2 min', temp: '700W', rating: 1 as const, steps: ['Verwarm op 700W gedurende 1,5–2 minuten.'], tip: 'Snel klaar, maar coating wordt minder krokant.' },
          Oven:      { duration: '8–10 min', temp: '200°C', rating: 2 as const, steps: ['Verwarm op 200°C hetelucht gedurende 8–10 minuten op een rooster.'], tip: 'Coating blijft goed krokant.' },
          Airfryer:  { duration: '5–7 min', temp: '185°C', rating: 3 as const, steps: ['Verwarm op 185°C gedurende 5–7 minuten.', 'Halverwege schudden.'], tip: 'Perfect krokant resultaat!' },
        },
      },
    ],
  },
  en: {
    back: 'Back to home',
    label: '// Reheating Guide',
    title1: 'REHEATING',
    title2: 'GUIDE',
    subtitle: 'Just as good at home — here\'s how to reheat it.',
    categories: { Grill: 'Grill', 'Fried Chicken': 'Fried Chicken' },
    methods: { Magnetron: 'Microwave', Oven: 'Oven', Airfryer: 'Air Fryer' },
    methodLabel: 'Method:',
    ratingLabels: { 1: 'OK', 2: 'Good', 3: 'Ideal' },
    banner: {
      title: 'HEAT RETENTION BAG TIP',
      Magnetron: 'The heat retention bag is microwave-safe — simply leave the chicken in the sealed bag while reheating. Keep the bag closed so moisture stays inside and the meat stays nice and juicy. Be careful of steam when opening.',
      Oven: 'Grill products can be reheated in the oven in the heat retention bag — this keeps the meat extra juicy. Maximum temperature: 150°C. Above 150°C always remove the bag and cover with aluminium foil.',
      Airfryer: 'For the air fryer: always remove the heat retention bag before use. The high air circulation will damage the bag. Place the chicken directly in the air fryer for a crispy result.',
    },
    footerNote: "Always ensure the core temperature reaches at least 75°C before serving. Times are guidelines — ovens and appliances may vary.",
    products: [
      {
        number: '01', name: 'Whole grilled chicken', category: 'Grill' as const,
        advice: {
          Magnetron: { duration: '2–3 min per portion', temp: '700W', rating: 1 as const, steps: ['Leave the chicken in the sealed heat retention bag.', 'Heat at 700W for 2–3 minutes per portion.', 'Let the bag rest briefly before opening — beware of steam.'], tip: 'The sealed bag keeps the meat extra juicy while reheating.' },
          Oven:      { duration: '20–25 min', temp: '140–150°C', rating: 3 as const, steps: ['Place the chicken in the heat retention bag on a rack.', 'Heat at 140–150°C fan for 20–25 minutes.', 'Without bag: 180°C, 15–20 min covered with aluminium foil.'], tip: 'Heat retention bag max 150°C — above that always remove it.' },
          Airfryer:  { duration: '12–15 min', temp: '160°C', rating: 2 as const, steps: ['Remove the heat retention bag.', 'Heat at 160°C for 12–15 minutes.', 'Turn halfway for even heating.'], tip: 'Ideal for a crispy exterior.' },
        },
      },
      {
        number: '02', name: 'Half chicken', category: 'Grill' as const,
        advice: {
          Magnetron: { duration: '3–4 min', temp: '700W', rating: 1 as const, steps: ['Leave the half chicken in the sealed heat retention bag.', 'Heat at 700W for 3–4 minutes.', 'Let the bag rest briefly before opening — beware of steam.'], tip: 'The sealed bag keeps the meat extra juicy while reheating.' },
          Oven:      { duration: '12–18 min', temp: '140–150°C', rating: 3 as const, steps: ['Place the half chicken in the heat retention bag on a rack.', 'Heat at 140–150°C fan for 12–18 minutes.', 'Without bag: 180°C, 10–15 min covered with foil.'], tip: 'Heat retention bag max 150°C — above that always remove it.' },
          Airfryer:  { duration: '8–10 min', temp: '160°C', rating: 2 as const, steps: ['Remove the heat retention bag.', 'Heat at 160°C for 8–10 minutes.', 'Turn halfway.'], tip: undefined },
        },
      },
      {
        number: '03', name: 'Chicken Wings', category: 'Grill' as const,
        advice: {
          Magnetron: { duration: '2–3 min', temp: '700W', rating: 1 as const, steps: ['Leave the wings in the sealed heat retention bag.', 'Heat at 700W for 2–3 minutes.', 'Let the bag rest briefly before opening — beware of steam.'], tip: 'The sealed bag keeps the meat extra juicy while reheating.' },
          Oven:      { duration: '10–12 min', temp: '140–150°C', rating: 3 as const, steps: ['Place the wings in the heat retention bag on a rack.', 'Heat at 140–150°C fan for 10–12 minutes.', 'Without bag: 190°C, 8–10 min for extra crispy results.'], tip: 'Heat retention bag max 150°C — above that always remove it.' },
          Airfryer:  { duration: '5–7 min', temp: '180°C', rating: 3 as const, steps: ['Remove the heat retention bag.', 'Heat at 180°C for 5–7 minutes.', 'Shake halfway through.'], tip: 'Gets wonderfully crispy!' },
        },
      },
      {
        number: '04', name: 'Chicken Legs', category: 'Grill' as const,
        advice: {
          Magnetron: { duration: '3–4 min', temp: '700W', rating: 1 as const, steps: ['Leave the chicken legs in the sealed heat retention bag.', 'Heat at 700W for 3–4 minutes.', 'Let the bag rest briefly before opening — beware of steam.'], tip: 'The sealed bag keeps the meat extra juicy while reheating.' },
          Oven:      { duration: '15–20 min', temp: '140–150°C', rating: 3 as const, steps: ['Place the legs in the heat retention bag on a rack.', 'Heat at 140–150°C fan for 15–20 minutes.', 'Without bag: 180°C, 12–15 min covered with foil.'], tip: 'Heat retention bag max 150°C — above that always remove it.' },
          Airfryer:  { duration: '8–10 min', temp: '170°C', rating: 2 as const, steps: ['Remove the heat retention bag.', 'Heat at 170°C for 8–10 minutes.', 'Turn halfway.'], tip: undefined },
        },
      },
      {
        number: '05', name: 'Drumsticks', category: 'Grill' as const,
        advice: {
          Magnetron: { duration: '2–3 min', temp: '700W', rating: 1 as const, steps: ['Leave the drumsticks in the sealed heat retention bag.', 'Heat at 700W for 2–3 minutes.', 'Let the bag rest briefly before opening — beware of steam.'], tip: 'The sealed bag keeps the meat extra juicy while reheating.' },
          Oven:      { duration: '12–15 min', temp: '140–150°C', rating: 3 as const, steps: ['Place the drumsticks in the heat retention bag on a rack.', 'Heat at 140–150°C fan for 12–15 minutes.', 'Without bag: 190°C, 10 min for a crispy exterior.'], tip: 'Heat retention bag max 150°C — above that always remove it.' },
          Airfryer:  { duration: '6–8 min', temp: '180°C', rating: 3 as const, steps: ['Remove the heat retention bag.', 'Heat at 180°C for 6–8 minutes.', 'Turn halfway.'], tip: 'Perfect for a crispy result.' },
        },
      },
      {
        number: '06', name: 'Chicken Bites', category: 'Fried Chicken' as const,
        advice: {
          Magnetron: { duration: '1–2 min', temp: '700W', rating: 1 as const, steps: ['Heat at 700W for 1–2 minutes.'], tip: 'Note: the crispy coating may become slightly softer.' },
          Oven:      { duration: '8–10 min', temp: '190°C', rating: 2 as const, steps: ['Heat at 190°C fan for 8–10 minutes on a rack.'], tip: 'The coating stays nicely crispy.' },
          Airfryer:  { duration: '4–5 min', temp: '180°C', rating: 3 as const, steps: ['Heat at 180°C for 4–5 minutes.'], tip: 'Best result — coating stays wonderfully crispy!' },
        },
      },
      {
        number: '07', name: 'Crispy Chicken Strips', category: 'Fried Chicken' as const,
        advice: {
          Magnetron: { duration: '1–2 min', temp: '700W', rating: 1 as const, steps: ['Heat at 700W for 1–2 minutes.'], tip: 'The crispy coating may become softer.' },
          Oven:      { duration: '8–10 min', temp: '190°C', rating: 2 as const, steps: ['Heat at 190°C fan for 8–10 minutes on a rack.'], tip: 'Coating stays crispy.' },
          Airfryer:  { duration: '4–6 min', temp: '180°C', rating: 3 as const, steps: ['Heat at 180°C for 4–6 minutes.', 'Turn halfway.'], tip: 'Excellent result!' },
        },
      },
      {
        number: '08', name: 'Hot Wings', category: 'Fried Chicken' as const,
        advice: {
          Magnetron: { duration: '1.5–2 min', temp: '700W', rating: 1 as const, steps: ['Heat at 700W for 1.5–2 minutes.'], tip: 'Quick and easy, but coating becomes less crispy.' },
          Oven:      { duration: '8–10 min', temp: '200°C', rating: 2 as const, steps: ['Heat at 200°C fan for 8–10 minutes on a rack.'], tip: 'Coating stays well crispy.' },
          Airfryer:  { duration: '5–7 min', temp: '185°C', rating: 3 as const, steps: ['Heat at 185°C for 5–7 minutes.', 'Shake halfway through.'], tip: 'Perfect crispy result!' },
        },
      },
    ],
  },
}

// ── Helper ────────────────────────────────────────────────────────────────────

export function t<T extends Record<Lang, unknown>>(obj: T, lang: Lang): T[Lang] {
  return obj[lang]
}
