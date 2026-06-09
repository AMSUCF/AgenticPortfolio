/* =====================================================================
   data.js — single source of content. Edit THIS file to update the site.
   TODO: verify — researched from public sources; confirm before launch.
   ===================================================================== */

const SITE = {
  // Research-interest pills (About section)
  interests: [
    "Electronic literature",
    "Game studies",
    "Digital narratives",
    "Twine & hypertext",
    "Generative AI & critical making",
    "Gender & tech",
    "Creative coding",
  ],

  /* -------- Books (10) --------
     type drives the filter pills. Add { link: "..." } to make a card clickable. */
  publications: [
    { title: "Undertale", year: 2025, type: "Game Studies",
      meta: "University of Chicago Press",
      desc: "A close study of Toby Fox's genre-bending RPG and its play with player agency." },

    { title: "Critical Making in the Age of AI", year: 2025, type: "Digital Culture",
      meta: "with Emily Johnson · Amherst College Press",
      desc: "Hands-on, critical approaches to building and breaking generative AI systems." },

    { title: "Playful Pedagogy in the Pandemic", year: 2022, type: "Pedagogy",
      meta: "with Emily Johnson · Routledge",
      desc: "Pivoting to games-based learning when classrooms moved online." },

    { title: "Twining: Critical and Creative Approaches to Hypertext Narratives", year: 2021, type: "Electronic Literature",
      meta: "with Stuart Moulthrop · Amherst College Press",
      desc: "A technical, critical, and personal journey through making stories in Twine." },

    { title: "Adventure Games: Playing the Outsider", year: 2020, type: "Game Studies",
      meta: "with Aaron Reed & John Murray · Bloomsbury",
      desc: "A history and theory of the adventure game and its outsider players." },

    { title: "A Portrait of the Auteur as Fanboy", year: 2020, type: "Media Studies",
      meta: "with Mel Stanfill · University Press of Mississippi",
      desc: "On authorship, fandom, and the myth of the singular creative genius." },

    { title: "Toxic Geek Masculinity in Media", year: 2017, type: "Media Studies",
      meta: "with Bridget Blodgett · Palgrave Macmillan",
      desc: "Sexism, trolling, and identity policing across geek media culture." },

    { title: "Jane Jensen: Gabriel Knight, Adventure Games, Hidden Objects", year: 2017, type: "Game Studies",
      meta: "Bloomsbury",
      desc: "A study of designer Jane Jensen and her landmark adventure games." },

    { title: "What is Your Quest? From Adventure Games to Interactive Books", year: 2014, type: "Electronic Literature",
      meta: "University of Iowa Press",
      desc: "Tracing interactive storytelling from adventure games to interactive books." },

    { title: "Flash: Building the Interactive Web", year: 2014, type: "Digital Culture",
      meta: "with John Murray · MIT Press",
      desc: "The cultural and technical history of Flash and the interactive web." },
  ],

  /* -------- Projects / games / communities / teaching -------- */
  projects: [
    { title: "Electronic Literature Organization", tag: "Community", year: "President",
      desc: "Leading the international organization advancing the writing, publishing, and reading of electronic literature.",
      link: "https://eliterature.org/" },

    { title: "Kairos — Inventio", tag: "Editing", year: "Editor",
      desc: "Editing the Inventio section of Kairos: A Journal of Rhetoric, Technology, and Pedagogy.",
      link: "https://kairos.technorhetoric.net/" },

    { title: "Texts & Technology PhD", tag: "Teaching", year: "UCF",
      desc: "Directing graduate programs and the interdisciplinary PhD in Texts & Technology at UCF.",
      link: "https://cah.ucf.edu/textstech/" },

    { title: "Twine making & workshops", tag: "Creative", year: "Ongoing",
      desc: "Building and teaching choice-driven hypertext stories with the Twine platform.",
      link: "https://twinery.org/" },
  ],

  /* -------- Contact / social links (TODO: verify) -------- */
  links: [
    { label: "Personal site", url: "https://anastasiasalter.net/", icon: "🌐" },
    { label: "Google Scholar", url: "https://scholar.google.com/citations?user=dKeX0m8AAAAJ", icon: "🎓" },
    { label: "Email", url: "mailto:anastasia@salter.example", icon: "✉️" },
  ],
};
