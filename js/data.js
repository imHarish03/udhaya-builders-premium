/* =========================================================================
   UDHAYA BUILDERS — SITE CONTENT
   -------------------------------------------------------------------------
   This is the ONLY file you need to edit to change text, contact details,
   services, projects and testimonials. No build step needed — save and
   refresh.

   Images: the `img` fields are Unsplash photo IDs (HD stock photos).
   To use your own photos, put them in /assets/images/ and set the field
   to a path instead, e.g.  img: 'assets/images/my-villa.jpg'
   ========================================================================= */

window.SITE = {
  name: 'Udhaya Builders',
  since: 2008,                          // "years of excellence" is computed from this
  contactPerson: 'A.R. Senthil Kumar',
  phone: '+91 98655 16154',
  whatsapp: '919865516154',             // country code + number, digits only
  email: 'info@udhayabuilders.com',     // TODO: replace with real email
  address: 'Trichy, Tamil Nadu',        // base location
  hours: 'Mon – Sat · 9:00 AM – 7:00 PM',
  social: {
    instagram: '#',
    facebook: '#',
    linkedin: '#',
    youtube: '#'
  },

  stats: [
    { value: 'years', suffix: '+', label: 'Years of excellence' },
    { value: 250, suffix: '+', label: 'Projects delivered' },
    { value: 12, suffix: 'L+', label: 'Sq.ft constructed' },
    { value: 98, suffix: '%', label: 'On-time handovers' }
  ],

  services: [
    {
      title: 'Residential Construction',
      text: 'Independent houses and luxury villas engineered for generations — from foundation to finishing.',
      img: '1600596542815-ffad4c1539a9'
    },
    {
      title: 'Commercial Projects',
      text: 'Offices, showrooms and mixed-use buildings delivered with strict timelines and structural rigour.',
      img: '1429497419816-9ca5cfb4571a'
    },
    {
      title: 'Architecture & Planning',
      text: 'Vastu-aware architectural design, structural drawings, 3D visualisation and approvals.',
      img: '1503387762-592deb58ef4e'
    },
    {
      title: 'Interior Design',
      text: 'Modular kitchens, wardrobes, false ceilings and bespoke interiors that feel effortlessly premium.',
      img: '1600607687939-ce8a6c25118c'
    },
    {
      title: 'Renovation & Remodelling',
      text: 'Breathe new life into existing spaces with structural upgrades, extensions and complete makeovers.',
      img: '1517581177682-a085bb7ffb15'
    },
    {
      title: 'Turnkey Project Management',
      text: 'One accountable team for design, materials, labour, quality and handover — you just move in.',
      img: '1504307651254-35680f356dfd'
    }
  ],

  // category must be one of: villas | apartments | commercial | interiors
  // size: 'tall' makes the card span two rows on tablet/desktop
  projects: [
    { title: 'Aaranya Villa', category: 'villas', location: 'Coimbatore', area: '4,800 sq.ft', year: 2024, status: 'Completed', size: 'tall',
      img: '1580587771525-78b9dba3b914',
      text: 'A contemporary courtyard villa with a cantilevered upper floor, infinity pool and double-height living spaces opening to the garden.' },
    { title: 'Udhaya Heights', category: 'apartments', location: 'Chennai', area: '86 units', year: 2023, status: 'Completed',
      img: '1460317442991-0ec209397118',
      text: 'A G+12 residential tower with landscaped decks, clubhouse amenities and earthquake-resistant RCC framing.' },
    { title: 'Monochrome Residence', category: 'interiors', location: 'Madurai', area: '3,200 sq.ft', year: 2024, status: 'Completed',
      img: '1600210492486-724fe5c67fb0',
      text: 'Full home interiors in a calm, textured palette — custom joinery, layered lighting and natural stone accents.' },
    { title: 'Serene Courtyard Home', category: 'villas', location: 'Trichy', area: '3,600 sq.ft', year: 2023, status: 'Completed',
      img: '1582268611958-ebfd161ef9cf',
      text: 'Inspired by traditional Tamil courtyard homes, reinterpreted with clean modern lines and a reflective pool.' },
    { title: 'Nexa Corporate Office', category: 'commercial', location: 'Chennai', area: '22,000 sq.ft', year: 2022, status: 'Completed', size: 'tall',
      img: '1497366216548-37526070297c',
      text: 'Shell-and-core construction plus a complete office fit-out for a 300-seat technology campus.' },
    { title: 'The Crest Residences', category: 'apartments', location: 'Coimbatore', area: '48 units', year: 2025, status: 'Ongoing',
      img: '1545324418-cc1a3fa10c00',
      text: 'Premium 3 & 4 BHK residences with private balconies, solar-ready roofs and rainwater harvesting.' },
    { title: 'Palm Grove Residence', category: 'villas', location: 'Pondicherry', area: '5,200 sq.ft', year: 2022, status: 'Completed',
      img: '1512917774080-9991f1c4c750',
      text: 'A resort-style coastal home with expansive glazing, teak decks and a 20-metre lap pool.' },
    { title: 'Udhaya Business Tower', category: 'commercial', location: 'Chennai', area: '1.4 L sq.ft', year: 2025, status: 'Ongoing',
      img: '1486406146926-c627a92ad1ab',
      text: 'A Grade-A commercial tower with a high-performance glass façade, basement parking and smart building systems.' },
    { title: 'Glasshouse Interiors', category: 'interiors', location: 'Coimbatore', area: '4,100 sq.ft', year: 2023, status: 'Completed', size: 'tall',
      img: '1600573472550-8090b5e0745e',
      text: 'Light-filled interiors with floating stairs, frameless glass and warm oak — designed around the view.' },
    { title: 'Skyline Duplex', category: 'villas', location: 'Salem', area: '3,900 sq.ft', year: 2024, status: 'Completed',
      img: '1613490493576-7fde63acd811',
      text: 'A bold white duplex with stacked terraces, rooftop entertainment deck and a sculptural staircase.' },
    { title: 'Green Terraces', category: 'apartments', location: 'Madurai', area: '64 units', year: 2024, status: 'Completed',
      img: '1574362848149-11496d93a7c7',
      text: 'Mid-rise apartments with deep shaded balconies, cross-ventilated layouts and planted terraces.' },
    { title: 'Teak House', category: 'villas', location: 'Ooty Road, Coimbatore', area: '4,400 sq.ft', year: 2023, status: 'Completed',
      img: '1600566753190-17f0baa2a6c3',
      text: 'A warm timber-clad family home that blends into its wooded site, with generous verandahs and skylights.' }
  ],

  testimonials: [
    { quote: 'Udhaya Builders handled everything from the plan approval to the last light fitting. The quality of finish is far above what we expected, and they handed over two weeks early.',
      name: 'R. Karthikeyan', role: 'Villa owner, Coimbatore' },
    { quote: 'What stood out was the transparency — weekly site updates, a clear bill of quantities and zero surprise costs. We would build with them again without a second thought.',
      name: 'Priya Venkatesh', role: 'Homeowner, Chennai' },
    { quote: 'Our office fit-out had an aggressive deadline. Their project management team ran the site like clockwork and the result looks like a global HQ.',
      name: 'Arun Prakash', role: 'Director, Nexa Technologies' },
    { quote: 'They respected our Vastu requirements while still giving us a truly modern home. Their engineers explained every decision patiently.',
      name: 'S. Meenakshi', role: 'Homeowner, Madurai' }
  ]
};
