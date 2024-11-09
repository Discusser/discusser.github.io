<script lang="ts">
	import Project from '$lib/components/projects/Project.svelte';
	import { MARKOV_SENTENCE_GENERATOR } from '$lib/constants/projects';
</script>

<Project project={MARKOV_SENTENCE_GENERATOR}>
	<p>
		A markov chain is a process that describes a sequence of events, where the probability of a
		specific event depends solely on the state attained at the previous event. For a more complete
		description of these, feel free to consult the <a
			class="text-blue-500"
			href="https://en.wikipedia.org/wiki/Markov_chain">Wikipedia article</a
		>
		on markov chains. Concretely, markov chains are used for autocompletion when typing. You can see
		this in action by writing a word on your phone, and if you have the setting enabled, you should see
		some suggestions for the next word above your keyboard. I decided to implement this in a more naive
		way, because the program can only get its data from a file containing text that it will learn from,
		which is parsed to make what I call a "model". This model is then stored as a JSON file (although
		it could technically be stored in a much more space-efficient format), so that it can be used later
		on without having to repeatedly parse the input file. A model basically states, for each word present
		in the input file, the probability of a certain word appearing right after it. The
		<code>big.json</code>
		model in the GitHub repository is created from a few books, taken from
		<a class="text-blue-500" href="https://www.gutenberg.org/">Project Gutenberg</a>. In this model,
		the word "zinc" has a 50% chance to be followed by "and", 25% chance to be followed by
		"Immersion" and a 25% chance to be followed by "A". This is essentially what a markov chain is.
		After parsing the JSON file and storing the information into a data structure that is optimized
		for our needs, the program will spout whole paragraphs on autocomplete from one starting word,
		even if they tend to be nonsensical at times, which is normal, since the words proposed by the
		model are just suggestions of the most common words.
	</p>
	<p>Example prompt using a model based on the Frankenstein book:</p>
	<code>
		Starting word: Why<br /> did not be at the same time I had been out of my eyes of my love and the
		sickening oppression of the first saw a few words only took place of the same time I shall be a few
		words of the same time I had been so miserable of her guilt
	</code>
	<p>Example prompt using a model based on the complete works of Shakespeare:</p>
	<code>
		Starting word: Thus<br />
		may be the law and never gave to the King hath pleas’d to her my lord of your Grace to the King Richard
		and the world but the rest at the eye and my lord you come to the world I will not a man that to
		be not in the body of the world will I will I will be so much of the world to beat aside the King
		Richard and the other Diomed faith in one that I will you sir if thou that you as one that which
		is an excellent good lord Safe mayst be no more advice
	</code>
</Project>
