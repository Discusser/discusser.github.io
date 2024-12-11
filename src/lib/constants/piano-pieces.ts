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
  Clayderman = 'Richard Clayderman'
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
    name: 'Waltz Op. 64 No. 2',
    composer: Composer.Chopin
  },
  {
    name: 'Waltz No. 19 Op. Posth',
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
    name: 'Étude Op. 25 No. 9',
    composer: Composer.Chopin
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
];
