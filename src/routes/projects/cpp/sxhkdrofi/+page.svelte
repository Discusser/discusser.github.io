<script lang="ts">
	import Project from '$lib/components/projects/Project.svelte';
	import Image from '$lib/components/shared/Image.svelte';
	import { SXHKD_ROFI } from '$lib/constants/projects';
</script>

<Project project={SXHKD_ROFI}>
	<p>
		On my computer, I use linux (ubuntu) with <a
			class="text-blue-500"
			target="_blank"
			href="https://github.com/baskerville/bspwm">bspwm</a
		>, a window manager. In short, a window manager is a program that completely changes the way
		windows work. In this case, bspwm offers you multiple desktops and arranges windows following a
		<a
			class="text-blue-500"
			target="_blank"
			href="https://en.wikipedia.org/wiki/Binary_space_partitioning">binary space partitioning</a
		>
		method. On top of that, the window manager offers a wide variety of shortcuts to control windows
		without having to use the mouse. Since it can be hard to learn all the shortcuts, I decided to make
		a program that displays all the shortcuts that bspwm uses. Since they're all just stored in a config
		file, I simply read that file and output a formatted string containing each keybinding, which can
		then be used by a program such as
		<a target="_blank" href="https://github.com/davatorium/rofi">rofi</a>, which displays a menu on
		the screen containing the keybindings.
	</p>
	<Image alt="A preview of SxhkdRofi" src="/sxhkd_rofi.png" />
</Project>
