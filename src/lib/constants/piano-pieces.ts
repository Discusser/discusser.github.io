export type Piece = {
  name: string;
  composer: string;
};

export enum Composer {
  Heller = 'Stephen Heller',
  Cabral = 'Ángel Cabral',
  Aznavour = 'Charles Aznavour',
  Chopin = 'Frédéric Chopin',
  Tchaikovsky = 'Pyotr Ilyich Tchaikovsky',
  Napier = 'Kenneth Napier',
  Cosma = 'Vladimir Cosma',
  Clayderman = 'Richard Clayderman',
  Schumann = 'Robert Schumann'
}

export const pieces: Piece[] = [
  {
    name: 'Étude Op. 46 No. 3',
    composer: Composer.Heller
  },
  {
    name: 'Étude Op. 46 No. 6',
    composer: Composer.Heller
  },
  {
    name: 'Étude Op. 46 No. 7',
    composer: Composer.Heller
  },
  {
    name: 'Étude Op. 46 No. 11',
    composer: Composer.Heller
  },
  {
    name: 'Étude Op. 46 No. 17',
    composer: Composer.Heller
  },
  {
    name: 'Étude Op. 46 No. 23',
    composer: Composer.Heller
  },
  {
    name: 'Étude Op. 46 No. 26',
    composer: Composer.Heller
  },
  {
    name: 'La Foule',
    composer: Composer.Cabral
  },
  {
    name: 'La Bohème',
    composer: Composer.Aznavour
  },
  {
    name: "Waltz No. 14, Op. Posth.",
    composer: Composer.Chopin
  },
  {
    name: 'Waltz Op. 69 No. 2',
    composer: Composer.Chopin
  },
  {
    name: 'Waltz Op. 64 No. 2',
    composer: Composer.Chopin
  },
  {
    name: 'Waltz No. 19 Op. Posth',
    composer: Composer.Chopin
  },
  {
    name: 'Waltz in A minor (rediscovered 2024)',
    composer: Composer.Chopin
  },
  {
    name: 'Mazurka Op. 7 No. 1',
    composer: Composer.Chopin
  },
  {
    name: 'Mazurka Op. 30 No. 4',
    composer: Composer.Chopin
  },
  {
    name: 'Mazurka Op. 41 No. 1',
    composer: Composer.Chopin
  },
  {
    name: 'Mazurka Op. 6 No. 1',
    composer: Composer.Chopin
  },
  {
    name: 'Nocturne Op. 72 No. 1',
    composer: Composer.Chopin
  },
  {
    name: 'Nocturne Op. 9 No. 2',
    composer: Composer.Chopin
  },
  {
    name: 'Nocturne Op. 27 No. 1',
    composer: Composer.Chopin
  },
  {
    name: 'Nocturne Op. 32 No. 2',
    composer: Composer.Chopin
  },
  {
    name: 'Mazurka Op. 63 No. 3',
    composer: Composer.Chopin
  },
  {
    name: 'Étude Op. 25 No. 9',
    composer: Composer.Chopin
  },
  {
    name: 'Carnaval Op. 9 No. 11 "Chiarina"',
    composer: Composer.Schumann
  },
  {
    name: 'Carnaval Op. 9 No. 12 "Chopin"',
    composer: Composer.Schumann
  },
  {
    name: 'Swan Lake',
    composer: `${Composer.Tchaikovsky} (arr. ${Composer.Napier})`
  },
  {
    name: "Nadia's Theme",
    composer: Composer.Cosma
  },
  {
    name: 'Hungarian Sonata',
    composer: Composer.Clayderman
  }
].sort((a, b) => {
  return a.composer.localeCompare(b.composer) || a.name.localeCompare(b.name);
});
