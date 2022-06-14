<template>
  <!-- 评论公共 评论框架 评论列表 -->
  <div class="plug_web_commentList">
    <ul class="commentList_ul" v-if="commentList.length > 0" ref="commentBox">
      <template v-for="(item, index) in commentList">
        <li class="commentList_li" :key="index" v-if="(sceneCode.value === 1 && index < 3) || sceneCode.value === 0">
          <CommentItem
            :topicId="porpsList.topicId"
            :sourceId="porpsList.sourceId"
            :commentCount="porpsList.commentCount"
            :comment="item"
            :commontIndex="index"
            @delComment="delComment"
            @handleCommentCount="handleCommentCount"
            @handleHeadPortrait="handleHeadPortrait"></CommentItem>
        </li>
      </template>
    </ul>
    <!-- 详情 暂无评论与加载状态 -->
    <template v-if="sceneCode.value === 0">
      <!-- 暂无评论 -->
      <div v-if="commentList.length === 0" class="commentList_no">
        <!-- <img :src="`${getServer('APPCDN')}app-h5/static/ccchat/comment/no.png`" /> -->
        <p>{{$t('comment.noReview')}}</p>
      </div>
      <!-- 加载状态 -->
      <p class="commentList_state" v-if="loading"><i class="el-icon-loading"></i>{{$t('comment.commontLoading')}}...</p>
      <p class="commentList_state" v-if="noMore">{{$t('comment.baseline')}}～</p>
    </template>
    <!-- 动态 评论超过3条时显示查看所有评论 -->
    <p class="commentList_all" v-if="sceneCode.value === 1 && commentList.length > 3">
      {{$t('comment.commentShare', {num: porpsList.commentCount})}}，
      <span :style="{color: themeColor}" @click="emit('getMoreComments')">
        {{$t('comment.commentSeeAll')}}
      </span>
    </p>
    <!-- 删除评论 -->
    <DeleteComment
      ref="deleteAlert"
      :alertParam="alertParam"
      @determineAlert="determineAlert"></DeleteComment>
  </div>
</template>

<script setup name="CommentList">
import { ref, reactive, computed, onMounted, onUnmounted} from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import CommentItem from './CommentItem.vue' // 主评论
import DeleteComment from './DeleteComment.vue' // 评论删除

const porpsList = defineProps({
  topicId: { // topicId
    type: String
  },
  sourceId: { // 场景类型ID
    type: String
  },
  commentCount: { // 评论数量
    type: Number
  },
  commentList: { // 评论列表
    type: Array
  }
})
const emit = defineEmits(['getMoreComments', 'getCommentList', 'handleCommentCount', 'handleHeadPortrait'])

// 初始化
let commentChidLength = ref(0) // 回复数量
let loading = ref(false) // 加载状态
let noMore = ref(false) // 底线
let pageNum = ref(1) // 页码
let alertParam = reactive({}) // 删除信息

// DOM加载完
onMounted(() => {
  // 滚动监听添加
  if (sceneCode.value === 0) {
    window.addEventListener('scroll',handleScroll, true)
  }
})
// DOM 销毁完
onUnmounted(() => {
  // 销毁滚动监听
  if (sceneCode.value === 0) {
    window.removeEventListener('scroll', handleScroll, true)
  }
})

// 计算属性
const store = useStore()
const sceneCode = computed(() => {
  return store.state.moduleComment.plugSceneCode
})
const themeColor = computed(() => {
  return store.state.moduleComment.plugThemeColor
})

// 监听页面滚动
function handleScroll(e) {
  const commentBox = ref(null)
  if (commentBox) {
    const scrollNum = commentBox.getBoundingClientRect()
    const boxHeight = document.querySelector('.ec_comment_scroll').clientHeight
    if (boxHeight - scrollNum.top + 128 >= scrollNum.height) {
      if (!loading.value && !noMore.value && commentList.length >= 10) {
        loading.value = true
        setTimeout(() => {
          pageNum.value++
          emit('getCommentList', pageNum.value)
        },2000)
      }
    }
  }
}

// 删除评论
const { t } = useI18n()
const deleteAlert = ref(null)
function delComment(e) {
  delCommontIndex.value = e
  commentChidLength.value = commentList[e].comment_count || 0
  alertParam = {
    text: commentChidLength.value > 0 ? t('comment.commentTextDelA') : t('comment.commentTextDel'),
    subState: commentChidLength.value > 0,
    id: commentList[e].id
  }
  deleteAlert.deleteDialogVisible = true 
}

// 确认删除
function determineAlert() {
  this.commentList.splice(delCommontIndex.value, 1)
  emit('handleCommentCount', +commentCount.value - commentChidLength.value - 1)
  deleteAlert.clickState = true
  deleteAlert.deleteDialogVisible = false
}
// 评论数量
function handleCommentCount(e) {
  emit('handleCommentCount', e)
}
// 头像点击
function handleHeadPortrait(val) {
  emit('handleHeadPortrait', val)
}

// 向父组件暴露属性
defineExpose({
  noMore
})
</script>

<style lang="scss">
.plug_web_commentList {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  .commentList_ul {
    width: 100%;
    height: auto;
    margin: 25px 0 0 0;
    padding: 0;
    list-style: none;
    .commentList_li {
      width: 100%;
      height: auto;
      margin: 0 0 16px 0;
      padding: 0;
    }
  }
  .commentList_no {
    width: 100%;
    height: auto;
    margin: 40px 0;
    text-align: center;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      width: 100%;
      margin: 0;
      padding: 0;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC!important;
      font-weight: 400;
      color: #666666;
      line-height: 20px;
      text-align: center;
    }
  }
  .commentList_state {
    font-size: 14px;
    font-weight: 400;
    color: #999999;
    line-height: 14px;
    text-align: center;
    margin: 20px 0;
  }
  .commentList_all {
    width: 100%;
    margin: 15px 0 0 0;
    padding: 0;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 16px;
    span {
      cursor: pointer;
    }
  }
}
</style>