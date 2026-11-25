/** Editorial content for homepage sections, kept separate from the UI. */

/** Products shown in "The Wellford Collection" on the homepage, in order. */
export const homepageFeaturedHandles = ["the-penny-loafer", "the-suede-driver", "the-classic-derby"];

export const styleNotes = {
  eyebrow: "Wellford Style Notes",
  heading: "Dressed with intention.",
  subtitle: "A considered finish, from morning plans to evening hours.",
  cta: { label: "Explore the Looks", href: "/shop" },
  looks: [
    {
      caption: "City Hours",
      src: "/media/city-hours.webp",
      alt: "Brown penny loafers worn with navy trousers, carrying a leather briefcase along a stone city street",
      href: "/products/the-penny-loafer",
    },
    {
      caption: "The Weekend",
      src: "/media/the-weekend.webp",
      alt: "Tan suede drivers worn with cream trousers, reading on a sunlit terrace",
      href: "/products/the-suede-driver",
    },
    {
      caption: "After Dark",
      src: "/media/after-dark.webp",
      alt: "Black derby shoes worn with grey tailoring in a leather armchair in a lamplit library",
      href: "/products/the-classic-derby",
    },
  ],
};

export const standard = {
  eyebrow: "The Wellford Standard",
  heading: "Elegance is in the details.",
  pillars: [
    { number: "01", title: "Timeless by Design", text: ["Classic forms that complement", "a considered wardrobe."] },
    { number: "02", title: "Versatile by Nature", text: ["A composed finish for everyday", "plans and more formal moments."] },
    { number: "03", title: "Quiet Confidence", text: ["Understated style, carried", "with confidence."] },
  ],
};
