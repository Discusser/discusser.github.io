export type Book = {
	name: string;
	author: string;
	rating: number; // from 0 to 5
};

export const books: Book[] = [
	{
		name: 'Letters from a Stoic',
		author: 'Seneca',
		rating: 3.75
	},
	{
		name: 'Civilization and Its Discontents',
		author: 'Sigmund Freud',
		rating: 3.5
	},
	{
		name: '1984',
		author: 'George Orwell',
		rating: 4.75
	},
	{
		name: "Man's Search for Meaning",
		author: 'Viktor Frankl',
		rating: 4
	},
	{
		name: 'The Alchemist',
		author: 'Paulo Coelho',
		rating: 4.5
	},
	{
		name: 'Notes from Underground',
		author: 'Fyodor Dostoevsky',
		rating: 4.5
	},
	{
		name: 'Fear and Trembling',
		author: 'Søren Kierkegaard',
		rating: 3.75
	},
	{
		name: 'The Myth of Sisyphus',
		author: 'Albert Camus',
		rating: 4.25
	},
	{
		name: 'Meditations',
		author: 'Marcus Aurelius',
		rating: 4.5
	},
	{
		name: 'Atomic Habits',
		author: 'James Clear',
		rating: 4
	},
	{
		name: 'The Magic of Thinking Big',
		author: 'David J. Schwartz',
		rating: 3.75
	},
	{
		name: 'Ethics',
		author: 'Baruch Spinoza',
		rating: 3.5
	},
	{
		name: 'Beyond Good and Evil',
		author: 'Friedrich Nietzsche',
		rating: 3.75
	},
	{
		name: 'Thus Spoke Zarathustra',
		author: 'Friedrich Nietzsche',
		rating: 4.5
	},
	{
		name: 'Meditations on First Philosophy',
		author: 'René Descartes',
		rating: 4
	},
	{
		name: "A Doll's House",
		author: 'Henrik Ibsen',
		rating: 3.5
	},
	{
		name: "It's Only the End of the World",
		author: 'Jean-Luc Lagarce',
		rating: 2.5
	},
	{
		name: 'Cahiers de Douai',
		author: 'Arthur Rimbaud',
		rating: 2.75
	},
	{
		name: 'The Republic',
		author: 'Plato',
		rating: 3.75
	},
	{
		name: 'Existentialism Is a Humanism',
		author: 'Jean-Paul Sartre',
		rating: 4
	},
	{
		name: 'Animal Farm',
		author: 'George Orwell',
		rating: 4
	},
	{
		name: "Candide, ou l'Optimisme",
		author: 'Voltaire',
		rating: 4.5
	}
].sort((a, b) => b.rating - a.rating);
