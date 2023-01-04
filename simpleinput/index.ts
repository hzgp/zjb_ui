// components/simpleinput/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     inputValue:String,
     maxLength:{type:Number,value:200},
     minHeight:{type:String,value:'30vh'}
  },
  data: {   
    length:0
  },
  observers:{
    'inputValue':function(detail){
      this.setData({length:detail.length})
    }
  },
  lifetimes:{
    attached(){
      this.setData({length:this.data.inputValue.length})
    }
  },
  methods:{
    fakeCallback(){}
  }
})
