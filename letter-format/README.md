# Letter-Format

A MDN Assessment, a simple markup of a letter format.

## Keynotes

+ HTML5 `tel:` schema

syntax: `<a href="tel:[prefix + number]">[number]</a>`

Wrap all phone numbers in hyperlinks with the tel: schema.

Always use the international dialing format.

e.g.

NIST Telephone Time-of-Day Service
`<a href="tel:+1-303-499-7111">+1 (303) 499-7111</a>`

NB: While not absolutely necessary, it’s a good idea to separate each segment of the number with a hyphen (-) for easier reading and better auto-detection.

+ Disable auto-detection for the `tel:` schema

Modern mobile browsers automatically detect phone numbers and enable click to call.

To prevent Mobile Safari from automatically detecting phone numbers, add the following meta tag to the top of the page:

`<meta name="format-detection" content="telephone=no">`

+ Other click to call features

In addition to the `tel:` schema, some modern browsers also support the `sms:` and `mms:` schemas, though support is not as consistent, and some features like setting the message body don't always work.

+ `p` elements cannot have list elements nested inside them - that is illegal!

Also, Description Lists `dl` aren't allowed.

You may check the [specs](https://stackoverflow.com/questions/5681481/should-ol-ul-be-inside-p-or-outside), and here's a list of elements of what's ALLOWED inside a `p` element:

+ Why use quotes tags(`<q>`) than typed quotation marks ("")

It's all about **semantics**. Think about Accessibility and people with _screen readers_.

+ Issue with placing a comment at the end of a closing tags

**IE6 Ghost Bug**: Duplicate of the element may occur, however on other browsers will be fine.

+ `p` element is a block element

If there is a new text of line you'd like to create, use the `p` element again. Do not use the `<br>` element to create the paragraph. `<br>` element should be used in poem or postal address,
where the division of lines is significant. Also, the `p` element SHOULD NOT have any block elements inside it.

## Credits

- _MDN_ (website/company) - [Marking up a letter](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Marking_up_a_letter)

- _MDN_ (website/company) - [learning-area/../../letter-text.txt](https://github.com/mdn/learning-area/blob/master/html/introduction-to-html/marking-up-a-letter-start/letter-text.txt)

- _MDN_ (website/company) - [learning-area/../../letter-css.txt](https://github.com/mdn/learning-area/blob/master/html/introduction-to-html/marking-up-a-letter-start/css.txt)

- _Google_ (website/company) - [Click to Call](https://developers.google.com/web/fundamentals/native-hardware/click-to-call/)

- _StackOverflow_ (website) - [Should ol/ul be inside <p> or outside?](https://stackoverflow.com/questions/5681481/should-ol-ul-be-inside-p-or-outside)

- _StackOverflow_ (website) - [Nesting block level elements inside the <p> tag… right or wrong?](https://stackoverflow.com/questions/4291467/nesting-block-level-elements-inside-the-p-tag-right-or-wrong)

- _StackOverflow_ (website) - [Why use quote tags when quotation marks will do?](https://stackoverflow.com/questions/20292197/why-use-quote-tags-when-quotation-marks-will-do)

- _StackExchange_ Software Engineering (website) - [Is there anything wrong with putting comments in an HTML closing tag?](https://softwareengineering.stackexchange.com/questions/297774/is-there-anything-wrong-with-putting-comments-in-an-html-closing-tag/297887)
