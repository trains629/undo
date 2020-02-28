# undo

最近要在表单设计器上增加撤销和回退功能。主要是为了方便用户在错误拖放组件的时候，可以重新处理设计。表单设计器的撤销回退功是依靠切换不同时刻的设计数据来实现，这些数据是按先后顺序存放在一个数据组中，通过命令函数控制一个指针，随指针的移动切换到不同的时间，以此来实现撤销回退功能。整个功能比较独立，为了方便复用将这些功能封装在一个独立组件中。

整个组件以一个独立类形式存在，提供以下几个功能：

1. insert 插入新数据
2. undo 回退操作，返回前一次插入的数据
3. redo 取消回退操作


