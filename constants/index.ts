export const faqData = {
  Order: [
    {
      title: "How do I place an order?",
      content:
        "To place an order, simply visit our deliveries page and complete all the required steps. Follow the prompts to provide your pickup and delivery information, and confirm your order.",
    },
    {
      title: "What can I send?",
      content:
        "You can send any item that is not on our prohibited list. Prohibited items include aerosols and gas, flammable items, cash notes and coins, counterfeit products, illegal products such as drugs, fragile items such as glass and expensive items such as jewelry, pure gold and diamond.",
    },
    {
      title: "What time does pickup take place?",
      content:
        "Our riders collect parcels from pickup locations between 7AM and 6PM. Orders collected past 12PM will be delivered the next day.",
    },
    {
      title: "How do i weight my parcel?",
      content:
        "While placing an order, you will be prompted to provide the weight of your parcel. Weigh your parcel once it is packaged and sealed. If possible, use digital scales for accuracy. Our riders will also weight your parcel on pickup to confirm the accuracy of the weight provided during the order.",
    },
    {
      title: "How to prepare/pack items?",
      content:
        "It is your sole responsibility to ensure your goods are packed properly thereby preventing damage to contents during transit. We suggest using a soft-sided suitcase or sturdy double-walled cardboard boxes designed to hold the weight packed. Sendit will not be liable of any damages resulting from loose packaging. However, our riders will inspect the packaging on pickup.",
    },
    {
      title: "How can i edit my order?",
      content:
        "We understand that circumstances change. If you need to make changes to your order or cancel it, visit the dashboard page and edit any details. Kindly note changes cannot be made after our riders have picked the parcel.",
    },
  ],

  Delivery: [
    {
      title: "What is Sendit's delivery coverage area?",
      content:
        "We offer a nationwide delivery coverage within Kenya. We're continuously expanding our reach to serve you better.",
    },
    {
      title: "How can I track the status of my delivery?",
      content:
        "We are currently working on implementing a parcel tracking system. However, our professional riders will keep you informed all the time.",
    },
    {
      title: "What are Sendit's delivery time frames?",
      content:
        "Our delivery times may vary depending on your location. Orders within Nairobi are eligible for same day delivery as long as the order is placed before 12PM. All orders made past 12PM will be delivered the next day.",
    },
    {
      title: "What are Sendit's delivery time frames?",
      content:
        "Our delivery times may vary depending on your location. Orders within Nairobi are eligible for same day delivery as long as the order is placed before 12PM. All orders made past 12PM will be delivered the next day.",
    },
    {
      title: "What do I do if i miss the delivery driver?",
      content:
        "You will be contacted if delivery fails for any reason, for example if the recipient is unavailable.Should there be no response, you will receive an email with instructions on how to arrange a new delivery.",
    },
    {
      title: "Does Sendit Offer Shipment Insurance?",
      content:
        "We handle every shipment with great care but accidents outside of our control can happen. During the order process, you will be prompted to provide an estimated value of your parcel for insurance purposes.Kindly provide the most accurate information. Note that damages resulting from poor packaging, sending prohibited goods, and  natural disasters such as storms, flooding, lightning strike, and earthquakes are not reimbursed.",
    },
  ],
  Payments: [
    {
      title: "How do I Pay for my Order?",
      content:
        "Sendit allows you to pay once your parcel has been delivered. You can pay through cash, our Lipa na Mpesa Till Number or through a Bank Transfer.",
    },
    {
      title: "How customs impacts me?",
      content:
        "There are no customs for domestic deliveries and Sendit does not offer international shipping services. However, all delivery orders are subject to 16% VAT as per the Kenyan laws.",
    },
    {
      title: "Why am i being asked to pay up front?",
      content:
        "While Sendit allows you to pay after delivery, some orders might require you to pay upfront. Such orders include groceries and any purchases made by riders on your behalf, high value orders such as electronics, jewelry, or luxury goods and orders made to remote locations (upcountry). ",
    },
  ],
};

export const pricingPlans = [
  {
    title: "Regular",
    price: 350,
    features: [
      "Same Day Delivery within Nairobi",
      "Item Tracking",
      "<30 Minutes Pickup",
      "Non-Perishable Goods",
      "0-10kgs per parcel",
      "Door Delivery",
      "Fresh Guarantee",
    ],
  },
  {
    title: "Same Day",
    price: 500,
    isPopular: true,
    features: [
      "Same Day Delivery in selected regions",
      "Item tracking",
      "<10 Minutes Pickup",
      "Perishable and Non-Perishable Goods",
      "0-20kgs per parcel",
      "Door Delivery",
      "Fresh Guarantee",
    ],
  },
  {
    title: "Cargo",
    price: 750,
    features: [
      "Same Day Delivery in selected regions",
      "Item Tracking",
      "<20 Minutes Pickup",
      "Non-Perishable Goods",
      "Maximum 70kgs per parcel",
      "Promo and Special Discounts",
      "Door Delivery",
    ],
  },
];

