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


// Required<T>必須
type Mandatory = Required<{
  id: string;
  active: boolean;
  balance: number;
  surname: string;
  givenName: string;
  email: string;
}>;
// Partial<T> オプショナル
type Optional = Partial<{
  index: number;
  photo: string;
  age: number;
  company: string;
  phoneNumber: string;
  address: string;
}>;
// インターセクション型で合成（インターセクション型とは「両方の型」、ユニオン型は「どっちかの型」）
type Parameter = Mandatory & Optional;
const parameter: Parameter = {
  id: "1",
  active: true,
  balance: 1,
  surname: "summary",
  givenName: "name",
  email: "example"
};


// すべてのプロパティにreadonlyを適用する方法「as const」
type Country = {
  readonly countryName: string;
  readonly areaName: string;
};
type ReadOnlyObjectType = {
  readonly name: string;
  no: number;
  genre: string;
  height: number;
  readonly country: Country;
};
const readOnlyObjectData: ReadOnlyObjectType = {
  name: "pikachu",
  no: 25,
  genre: "mouse pokemon",
  height: 0.4,
  country: {
    countryName: "japan",
    areaName: "asia",
  },
};
// readOnlyObjectData.name = "pikachumause";
// readOnlyObjectData.country.countryName = "mexico";


// swith文の網羅性チェック
type Extension = "js" | "ts" | "json";
const printLang = (ext: Extension): void => {
  switch(ext) {
    case "js": {
      console.log("javascript");
      break;
    }
    case "ts": {
      console.log("typescript");
      break;
    }
    case "json": { // ここをコメントアウト後、defaultをコメントアウト解除
      console.log("object type is json");
      break;
    }
    // default: { // 網羅性のチェック(ユニオン型のタイプをswith分ですべてチェックしていないとエラーが発生する)
    //   const exhaustivenessCheck: never = ext;
    //   break;
    // }
  };
};
// swith文の網羅性チェック(例外による) こっちの方がわかりやすい！
type Extension1 = "js" | "ts" | "json";
class ExhaustivenessCheck extends Error {
  constructor(value: never, message: string = `Unsupported type: ${value}`) {
    super(value);
  };
};
const printLang1 = (ext: Extension): void => {
  switch(ext) {
    case "js": {
      console.log("javascript");
      break;
    }
    case "ts": {
      console.log("typescript");
      break;
    }
    case "json": { // 試すにはここをコメントアウト
      console.log("object type is json");
      break;
    }
    default: { // 網羅性のチェック(ユニオン型のタイプをswitch分ですべてチェックしていないとエラーが発生する)
      throw new ExhaustivenessCheck(ext);
    }
  };
};


// unknown型を配列型に絞り込む
const numberArrayValue: number[] = [1,2,3,4,5];
const isNumberArray = (value: unknown): value is number[] => {
  if(!Array.isArray(value)) {
    return false;
  };
  return value.every((e) => typeof e === "number");
};
console.log(isNumberArray(numberArrayValue)); // true


// unknown型をオブジェクト型に絞り込む
type Email = Record<"from" | "to" | "title" | "subjest", string>;
const emailValue: Email = {
  from: "from",
  to: "to",
  title: "title",
  subjest: "subjest",
};
const isEmail = (value: unknown): value is Email => {
  if(typeof value !== "object" || value === null) {
    return false;
  };

  // valueの値をあらかじめEmailタイプに指定することでオブジェクトのプロパティの型もチェックすることができる
  const email = value as Record<keyof Email, string>;

  if (typeof email.from !== "string") {
    return false;
  }
  if (typeof email.to !== "string") {
    return false;
  }
  if (typeof email.title !== "string") {
    return false;
  }
  return typeof email.subjest === "string";
};
console.log(isEmail(emailValue)); // true


// 関数の型宣言
type NuMFunc = (num: number) => number;
const numFunc: NuMFunc = (num: number): number => {
  return num + 1;
};
console.log(numFunc(1));


// 関数をany型にしてあげれば関数はオブジェクトのためプロパティの付与ができる
const propFun = (): any => {
  return "Hello Propety with Function"
};
propFun.prop123 = 123;
console.log(propFun());
console.log(propFun.prop123);


const helloFunc = (person?: string): string => {
  person ??= "anonymous"; // Null合体代入演算子??=でデフォルト値を代入する
  return `Hello ${person.toUpperCase()}`;
};
console.log(helloFunc("human"));
console.log(helloFunc()); // ?をつけると入れなくても良い引数の値になる

const defaultHelloFunc = (person: string = "anonymous"): string => {
  return `Hello ${person.toUpperCase()}`;
};
console.log(defaultHelloFunc());


