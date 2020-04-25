# Design System

`tokens`, and naming conventions, and much more?

## Typography

Modular Scale: 1.25

Breakpoints

**XS**

Targeted device-width: 320px (min width)
Targeted device-height: 568px

gutter: 21px
No. of Column: 4
Column width: 56px
approx. characters: 41ch
measure width: 288px

-----------------------------------------

font-face-heading: Bahnschrift
font-face-body: Bahnschrift
font-face-code: Courier New

font base: 14px

H1: 27px
H2: 22px
H3 (optional): 18px
H4 (optional): n/a
H5 (optional): n/a
H6 (optional): n/a
Body Copy: 14px

Bold: 14px
-Abbreviation; plural nouns
Italic: 14px
-passage

Link: 14px; (color) #004399;

Link-active: 14px; (color) #002D66;

Text Date: 14px; (color) #808080;

Copyrights / endnotes: 14px; (color) #808080;

Other: (if available)

Language block
line-height: 28px

* To Scale Typography method - (1) Responsive [selected], or (2) Fluid

Responsive Typography Size-Up [Choose popular device]

2019 popular **XS** device-width: 375px

Modular Scale: 1.25
gutter: 23px
Column width: 69px
approx. characters: 53ch

-----------------------------------------

JSON (JavaScript Object Notation) is a lightweight

font base: 14px

find ratio: 14 = 360 * x
x * 375 = 14.58333... = 15
new font base: 15px

H1: 29.29... = 29px
H2: 23.43... = 23px
H3 (optional): 18.75 = 19px
Body Copy: 15px

Bold: `body-copy`
-Abbreviation; plural nouns
Italic: `body-copy`
-passage

Link: `body-copy`; (color) #004399;

Link-active: `body-copy`; (color) #002D66;

Text Date: `body-copy`; (color) #808080;

Copyrights / endnotes: `body-copy`; (color) #808080;

**S**

Targeted device-width: 600px
Targeted device-height (opt.): 800px

Modular Scale: 1.25

given L/R margin: 32px
gutter: 24px ea. (space-unit-1)
No. of Column: 8
Column width: 46px ea.
approx. characters: 70ch
measure width: 536px

-----------------------------------------

font base: 16px
line-height: 16 * 1.5 = 24px (space-unit-1)

H1: 29.29... = 31px
H2: 23.43... = 25px
H3 (optional): 20px
Body Copy: 16px

Language block:
line-height: 40px

...

Responsive Typography Size-Up [Choose popular device]

2019 popular **S** device-width: 768px

**M**

Constraints: 960px article max-width

Targeted device-width: 1024px
Targeted device-height (opt.):

Modular Scale: 1.25

given L/R margin: 32 px (influenced by constraints)
gutter: 30px (space-unit-1)
No. of Column: 12
Column width: #### (gutter * 11 - (measure / line height ))
approx. characters: 78ch
measure width: 660px

-----------------------------------------

font base: 20px
line-height: 20 * 1.5 = 30px (space-unit-1)

H1: 39.063... = 39px
H2: 31.25... = 31px
H3 (optional): 25px
Body Copy: 20px

Language block:
line-height: 30

...

Responsive Typography Size-Up [Choose popular device]

2019 popular **M** device-width: 1366px

**L**

Constraints: 960px article max-width

Targeted device-width: 1440px (max width)

...

Responsive Typography Size-Up [Choose popular device]

**XL**

n/a

## Spatial System (and Size?)

font base * line-height ratio = space-unit * 1

**XS**

space-unit-1: 21
space-unit-2: 42
space-unit-3: 63
space-unit-4: 84
space-unit-5: 95 (unused)

2019 popular **XS** device-width: 375px

space-unit-1:
space-unit-2:
space-unit-3:
space-unit-4:
space-unit-5:

**S**

space-unit-1: 24
space-unit-2: 48
space-unit-3: 72
space-unit-4: 96
space-unit-5: 120

**M**

space-unit-1: 30
space-unit-2: 60
space-unit-3: 90
space-unit-4: 120
space-unit-5: 150

