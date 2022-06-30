<!-- 评论组件入口 -->
<template>
  <div class="plug_comment_entrance plug_comment_scroll">
    <!-- 根据应用场景不同 选择不同的组件 is 后面不能为字符串 否则加载不出来 -->
    <component
      :is="entranceName"
      v-if="componentShow"
      :source-id="sourceId"
      :dynamic-like-comment-state="dynamicLikeCommentState"
      :custom-h-t-m-l="customHTML"
      :custom-comment-result="customCommentResult"
      :custom-comment-delete-result="customCommentDeleteResult"
      @handleCustom="emit('handleCustom')"
      @getMoreComments="emit('getMoreComments')"
      @handleButton="emit('handleButton')"
      @handleHome="emit('handleHome')"
      @customCommentPopup="customCommentPopup"
      @customCommentDeletePopup="customCommentDeletePopup"
      @customCommentPhotoSeePopup="customCommentPhotoSeePopup"
      @handleHeadPortrait="handleHeadPortrait" />
      <!-- handleCustom app 动态自定义功能按钮 -->
      <!-- getMoreComments 查看更多 -->
      <!-- handleButton app 底部浮动按钮 -->
      <!-- handleHome app星选返回首页 -->
      <!-- customCommentPopup 自定义评论框 -->
      <!-- customCommentDeletePopup 自定义评论删除 -->
      <!-- customCommentPhotoSeePopup 自定义评论图片查看 -->
      <!-- handleHeadPortrait 头像点击跳转 -->
  </div>
</template>

<script setup name="plugCommentEntrance">
import { ref, onMounted, watch, shallowRef } from 'vue'
import { commentStore } from '@/store'
import webEntrance from './web/index.vue'
import h5Entrance from './app/index.vue'

