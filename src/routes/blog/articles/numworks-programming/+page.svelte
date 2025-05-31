<script lang="ts">
	import Article from '$lib/components/blog/Article.svelte';
	import { NUMWORKS_PROGRAMMING } from '$lib/constants/articles';
	import Code from '@/components/shared/Code.svelte';
	import Collapsible from '@/components/shared/Collapsible.svelte';
	import * as TableOfContents from '$lib/components/shared/table-of-contents/index.js';
	import type { TOC } from '@/lib/table-of-contents';
</script>

<Article article={NUMWORKS_PROGRAMMING}>
	<TableOfContents.Root />
	<TableOfContents.Element title="Introduction" />
	<p>
		Towards the end of 2023, I got a <a
			target="_blank"
			href="https://www.numworks.com/"
			class="text-blue-500">NumWorks</a
		> calculator for school. My previous calculator was a very simple Casio calculator, with no capabilities
		other than calculating expressions. This new calculator had a lot of apps, and even had a Python
		app, which I quickly started getting used to. It's important to note that this is still a calculator,
		so it is very limited in terms of hardware. The model I own has 256 KB of static RAM and a 320x240
		screen, which doesn't give you much flexibility for more complex programs.
	</p>
	<p>
		Despite this, I managed to make many scripts, some of which took more effort than others. Over
		the last two years, I've programmed a 3D renderer (with rotations, translations, and scaling), a
		bad clone of Space Invaders, Snake, an app capable of graphing functions, a clock, and an
		interactive program that finds the shortest path between two points in a graph (with fully
		customizable graphs). I mostly programmed on my calculator when I had nothing to do during
		class.
	</p>
	<TableOfContents.Element title="Python Modules" />
	<p>
		The Python implementation comes with a select few custom modules: <code>math</code>,
		<code>cmath</code>, <code>matplotlib.pyplot</code>, <code>numpy</code>, <code>turtle</code>,
		<code>random</code>, <code>kandinsky</code>, <code>ion</code>, and
		<code>time</code>. You might recognise some of these modules, and even though they aim to
		replicate the original module, they're nowhere near in terms of completeness. The modules that
		are the most interesting are <code>math</code> for certain math operations,
		<code>kandinsky</code>
		for drawing, and <code>ion</code> for handling key input. I've included a basic specification of
		the methods provided by the some modules below.
	</p>
	<Collapsible title="Kandinsky">
		<Code nohl
			>{`get_pixel(x, y) - returns the color of the pixel at (x,y)
set_pixel(x, y, color) - colors the pixel at (x,y)
color(r, g, b) - defines an RGB color
draw_string(text, x, y, fg, bg) - displays a string at (x, y), and if specified, with a foreground and background color
fill_rect(x, y, w, h, col) - fills a rectangle spanning from (x, y) to (x + w, y + h) with a color`}</Code
		>
	</Collapsible>
	<Collapsible title="Ion">
		<Code nohl>{`keydown(k) - returns true if the key k is down`}</Code>
	</Collapsible><Collapsible title="Time"
		><Code nohl
			>{`monotonic() - returns the clock's time (not to be confused with the actual time)
sleep(t) - suspend execution for t seconds`}`</Code
		>
	</Collapsible>
	<TableOfContents.Element title="Limitations" />
	<TableOfContents.Element title="Performance" level={1} />
	<p>
		With these methods mentioned above, you can theoretically make just about anything, only limited
		by hardware. These limitations catch up to you quite quickly. For one, clearing the screen every
		single frame is usually not a viable option, since there is no V-Sync, and the calculator only
		has one buffer for the screen. This might not seem like much of an issue, but the fact that
		there is only one buffer means that no matter what you do, redrawing the screen cannot be
		seamless. In fact, drawing operations write directly to the buffer, whereas in modern graphics
		libraries, drawing operations modify a secondary buffer, that is then swapped with the main
		buffer once everything has been drawn, to give the impression that everything was drawn
		instantaneously. For this reason, it is better to redraw the screen only when something has
		changed. In the case of applications where updates happen each frame (a game such as Pong is a
		good example), it's usually better to redraw only the parts of the screen that need redrawing,
		although it's not always viable.
	</p>
	<p>
		Furthermore, the Python modules provided are quite rudimentary, making it so that you have to
		implement a lot of things yourself. For example, drawing a circle requires you to color each
		pixel of the circle individually, and each pixel requires a function call in python, which then
		calls some C function that converts the given Python objects to C types. When we consider that a
		circle can have hundreds of pixels, this all becomes very inefficient, since each function call
		has an overhead performance cost. Implementing a function to draw a circle in C, and then
		calling it from Python would be much more efficient, but we can't blame the developers for not
		creating full-fledged modules. After all, the calculator wasn't made to create games with
		Python, which is why the drawing module is as simple as it is.
	</p>
	<TableOfContents.Element title="Memory and Storage" level={1} />
	<p>
		It should be obvious that the team behind this calculator chose Python as the programming
		language available for users because of its simplicity for making scripts, and even more for
		implementing mathematical axlorithms. With Python's simplicity however, comes a big
		disadvantage, especially given the calculator's limited amount of memory. On my computer, a
		regular integer takes up 28 bytes of memory. However, the NumWorks uses a 32-bit architecture,
		and also uses a special implementation of python called MicroPython. Digging into the
		MicroPython source code, we can find a base definition of an object in C:
	</p>
	<Code language="c"
		>{`// Anything that wants to be a concrete MicroPython object must have mp_obj_base_t
