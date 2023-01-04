import { Orders, PageData } from '../../presenter/test'
const eventBus = getApp().eventBus
import { dataParams } from '../../presenter/api/comment'
import { ALL } from '../../presenter/api/base'
import { BASE_URL, request, TypePostItem } from '../../request/index'
const today = new Date();
const defaultStart = new Date(today.getTime() - 1000 * 3600 * 24).toLocaleDateString()
interface FilterParams {
  status: number
  itemId?: number
  start?: string
  end?: string
  isForce?: boolean
}
Component({
  options: {
    pureDataPattern: /^_/
  },
  properties: {
    status: { type: Number, value: 0 },
    groupId: { type: Number, value: 0 },
    cardname:String,
    heightOffset:{type:String,value:'236rpx'}
  },

  data: {
    finished: false,
    hasInit: false,
    list: [] as any[],
    listheight: '0rpx',
    isRefreshing: false,
    _loading: false,
    _PageIndex: 0
  },

  methods: {
    onRefresh: async function () {
      this.setData({ _PageIndex: 0 });
      await this.reqData(false, false)
    },
    reqData: async function (isLoadMore = false, showLoading = true) {
      if (showLoading) wx.showLoading({ title: '' })
      var pageIndex = this.data._PageIndex;
      pageIndex++
      this.setData({ _PageIndex: pageIndex ,_loading:true});
      this.triggerEvent('load',{isLoadMore , showLoading,pageIndex})
    },
    onResponse(res:{data:any,isLoadMore:boolean, showLoading:boolean}){
        if (res.showLoading) wx.hideLoading() 
        if (!res.data) return this.setData({ finished: true });
        const Orders = res.data;
        const data: any = { list: this.data.list, hasInit: true, _loading: false,isRefreshing: false }
        data.finished = this.data._PageIndex >= Orders.PageCount;
        if (res.isLoadMore) {
          data.list = data.list.concat(Orders.PageData)
        } else {
          data.list = Orders.PageData;
        }
        wx.hideLoading()
        this.triggerEvent('reqfinish',res)
        this.setData(data)
    },
    onLoadMore: async function () {
      if (this.data.finished||this.data._loading) return
      this.reqData(true, false)
    },
    onItemClick(event: any) {
      const item = dataParams(event, 'item')
      this.triggerEvent('onitemclick',item)
    },
    resetBound() {
      const query = this.createSelectorQuery()
      query.select('.tablist').boundingClientRect((res) => {
        if (res.top !== 0) this.setData({ listheight: 'calc(100vh - '+this.data.heightOffset+' - ' + res.top + 'px)' })
      }).exec()
  },
  },
  lifetimes: {
    attached() {
      this.resetBound()
    }
  }
})
