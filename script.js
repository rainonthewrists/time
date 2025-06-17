let templates = [
  "to be a [noun]",
  "to [verb] a [noun]",
  "to be a [noun] with no [noun]",
  "to be [adj]",
  "to [verb] [adv]",
  "to be a [adj] [noun]",
  "to [verb] a [noun]",
  "to [verb] with a [noun]",
  "to be a [adj] [noun]",
  "to [verb] [adv]",
  "to [verb] your [adj] [noun]",
  "to be a [adj] [noun]",
  "to [verb] like a [adj] [noun]",
  "to be a [noun] of [noun]",
  "to [verb] the [noun] of [noun]",
  "to be [adj]",
  "to [verb] beneath a [adj] [noun]",
  "to be a [noun]",
  "to be [adj] and [adj]",
  "to be [adj]",
  "to [verb] beside a [adj] [noun]",
  "to [verb]",
  "to be [adj] and [adj]",
  "to [verb]",
  "to [verb] like a [adj] [noun]",
  "to be a [adj] [noun]",
  "to [verb] your [noun]",
  "to [verb]",
  "to be both a [noun] and a [noun]",
  "to [verb] a [noun]",
  "to [verb] your [adj] [noun]",
  "to [verb] like a [noun]",
  "to be a [adj] [noun]",
  "to [verb] [adv]",
  "to be a [noun] with a [adj] [noun]",
  "to [verb] with a [noun]",
  "to be [adj], [adj], and [adv] [adj]",
  "to [verb] your [noun]",
  "to [verb] through a [adj] [noun]",
  "to be the [adj] [noun] [verb]ing a [adj] [noun]"
];

function setup() {
  noCanvas();
  let output = generateStrings(40);
  console.log(output);
}

function generateStrings(num) {
  let result = [];
  let lastTemplate = null;

  for (let i = 0; i < num; i++) {
    let template;
    do {
      template = random(templates);
    } while (template === lastTemplate && templates.length > 1);

    lastTemplate = template;
    let str = template;

    str = str.replace(/\[noun\]/g, () => RiTa.randomWord({ pos: "nn", minLength: 4 }));
    str = str.replace(/\[verb\]/g, () => RiTa.randomWord({ pos: "vb" }));
    str = str.replace(/\[adj\]/g, () => RiTa.randomWord({ pos: "jj", minLength: 4 }));
    str = str.replace(/\[adv\]/g, () => RiTa.randomWord({ pos: "rb" }));

    str = str.replace(/\ba (\w+)/g, (match, word) => {
      let vowels = /^[aeiou]/i;
      return vowels.test(word) ? `an ${word}` : `a ${word}`;
    });

    str = str.replace(/\[verb\]ing/g, () => {
      let verb = RiTa.randomWord({ pos: "vb" });
      return RiTa.conjugate(verb, { form: "gerund" });
    });

    str = str.replace(/[\[\]]/g, "");
    result.push(str);
  }
  return result;
}
