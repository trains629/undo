import Undo from "./index"

const undo = new Undo(10)

test('insert 5 items ', () => {
  let count = 5;
  for (let index = 0; index < count; index++) {
    undo.insert(index)
  }
  expect(undo.getValue()).toBe(count -1)
})

test('undo() 2 insert() length to 4', () => {
  let id = 5;
  undo.undo()
  undo.undo()
  undo.insert(id);  
  expect(undo.getLength()).toBe(4)
})

test('insert 7', () => {
  let count = 7;
  let old = undo.getLength()
  for (let index = 0; index < count; index++) {
    undo.insert(index);
  }
  expect(undo.getLength()).toBe(old + count - 1);
  expect(undo.getValue(0)).toBe(1);
  expect(undo.getValue(old)).toBe(1);
})

test('undo() 2 redo() 1', () => {
  expect(undo.canRedo()).toBe(false);
  let value1 =undo.undo();
  undo.undo();
  expect(undo.redo()).toBe(value1);
  expect(undo.canRedo()).toBe(true);
})

test('insert() 1 length to 10', () => {
  undo.undo();
  undo.insert(9);
  expect(undo.getLength()).toBe(9);
})