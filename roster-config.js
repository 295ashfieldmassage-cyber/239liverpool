/* ============================================================
   239 LIVERPOOL — SINGLE EDITABLE ROSTER FILE
   客户以后只需要修改此文件：人员资料、图片、Hover图片、每周排班。
   Hover photos rotate every 2 seconds while the pointer stays on a profile.
============================================================ */
(function () {
  const profiles = {
    Amy: {
      name: "Amy",
      description: "Busty Mature & Prostate Massage Chinese",
      nationality: "Chinese",
      height: "165cm",
      weight: "60kg",
      cup: "G",
      image: "images/Amy.jpg",
      hoverImages: ["images/Amy1.jpg", "images/Amy2.jpg", "images/Amy3.jpg", "images/Amy4.jpg", "images/Amy5.jpg"]
    },
    Lucy: {
      name: "Lucy",
      description: "Excellent Massage Chinese",
      nationality: "Chinese",
      height: "163cm",
      weight: "54kg",
      cup: "D",
      image: "images/lucy.jpg",
      hoverImages: ["images/lucy1.jpg", "images/lucy2.jpg", "images/lucy3.jpg"]
    },
    Kitty: {
      name: "Kitty",
      description: "Busty & Passionate Indonesian",
      nationality: "Indonesian",
      height: "161cm",
      weight: "55kg",
      cup: "G",
      image: "images/kitty.jpg",
      hoverImages: ["images/kitty1.jpg", "images/kitty2.jpg", "images/kitty3.jpg", "images/kitty4.jpg"]
    },
    Lola: {
      name: "Lola",
      description: "Elegant Chinese Beauty",
      nationality: "Chinese",
      height: "163cm",
      weight: "54kg",
      cup: "D",
      image: "images/lola.jpg",
      hoverImages: ["images/lola1.jpg"]
    },
      Angel: {
      name: "Angel",
      description: "Charming Chinese Beauty",
      nationality: "Chinese",
      height: "162cm",
      weight: "56kg",
      cup: "D",
      image: "images/angel.jpg",
      hoverImages: ["images/angel1.jpg" ,"images/angel2.jpg", "images/angel2.jpg"]
    },
    Regina: {
      name: "Regina",
      description: "Curvy Mexican Beauty with a Stunnig Booty",
      nationality: "Mexican",
      height: "163cm",
      weight: "58kg",
      cup: "D",
      image: "images/regina.jpg",
      hoverImages: ["images/regina1.jpg"]
    },
    Una: {
      name: "Una",
      description: "Stunning Colombian Beauty with Gorgeous",
      nationality: "Colombian",
      height: "164cm",
      weight: "57kg",
      cup: "G",
      image: "images/una.jpg",
      hoverImages: ["images/una1.jpg", "images/una2.jpg", "images/una3.jpg", "images/una4.jpg"]
    },
    Dory: {
      name: "Dory",
      description: "Pocket-Sized Vietnamese Beauty",
      nationality: "Vietnamese",
      height: "163cm",
      weight: "49kg",
      cup: "B",
      image: "images/dory.jpg",
      hoverImages: ["images/dory1.jpg", "images/dory2.jpg", "images/dory3.jpg"]
    },
    Anna: {
      name: "Anna",
      description: "Blonde Australian Beauty",
      nationality: "Australian",
      height: "165cm",
      weight: "52kg",
      cup: "c",
      image: "images/anna.jpg",
      hoverImages: ["images/anna1.jpg", "images/anna2.jpg", "images/anna3.jpg", "images/anna4.jpg"]
    },
    Lulu: {
      name: "lulu",
      description: "Busty & Seductive Chinese Beauty",
      nationality: "Chinese",
      height: "165cm",
      weight: "54kg",
      cup: "E",
      image: "images/lulu.jpg",
      hoverImages: ["images/lulu1.jpg", "images/lulu2.jpg", "images/lulu3.jpg"]
    },
      Tracy: {
      name: "Tracy",
      description: "Busty & Cute Indian",
      nationality: "Indian",
      height: "165cm",
      weight: "63kg",
      cup: "E",
      image: "images/tracy1.jpg",
      hoverImages: ["images/tracy1.jpg", "images/tracy2.jpg"]
    },
    Andie: {
      name: "Andie",
      description: "Busty & Seductive Korean Beauty",
      nationality: "Korean",
      height: "166cm",
      weight: "54kg",
      cup: "D",
      image: "images/andie.jpg",
      hoverImages: ["images/andie1.jpg", "images/andie2.jpg", "images/andie3.jpg"]
    },
    Sweet: {
      name: "Sweet",
      description: "Sexy & Playful Filipino Beauty",
      nationality: "Filipino",
      height: "159cm",
      weight: "44g",
      cup: "B",
      image: "images/sweet.jpg",
      hoverImages: ["images/sweet1.jpg", "images/sweet2.jpg", "images/sweet3.jpg"]
    },
    Sasa: {
      name: "Sasa",
      description: "Fun & Interactive Chinese",
      nationality: "Chinese",
      height: "163cm",
      weight: "53kg",
      cup: "D",
      image: "images/sasa.jpg",
      hoverImages: ["images/sasa1.jpg", "images/sasa2.jpg"]
    },
      Fiona: {
      name: "Fiona",
      description: "Fun & Playful Chinese",
      nationality: "Chinese",
      height: "163cm",
      weight: "53kg",
      cup: "D",
      image: "images/fiona.jpg",
      hoverImages: ["images/fiona1.jpg", "images/fiona2.jpg", "images/fiona3.jpg"]
    },
     Venessa: {
      name: "Venessa",
      description: "Fun & Playful Mexican",
      nationality: "Mexican",
      height: "166cm",
      weight: "56kg",
      cup: "D",
      image: "images/Venessa.jpg",
      hoverImages: ["images/Venessa1.jpg", "images/Venessa2.jpg", "images/Venessa3.jpg", "images/Venessa4.jpg"]
    },
      Tia: {
      name: "Tia",
      description: "Fun & Playful Vietnamese",
      nationality: "hoverImages",
      height: "166cm",
      weight: "56kg",
      cup: "D",
      image: "images/tia.jpg",
      hoverImages: ["images/tia1.jpg", "images/tia2.jpg", "images/tia3.jpg", "images/tia4.jpg"]
    },
      Aria: {
      name: "Aria",
      description: "Fun & Playful Tall African",
      nationality: "African",
      height: "168cm",
      weight: "50Kg",
      cup: "D",
      image: "images/aria.jpg",
      hoverImages: ["images/aria1.jpg"]
    },

      lily: {
      name: "lily",
      description:"Fun & Cute Tall Chinese",
      nationality:"Chinese",
      height: "167cm",
      weight: "47Kg",
      cup: "B",
      image: "images/lily.jpg",
      hoverImages: ["images/lily1.jpg","images/lily2.jpg","images/lily3.jpg"]
    },

      kitkat: {
      name: "kitkat",
      description: "Juicy and cute Thai",
      nationality: "Thai",
      height: "163cm",
      weight: "44Kg",
      cup: "B",
      image: "images/kitkat.jpg",
      hoverImages: ["images/kitkat1.jpg","images/kitkat2.jpg"]
    },
      helen: {
      name: "helen",
      description: "Fun & Good skills Chinese",
      nationality: "Chinese",
      height: "161cm",
      weight: "53Kg",
      cup: "B",
      image: "images/helen.jpg",
      hoverImages: ["images/helen1.jpg"]
   },
      Natalia: {
      name: "natalia",
      description: "Fun gorgeous Italian",
      nationality: "Italian",
      height: "158cm",
      weight: "50Kg",
      cup: "D",
      image: "images/natalia.jpg",
      hoverImages: ["images/natalia.jpg"]
  },
      Aya: {
      name: "Aya",
      description: "Tall pretty Chinese",
      nationality: "Chinese",
      height: "168cm",
      weight: "50Kg",
      cup: "c",
      image: "images/Aya.jpg",
      hoverImages: ["images/Aya1.jpg", "images/Aya2.jpg", "images/Aya3.jpg", "images/Aya4.jpg", "images/Aya5.jpg"]
 },
      Nami: {
      name: "Nami",
      description: "Tall pretty Busty Indian",
      nationality: "Indian",
      height: "168cm",
      weight: "55Kg",
      cup: "c",
      image: "images/nami1.jpg",
      hoverImages: ["images/nami2.jpg", "images/nami3.jpg", "images/nami4.jpg"]
    },
      Rose: {
      name: "Rose",
      description: "Tall pretty Vietnamese",
      nationality: "Vietnamese",
      height: "165cm",
      weight: "50Kg",
      cup: "D",
      image: "images/Rose.jpg",
      hoverImages: ["images/Rose1.jpg", "images/Rose2.jpg", "images/Rose3.jpg"]
    },
    Zuri: {
      name: "Zuri",
      description: "West African Black Rose - Romantic & Passionte",
      nationality: "West African",
      height: "167cm",
      weight: "52kg",
      cup: "c",
      image: "images/zuri.jpg",
      hoverImages: ["images/zuri1.jpg", "images/zuri2.jpg"]
    }
  };

  const weeklyNames = {
    monday: ["Lucy","Lola", "Regina", "Una","Aya", "Andie"],
    tuesday: ["Lulu","Aya","Venessa","Regina", "Una", "Sweet"],
    wednesday: ["Venessa","Lucy","Regina", "Andie","Una","Sweet", "Sasa"],
    thursday: [ "lily", "Lucy","Andie","Venessa","Fiona", "Regina","Lulu", "Sweet", "Sasa"],
    friday: ["lily","Lucy","Regina","Amy","Tia", "Venessa","Aya","Lulu","Sweet", "Angel","Natalia"],
    saturday: ["Lucy","Natalia","Nami","Regina", "Tia","Rose", "Sweet", "Anna", "Aya", "Venessa"],
    sunday: ["Nami","Tia","Rose","Natalia","Regina", "Anna","Andie","Tia", "Aya", "Sweet","Sasa"]
  };

  const days = {};
  Object.entries(weeklyNames).forEach(([day, names]) => {
    days[day] = names.map(name => ({ ...profiles[name] }));
  });

  window.ROSTER_PROFILES = profiles;
  window.FEATURED_SPA_PROFILE = {
    name: "Jennifer",
    description: "239 Liverpool spa profile.",
    nationality: "",
    height: "",
    weight: "",
    cup: "",
    image: "images/featured-gallery/new-spa-01.jpg",
    hoverImages: [
      "images/featured-gallery/new-spa-02.jpg",
      "images/featured-gallery/new-spa-03.jpg",
      "images/featured-gallery/new-spa-04.jpg",
      "images/featured-gallery/new-spa-05.jpg"
    ]
  };
  window.WEEKLY_ROSTER = {
    dateRange: "",
    address: "239 Northumberland St, Liverpool NSW 2170",
    days
  };
})();