const propList = defineProps({
  // 必传字段***********************************
  applicationScenario: { // 应用场景 web h5
    type: String,
    default: 'web'
  },
  sceneCode: { // 使用场景(0默认 内页详情 1 动态 同事圈)
    type: Number,
    default: 0
  },
  appCode: { // 场景码(article-publish 文章  activity-two-management 活动  innovation-contestant 星选  latest_news 动态)
    type: String,
    default: 'article-publish'
  },
  sourceId: { // 场景类型ID(文章ID 活动ID 选手ID 动态ID)
    type: [String, Number],
    default: '12885' // 6288f6ac19c87d0006a8fc0e
  },
  language: { // 语言环境(默认中文)
    type: String,
    default: 'zh_CN' //
  },
  themeColor: { // 主题色
    type: String,
    default: ''
  },
  tenantToken: { // token值
    type: String,
    default: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJvdUlkXCI6MzU1NDM4LFwicGhvbmVcIjpcIjEzMTIyMDkyMjAxXCIsXCJtb2JpbGVBcmVhY29kZVwiOlwiXCIsXCJ0ZW5hbnRJZFwiOlwiODRkMDkyZDgtOGRlNS00ZDViLThkZjUtNjg2ZmJjNzM1OTliXCIsXCJwZXJzb25JZFwiOlwiNjA3Zjk3YjZkNDg3MWEwMDA3NjJhMjUxXCIsXCJ0ZW5hbnRDb2RlXCI6XCJFY29UZXN0MDAyXCIsXCJsb2NhbGVcIjpcInpoX0NOXCIsXCJ1c2VySWRcIjpcIjYwN2Y5N2I2ZDQ4NzFhMDAwNzYyYTI1MVwiLFwiZW1haWxcIjpcIlpvZS5aZW5nQGNkcGdyb3VwbHRkLmNvbVwiLFwidXNlcm5hbWVcIjpcIkpZMDAyXCJ9IiwiZXhwIjoxNjgwMTMyMDYzLCJhdWQiOiIiLCJhdXRoIjoiUk9MRV9NTVQsUk9MRV9IUixST0xFX0VNUCIsImlzcyI6Imh0dHBzOi8vdGVzdC1zcC5lY29zYWFzLmNvbS9jZHBMb2dvdXQvbG9nb3V0P2p3dD0ke0pXVH0iLCJpYXQiOiIiLCJzaWQiOiJlNzVjMzRiYi02M2MxLTQ1MDgtYWM2MS1mOGZkOGIwMDY3N2EifQ.NKhaCNb6RpwCUMOmkz4rByNdRVgBGakOQuYe2pGh4gQF0RcHngBWK3MesadNu5zWFgbgBa1hF2b4ET4zCwUwjw'
  },
  // 非必传字段 ***********************************
  applicationType: { // 应用类型 android iOS Chrome 飞书等
    type: String,
    default: ''
  },
  sortState: { // 排序是否显示(默认false)
    type: Boolean,
    default: false
  },
  customCommentState: { // 是否启用自定义评论(触发事件默认false)
    type: Boolean,
    default: false
  },
  customCommentResult: { // 启用自定义评论框时评论接口返回内容
    type: Object,
    default: function () {
      return {}
    }
  },
  customCommentDeleteState: { // 是否启用自定义评论删除(触发事件默认false)
    type: Boolean,
    default: false
  },
  customCommentDeleteResult: { // 启用自定义评论删除返回内容
    type: Object,
    default: function () {
      return {}
    }
  },
  customCommentPhotoSeeState: { // 是否启用自定义评论(触发事件默认false)
    type: Boolean,
    default: false
  },
  commentWordMax: { // 评论文字最大数量(默认500)
    type: Number,
    default: 500
  },
  commentPhotoMax: { // 评论图片最大数量(默认9)
    type: Number,
    default: 9
  },
  replyWordMax: { // 回复文字最大数量(默认100)
    type: Number,
    default: 100
  },
  replyPhotoState: { // 回复是否上传图片(默认false)
    type: Boolean,
    default: false
  },
  replyPhotoMax: { // 回复图片最大数量(默认9)
    type: Number,
    default: 9
  },
  webCommentPublish: { // 页面评论框是否显示(默认false)
    type: Boolean,
    default: false
  },
  webFixedBoxState: { // web详情页悬浮框是否显示
    type: Boolean,
    default: false
  },
  webFixedBoxLikeState: { // web详情页悬浮框点赞是否显示
    type: Boolean,
    default: false
  },
  webFixedBoxLikeName: { // web详情页悬浮框点赞按钮名称
    type: String,
    default: '点赞'
  },
  webFixedBoxBottom: { // web详情页悬浮框距离底部距离
    type: [String, Number],
    default: 50
  },
  webFixedBoxRight: { // web详情页悬浮框距离右侧距离
    type: [String, Number],
    default: 50
  },
  dynamicLikeCommentState: { // 动态 点赞评论显示
    type: Boolean,
    default: false
  },
  customHTML: { // 动态点赞评论左侧自定义html
    type: String,
    default: '' // <span style="font-size: 14px; font-family: PingFangSC-Regular, PingFang SC; font-weight: 400; color: #999999; line-height: 14px; cursor: pointer">进入文章详情，<span style="color: #1890FF">去阅读</span></span>
  },
  quickEntrance: { // 快捷入口(0 默认无 1 评论 2 回复)
    type: Number,
    default: 0
  },
  appFixedBoxState: { // app详情页悬浮框是否显示
    type: Boolean,
    default: false
  },
  appFixedBoxLikeState: { // app详情页悬浮框点赞是否显示
    type: Boolean,
    default: false
  },
  buttonType: { // 按钮类型 0 输入框通用 1 按钮通用 2 星选
    type: Number,
    default: 0
  },
  buttonName: { // 按钮名称 字符窜或者html样式
    type: String,
    default: ''
  },
  buttonStyle: { // 按钮样式
    type: Object,
    default: function () {
      return {}
    }
  },
  iOSBottom: { // iOS底部刘海(默认0)
    type: Number,
    default: 0
  }
})

// 组件显示状态初始化
const componentShow = ref(false)

// 动态组件 1.setup语法糖下is后不能跟字符串  可以用shallowRef或者判断直接写不能字符串拼接 2. 不用setup语法糖 跟vue2使用component引入组件is后可以是字符串
const entranceName = shallowRef('')
if (propList.applicationScenario === 'web') {
  entranceName.value = webEntrance
} else {
  entranceName.value = h5Entrance
}

// 多语言格式统一
const langUpper = propList.language.toUpperCase()
let lang = 'zh_CN'
if (langUpper.indexOf('EN') > -1) {
  lang = 'en_US'
} else if (langUpper.indexOf('TW') > -1) {
  lang = 'zh_TW'
}
// 应用类型统一
// 1 PC 2 android 3 iOS 4 H5
let appType = ''
if (propList.applicationType) {
  const typeUp = propList.applicationType.toUpperCase()
  if (typeUp === 'WEB') {
    appType = 1
  } else if (typeUp === 'ANDROID') {
    appType = 2
  } else if (typeUp === 'IOS') {
    appType = 3
  } else {
    appType = 4
  }
}

