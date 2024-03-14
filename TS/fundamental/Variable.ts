// // 可以定義的型別   string number boolean null undefined
// const myName: string = "";
// let yourName: string = ""; // 指定字串類型
// let myName2 = ""; // 這樣也會自動鎖定成字串
// yourName = "good";

// // 多種型別互通
// let myName3: string | null = ""; // 可兼容 string 和 null

// // Arrays
// let items: string[] | number[] = ["test", "luis"];

// // 編譯的時候會消失，通常作用在object 上面， function 不能在介面操作實作
interface IAccount {
  name: string;
  balance: number;
  status?: string; // 可以為空值
  deposit?: () => void; // 不 return 任何value
}
// //object
// const account: IAccount = {
//   name: "Luis",
//   balance: 10,
// };

// // array object
// let accounts: IAccount[];

//class
class InvestmentAccount implements IAccount {
  constructor(public name, public balance) {}

  private withdraw() {}
}