// 可変長引数→残余引数
const scores: number[] = [1,2,3,4,5,6,7,8,9,10];
const longParameterFunc = (...scores: number[]): number => {
  const result: number = scores.reduce((prevTotal, num) => {
    return prevTotal + num;
  }, 0);
  return result;
};
console.log(`Num Total: ${longParameterFunc(1,2,3,4,5,6,7,8,9,10)}`);
console.log(`Num Total: ${longParameterFunc(...scores)}`);


// 分割代入引数（配列）
const arrFun5 = ([num1, num2]: number[]): void => {
  console.log(num1 + num2);
};
arrFun5([1,2]);

// 分割代入引数（オブジェクト）
const objFun5 = ({ weight, height }: { weight: number, height: number }): void => {
  console.log({weight, height});
};
const weight = 60;
const height = 170;
objFun5({weight: weight, height: height});
objFun5({weight, height}); // 引数名と同じ変数が定義済みであればプロパティ名を省略することも可能

// 分割代入引数（デフォルト値）
const arrFun6 = ([num1 = 1, num2 = 2]: number[]): void => {
  console.log([num1 + num2]);
};
arrFun6([]);

const objFun6 = ({ weight = 60, height = 170 }: { weight?: number, height?: number }): void => {
  console.log({weight, height});
};
objFun6({}); // 型注釈のプロパティを?でオブションにしてあげる必要がある
// 引数全体が無い、またはundefinedの問いに既定値を採用する（ = の部分）
const objFun7 = ({ weight, height }: { weight?: number, height?: number } = { weight: 60, height: 170 }): void => {
  console.log({weight, height});
};
objFun7(); // {"weight": 60,"height": 170} 
objFun7({}); // {"weight": undefined,"height": undefined} 
objFun7({ weight: 70, height: 180 });


// キーワード引数(引数が複数存在する場合は有効な手段)
// 理由は将来的に引数が追加され引数の順序を正したい時に位置引数だと可用性が損なわれるため
type SortAddFuncType = Record<"country" | "city" | "ageMin" | "ageMax" | "order" | "sort", string | number>;
type SortAddFuncOptionalType = Partial<Record<"country" | "city" | "ageMin" | "ageMax" | "order" | "sort", string | number>>;
const sortAddFunc = ({country, city, ageMin, ageMax, order, sort}: SortAddFuncType): void => {
  console.log(country, city, ageMin, ageMax, order, sort);
};
// sortAddFunc("JP", "Tokyo", 20, 50, "id", "asc"); // （キーワード引数を使用しないで呼び出し元の引数に値を入れてしまった悪い例）
sortAddFunc({ // 良い例
  country: "JP",
  city: "Tokyo",
  ageMin: 10,
  ageMax: 20,
  order: "id",
  sort: "asc",
});
// キーワード引数自体をオプショナルにする
const sortAddFuncOptional = ({country = "JP", city = "Tokyo", ageMin = 10, ageMax = 20, order = "id", sort = "asc"}: SortAddFuncOptionalType): void => {
  console.log(country, city, ageMin, ageMax, order, sort);
};
sortAddFuncOptional({});
sortAddFuncOptional({ ageMax: 50 });


// 通常のstaticを考慮しないクラス
class DefaultClass {
  field: number;

  constructor(field: number) {
    this.field = field;
  };

  staticFieldaOutPut = (): void => {
    console.log(this.field);
  };
};
const defaultClass: DefaultClass = new DefaultClass(124);
defaultClass.staticFieldaOutPut()
//　インスタンスを作成しなくても実行できるようにする（staticキーワード）
// そのためconstructorも不要となる（初期値を入れたい場合以外は）
class StaticClass {
  static field: number = 123;

  static staticOutPut = (): void => {
    console.log(StaticClass.field)
  };
};
StaticClass.staticOutPut();


// 直接インスタンスを作れないクラス（継承されることを前提としたクラス）
abstract class AbstractClass {
  protected abstract id: number;
  protected abstract name: string;
  abstractOutPut = (): void => {
    console.log(this.id, this.name);
  };
};
// 子クラスで親クラスの内容を再定義してメソッドを実行させる
class AbstractChildrenClass extends AbstractClass {
  protected id = 1;
  protected name = "yocchan";
};
const child: AbstractChildrenClass = new AbstractChildrenClass();
child.abstractOutPut();

// シングルトン
interface IUser {
  dispInfo: () => void;
};

class SingleTon implements IUser {
  private static _instance: SingleTon;
  private constructor() {}

  public static get instance(): SingleTon {
    if(!this._instance) {
      console.log("新しくインスタンス作成")
      this._instance = new SingleTon();
    }

    console.log("すでにインスタンスが存在")
    return this._instance;
  }

  dispInfo = () => {
    console.log("Instance is SingleTon");
  }
};

const instance1 = SingleTon.instance;
const instance2 = SingleTon.instance;
const result = instance1.dispInfo();

// お試しコミット用