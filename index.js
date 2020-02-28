import _cloneDeep from "lodash/cloneDeep";

const START_YEAR = "2020";

export default class Undo {
  constructor(count = 0){
    this.count = count;
    this.reset();
    this.startDate = new Date(START_YEAR);
  }

  moveLatest(){
    this.point = this.list.length - 1;
  }

  push(data){
    let datetime = (new Date()).valueOf() - this.startDate.valueOf()
    this.list.push({value:_cloneDeep(data),datetime});
    this.moveLatest();
  }

  splice(start,count){
    this.list.splice(start,count);
  }

  insert(data){
    let {count,point,list} = this;
    let len = list.length;
    let newPoint = point + 1;
    if(newPoint < len)this.splice(newPoint,len - newPoint);
    this.push(data);
    len = list.length;
    if(count <= 0 || len <= count)return;
    this.splice(0,Math.abs(len - count));
    this.moveLatest();
  }

  reset(){
    this.list = [];
    this.point = -1;
  }

  undo(){
    return this.canUndo() ? (this.list[--this.point]|| {})["value"] : undefined;
  }

  redo(){
    return this.canRedo() ? (this.list[++this.point]||{})["value"] : undefined;
  }

  checkPoint(point){
    let len = this.list.length;
    if(len <=0)return false;
    if(point < 0 || point >= len)return false;
    return true;
  }

  canMove(newPoint){
    return this.checkPoint(this.point) && this.checkPoint(newPoint);
  }

  canUndo(){
    return this.canMove(this.point - 1);
  }

  canRedo(){
    return this.canMove(this.point + 1);
  }

  getValue(top){
    let {point,list} = this;
    top = typeof top === "number" ? top : point;  
    if(!this.checkPoint(top))return;
    let {value} = list[top] || {};
    return value;
  }

  getLength(){
    return this.list.length;
  }
}