// as its first member (small ints, qstr objs and inline floats are not concrete).
struct _mp_obj_base_t {
    const mp_obj_type_t *type MICROPY_OBJ_BASE_ALIGNMENT;
};`}</Code
	>
	<p>
		Thus we can conclude that in MicroPython, an object takes up atleast 4 bytes (the size of a
		pointer). Of course, each object has a value associated to it, and with padding that brings us
		up to atleast 8 bytes (or more depending on how padding is performed). Of course, numbers, the
		most common type in python, usually take up more space than that. The source code shows that the
		data for an integer takes atleast 8 bytes, meaning a whole number in Python would take atleast
		12 bytes, if we ignore padding. All this extra memory usage combined with the lack of memory on
		the calculator can become quite annoying, since it can be limiting in some cases. Another thing
		I noticed is that trying to create an array with more than about 500 elements causes a memory
		allocation error, making the script crash. Therefore, it's quite important that you take into
		consideration time and space when creating programs. There also exists another limit, but that
		is a lot harder to reach, which is with storage space. The calculator only allows you to have
		about 42 kilobytes of Python scripts, which basically equates to 42,000 characters. This can
		seem like a lot, and it actually is, but when you have multiple large scripts installed, the
		limit is definitely reachable.
	</p>
	<TableOfContents.Element title="Writing Native Apps" />
	<p>
		Recently, I discovered that it is possible to write external apps in C (and C++ or any other
		language that is compatible with C) that can be uploaded onto the calculator. This discovery
		changes everything, since the limits present when using Python are practically gone. Performance
		is <i>much</i> better, memory usage is <i>much</i> lower, and an app can take up to 6.5 MB of
		storage. Although this doesn't change the fact that the calculator still has only 256 KB of
		memory, it makes things a lot easier, but also more complicated. Python was chosen for its ease
		of use, and when I started experimenting with a C++ app, I quickly understood why. A program
		crash causes the calculator to reset, erasing the program without even giving a reason for the
		crash. One can only assume the cause, and debugging becomes quite complicated. Furthermore, just
		because you can write your code in C++, it doesn't mean that you have access to the handy
		<code>std::string</code>
		or <code>std::vector</code> types. In order to compile for the NumWorks calculator, you must use
		the <code>arm-none-eabi</code> toolchain, which gives you access to a very barebones version of
		C/C++. The major advantage of C++, which is dynamic memory allocation, is often inappropriate
		for embedded systems, which makes C++ code ressemble C code quite closely. Other than that, the
		C interface is better than the Python modules the calculator provides. It is entirely contained
		in a single, fairly small, header file, called <code>eadk.h</code>. I have included the source
		code for the header file, pulled from my latest app at the time of writing, below.
	</p>
	<Collapsible title="eadk.h">
		<Code language="c" class="h-96"
			>{`#ifndef EADK_H