**L**

n/a

**XL**

n/a

## Color

**Primary Color Variation**

Selected color: #2987FF

`primary-color-05` (brightest and least saturated): #E5F1FF (In use)
`primary-color-10`: #CCE2FF (In use)
`primary-color-20`: #99C6FF
`primary-color-30`: #66A9FF
`primary-color-40`: #2987FF (In use)
`primary-color-50`: #0070FF
`primary-color-60`: #005ACC
`primary-color-70`: #004399 (In use)
`primary-color-80`: #002D66 (In use)
`primary-color-90`(darkest and most saturated): #001633

**Secondary Color Variation**

Body Copy color: #1A1A1A

`secondary-color-05` (brightest and least saturated): #F2F2F2
`secondary-color-10`: #E5E5E5
`secondary-color-20`: #CCCCCC
`secondary-color-30`: #B2B2B2
`secondary-color-40`: #999999 (In use)
`secondary-color-50`: #808080 (In use)
`secondary-color-60`: #666666
`secondary-color-70`: #4D4D4D (In use)
`secondary-color-80`: #1A1A1A (In use)
`secondary-color-90`(darkest and most saturated): #000000

**Other**

**Text Color**

n/a

## Logo

* JSON Logo

constraints: 48wx48h for button press area

Area
width: 36px
height: 36px
Top / Bottom padding: 12px
Right margin: 10.5px (i.e. space-unit-1 / 2)

## Icons

* Hamburger [Opened Menu]

constraints: 48wx48h for button press area

Area
width: 24px
height: 17px
Top padding: 21px
Bottom padding: 21px
L / R padding: (space-unit-1)
total header height: 59 px
Top / Bottom margin: (space-unit-1)

Color
color: (`secondary-color-80`)

* Hamburger - Cross Icon [Closed Menu]

Area
width: 19.7 px
height: 19.7 px

Color
color: (`secondary-color-80`)

* Back to Top

Circle-component

Area
width: 58 px
height: 58 px

Color
background color: (`primary-color-05`)

Arrow-component

Area
width: 21.4 px
height: 36 px

Color
color: (`secondary-color-40`)

* Language Icon

Area
width: 32 px
height: 22.2 px

Color
color: `secondary-color-80`

* Logo

Area
width: 36 px
height: 36 px

# Images

**XS**

device-width: 320px
device-height: 568px

Constraints:
-L/R margin (because image does not look good at absolute 100% - no added margins inside them!)
-16:9 ratio
-Images width scale to: 600px

object.png : 100% (w), 128px (h)

array.png : 100% (w), 84px (h)

value.png : 100% (w), 210px (h)

string.png : 100% (w), 336px (h)

number.png : 100% (w), 319.2 px (h)

whitespace.png : 100% (w), 145.9 px (h)

**S**
536 px
device-width: 600px
device-height: 800px
L/R margins; 32px (for each side)

Constraints:
-L/R margin (because image does not look good at absolute 100% - no added margins inside them!)
-16:9 ratio ???
-Images width scale to: 1024px

object.png : 100% (w), 243.9px = 244px (h)

array.png : 100% (w), 128.8 px (h)

value.png : 100% (w), 370.1 px (h)

string.png : 100% (w), 633.4 px (h)

number.png : 100% (w), 593.6 px (h)

whitespace.png : 100% (w), 272.2 px (h)

**M**

**L**

n/a

**XL**

n/a

## Cards

**XS**

**S**

card size
width: 256 px
height: 224.1 px = 224px

card image size
width: 256 px
height: 145 px = 143px

card type block
width: 256 px
height: 79.1 px = 79px


**M**

**L**

n/a

**XL**

n/a

## Modules

Hamburger Menu - Open

**XS**

grid system: 4; aligned with column
width:
height:

**S**

Constraints
Scroll position is paused. No scroll finger movement can move the page. Tapping outside the module or the cross icon to close the menu will allow you to scroll as normal.

grid system: 8; aligned with column
width: 288px
height: 100$

**M**

**L**

n/a

**XL**

n/a
