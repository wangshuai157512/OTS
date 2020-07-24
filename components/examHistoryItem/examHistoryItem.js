const app = getApp()
Component({
  properties: {
    options : {
      type:Object,
      observer (value) {
        if(!value.endTime){
          value.endTime=""
        }
         this.setData({
           item:value
         })
      }
    },
    index:{
      type:Number
    }
  },
  data:{
    idFlag:"idFlag",  
    item:{},

  },
  methods:{
    viewScoreHistory:function(event){
      let ind = event.currentTarget.dataset.ind
      if(this.data.idFlag==ind){      
        this.setData({
          idFlag:"idFlag"
        })
      }else{
        this.setData({
          idFlag:ind
        })
      }
    },
    viewScoreDetail:function(event){
      let id = event.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/analysisItem/analysisItem?id='+ id +'',
      })
    }
  }
})