#define EADK_H

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

// Types and constants

typedef uint16_t eadk_color_t;

static const eadk_color_t eadk_color_black = 0x0;
static const eadk_color_t eadk_color_white = 0xFFFF;
static const eadk_color_t eadk_color_red = 0xF800;
static const eadk_color_t eadk_color_green = 0x07E0;
static const eadk_color_t eadk_color_blue = 0x001F;

typedef struct {
  uint16_t x;
  uint16_t y;
} eadk_point_t;

typedef struct {
  uint16_t x;
  uint16_t y;
  uint16_t width;
  uint16_t height;
} eadk_rect_t;

// Keyboard and Events

#define EADK_SCREEN_WIDTH 320
#define EADK_SCREEN_HEIGHT 240
static const eadk_rect_t eadk_screen_rect = {0, 0, EADK_SCREEN_WIDTH,
                                             EADK_SCREEN_HEIGHT};

typedef uint64_t eadk_keyboard_state_t;
typedef enum {
  eadk_key_left = 0,
  eadk_key_up = 1,
  eadk_key_down = 2,
  eadk_key_right = 3,
  eadk_key_ok = 4,
  eadk_key_back = 5,
  eadk_key_home = 6,
  eadk_key_on_off = 8,
  eadk_key_shift = 12,
  eadk_key_alpha = 13,
  eadk_key_xnt = 14,
  eadk_key_var = 15,
  eadk_key_toolbox = 16,
  eadk_key_backspace = 17,
  eadk_key_exp = 18,
  eadk_key_ln = 19,
  eadk_key_log = 20,
  eadk_key_imaginary = 21,
  eadk_key_comma = 22,
  eadk_key_power = 23,
  eadk_key_sine = 24,
  eadk_key_cosine = 25,
  eadk_key_tangent = 26,
  eadk_key_pi = 27,
  eadk_key_sqrt = 28,
  eadk_key_square = 29,
  eadk_key_seven = 30,
  eadk_key_eight = 31,
  eadk_key_nine = 32,
  eadk_key_left_parenthesis = 33,
  eadk_key_right_parenthesis = 34,
  eadk_key_four = 36,
  eadk_key_five = 37,
  eadk_key_six = 38,
  eadk_key_multiplication = 39,
  eadk_key_division = 40,
  eadk_key_one = 42,
  eadk_key_two = 43,
  eadk_key_three = 44,
  eadk_key_plus = 45,
  eadk_key_minus = 46,
  eadk_key_zero = 48,
  eadk_key_dot = 49,
  eadk_key_ee = 50,
  eadk_key_ans = 51,
  eadk_key_exe = 52
} eadk_key_t;

#if PLATFORM_DEVICE
eadk_keyboard_state_t eadk_keyboard_scan();
#else
/* Returning a 64 bit value with emscripten would require WASM_BIGINT that
 * causes some issue when the external app use a libc. */
void _eadk_keyboard_scan_do_scan();
uint32_t _eadk_keyboard_scan_low();
uint32_t _eadk_keyboard_scan_high();

static inline eadk_keyboard_state_t eadk_keyboard_scan() {
  _eadk_keyboard_scan_do_scan();
  uint64_t state = _eadk_keyboard_scan_high();
  state <<= 32;
  state |= _eadk_keyboard_scan_low();
  return state;
}
#endif

static inline bool eadk_keyboard_key_down(eadk_keyboard_state_t state,
                                          eadk_key_t key) {
  return (state >> (uint8_t)key) & 1;
}