const comment = commentStore()
comment.$patch({
  plugApplicationScenario: propList.applicationScenario, // 应用场景
  plugSceneCode: propList.sceneCode, // 使用场景
  plugAppCode: propList.appCode, // 场景码
  plugLanguage: lang, // 语言环境
  plugThemeColor: propList.themeColor, // 主题色
  plugTenantToken: propList.tenantToken, // token值
  plugApplicationType: appType, // 应用类型
  plugSortState: propList.sortState, // 排序是否显示
  plugCustomCommentState: propList.customCommentState, // 是否启用自定义评论框
  plugCustomCommentDeleteState: propList.customCommentDeleteState, // 是否启用自定义评论删除
  plugCustomCommentPhotoSeeState: propList.customCommentPhotoSeeState, // 是否启用自定义评论图片查看
  plugCommentWordMax: propList.commentWordMax, // 评论文字最大数量
  plugCommentPhotoMax: propList.commentPhotoMax, // 评论图片最大数量
  plugReplyWordMax: propList.replyWordMax, // 回复文字最大数量
  plugReplyPhotoState: propList.replyPhotoState, // 回复是否上传图片
  plugReplyPhotoMax: propList.replyPhotoMax, // 回复图片最大数量
  plugWebCommentPublish: propList.webCommentPublish, // 页面评论框是否显示
  plugWebFixedBoxState: propList.webFixedBoxState, // web详情页悬浮框是否显示
  plugWebFixedBoxLikeState: propList.webFixedBoxLikeState, // web详情页悬浮框点赞是否显示
  plugWebFixedBoxLikeName: propList.webFixedBoxLikeName, // web详情页悬浮框点赞按钮名称
  plugWebFixedBoxBottom: typeof (propList.webFixedBoxBottom) === 'string' ? propList.webFixedBoxBottom : `${propList.webFixedBoxBottom}px`, // web详情页悬浮框距离底部距离
  plugWebFixedBoxRight: typeof (propList.webFixedBoxRight) === 'string' ? propList.webFixedBoxRight : `${propList.webFixedBoxRight}px`, // web详情页悬浮框距离右侧距离
  plugAppFixedBoxState: propList.quickEntrance, // app详情页悬浮框是否显示
  plugAppFixedBoxLikeState: propList.appFixedBoxState, // app详情页悬浮框点赞是否显示
  plugQuickEntrance: propList.appFixedBoxLikeState, // 快捷入口
  plugButtonType: propList.buttonType, // 按钮类型
  plugButtonName: propList.buttonName, // 按钮名称
  plugButtonStyle: propList.buttonStyle, // 按钮样式
  plugiOSBottom: propList.iOSBottom, // iOS底部刘海
})

// 组件显示
onMounted(() => {
  componentShow.value = true
})

// 监听数据变化
watch(() => ({ ...propList }), (newValue, oldValue) => {
  if (newValue.language !== oldValue.language) {
    // 多语言格式统一
    const langUpper = propList.language.toUpperCase()
    let lang = 'zh_CN'
    if (langUpper.indexOf('EN') > -1) {
      lang = 'en_US'
    } else if (langUpper.indexOf('TW') > -1) {
      lang = 'zh_TW'
    }
    store.commit('PLUG_LANGUAGE', lang)
  }
  if (newValue.themeColor !== oldValue.themeColor) {
    store.commit('PLUG_THEME_COLOR', propList.themeColor)
  }
}, {
  // immediate: true,
  deep: true
})

// 子传父
const emit = defineEmits([
  'handleCustom',
  'getMoreComments',
  'handleButton',
  'handleHome',
  'customCommentPopup',
  'customCommentDeletePopup',
  'customCommentPhotoSeePopup',
  'handleHeadPortrait'
])

// 自定义评论回复
function customCommentPopup (val) {
  emit('customCommentPopup', val)
}
// 自定义评论删除
function customCommentDeletePopup (val) {
  emit('customCommentDeletePopup', val)
}
// 自定义评论图片查看
function customCommentPhotoSeePopup (val) {
  emit('customCommentPhotoSeePopup', val)
}
// 头像点击
function handleHeadPortrait (val) {
  emit('handleHeadPortrait', val)
}
// defineExpose({})  // 向父组件暴露自己的属性
</script>

<style>
.plug_comment_entrance {
  width: 100%;
  height: auto;
  margin: 0 auto;
}
</style>
