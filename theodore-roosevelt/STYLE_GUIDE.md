# Style Guide

- [x] Typography
- [x] Space
- [x] Color
- [ ] Other UI Components


## Typography

- [ ] Mobile (S)
- [ ] Tablet (M)
- [ ] Desktop (L)

**Design Goals**: Historical and Awe-Inspiring

Awe-Inspiring, Unique, Bold

Typeface: Serif, Modern

### Mobile

#### Section: Header, On-Display Timeline Read
##### Typeface
> Notice Alert (*)

Font-family:
    headings:
        h1: Century Gothic (+17% tracking; *Line-height: 28.4 * 1.1 = 31.24px; Bold)
        h2: Century Gothic (+17% tracking)
        h3: Century Gothic (+17% tracking; Bold)
    body-copy: Garamond
    other (opt.):
        caption: Garamon (Italic)

##### Font Sizes

Modular Scale: 1.333
Font base: 12px

h1 - 28.423px | 2.369em
h2 - 21.323px | 1.777em
h3 - 15.996px | 1.333em
p - 12px | 1em
caption - 12px

Measure:
Line-height (Std): 12 * 1.5 = 18px
    [!] Notice: `h1` has a DIFFERENT Line-height than the rest.

##### Other

Tracking: +17% for h1, h2, h3

#### Section: Body
##### Typeface

(Same as above.)

##### Font Sizes

Modular Scale: 1.2
Font base: 12px

h1 - 20.736px | 1.728em
h2 - 17.28px | 1.44em
h3 - 14.4px | 1.2em
p - 12px | 1em
caption - 12px | 1em
footer - 10px

Measure: (preferably 45-55 words per line)
Line-height: 12 * 1.5 = 18px

##### Other

Tracking:  +17% for h1, h2, h3

`letter-spacing`
`word-spacing`

### Tablet

#### Section: Header, On-Display Timeline Read
##### Typeface

Font-family:
    headings:
        h1: Century Gothic (+17% tracking; *Line-height: 60.75 * 1.1 = 66.825px; Uppercase)
        h2: Century Gothic (+17% tracking; *Line-height: 40.5 * 1.1 = 44.55px)
        h3: Century Gothic (+17% tracking; Bold)
    body-copy: Garamond
    other (opt.):
        caption: Garamond (Italic)

##### Font Sizes

Modular Scale: 1.5
Font base: 18px

h1 - 60.75px | 3.375em
h2 - 40.5px | 2.25em
h3 - 27px | 1.5em
p - 18px | 1em
caption - 18px

Measure: "optimal reading length"
Line-height: 1.5 * font base = 27px

##### Other

Tracking:  +17% for h1, h2, h3a

#### Section: Body
##### Typeface

(Same as above.)

##### Font Sizes

Modular Scale: 1.414
Font base: 18px

h1 - 50.889px | 2.827em
h2 - 35.989px | 1.999em
h3 - 25.452px | 1.414em
p - 18px | 1em
caption 18px

Measure: (Same as above.)
Line-height: 1.5 * font base = 27px

##### Other

Tracking: +17% for h1, h2, h3a

### Desktop

#### Section: Header, On-Display Timeline Read
##### Typeface

Font-family:
    headings:
    body-copy:
    other (opt.): n/a\
        caption:

(Same as Tablet.)

##### Font Sizes

Modular Scale: 1.5
Font base:

h1 -
h2 -
h3 -
p -
caption -

Measure:
Line-height:

##### Other

Tracking: n/a

#### Section: Body
##### Typeface

Font-family:
    headings:
    body-copy:
    other (opt.): n/a\
        caption:

##### Font Sizes

Modular Scale: 1.414
Font base: 18px

h1 -
h2 -
h3 -
p -
caption
footer -

Measure
Measure (general): 66 char (width: 476px)
@DATE-CARD short text
Measure: ~48 char (width: 318.6px)
@CTA "READ MORE >>"
Measure: (width: 318.6px)

Line-height: 1.5 * 18 = 27px

##### Other

Tracking: n/a


## Space

*Any new variables should be divisble or multiple of the font base in order for it to be acceptable (in my terms [experimental]).

