# React snake game

![Image alt](https://github.com/amozalev/react-snake-game/raw/master/public/game.jpg)

## Implementation notes:
1. Doubly linked list stores snake coordinates.
   1. Pros: doubly linked list easily implements "sliding window" pattern (pop last element and push new one) and takes O(1) time.
   2. Cons: Searching of crossing a snake with itself or with game borders runs with order O(n).
2. Circular array loop is implemented in the "easy" game mode.