typedef uint16_t eadk_event_t;
enum {
  eadk_event_left = 0,
  eadk_event_up = 1,
  eadk_event_down = 2,
  eadk_event_right = 3,
  eadk_event_ok = 4,
  eadk_event_back = 5,
  eadk_event_shift = 12,
  eadk_event_alpha = 13,
  eadk_event_xnt = 14,
  eadk_event_var = 15,
  eadk_event_toolbox = 16,
  eadk_event_backspace = 17,
  eadk_event_exp = 18,
  eadk_event_ln = 19,
  eadk_event_log = 20,
  eadk_event_imaginary = 21,
  eadk_event_comma = 22,
  eadk_event_power = 23,
  eadk_event_sine = 24,
  eadk_event_cosine = 25,
  eadk_event_tangent = 26,
  eadk_event_pi = 27,
  eadk_event_sqrt = 28,
  eadk_event_square = 29,
  eadk_event_seven = 30,
  eadk_event_eight = 31,
  eadk_event_nine = 32,
  eadk_event_left_parenthesis = 33,
  eadk_event_right_parenthesis = 34,
  eadk_event_four = 36,
  eadk_event_five = 37,
  eadk_event_six = 38,
  eadk_event_multiplication = 39,
  eadk_event_division = 40,
  eadk_event_one = 42,
  eadk_event_two = 43,
  eadk_event_three = 44,
  eadk_event_plus = 45,
  eadk_event_minus = 46,
  eadk_event_zero = 48,
  eadk_event_dot = 49,
  eadk_event_ee = 50,
  eadk_event_ans = 51,
  eadk_event_exe = 52,
  eadk_event_shift_left = 54,
  eadk_event_shift_up = 55,
  eadk_event_shift_down = 56,
  eadk_event_shift_right = 57,
  eadk_event_alpha_lock = 67,
  eadk_event_cut = 68,
  eadk_event_copy = 69,
  eadk_event_paste = 70,
  eadk_event_clear = 71,
  eadk_event_left_bracket = 72,
  eadk_event_right_bracket = 73,
  eadk_event_left_brace = 74,
  eadk_event_right_brace = 75,
  eadk_event_underscore = 76,
  eadk_event_sto = 77,
  eadk_event_arcsine = 78,
  eadk_event_arccosine = 79,
  eadk_event_arctangent = 80,
  eadk_event_equal = 81,
  eadk_event_lower = 82,
  eadk_event_greater = 83,
  eadk_event_colon = 122,
  eadk_event_semicolon = 123,
  eadk_event_double_quotes = 124,
  eadk_event_percent = 125,
  eadk_event_lower_a = 126,
  eadk_event_lower_b = 127,
  eadk_event_lower_c = 128,
  eadk_event_lower_d = 129,
  eadk_event_lower_e = 130,
  eadk_event_lower_f = 131,
  eadk_event_lower_g = 132,
  eadk_event_lower_h = 133,
  eadk_event_lower_i = 134,
  eadk_event_lower_j = 135,
  eadk_event_lower_k = 136,
  eadk_event_lower_l = 137,
  eadk_event_lower_m = 138,
  eadk_event_lower_n = 139,
  eadk_event_lower_o = 140,
  eadk_event_lower_p = 141,
  eadk_event_lower_q = 142,
  eadk_event_lower_r = 144,
  eadk_event_lower_s = 145,
  eadk_event_lower_t = 146,
  eadk_event_lower_u = 147,
  eadk_event_lower_v = 148,
  eadk_event_lower_w = 150,
  eadk_event_lower_x = 151,
  eadk_event_lower_y = 152,
  eadk_event_lower_z = 153,
  eadk_event_space = 154,
  eadk_event_question = 156,
  eadk_event_exclamation = 157,
  eadk_event_upper_a = 180,
  eadk_event_upper_b = 181,
  eadk_event_upper_c = 182,
  eadk_event_upper_d = 183,
  eadk_event_upper_e = 184,
  eadk_event_upper_f = 185,
  eadk_event_upper_g = 186,
  eadk_event_upper_h = 187,
  eadk_event_upper_i = 188,
  eadk_event_upper_j = 189,
  eadk_event_upper_k = 190,
  eadk_event_upper_l = 191,
  eadk_event_upper_m = 192,
  eadk_event_upper_n = 193,
  eadk_event_upper_o = 194,
  eadk_event_upper_p = 195,
  eadk_event_upper_q = 196,
  eadk_event_upper_r = 198,
  eadk_event_upper_s = 199,
  eadk_event_upper_t = 200,
  eadk_event_upper_u = 201,
  eadk_event_upper_v = 202,
  eadk_event_upper_w = 204,
  eadk_event_upper_x = 205,
  eadk_event_upper_y = 206,
  eadk_event_upper_z = 207,
};