- [ ] Mobile (S)
- [ ] Tablet (M)
- [ ] Desktop (L)

### Mobile
font base * 1.5 = Line height
12 * 1.5 = 18px (`space-lv-1`)
12 * 1.5 * 1.5 = 40.5px (`space-lv-2`)
12 / 1.5 = (`space-lv-half`)

`space-quarter`: 5.33px
`space-half`: 8px
`space-0`: 12px /* hidden */
`space-1`: 18px
`space-2`: 27px
`space-3`: 40.5px
`space-4`: 60.75px
`space-5`: 91.125px

### Tablet
font base * 1.5 = Line height
18px * 1.5 = 27px

`space-quarter`: 8
`space-half`: 12
`space-0`:
`space-1`: 27px
`space-2`: 40.5px
`space-3`: 60.75px
`space-4`: 91.125px
`space-5`: 136.6875px

### Desktop


### Space Guide

`space-lv1`
- Between paragraphs
- Between a paragraph and a heading
- Between footer notes and bottom of page


## Color

`primary-color`: #ABB67C (green-olive)
`secondary-color`: #19BFCB (cyan)
`accent-color-1`: #1A1A1A (black)
`accent-color-2`: #FFF (white)
    - Timeline: Dates


### Primary Color Variations

From light to dark order.

`primary-color-05`: #F4F6EF
`primary-color-10`: #EAEDDE
`primary-color-20`: #D5DBBD
`primary-color-30`: #C0C89D [REJECTED]
`primary-color-40`: #ABB67C  (Used; original)
`primary-color-50`: #96A45B [REJECTED]
`primary-color-60`: #788349
`primary-color-70`: #5A6237
`primary-color-80`: #3C4125
`primary-color-90`: #1E2112


### Secondary Color Variations

From light to dark order.

`secondary-color-05`: #D2F7F9
`secondary-color-10`: #BBF3F7
`secondary-color-20`: #8DEAF1
`secondary-color-30`: #60E2EB
`secondary-color-40`: #33DAE6 [REJECTED]
`secondary-color-50`: #19BFCB (Used; original)
`secondary-color-60`: #14969F [REJECTED]
`secondary-color-70`: #0E6B72
`secondary-color-80`: #084044
`secondary-color-90`: #031517


### Text Color

`text-color-05`: #F2F2F2
    - footer
`text-color-10`: E5E5E5 [REJECTED]
`text-color-20`: CCCCCC (used)
`text-color-30`: B2B2B2
`text-color-40`: 999999
`text-color-50`: 808080 (used)
`text-color-60`: 666666
`text-color-70`: #4D4D4D
`text-color-80`: #333333 [REJECTED]
`text-color-90`: #1A1A1A (used)
    - body copy


## UI Components

### Images

#### Guidelines

*Small size*

max-width: 600px
height (optional): auto


*Medium size*

width: 1024px
height (optional): auto


*Large size*

width: 1280px
height (optional): auto

#### Source Checklist

- [ ] Header
    - [x] hero image
        - [x] S
            600w
        - [x] M
            1024w
        - [ ] L
            1280w

