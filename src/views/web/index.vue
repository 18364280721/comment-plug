<!-- web入口页 -->
<template>
  <div class="plug_web_entrance">
    <!-- 动态及动态详情 功能点赞评论 -->
    <FuncLikeComment
      v-if="dynamicLikeCommentState"
      :topicId="topicId"
      :commentCount="commentCount"
      :likeState="likeState"
      :likeCount="likeCount"
      :customHTML="customHTML"
      @handleComment="handleComment"
      @handleLike="handleLike"
      @handleCustom="emit('handleCustom')" />

    <!-- 公共 评论发表 -->
    <div
      ref="webCommentBox"
      v-if="webCommentPublish || dynamicCommentShow"
      :style="{margin: dynamicCommentShow ? '20px 0 0 0': '0'}">
      <CommentPublish
        :topicId="topicId"
        @pushComment="pushComment"></CommentPublish>
    </div>

    <!-- 详情 评论头部及数量 -->
    <CommentTitle
      v-if="sceneCode === 0"
      :dynamicLikeCommentState="dynamicLikeCommentState"
      @getCommentList="getCommentList"></CommentTitle>

    <!-- 公共 评论列表 -->
    <CommentList
      ref="webCommentList"
      :topicId="topicId"
      :sourceId="sourceId"
      :commentCount="commentCount"
      :commentList="commentList"
      @getCommentList="getCommentList"
      @getMoreComments="emit('getMoreComments')"
      @handleCommentCount="handleCommentCount"
      @handleHeadPortrait="handleHeadPortrait"></CommentList>

    <!-- 详情 悬浮评论 -->
    <transition name="footerComment" v-if="webFixedBoxState">
      <SuspendedLikeComment
        :topicId="topicId"
        @handleLike="handleLike"
        @pushComment="pushComment"></SuspendedLikeComment>
    </transition>
  </div>
</template>

<script setup name="webEntrance">
import { ref, reactive, nextTick, onMounted, inject } from 'vue'
import { useStore } from 'vuex'
import comment from '@/api/comment'
import FuncLikeComment from './Common/FuncLikeComment.vue'
import CommentPublish from './Common/CommentPublish.vue'
import CommentTitle from './Details/CommentTitle.vue'
import CommentList from './Common/CommentList.vue'
import SuspendedLikeComment from './Details/SuspendedLikeComment.vue'

const propList = defineProps({
  sourceId: { // 场景类型ID
    type: String
  },
  dynamicLikeCommentState: { // 动态 点赞评论显示
    type: Boolean
  },
  customHTML: { // 动态点赞评论左侧自定义html
    type: String
  }
})

// 数据初始化
let commentList = reactive([]) // 评论列表
let topicId = ref('') // topicId
let commentCount = ref(0) // 评论数量
let likeState = ref(false) // 动态 主题点赞状态
let likeCount = ref(0) // 动态 主题点赞数量
let dynamicCommentShow = ref(false) // 动态评论框显示

// store
const store = useStore()
const sceneCode = store.state.comment.plugSceneCode
const appCode = store.state.comment.plugAppCode
const language = store.state.comment.plugLanguage
const webCommentPublish = store.state.comment.plugWebCommentPublish
const webFixedBoxState = store.state.comment.plugWebFixedBoxState

onMounted(() => {
  getCommentList()
})

//获取上下文实例，ctx=vue2的this
const $bizCode = inject('$bizCode')
// 获取评论列表
function getCommentList (pageNum, sortValue) {
  const params = {
    app_code: appCode,
    source_id: propList.sourceId,
    theme_id: '',
    language: language,
    page: 1,	 
    page_size: 10,
    limit_sub_comment_count: 3, 
    sort_type: 1
  }
  if(pageNum) {
    params.page = pageNum
  }
  if (sortValue) {
    params.sort_type = sortValue
  }
  comment.getCommentList(params).then(res => {
    console.log(res)
    if(res.data.bizCode === $bizCode.success) {
      const resList = res.data.data
      const webCommentList = ref(null)
      if (pageNum > 1) {
        if (resList.comment_list.length > 0) {
          webCommentList.loading = false
          commentList = [...commentList, ...resList.comment_list]
        } else {
          webCommentList.loading = false
          webCommentList.noMore = true
        }
      } else {
        commentList = resList.comment_list // 评论列表
        topicId.value = resList.topic_id
        commentCount.value = +resList.comment_count
        likeState.value = resList.liked
        likeCount.value = +resList.like_count
        if (sceneCode === 0) {
          store.commit('EC_TOPIC_ID', resList.topic_id)
          store.commit('EC_COMMENT_COUNT', +resList.comment_count)
          store.commit('EC_LIKE_COUNT', resList.like_count)
          store.commit('EC_LIKE_STATE', resList.liked)
          nextTick(() => {
            if (webCommentList) {
              webCommentList.noMore = false
            }
          })
        }
      }
      // 底线
      if (resList.comment_list && resList.comment_list.length < 10 && resList.total > 0 && sceneCode === 0) {
        nextTick(() => {
          webCommentList.noMore = true
        })
      }
    }
  })
}
// 发表评论 
function pushComment (e) {
  if (e) {
    dynamicCommentShow.value = false
    commentCount.value++
    if (sceneCode === 0) {
      store.commit('EC_COMMENT_COUNT', +this.commentCount)
    }
    commentList.unshift(e)
  }
}
// 评论数量
function handleCommentCount (val) {
  commentCount.value = val
  if (sceneCode === 0) {
    store.commit('EC_COMMENT_COUNT', +val)
  }
}
// 动态 评论框显示
function handleComment () {
  dynamicCommentShow.value = !dynamicCommentShow.value
}
// 动态 主题点赞及数量
function handleLike (val) {
  likeState.value = !likeState.value
  likeCount.value = val
}

// 头像点击
const emit = defineEmits(['handleCustom', 'getMoreComments', 'handleHeadPortrait'])
function handleHeadPortrait (val) {
  emit('handleHeadPortrait', val)
}
</script>

<style lang="scss">
.plug_web_entrance {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
}
</style>
