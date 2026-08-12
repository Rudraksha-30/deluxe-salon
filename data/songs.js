// Each song plays through the YouTube IFrame Player (audio only, hidden video).
// To add a song: find its YouTube video ID (the part after "v=" in the URL)
// and add an entry below in the same shape.
const songs = [
  {
    id: "lag-ja-gale",
    title: "Lag Ja Gale",
    hindiTitle: "लग जा गले",
    singer: "Lata Mangeshkar",
    film: "Woh Kaun Thi?",
    year: 1964,
    youtubeId: "kcHnaHz7rxc",
  },
  {
    id: "mera-joota-hai-japani",
    title: "Mera Joota Hai Japani",
    hindiTitle: "मेरा जूता है जापानी",
    singer: "Mukesh",
    film: "Shree 420",
    year: 1955,
    youtubeId: "fy7P_Uu3alA",
  },
  {
    id: "pyar-hua-ikrar-hua",
    title: "Pyar Hua Ikrar Hua",
    hindiTitle: "प्यार हुआ इक़रार हुआ",
    singer: "Manna Dey, Lata Mangeshkar",
    film: "Shree 420",
    year: 1955,
    youtubeId: "xkl1QwNEuYs",
  },
  {
    id: "main-duniya-bhula-dunga",
    title: "Main Duniya Bhula Dunga",
    hindiTitle: "प्यार हुआ इक़रार हुआ",
    singer: "Kumar Sanu",
    film: "Aashiqui",
    year: 1989,
    youtubeId: "otQmzlm-s7Q",
  },
];

export default songs;
