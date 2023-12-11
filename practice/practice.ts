type PersonType = Record<"firstName" | "middleName" | "lastName", string | undefined>;

const person1: PersonType = {
  firstName: "takuto",
  middleName: undefined,
  lastName: "yoshimi",
};

const sendPersonFirstName1 = (obj: any) => {
  return obj;
};

console.log(sendPersonFirstName1(person1.firstName));

const sendPersonFirstName2 = (): string | undefined => {
  return person1.firstName;
};

console.log(sendPersonFirstName2());

let obj: {
  readonly types: number;
};
obj = {
  types: 1
};
// obj.types = 2; // 代入できない

let size: { witdh?: number };


const xy: { x: number; y: number } = { x: 1, y: 2 };
let onlyX: { x: number } = { x: 3 }
console.log(onlyX);
onlyX = xy;
console.log(onlyX);

let obje: {
  [key: string]: number;
};
obje = { a: 1, b: 2 };
console.log(obje)
obje.c = 3;
console.log(obje)
obje["d"] = 4
console.log(obje)

const obj2: { [K: string]: number } = { a: 1 };
const b: number | undefined = obj2.b;
console.log(b);

const book = undefined || { title: undefined };
const title = book?.title ?? "デフォルトタイトル";
console.log(title);


type bookObject = {
  id: number,
  title: string,
  summary: string
};
const book1: bookObject = {
  id: 1,
  title: "book1",
  summary: "summary1"
};
for(const [ key, value ] of Object.entries(book1)) {
  console.log(key, value);
};

const arr = [1,2,3];
const backUparr = [...arr]; // コピー
arr.push(4); // 破壊的メソッド（push）上書きされる
console.log(arr);
console.log(backUparr);



type MealPerDay = Record<"breakfast" | "lunch" | "dinner", string>;

const meals: MealPerDay = {
  breakfast: "a vegetable salad",
  lunch: "a cod's meuniere",
  dinner: "a half bottle of wine (white)",
};

const willBeMetabo = (meals: MealPerDay): boolean => {
  const result = meals.breakfast.indexOf("salad"); 
  if(result) {
    console.log("your good body");
    return false
  } else {
    console.log("your bad body");
    return true
  };  
};

const isMeal = (meals: MealPerDay): boolean => {
  meals.breakfast = "beef";
  const breakfast = meals.breakfast.indexOf("1"); 
  const launch = meals.breakfast.indexOf("1"); 
  const dinner = meals.breakfast.indexOf("1"); 
  console.log(breakfast, launch, dinner);
  if (breakfast || launch || dinner) {
    console.log("not food");
    return false; 
  } else {
    console.log("ok");
    return true;
  };
};

const sholdBeCarfull = (meals: MealPerDay): boolean => {
  try {
    isMeal(meals);
    return willBeMetabo(meals);
  } catch (error) {
    console.error(error);
    return false;
  };
};

console.log(sholdBeCarfull(meals));

const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
const keys = [...map.keys()];
console.log(keys);
const keyValue = [...map]; // タプル型になる
console.log(keyValue);
const mapJsonObject = Object.fromEntries(keyValue); 
console.log(JSON.stringify(mapJsonObject));
console.log(map.get("a"));
console.log(map.get("d") ?? 4);
console.log(map)
map.delete("b");
console.log(map);
console.log(map.has("c"));
map.set("e", 5);
console.log(map);

const arr2 = [1,2,3,4,5];
const [one, ...reset] = arr2;
console.log(one);
console.log(reset);
const arr3 = arr2.forEach((value, i) => {
  console.log(value, i);
});
const arr4 = arr2.map((value) => value + value);
console.log(arr4);

const concat = [...arr, ...arr2];
console.log(concat); 

const values: (number | undefined)[] = [1,2,3,4,5,undefined];
const values1: number[] = [1,2,3,4,5];
const sum = (values: (number | undefined)[]): number => {
  let total = 0;
  for(const value of values) {
    if(typeof value === "number") {
      total += value;
    };
  };
  return total;
};
console.log(sum(values));
console.log(sum(values1));


// タプル型
const val: any[] = [1,"2"];
const val2: number[] = [1,2];
const func = (val: number[]): [number, boolean] => {
  if(typeof val[1] === "number") {
    return [val[1], true];
  } else {
    return [val[1], false];
  };
};
const list: [number, boolean] = func(val);
const list2: [number, boolean] = func(val2);
console.log(list, list2);
// console.log(list[0].toExponential(), list[1].valueOf());


// enum
enum stringEnum {
  TOP = "Top",
  MIDDLE = "Middle",
  UNDER = "Under",
};
const topEnum = (): string => {
  console.log("現在のあなたのステータスはTopです");
  return "Topです"
};
const middleEnum = (): string => {
  console.log("現在のあなたのステータスはMiddleです");
  return "Middleです"
};
const downEnum = (): string => {
  console.log("現在のあなたのステータスはDownです");
  return "Downです"
};
const enumFunction = (now: string): string => {
  let result: string;
  if(now === "Top") {
    result = topEnum();
  } else if (now === "Middle") {
    result = middleEnum();
  } else {
    result = downEnum()
  };
  return result;
};
enumFunction(stringEnum.MIDDLE);

// 判別可能なユニオン型
// オブジェクトの型で構成されたユニオン型
// 各オブジェクトの型を判別するためのプロパティ(しるし)を持つ
// このプロパティのことをディスクリミネータ(discriminator)と呼ぶ
// ディスクリミネータの型はリテラル型などであること
// ディスクリミネータさえ有れば、各オブジェクトの型は固有のプロパティを持ってもよい
type Shape = 
 | { type: "circle"; color: string; radius: string }
 | { type: "squre"; color: string, size: string };
type ResultToCss = Record<"background" | "borderRadius", string>;

const toCss = (shape: Shape): ResultToCss => {
  const { type, color } = shape;
  switch(type) {
    case "circle":
      return {
        background: color,
        borderRadius: shape.radius
      };
    case "squre":
     return {
      background: color,
      borderRadius: shape.size
     };
  };
};

const demoDataObject: Shape = {
  type: "circle",
  color: "red",
  radius: "15px",
};
const demoDataObject1: Shape = {
  type: "squre",
  color: "bule",
  size: "20px",
};

console.log(toCss(demoDataObject));
console.log(toCss(demoDataObject1));