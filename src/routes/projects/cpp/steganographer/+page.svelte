<script lang="ts">
	import Project from '$lib/components/projects/Project.svelte';
	import Image from '$lib/components/shared/Image.svelte';
	import { AspectRatio } from '$lib/components/ui/aspect-ratio';
	import { STEGANOGRAPHER } from '$lib/constants/projects';
</script>

<Project project={STEGANOGRAPHER}>
	<p>
		Steganography is the practice of hiding information within a seemingly ordinary object or
		message. This can be used, for example, to hide secret messages inside of digital images, that
		can only be decoded by someone who knows what algorithm was used to encode the secret message.
		What my program does is take an image and a message to encode, and then write specific values to
		specific pixels following some calculations, that can then be decoded to retrieve the original
		message. The program itself is very simple, since images are basically just a stream of pixels,
		which themselves are just bytes. I used the <code>stb_image</code> library for reading/writing to
		images. An encoded message consists of two parts: a header, and the actual message. The header contains
		information that allows you to decode the message, including the size of the message, and the distance
		between each byte of the message. In order to avoid raising suspicions, I implemented a very simple
		feature that just distances every byte of the pixel evenly throughout the whole image. This way,
		on a regular image, which tends to have atleast a million pixels, there'll only be a few dozen pixels
		spread evenly throughout the image that are modified in a barely noticeable manner. This alone makes
		the message practically undetectable for the vast majority of images and people. I also realised
		later that encoding the message in an image that only consists of random pixels is even more foolproof,
		since there is no way of telling if a message is encoded in the image or not, aswell as where the
		modified pixels are, unless you have the algorithm to decode the message. This was a very fun and
		quick program to make, and the results were quite surprising. With the most basic of methods (and
		steganography as a domain goes much further than what I have done), it is possible to hide a few
		hundred bytes of data inside of an image without it being noticeable at all.
	</p>
	<p>Can you find the secret messages?</p>
	<div class="flex flex-col items-center space-y-4">
		<div class="flex justify-center space-x-4">
			<Image alt="Original image of a computer" src="/computer.jpg" />
			<Image alt="Image of a computer with a secret message" src="/computer.jpgencoded.png" />
		</div>
		<div class="flex justify-center space-x-4">
			<Image alt="Original image of a park" src="/park.jpg" />
			<Image alt="Image of a park with a secret message" src="/park.jpgencoded.png" />
		</div>
		<div class="flex h-1/2 w-1/2 justify-center space-x-4">
			<Image alt="Image of random noise with a secret message" src="/random.pngencoded.png" />
		</div>
	</div>
	<p>
		The top image is a very high resolution image, and the modified pixels are unnoticeable. The
		second image is lower resolution (400x300 pixels), thus the modified pixels are noticeable if
		you pay attention. The final image is just random noise, with the secret message added on top,
		so the secret message is practically unnoticeable even if you look hard.
	</p>
</Project>
