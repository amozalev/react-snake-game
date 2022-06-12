export class SnakeNode {
  m: number;
  n: number;
  next: any;
  prev: any;

  constructor(m: number, n: number, next: any = undefined, prev: any = undefined) {
    this.m = m;
    this.n = n;
    this.next = next;
    this.prev = prev;
  }
}

export class SnakeList {
  head: SnakeNode;
  tail: SnakeNode;
  size: number;

  constructor(i: number, j: number) {
    this.head = new SnakeNode(i, j);
    this.tail = this.head;
    this.size = 1;
  }

  push(i: number, j: number) {
    const newNode = new SnakeNode(i, j, this.size > 1 ? this.head : null);
    this.head.prev = this.size > 1 ? newNode : null;
    this.head = newNode;
    if (this.size === 1)
      this.tail.prev = newNode;
    this.size += 1;

    this.pop();
  }

  pop() {
    if (this.size > 2 && this.tail.prev) {
      const prevNode = this.tail.prev;
      this.tail = prevNode;
      prevNode.next = null;
    }
  }
}