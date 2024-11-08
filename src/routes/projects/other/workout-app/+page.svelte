<script lang="ts">
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import { Skeleton } from '$lib/components/ui/skeleton';
</script>

<div class="flex flex-col space-y-4">
	<p class="text-2xl font-bold text-foreground">Workout Tracker</p>
	<p>
		This is one of my most time consuming projects at the time of writing this. Workout Tracker is
		an app that allows you to, as the name indicates, track your workouts. However, it's not only
		limited to that. In reality, it's a tool that provides many different useful functions related
		to working out. I'm quite proud of this application because, even if the UI is not very well
		polished, it was a challenge for me because I had to learn a new language (Dart), use it with a
		new toolkit (Flutter) that targets a new platform (Mobile). It was a totally different
		experience from what I'm used to, and I came to the conclusion that it wasn't really for me.
		However, I still think it was worth it because I learned a lot in the process. This project was
		submitted to Harvard's CS50 course as the final project, meaning it is not maintained.
	</p>
	<AspectRatio ratio={16 / 9}>
		<iframe
			class="absolute z-10"
			width="100%"
			height="100%"
			src="https://www.youtube.com/embed/gym7kOmIqTA?si=w9KJgZnOnKeXojBr"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		></iframe>
		<Skeleton class="absolute z-0 h-full w-full" />
	</AspectRatio>
</div>
