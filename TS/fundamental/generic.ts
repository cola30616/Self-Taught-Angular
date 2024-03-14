// 在class 前使用 泛型<T>
class Queue<T> {
  private data: T[] = [];

  add(item: T) {
    // 給需要的方法加上T ，以便物件實體化時，參照泛型的T
    this.data.push(item);
  }

  remove() {
    this.data.shift();
  }
}

const nameQueue1 = new Queue<string>(); // <指定型別>
nameQueue1.add("Luis");
nameQueue1.add("Good");

const nameQueue2 = new Queue<number>();
nameQueue2.add(3);
nameQueue2.add(5);
