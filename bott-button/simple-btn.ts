const SINGLE='Single'
Component({
  properties: {
    onClick:String,
    text:String,
    type:String,
    model:{type:String,value:SINGLE},
    height:String,
    plain:{type:Boolean,value:false},
    space:{type:String,value:'0rpx'},
  },
  data:{SINGLE},
  methods:{
    onClick(){
      this.triggerEvent('onclick',{})
    }
  }
})
