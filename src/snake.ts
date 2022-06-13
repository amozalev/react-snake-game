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

  constructor(coordY: number, coordX: number) {
    this.head = new SnakeNode(coordY, coordX);
    this.tail = this.head;
    this.size = 1;
  }

  move(coordY: number, coordX: number, addNewNode: boolean = false): SnakeNode | undefined {
    const newNode = new SnakeNode(coordY, coordX, this.size > 1 ? this.head : null);
    this.head.prev = this.size > 1 ? newNode : null;
    this.head = newNode;
    if (this.size === 1)
      this.tail.prev = newNode;
    if (addNewNode)
      this.size += 1;

    return addNewNode ? undefined : this.pop();
  }

  pop() {
    if (this.tail.prev) {
      const oldTail = this.tail;
      const prevNode = this.tail.prev;
      this.tail = prevNode;
      prevNode.next = null;
      return oldTail;
    }
  }
}