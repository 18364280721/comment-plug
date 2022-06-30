// import { createStore } from 'vuex'
// import moduleComment from './modules/comment'

// export default createStore({
//   data: {},
//   getters: {},
//   mutations: {},
//   actions: {},
//   modules: {
//     moduleComment
//   }
// })


import { defineStore } from 'pinia'

export const commentStore = defineStore('comment', {
  state() {
    return {
      plugApplicationScenario: '', // 应用场景
      plugSceneCode: 0, // 使用场景
      plugAppCode: '', // 场景码
      plugLanguage: '', // 语言环境
      plugThemeColor: '', // 主题色
      plugTenantToken: '', // token值
      plugApplicationType: '', // 应用类型
      plugSortState: false, // 排序是否显示
      plugCustomCommentState: false, // 是否启用自定义评论框
      plugCustomCommentDeleteState: false, // 是否启用自定义评论删除
      plugCustomCommentPhotoSeeState: false, // 是否启用自定义评论图片查看
      plugCommentWordMax: 500, // 评论文字最大数量
      plugCommentPhotoMax: 9, // 评论图片最大数量
      plugReplyWordMax: 100, // 回复文字最大数量
      plugReplyPhotoState: false, // 回复是否上传图片
      plugReplyPhotoMax: 9, // 回复图片最大数量
      plugWebCommentPublish: false, // 页面评论框是否显示
      plugWebFixedBoxState: false, // web详情页悬浮框是否显示
      plugWebFixedBoxLikeState: true, // web详情页悬浮框点赞是否显示
      plugWebFixedBoxLikeName: '', // web详情页悬浮框点赞按钮名称
      plugWebFixedBoxBottom: 50, // web详情页悬浮框距离底部距离
      plugWebFixedBoxRight: 50, // web详情页悬浮框距离右侧距离
      plugAppFixedBoxState: false, // app详情页悬浮框是否显示
      plugAppFixedBoxLikeState: false, // app详情页悬浮框点赞是否显示
      plugQuickEntrance: 0, // 快捷入口
      plugButtonType: 0, // 按钮类型
      plugButtonName: '', // 按钮名称
      plugButtonStyle: {}, // 按钮样式
      plugiOSBottom: 0, // iOS底部刘海
      // 评论数据
      plugTopicId: '', // topicId
      plugReplyCommentId: '', // 回复ID
      plugCommentCount: 0, // 详情 评论总数量
      plugLikeState: false, // 详情 点赞状态
      plugLikeCount: 0 // 详情 点赞数量
    }
  },
  getters: {},
  actions: {}
})