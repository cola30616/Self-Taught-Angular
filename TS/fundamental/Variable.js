// // 可以定義的型別   string number boolean null undefined
// const myName: string = "";
// let yourName: string = ""; // 指定字串類型
// let myName2 = ""; // 這樣也會自動鎖定成字串
// yourName = "good";
// //object
// const account: IAccount = {
//   name: "Luis",
//   balance: 10,
// };
// // array object
// let accounts: IAccount[];
//class
var InvestmentAccount = /** @class */ (function () {
    function InvestmentAccount(name, balance) {
        this.name = name;
        this.balance = balance;
    }
    InvestmentAccount.prototype.withdraw = function () { };
    return InvestmentAccount;
}());
