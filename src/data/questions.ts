export interface Question {
  id: number;
  text: string;
  options: string[];
  correctOptionIndex: number;
  timeLimit: number; // 秒単位
}

export const questions: Question[] = [
  {
    id: 1,
    text: "サッカーワールドカップで最も多く優勝している国は？",
    options: ["ブラジル", "ドイツ", "イタリア", "フランス"],
    correctOptionIndex: 0,
    timeLimit: 5
  },
  {
    id: 2,
    text: "「となりのトトロ」の監督は誰？",
    options: ["新海誠", "細田守", "宮崎駿", "押井守"],
    correctOptionIndex: 2,
    timeLimit: 5
  },
  {
    id: 3,
    text: "日本の首都は？",
    options: ["大阪", "京都", "東京", "名古屋"],
    correctOptionIndex: 2,
    timeLimit: 5
  },
  {
    id: 4,
    text: "「NARUTO」の主人公の名字は？",
    options: ["うずまき", "うちは", "はたけ", "なら"],
    correctOptionIndex: 0,
    timeLimit: 5
  },
  {
    id: 5,
    text: "ポケモンの最初の御三家ではないのは？",
    options: ["ヒトカゲ", "フシギダネ", "ミズゴロウ", "ゼニガメ"],
    correctOptionIndex: 2,
    timeLimit: 5
  },
  {
    id: 6,
    text: "次のうち、実際に存在する駅名はどれ？",
    options: ["竜王", "鬼門", "天国", "地獄"],
    correctOptionIndex: 0,
    timeLimit: 5
  },
  {
    id: 7,
    text: "「君の名は。」の舞台となった糸守町のモデルとなった場所は？",
    options: ["長野県", "岐阜県", "山梨県", "新潟県"],
    correctOptionIndex: 1,
    timeLimit: 5
  },
  {
    id: 8,
    text: "次のうち、実際に日本に存在する都道府県はどれ？",
    options: ["南海道", "山陰県", "四国", "北陸県"],
    correctOptionIndex: 2,
    timeLimit: 5
  },
  {
    id: 9,
    text: "「鬼滅の刃」の主人公の名前は？",
    options: ["竈門炭治郎", "我妻善逸", "嘴平伊之助", "冨岡義勇"],
    correctOptionIndex: 0,
    timeLimit: 5
  },
  {
    id: 10,
    text: "日本で一番高い山は？",
    options: ["北岳", "奥穂高岳", "富士山", "槍ヶ岳"],
    correctOptionIndex: 2,
    timeLimit: 5
  },
  {
    id: 11,
    text: "次のうち、実際に存在する寿司ネタはどれ？",
    options: ["カバ", "キリン", "シマウマ", "トラ"],
    correctOptionIndex: 0,
    timeLimit: 5
  },
  {
    id: 12,
    text: "「ドラゴンボール」の主人公の名前は？",
    options: ["ベジータ", "孫悟空", "フリーザ", "ピッコロ"],
    correctOptionIndex: 1,
    timeLimit: 5
  }
];
