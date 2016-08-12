define(function (require) {

  var longDuration = 1;
  var normalDuration = 1;

  'use strict';

  return [
    {
      id: 'intro',
      type: 'intro',
      year: 'BC',
      yearCopy: 'B.C.',
      colour: '#da3949',
      introCopy1: 'Nespresso has been bringing barista-quality coffee into homes for the last 30 years, but its expertise is also built on centuries of experimentation.',
      introCopy2: 'Beloved of popes and poets, celebrated in song by Bach, the noble coffee bean has a stranger history than you may know...',
      title: 'Did coffee\'s Odyssey<br>start with Homer ?',
      copy: 'Was coffee mentioned by Homer in The Iliad? People are so keen to give the drink a long and noble lineage that you\'ll find this claim repeated again and again. But nepenthe, the drug Homer said was added to wine to calm anger and banish painful memories, sounds much more like an opiate.',
      images: [
        {
          src: 'BowlBeans_01',
          ext: 'jpg',
          css: {
            top: 0,
            left: 0,
            width: '38%',
          },
          x: '-60%',
          y: -0.1,
          duration: normalDuration,
        },
      ],
    },
    {
      id: '0',
      type: 'chapter',
      chapter: true,
      year: 1000,
      // yearCopy: 'pre 1000 ad',
      colour: '#e2c8a7',
      tileFrom: 'r',
      title: 'Or did it begin in the<br>cradle of mankind?',
      copy: 'Ethiopia is thought to have been the birthplace of coffee, as it was of mankind itself. The beans were supposedly crushed, mixed with animal fat, and made into an energy bar for travellers. There is, however, no hard evidence for coffee use until...',
      images: [
        {
          src: 'BowlBeans02',
          css: {
            top: 0,
            left: '10%',
            width: '25%',
          },
          x: 0,
          y: 0.3,
          duration: longDuration,
        },
        {
          src: 'GroundCoffee01',
          css: {
            top: 0,
            right: 0,
            width: '25%',
          },
          x: 0,
          y: 0.6,
          duration: longDuration,
        },
      ],
    },
    {
      id: '1',
      type: 'chapter',
      chapter: true,
      year: 1450,
      colour: '#af8030',
      tileFrom: 'l',
      title: 'The Sufis used it<br>to pray all night',
      copy: 'The Sufis of the Yemen certainly used coffee in the first half of the 15th century (glazed bowls have even been found from that period with traces of the bean). Around 1450, the drink is introduced to Constantinople, where it swiftly becomes so popular that a law is passed permitting women to divorce a husband who fails to supply them with their daily quota of the drink. Further evidence of its popularity follows not far behind...',
      images: [
        {
          src: 'Grinder_01',
          css: {
            top: 0,
            left: 0,
            width: '28%',
          },
          x:'-35%',
          y: 0.02,
          duration: normalDuration,
          position: '-=2',
        },
      ],
    },
    {
      id: '2',
      type: 'chapter',
      chapter: true,
      year: 1511,
      colour: '#72906e',
      tileFrom: 'r',
      title: 'The first attempt to<br>ban it caused rioting',
      copy: 'The first major coffee controversy: Mecca\'s new young governor, Khair Bey, becomes enraged at the public making fun of him, and finds that the miscreants are gathering at coffee houses to compose their barbs. He engages scholars to declare the drink un-Islamic – a ban which results in riots and is overturned by the Sultan.',
      images: [
        {
          src: 'Beans02',
          css: {
            top: 0,
            right: 0,
            width: '20%',
          },
          x:'-25%',
          y: -0.1,
          duration: normalDuration,
        },
        {
          src: 'BowlBeans03',
          css: {
            top: 0,
            left: 0,
            width: '20%',
          },
          x:'25%',
          y: 0.5,
          duration: normalDuration,
        },
        {
          src: 'GroundCoffee02',
          css: {
            top: 0,
            right: 0,
            width: '20%',
          },
          x:'-25%',
          y: 0.7,
          duration: normalDuration,
        },
      ],
    },
    {
      id: '3',
      type: 'chapter',
      chapter: true,
      year: 1600,
      colour: '#ad9094',
      tileFrom: 'r',
      title: 'Coffee is declared<br>wholly holy',
      copy: 'According to legend, once coffee had established its first European foothold in Venice in the late 16th century, the Church took notice of the spread of this “devil\'s concoction” associated with “infidels”. Pope Clement VIII is asked to ban it, but is so taken with the aroma that he tries some himself, and finds it so delicious he instead decides to “fool Satan” by baptising it.',
      images: [
        {
          src: 'SugarBowl_01',
          css: {
            top: 0,
            right: 0,
            width: '23%',
          },
          x: '-30%',
          y: -0.02,
          duration: normalDuration,
        }
      ],
    },
    {
      id: '4',
      type: 'chapter',
      chapter: true,
      year: 1632,
      colour: '#edc44e',
      tileFrom: 'r',
      title: 'Even the death penalty<br>doesn\'t deter coffee lovers',
      copy: 'And now, conversely, coffee is again declared un-Islamic: Sultan Murad IV bans consumption in Constantinople, along with tobacco and alcohol, personally patrolling the streets and decapitating offenders with his sword. His successor diluted the ban: for a first offence you\'d merely be beaten, although a second sinful sip would get you sewn into a sack and thrown into the Bosphorus. It\'s testament to coffee\'s appeal that people continue to drink it, despite the danger.',
      images: [
        {
          src: 'Nespresso_And_Beans',
          css: {
            top: 0,
            left: 0,
            width: '23%',
          },
          x: '15%',
          y: 0.01,
          duration: normalDuration,
        },
        {
          src: 'RawBeans01',
          ext: 'jpg',
          css: {
            top: 0,
            right: 0,
            width: '20%',
          },
          x: '-15%',
          y: 0.65,
          duration: normalDuration,
        },
      ],
    },
    {
      id: '5',
      type: 'chapter',
      chapter: true,
      year: 1652,
      colour: '#8c62b6',
      tileFrom: 'l',
      title: 'Finally! Coffee reaches Britain,<br>fuels Empire',
      copy: 'Samuel Pepys records in his diaries that England\'s first coffee house opens in Oxford in 1952. The Grand Café now stands on that site, while the Queen\'s Lane Coffee House opposite it has survived since 1654. Popularly known as “penny universities”, because stimulating discussion could be had there for the price of a coffee, they quickly became an integral part of Oxford and London\'s social scene. The insurance industry and stock exchange were both founded in coffee houses.',
      images: [
        {
          src: 'Biscuits_02_Single',
          css: {
            top: 0,
            right: '15%',
            width: '11%',
          },
          x: '8%',
          y: 0.6,
          duration: normalDuration,
        },
        {
          src: 'NespressoCup_01_Right',
          css: {
            top: 0,
            right: '0%',
            width: '19%',
          },
          x: '0%',
          y: 0.8,
          duration: normalDuration,
        },
      ],
    },
    {
      id: '6',
      type: 'chapter',
      chapter: true,
      year: 1674,
      colour: '#6282bf',
      tileFrom: 'r',
      title: 'The backlash begins<br>with an old wives\' tale',
      copy: 'British men are by now spending so much time in coffee houses that their wives object. A pamphlet entitled The Womens [sic] Petition Against Coffee complains that “the Excessive use of that Newfangled, Abominable, Heathenish Liquor called COFFEE… has so Eunucht our Husbands that they are become as unfruitful as those Desarts whence that unhappy Berry is said to be brought.” Charles II subsequently tries to ban coffee – out of fear of the political discussions in coffee houses rather than concern for the nation\'s women – but the outcry causes him to relent.',
      images: [
        {
          src: 'BiscuitsBowl_01',
          ext: 'jpg',
          css: {
            top: 0,
            left: 0,
            width: '27%',
          },
          x: '-20%',
          y: 0.55,
          duration: normalDuration,
        },
      ]
    },
    {
      id: '7',
      type: 'chapter',
      chapter: true,
      year: 1732,
      colour: '#1d978c',
      tileFrom: 'l',
      title: 'But how can Bach, Beethoven<br>and Balzac be wrong?',
      copy: 'Bach writes The Coffee Cantata, ending with a song celebrating the benefits of the drink. Some of the greatest European thinkers and artists are, by now, coffee-lovers. Voltaire supposedly enjoyed upwards of 40 cups a day, with chocolate. Balzac was similarly smitten, and penned the lighthearted essay, The Pleasure and Pains of Coffee. Beethoven started every day with a cup of coffee – always made from exactly 60 beans.',
      images: [
        {
          src: 'Choclate_01',
          css: {
            top: 0,
            left: 0,
            width: '20%',
          },
          x: '0%',
          y: 0.4,
          duration: normalDuration,
        },
        {
          src: 'Beans01',
          css: {
            top: 0,
            right: 0,
            width: '25%',
          },
          x: '10%',
          y: 0.7,
          duration: normalDuration,
        },
      ]

    },
    {
      id: '8',
      type: 'chapter',
      year: 1757,
      colour: '#ef8031',
      tileFrom: 'r',
      title: 'Tea takes<br>over in Britain...',
      copy: 'The Battle of Plassey gives the East India Trading Company control of Bengal. After this, the company focuses its attention away from trading coffee and towards tea, planting Chinese tea bushes in India and newly occupied Ceylon (Sri Lanka). Henceforth, tea becomes the nation\'s favourite hot drink (although coffee is giving it a run for its money these days).',
      images: [
        {
          src: 'TeaPot_01',
          css: {
            top: 0,
            left: 0,
            width: '28%',
          },
          x: '5%',
          y: 0.55,
          duration: normalDuration,
        },
        {
          src: 'Milk_01b',
          css: {
            top: 0,
            right: 0,
            width: '15%',
          },
          x: '-15%',
          y: 0.65,
          duration: normalDuration,
        },
      ],
    },
    {
      id: '9',
      type: 'chapter',
      chapter: true,
      year: 1773,
      colour: '#d3605b',
      tileFrom: 'l',
      contentTpl: require('hbs!../tpl/scenes/chapters/9'),
      title: '...While in America<br>coffee topples tea',
      copy: 'Conversely, America rejects tea when colonists protest against King George’s taxes by dumping a whole shipment overboard into the Boston harbor. This became known as the Boston Tea Party, from which the right wing of the Republican party derives its name, and was a key moment in the American revolution. Henceforth, coffee, not tea, would be integral to the American way.',
      images: [
        {
          src: 'Grinder02',
          ext: 'jpg',
          css: {
            top: 0,
            right: 0,
            width: '28%',
          },
          x: '15%',
          y: 0.1,
          duration: normalDuration,
        },
      ],
    },
    {
      id: '10',
      type: 'chapter',
      chapter: true,
      year: 1822,
      colour: '#e3cc6f',
      tileFrom: 'r',
      contentTpl: require('hbs!../tpl/scenes/chapters/10'),
      title: 'The black nectar meets<br>the Age of Steam...',
      copy: 'Just as steam powered the Industrial Revolution, it also perked up the world’s coffee habits. Frenchman Louis Bernard Rabaut was perhaps the first to develop a machine that would make coffee more quickly by using steam to force hot water through grounds. This is the forerunner of the black nectar we now know as espresso.',
      images: [
        {
          src: 'Cafeterie_02',
          css: {
            top: 0,
            left: '5%',
            width: '28%',
          },
          x: '0%',
          y: 0.3,
          duration: normalDuration,
        },
      ],
    },
    {
      id: '11',
      type: 'chapter',
      chapter: true,
      year: 1938,
      colour: '#1c9689',
      tileFrom: 'r',
      contentTpl: require('hbs!../tpl/scenes/chapters/11'),
      title: '...And joins the Age<br>of Gadgets with Gaggia',
      copy: 'Achille Gaggia applies for a patent for the first modern steamless coffee machine. His revolutionary piston mechanism forced water through the coffee grounds at high pressure, producing the crema that is unique to espresso. It took only 15 seconds to make a single “shot” of espresso.',
      images: [
        {
          src: 'Machine_02',
          css: {
            top: 0,
            left: '-5%',
            width: '40%',
          },
          x: '-15%',
          y: 0.45,
          duration: normalDuration,
        },
      ],
    },
    {
      id: 'end',
      chapter: true,
      type: 'end',
      year: 1986,
      colour: '#6383c0',
      tileFrom: 'l',
      title: 'The Nespresso capsule<br>collection is born',
      copy: 'Nespresso is founded, offering a revolutionary system of portioned, encapsulated coffee and dedicated machines that interact to deliver perfect coffee. At first there were just four coffee varieties; now there are 24 Grands Crus. The first Nespresso boutique in the UK opened in 2001, while the first Nespresso Café in the UK opened just this June in Cheapside in the City of London.',
      images: [
        {
          src: 'Pods_01',
          css: {
            top: 0,
            right: '10%',
            width: 'auto',
            height: '55%',
          },
          x: '0%',
          y: -0.1,
          duration: normalDuration,
        },
      ],
    },
  ];

});