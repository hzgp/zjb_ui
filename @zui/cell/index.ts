// components/cell/index.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    icon:String,
    value:String,
    lableWidth:Number,
    labelClass:String,
    valueClass:String,
    iconcolor:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
     onIconClick(){
        this.triggerEvent('icontap',{},{})
     }
  }
})
