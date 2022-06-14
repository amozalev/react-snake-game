export class SnakeNode {
  coordY: number;
  coordX: number;
  next: SnakeNode | null;
  prev: SnakeNode | null;

  constructor(coordY: number, coordX: number, next: SnakeNode | null = null, prev: SnakeNode | null = null) {
    this.coordY = coordY;
    this.coordX = coordX;
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

  isCellInSnake(coordY: number, coordX: number): boolean {
    let curNode: SnakeNode | null = this.head;
    while (curNode) {
      if (curNode.coordY === coordY && curNode.coordX === coordX)
        return true;
      curNode = curNode.next;
    }
    return false;
  }
}