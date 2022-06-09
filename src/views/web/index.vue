<!-- web入口页 -->
<template>

</template>

<script setup name="webEntrance">
  import { ref, reactive } from 'vue'
  import { useStore } from 'vuex'

  const propList = defineProps({
    sourceId: { // 场景类型ID
      type: String
    },
    themeId: { // 动态的主题ID
      type: String
    },
    dynamicLikeCommentState: { // 动态 点赞评论显示
      type: Boolean
    },
    customHTML: { // 动态点赞评论左侧自定义html
      type: String
    }
  })

let commentList = reactive([]) // 评论列表
let topicId = ref('') // topicId
let commentCount = ref(0) // 评论数量
let likeState = ref(false) // 动态 主题点赞状态
let likeCount = ref(0) // 动态 主题点赞数量
let dynamicCommentShow = ref(false) // 动态评论框显示
</script>

<style>

</style>
