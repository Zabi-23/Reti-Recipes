# Reti Recipes

Reti Recipes är en modern receptapplikation byggd med Vue.js och TypeScript. Projektet syftar till att hämta recept från ett API, visa dem på en webbsida och ge användarna möjlighet att spara favoritrecept.

## Funktioner

- **Hämta recept från API**: Använder [TheMealDB API](https://www.themealdb.com/) för att söka och visa recept.
- **Favorithantering**: Användare kan lägga till eller ta bort recept från sina favoriter. Favoriter sparas lokalt i webbläsarens Local Storage.
- **Responsiv design**: Anpassad för både mobila enheter och desktop.
- **Sökfunktion**: Möjlighet att söka efter recept baserat på nyckelord.
- **Navigering**: Två sidor, "Home" och "Favorites", hanteras med Vue Router.

## Kravuppfyllnad

### Krav för Godkänt

1. **Vue-applikation**: 
   Projektet är byggt med Vue.js som ramverk.

2. **TypeScript**: 
   TypeScript används för typning i hela projektet.

3. **Textinterpolering**: 
   Används för att visa data, exempelvis `{{ recipe.title }}` i `RecipeList.vue`.

4. **Villkorlig rendering**: 
   Implementerat med `v-if`, till exempel för att visa eller dölja en receptsammanfattning.

5. **Listrendering**: 
   `v-for` används för att rendera receptlistor.

6. **Händelser**: 
   `v-on` och dess kortform används för att hantera användarinteraktioner, exempelvis `@click`.

7. **Computed properties**: 
   Beräknade egenskaper används, till exempel för att räkna antal sidor i pagineringen.

8. **v-model**: 
   Tvåvägsbindning används i `SearchForm.vue` för att binda inputfält till sökfrågan.

9. **Vue Router**: 
   Två sidor (Home och Favorites) hanteras med Vue Router.

10. **Props**: 
    Typade props används för att skicka data mellan komponenter, exempelvis receptlistor i `RecipeList.vue`.

11. **Reactive state**: 
    `ref()` används för att hantera reaktivt state, exempelvis i `useRecipes.ts`.

12. **Lifecycle hooks**: 
    `onMounted()` används för att initialisera data och lyssna på ändringar i viewport-storlek.

13. **Webbanrop**: 
    Fetch API används för att hämta receptdata från TheMealDB.

14. **Använt AI**:
    AI användes för att generera, strukturera och optimera kod, samt för att skriva delar av denna README.md.

### Vidareutveckling för Väl Godkänt

- **Felhantering och validering**:
  - Grundläggande felhantering implementeras i `fetchRecipes` för att hantera API-fel och visa användarvänliga meddelanden.
  - Validering av sökfrågor implementeras i `SearchForm.vue` för att säkerställa att inmatningen är minst två tecken lång.

- **Vue-ekosystem**:
  - Projektet kan vidareutvecklas med Pinia eller Vuex för att hantera global state.

- **Robust design**:
  - Responsiv och användarvänlig design med stöd för olika skärmstorlekar.

## Teknologier och bibliotek

- **Vue.js**: Ramverk för front-end.
- **TypeScript**: Statiskt typat språk för att förbättra kodkvaliteten.
- **Vue Router**: För navigering mellan olika sidor.
- **Local Storage**: För att lagra användarens favoriter.
- **Fetch API**: För att hämta data från TheMealDB API.

## Installation

Följ dessa steg för att installera och köra applikationen:

1. Klona projektet:
   ```bash
   git clone <repository-url>
   ```

2. Navigera till projektmappen:
   ```bash
   cd <project-folder>
   ```

3. Installera beroenden:
   ```bash
   npm install
   ```

4. Starta utvecklingsservern:
   ```bash
   npm run dev
   ```

5. Öppna applikationen i din webbläsare på `http://localhost:3000`.

## Mappstruktur

```
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

## Teoretiska resonemang

### Applikationsstruktur

1. **Home-sidan**: 
   - Visar en lista över recept hämtade från TheMealDB.
   - Möjlighet att söka efter recept med hjälp av sökformuläret.
   - Hanterar paginering för att visa flera resultat.

2. **Favorites-sidan**: 
   - Visar användarens sparade favoritrecept.
   - Möjlighet att ta bort recept från favoriter.

3. **Global navigation**:
   - Responsiv navbar som dynamiskt ändrar layout beroende på skärmstorlek.

### Användning av AI

AI användes för:
- Kodgenerering och optimering av funktioner som `fetchRecipes` och komponentstruktur.
- Skapande av dynamiska UI-element och förbättring av användarupplevelsen.
- Författande av denna README för att tydligt dokumentera projektet.

### Möjliga förbättringar

- Implementera bättre felhantering för API-samtal.
- Använda Vuex eller Pinia för hantering av global state.
- Implementera fler tester för att säkerställa robustheten i koden.

## Författare
Projektet är utvecklat som en del av kursen och är skapat för att förbättra förståelsen av Vue.js och TypeScript.



