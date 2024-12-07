# Reti Recipes

Reti Recipes är en modern receptapplikation byggd med Vue.js och TypeScript. Projektet syftar till att hämta recept från ett API, visa dem på en webbsida och ge användarna möjlighet att spara favoritrecept.

## Funktioner

- **Hämta recept från API**: Använder [TheMealDB API](https://www.themealdb.com/) för att söka och visa recept.
- **Favorithantering**: Användare kan lägga till eller ta bort recept från sina favoriter. Favoriter sparas lokalt i webbläsarens Local Storage.
- **Responsiv design**: Anpassad för både mobila enheter och desktop.
- **Sökfunktion**: Möjlighet att söka efter recept baserat på nyckelord.
- **Navigering**: Inkluderar flera sidor, "Home", "Favorites", "Login" och "Sign Up", som hanteras med Vue Router.
- **Receptdetaljer**: Dynamiska routes för att visa detaljer om specifika recept.
- **404-sida**: Anpassad sida för ogiltiga URL:er.
- **Router guards**: Skyddar vissa sidor från obehörig åtkomst, exempelvis "Favorites".

---

## Kravuppfyllnad

### **Godkänt**
Projektet uppfyller samtliga krav för godkänt:

1. **Vue-applikation**:  
   Projektet är byggt med Vue.js.

2. **TypeScript**:  
   TypeScript används för typning i hela projektet.

3. **Textinterpolering**:  
   Används för att visa data, exempelvis `{{ recipe.title }}` i `RecipeList.vue`.

4. **Villkorlig rendering**:  
   Implementerat med `v-if` för att visa eller dölja receptinformation.

5. **Listrendering**:  
   `v-for` används för att rendera listor med recept.

6. **Händelser (v-on eller kortform)**:  
   `@click` används för att hantera användarinteraktioner, exempelvis när recept läggs till i favoriter.

7. **Computed properties**:  
   Används för att beräkna data dynamiskt, exempelvis filtrering av receptlistor.

8. **v-model**:  
   Tvåvägsbindning används i `SearchForm.vue` för att hantera sökinput.

9. **Två sidor med Vue Router**:  
   Applikationen har minst två sidor: "Home" och "Favorites", samt fler.

10. **Props (typsäkra)**:  
    Props används i komponenter och är korrekt typade med TypeScript, exempelvis i `RecipeList.vue`.

11. **Reactive state (ref())**:  
    Reactive state hanteras med `ref()` i flera delar av applikationen, exempelvis inloggningsstatus.

12. **Lifecycle hooks (mounted)**:  
    `onMounted()` används för att hämta data från API:t vid sidladdning.

13. **Webbanrop (fetch/axios)**:  
    Axios används för att hämta receptdata från TheMealDB.

14. **Använt AI**:  
    AI har använts för att generera, strukturera och optimera delar av koden samt dokumentationen.

### **Väl Godkänt**
Projektet uppfyller följande krav för väl godkänt:

1. **Felhantering och validering**:  
   Grundläggande felhantering finns implementerad för API-samtal (exempelvis vid misslyckade fetch-svar), och sökinput valideras i `SearchForm.vue`.

2. **Dynamisk route matching**:  
   Route `/recipe/:id` visar detaljer för specifika recept.

3. **Router guards**:  
   Skydd för `favorites`-sidan via en `beforeEach` guard.

4. **404-sida**:  
   Anpassad sida som visas när ogiltiga URL:er besöks.

---

## Teknologier och bibliotek

- **Vue.js**: Frontend-ramverket.
- **TypeScript**: För att förbättra typkontroll och kodkvalitet.
- **Vue Router**: För att hantera navigering mellan sidor och dynamiska routes.
- **Axios**: För API-anrop.
- **Express**: Backend-server.
- **Concurrently**: För att köra server och klient samtidigt.
- **Local Storage**: För att lagra användarnas favoriter.

---

## Installation

1. Klona projektet:
   ```bash
   git clone <repository-url>
   ```

2. Gå till projektmappen:
   ```bash
   cd <project-folder>
   ```

3. Installera beroenden:
   ```bash
   npm install
   ```

4. Starta applikationen:
   ```bash
   npm run dev
   ```

5. Öppna applikationen i din webbläsare på `http://localhost:3000`.

---

## Mappstruktur

```
|-- server              # Backend-server
├── src
│   ├── assets          # Bilder och globala resurser
│   ├── components      # Vue-komponenter
│   ├── composables     # Återanvändbara logiska funktioner
│   ├── router          # Vue Router-konfiguration
│   ├── types           # TypeScript-typer
│   ├── views           # Sidkomponenter
│   └── App.vue         # Huvudkomponent
├── public              # Statiska filer
└── README.md           # Projektbeskrivning
```

---

## Backend-server

Servern är byggd med Express och innehåller följande funktioner:

- **Recepthämtning**: Hämtar recept från TheMealDB API.
- **Favorithantering**: Tillåter användare att lägga till, hämta och ta bort favoritrecept.
- **Porthantering**: Kontrollerar om en port är upptagen och försöker en annan port vid behov.

Servern startas automatiskt när du kör `npm run dev`.

---

## Möjliga förbättringar

- Implementera bättre felhantering för API-samtal.
- Implementera en global state-hantering om Pinia tillåts i framtiden.
- Implementera fler tester för att säkerställa robustheten i koden.
- Utöka designen för ännu bättre användarupplevelse.

---

## Författare(Zabi)

Projektet är utvecklat som en del av kursen och är skapat för att förbättra förståelsen av Vue.js och TypeScript.







