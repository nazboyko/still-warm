export type ExhibitId = "cat-001" | "cat-002" | "cat-003" | "cat-004";

interface LocalizedText {
  lang: "uk";
  text: string;
}

export interface Exhibit {
  id: ExhibitId;
  number: string;
  emotion: string;
  dish: string;
  dishNative?: LocalizedText;
  medium: string;
  provenance: string;
  story: string;
  sensory: string;
  sensoryNative?: LocalizedText;
  curatorNote: string;
}

export const exhibits: Exhibit[] = [
  {
    id: "cat-001",
    number: "001",
    emotion: "Homesickness",
    dish: "Varenyky",
    dishNative: { lang: "uk", text: "вареники" },
    medium: "Flour, potato, and a kitchen that no longer exists.",
    provenance: "Ukraine. Learned at one table, repeated 5,000 miles away.",
    story:
      "The recipe starts with the hands that made them - his mother's, some days his grandmother's - a little lined, dusted in flour, warm. On the table: dough, a bowl of filling, a rolling pin, a towel, and a row of finished varenyky waiting their turn at the boiling water. The kitchen holds quiet sounds, dishes touching, water starting to roll, talk that keeps folding into laughter. He makes them now, and the row still lines up the same.",
    sensory:
      "The air smells of fresh dough, fried onions, and a warmth of home that cannot be made anywhere else.",
    sensoryNative: {
      lang: "uk",
      text: "У повітрі пахне свіжим тістом, смаженою цибулею й теплом дому, яке неможливо відтворити ніде більше.",
    },
    curatorNote: "Recipes preserve ingredients. Stories preserve people.",
  },
  {
    id: "cat-002",
    number: "002",
    emotion: "Rainy Days",
    dish: "Grilled cheese",
    medium: "Bread, butter, and weather.",
    provenance: "United States, lunch counters and rained-in kitchens.",
    story:
      "Donated by a visitor who still cannot hear rain on a window without hearing butter in a pan. The two sounds arrived together, and they never left. Outside got darker, the pan got louder, and the afternoon called it a fair trade.",
    sensory: "The hiss softening as the first side turns gold.",
    curatorNote: "Comfort is a sound before it is a taste.",
  },
  {
    id: "cat-003",
    number: "003",
    emotion: "Celebration",
    dish: "Empanadas",
    medium: "A tray of half-moons, sealed with thumbprints.",
    provenance: "Spain to Latin America, by ship and by hand.",
    story:
      "The tray came out of the oven crimped like a drumroll, and the table understood. Every fold hid a different filling, and every guess was wrong on purpose. Nobody noticed the moment the room got louder than the music, which is how you know it was a celebration. The last empanada was cut in three, because that is the law.",
    sensory: "The crack of the first bite, right at the seam.",
    curatorNote: "No one remembers the plates. Everyone remembers the noise.",
  },
  {
    id: "cat-004",
    number: "004",
    emotion: "Sunday Morning",
    dish: "Pancakes",
    medium: "Batter, a warm pan, and no particular hurry.",
    provenance: "Contested. Every Sunday kitchen claims the original.",
    story:
      "The light came in low and nobody argued with it. The first pancake was wrong, as first pancakes must be, and it was eaten anyway, standing up, as a tax. The stack grew slower than anyone was hungry, which was the point. The kitchen clock kept the time to itself.",
    sensory: "Butter finding its way down a stack that is still warm.",
    curatorNote: "The rarest ingredient in this wing is an unhurried morning.",
  },
];

export const reservedExhibit = {
  number: "007",
  title: "Reserved",
  placard:
    "This space is held for a memory that has not arrived yet. Donations accepted below.",
};

export const donateIntro =
  "Every piece in this collection was donated by someone who remembered. The last frame is reserved for yours.";