export const regions = [
  {
    county: "Baringo",
    subcounties: [
      "Baringo Central",
      "Baringo North",
      "Baringo South",
      "Eldama Ravine",
      "Mogotio",
      "Tiaty",
    ],
  },
  {
    county: "Bomet",
    subcounties: [
      "Bomet Central",
      "Bomet East",
      "Chepalungu",
      "Konoin",
      "Sotik",
    ],
  },
  {
    county: "Bungoma",
    subcounties: [
      "Bumula",
      "Kabuchai",
      "Kanduyi",
      "Kimilil",
      "Mt Elgon",
      "Sirisia",
      "Tongaren",
      "Webuye East",
      "Webuye West",
    ],
  },
  {
    county: "Busia",
    subcounties: [
      "Budalangi",
      "Butula",
      "Funyula",
      "Nambele",
      "Teso North",
      "Teso South",
    ],
  },
  {
    county: "Elgeyo-Marakwet",
    subcounties: [
      "Keiyo North",
      "Keiyo South",
      "Marakwet East",
      "Marakwet West",
    ],
  },
  {
    county: "Embu",
    subcounties: ["Manyatta", "Mbeere North", "Mbeere South", "Runyenjes"],
  },
  {
    county: "Garissa",
    subcounties: [
      "Daadab",
      "Fafi",
      "Garissa Township",
      "Hulugho",
      "Ijara",
      "Lagdera",
      "Balambala",
    ],
  },
  {
    county: "Homa Bay",
    subcounties: [
      "Homabay Town",
      "Kabondo",
      "Karachwonyo",
      "Kasipul",
      "Mbita",
      "Ndhiwa",
      "Rangwe",
      "Suba",
    ],
  },
  { county: "Isiolo", subcounties: ["Isiolo", "Merti", "Garbatulla"] },
  {
    county: "Kajiado",
    subcounties: [
      "Isinya",
      "Kajiado Central",
      "Kajiado North",
      "Loitokitok",
      "Mashuuru",
    ],
  },
  {
    county: "Kakamega",
    subcounties: [
      "Butere",
      "Kakamega Central",
      "Kakamega East",
      "Kakamega North",
      "Kakamega South",
      "Khwisero",
      "Lugari",
      "Lukuyani",
      "Lurambi",
      "Matete",
      "Mumias",
      "Mutungu",
      "Navakholo",
    ],
  },
  {
    county: "Kericho",
    subcounties: [
      "Ainamoi",
      "Belgut",
      "Bureti",
      "Kipkelion East",
      "Kipkelion West",
      "Soin/Sigowet",
    ],
  },
  {
    county: "Kiambu",
    subcounties: [
      "Gatundu North",
      "Gatundu South",
      "Githunguri",
      "Juja",
      "Kabete",
      "Kiambaa",
      "Kiambu",
      "Kikuyu",
      "Limuru",
      "Ruiru",
      "Thika Town",
      "Lari",
    ],
  },
  {
    county: "Kilifi",
    subcounties: [
      "Ganze",
      "Kaloleni",
      "Kilifi North",
      "Kilifi South",
      "Magarini",
      "Malindi",
      "Rabai",
    ],
  },
  {
    county: "Kirinyaga",
    subcounties: [
      "Kirinyaga Central",
      "Kirinyaga East",
      "Kirinyaga West",
      "Mwea East",
      "Mwea West",
    ],
  },
  {
    county: "Kisumu",
    subcounties: [
      "Kisumu Central",
      "Kisumu East",
      "Kisumu West",
      "Muhoroni",
      "Nyakach",
      "Nyando",
      "Seme",
    ],
  },
  {
    county: "Kitui",
    subcounties: [
      "Kitui West",
      "Kitui Central",
      "Kitui Rural",
      "Kitui South",
      "Kitui East",
      "Mwingi North",
      "Mwingi West",
      "Mwingi Central",
    ],
  },
  {
    county: "Kwale",
    subcounties: ["Kinango", "Lunga Lunga", "Msambweni", "Matuga"],
  },
  {
    county: "Laikipia",
    subcounties: [
      "Laikipia Central",
      "Laikipia East",
      "Laikipia North",
      "Laikipia West",
      "Nyahururu",
    ],
  },
  { county: "Lamu", subcounties: ["Lamu East", "Lamu West"] },
  {
    county: "Machakos",
    subcounties: [
      "Kathiani",
      "Machakos Town",
      "Masinga",
      "Matungulu",
      "Mavoko",
      "Mwala",
      "Yatta",
    ],
  },
  {
    county: "Makueni",
    subcounties: [
      "Kaiti",
      "Kibwezi West",
      "Kibwezi East",
      "Kilome",
      "Makueni",
      "Mbooni",
    ],
  },
  {
    county: "Mandera",
    subcounties: [
      "Banissa",
      "Lafey",
      "Mandera East",
      "Mandera North",
      "Mandera South",
      "Mandera West",
    ],
  },
  {
    county: "Marsabit",
    subcounties: ["Laisamis", "Moyale", "North Hor", "Saku"],
  },
  {
    county: "Meru",
    subcounties: [
      "Buuri",
      "Igembe Central",
      "Igembe North",
      "Igembe South",
      "Imenti Central",
      "Imenti North",
      "Imenti South",
      "Tigania East",
      "Tigania West",
    ],
  },
  {
    county: "Migori",
    subcounties: [
      "Awendo",
      "Kuria East",
      "Kuria West",
      "Mabera",
      "Ntimaru",
      "Rongo",
      "Suna East",
      "Suna West",
      "Uriri",
    ],
  },
  {
    county: "Mombasa",
    subcounties: ["Changamwe", "Jomvu", "Kisauni", "Likoni", "Mvita", "Nyali"],
  },
  {
    county: "Murang’a",
    subcounties: [
      "Gatanga",
      "Kahuro",
      "Kandara",
      "Kangema",
      "Kigumo",
      "Kiharu",
      "Mathioya",
      "Murang’a South",
    ],
  },
  {
    county: "Nairobi",
    subcounties: [
      "Dagoretti North",
      "Dagoretti South",
      "Embakasi Central",
      "Embakasi East",
      "Embakasi North",
      "Embakasi South",
      "Embakasi West",
      "Kamukunji",
      "Kasarani",
      "Kibra",
      "Lang’ata",
      "Makadara",
      "Mathare",
      "Roysambu",
      "Ruaraka",
      "Starehe",
      "Westlands",
    ],
  },
  {
    county: "Nakuru",
    subcounties: [
      "Bahati",
      "Gilgil",
      "Kuresoi North",
      "Kuresoi South",
      "Molo",
      "Naivasha",
      "Nakuru Town East",
      "Nakuru Town West",
      "Njoro",
      "Rongai",
      "Subukia",
    ],
  },
  {
    county: "Nandi",
    subcounties: [
      "Aldai",
      "Chesumei",
      "Emgwen",
      "Mosop",
      "Nandi Hills",
      "Tindiret",
    ],
  },
  {
    county: "Narok",
    subcounties: [
      "Narok East",
      "Narok North",
      "Narok South",
      "Narok West",
      "Transmara East",
      "Transmara West",
    ],
  },
  {
    county: "Nyamira",
    subcounties: [
      "Borabu",
      "Manga",
      "Masaba North",
      "Nyamira North",
      "Nyamira South",
    ],
  },
  {
    county: "Nyandarua",
    subcounties: [
      "Kinangop",
      "Kipipiri",
      "Ndaragwa",
      "Ol-Kalou",
      "Ol Joro Orok",
    ],
  },
  {
    county: "Nyeri",
    subcounties: [
      "Kieni East",
      "Kieni West",
      "Mathira East",
      "Mathira West",
      "Mukurweini",
      "Nyeri Town",
      "Othaya",
      "Tetu",
    ],
  },
  {
    county: "Samburu",
    subcounties: ["Samburu East", "Samburu North", "Samburu West"],
  },
  {
    county: "Siaya",
    subcounties: [
      "Alego Usonga",
      "Bondo",
      "Gem",
      "Rarieda",
      "Ugenya",
      "Unguja",
    ],
  },
  {
    county: "Taita-Taveta",
    subcounties: ["Mwatate", "Taveta", "Voi", "Wundanyi"],
  },
  { county: "Tana River", subcounties: ["Bura", "Galole", "Garsen"] },
  {
    county: "Tharaka-Nithi",
    subcounties: [
      "Tharaka North",
      "Tharaka South",
      "Chuka",
      "Igambang’ombe",
      "Maara",
      "Chiakariga",
      "Muthambi",
    ],
  },
  {
    county: "Trans-Nzoia",
    subcounties: ["Cherangany", "Endebess", "Kiminini", "Kwanza", "Saboti"],
  },
  {
    county: "Turkana",
    subcounties: [
      "Loima",
      "Turkana Central",
      "Turkana East",
      "Turkana North",
      "Turkana South",
    ],
  },
  {
    county: "Uasin Gishu",
    subcounties: ["Ainabkoi", "Kapseret", "Kesses", "Moiben", "Soy", "Turbo"],
  },
  {
    county: "Vihiga",
    subcounties: ["Emuhaya", "Hamisi", "Luanda", "Sabatia", "Vihiga"],
  },
  {
    county: "Wajir",
    subcounties: [
      "Eldas",
      "Tarbaj",
      "Wajir East",
      "Wajir North",
      "Wajir South",
      "Wajir West",
    ],
  },
  {
    county: "West Pokot",
    subcounties: ["Central Pokot", "North Pokot", "Pokot South", "West Pokot"],
  },
];