eadk_event_t eadk_event_get(int32_t* timeout);

// Backlight

void eadk_backlight_set_brightness(uint8_t brightness);
uint8_t eadk_backlight_brightness();

// Battery

bool eadk_battery_is_charging();
uint8_t eadk_battery_level();
float eadk_battery_voltage();

// Display

void eadk_display_push_rect(eadk_rect_t rect, const eadk_color_t* pixels);
void eadk_display_push_rect_uniform(eadk_rect_t rect, eadk_color_t color);
void eadk_display_pull_rect(eadk_rect_t rect, eadk_color_t* pixels);
bool eadk_display_wait_for_vblank();
void eadk_display_draw_string(const char* text, eadk_point_t point,
                              bool large_font, eadk_color_t text_color,
                              eadk_color_t background_color);

// Timing

void eadk_timing_usleep(uint32_t us);
void eadk_timing_msleep(uint32_t ms);

#if PLATFORM_DEVICE
uint64_t eadk_timing_millis();
#else
uint32_t _eadk_timing_millis_low();
uint32_t _eadk_timing_millis_high();

static inline uint64_t eadk_timing_millis() {
  uint64_t millis = _eadk_timing_millis_high();
  millis <<= 32;
  millis |= _eadk_timing_millis_low();
  return millis;
}
#endif

// External data

extern const char* eadk_external_data;
extern size_t eadk_external_data_size;

// Misc

bool eadk_usb_is_plugged();
uint32_t eadk_random();

#endif`}</Code
		>
	</Collapsible>
	<p>
		This time, a lot more functions are provided. I have yet to explore all the different functions
		but I have gotten accustomed to a few of them. You might notice that the functions for drawing
		are slightly different compared to the Python implementation. <code
			>eadk_display_push_rect_uniform</code
		>
		is equivalent to Kandinsky's <code>fill_rect</code>, while <code>eadk_display_push_rect</code>
		allows you to specify the color of each pixel in your rectangle by passing a pointer to the colors.
		<code>get_pixel</code>
		is replaced by
		<code>eadk_display_pull_rect</code>, which allows you to read a rectangle, that way you aren't
		limited to only one pixel. There also exists a function called
		<code>eadk_display_wait_for_vblank</code>, that is supposed to implement V-Sync, which seems
		great, although it barely works, so it's basically useless. This interface gives you more
		control over the calculator in general, although some of the
		<a href="https://github.com/numworks/epsilon/issues/2326" target="_blank" class="text-blue-500"
			>functions</a
		> declared in this header file aren't actually defined on the real hardware. Another thing to note
		is the huge performance increase. My previously mentioned 3D renderer ran at no more than 5 frames
		per second, so I decided that it would be interesting to port it to C++. Astonishingly, the program
		ran at around 27 frames per second, and it felt quite smooth.
	</p>
	<p>
		Overall, I've had a lot of fun these past two years programming with my calculator, and it made
		me learn about a lot of new things. As I'm writing this, the school year is almost over, and
		with it so will be my time spent with my calculator. This year I graduate high school, and I
		won't be using calculator as much in the next years.
	</p>
</Article>