- [ ] Galler images
    - [x] 1858
        - [x] T.R. 11 years old
            - [x] S
                209px (max.)
            - [ ] M
            - [ ] L
        - [x] T.R. birth place
            - [x] S
            - [x] M
            - [x] L
    - [x] 1879
        - [x] Boxing theme
            - [x] S
            - [x] M
            - [x] L
    - [x] 1880
        - [x] T.R. in white house portrait
            - [x] S
            - [x] M
            - [x] L
    - [x] 1881
        - [x] T.R. writing image
            - [x] S
            - [x] M
                1000w (max.)
            - [ ] L
        - [x] T.R. books he's written
            - [x] S
            - [x] M
            - [x] L
    - [x] 1884
        - [x] T.R. Mother and wife
            - [x] S
            - [x] M
                1065w (max.)
            - [ ] L
        - [x] T.R. as sherif
            - [x] S
            - [x] M
                800w (max.)
            - [ ] L
    - [x] 1886
        - [x] T.R. on a horse
            - [x] S
            - [x] M
            - [x] L
        - [x] T.R. new family
            - [x] S
            - [x] M
            - [x] L
    - [x] 1897
        - [x] Spanish vs American
            - [x] S
            - [x] M
            - [x] L
        - [x] Rough Riders
            - [x] S
            - [x] M
            - [x] L
                1144w (max.)
    - [x] 1901
        - [x] teddy at chicago
            - [x] S
            - [x] M
            - [x] L
    - [x] 1909
        - [x] Safari and elephant
            - [x] S
            - [x] M
            - [x] L
    - [x] 1910
        - [x] T.R and Taft
            - [x] S
            - [x] M
            - [x] L
    - [x] 1912
        - [x] Image of bullet in his stomach
            - [x] S
            - [x] M
            - [x] L
    - [x] 1919
        - [x] tomb / funderal
            - [x] S
            - [x] M
                1024w (max.)
            - [ ] L

    - [x] copy
        - [x] image1
            - [ ] S
            - [ ] M
            - [ ] L
        - [x] image2
            - [ ] S
            - [ ] M
            - [ ] L

### Icons

* Double Arrow near "READ MORE" text at section body.

*SML Devices || MOBILE VIEW*

font-size: 18px

HTML Entity: &#187;

**Close "X"** [REJECT]

Appears after a "READ MORE"

cancel.svg

height: 16px
width: 16px


**Dates BG**  - MOBILE

font-size: 14px
color: #000000

width: (2x) 14px each side
height: (1/2x) 7px each side

**Dates BG** - TABLET

font-size: 25.5px
color: #000000

width: (2x) 25.5px each side
height: (1/2x) 12.75px each side

### Timeline Images

#### Mobile

min-width: 320px
min-height: 284px (50% screen real estate)

Ratio: 320 : 284 = 80 : 71

#### Tablet

width:
height:

#### Desktop

...


### CTA prev / next


**dots**
Mobile
width: 12px
height: 12px

Tablet-Dektop
width: 20px
height: 20px

>Effects
Active on-hover
    - color: 808080
    - rgba(128, 128, 128, 1)
Active (NOT on-hover)
    - rgba(128, 128, 128, 0.5)
Passive on-hover
    - color: CCCCCC
    - rgba(204, 204, 204, 1)
Passive (NOT on-hover)
    - rgba(204, 204, 204, 0.5)

**prev**

html entity: &#10094;

Arrow component
Mobile
    width: 14px
    height: 14px
Tablet-Desktop
    width: 31.5
    height: 31.5

color: CCCCCC

Circle component

color: 808080

**next**

html entity: &#10095;


**prev & next cirle background**

Mobile
width: 32px
height: 32px

Tablet
width: 72px
height: 72px


### Timeline Components

#### Mobile

**Beginning Circle**

color: #ffffff
outline-color: #000000
outline-width: 2px
width: 16px
height: 16px

**Small Circle**

color: #ffffff
width: 12px
height: 12px

distance between line component: 4.5px above and below

**Ending Circle**

color: #000000
width: 16px
height: 16px


**Line**

width: 2px

distance between line component: 4.5px above and below

Align center with the dates components (technically, the background component).

#### Tablet

**Beginning Circle**

color: #ffffff
outline-color: #000000
outline-width: 4px
width: 24px
height: 24px

**Small Circle**

color: #ffffff
width: 20px
height: 20px

distance between line component: 9px above and below

**Ending Circle**

color: #000000
width: 24px
height: 24px


**Line**

width: 4px

distance between line component: 9px above and below

Align center with the dates components (technically, the background component).

#### Desktop

...

### Buttons

* `READ MORE >>`

MOBILE

Padding
height: +48px i.e. (2x 12px) 24px each side
width: +24px i.e. (1x 12px) 12px each side

For: accessibility - button pressing with hand.

* Slider Arrow for Gallery

Circle component

width: 72px
height 72px

color: 4D4D4D

Arrow component

width: 36px
height: 36px

color: CCCCCC

### >> and << symbols

html entity

«
&laquo;

»
&raquo;

Reference: https://dev.w3.org/html5/html-author/charref