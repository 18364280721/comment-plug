import request from '@/api/request'
import store from '../store'

export default {
  /**
   * 获取评论列表
   * language 语言环境(false)
   * app_code 文章 article-publish 活动 activity-two-management 星选选手详情页 innovation-contestant(true)
   * theme_id 主题ID(false)
   * limit_sub_comment_count 默认展示子评论数量(true)
   * page	页码(false) 
   * page_size	每页展示数量(false)
   * sort_type 排序方式 1 时间 2 热度(false)
   * source_id 选手ID或文章ID或活动ID(true)
   */
  getCommentList: (params) => {
    return request({
      url: '/api/ecosaas/portal/moments/comment/list_app',
      method: 'get',
      params: {
        ...params
      }
    })
  },

  /**
   * 获取子评论列表
   * language 语言环境(false)
   * app_code 文章 article-publish 活动 activity-two-management 星选选手详情页 innovation-contestant(true)
   * source_id 选手ID或文章ID或活动ID(true)
   * theme_id 主题ID(false)
   * comment_id 评论ID(true)
   * page 页码(true)
   * page_size 每页数量(true)
   */
  getSubCommentList: (params) => {
    return request({
      url: '/api/ecosaas/portal/moments/sub_comment/list_app',
      method: 'get',
      params: {
        ...params
      }
    })
  },

  /**
   * 评论点赞(同事圈评论)
   * comment_id 评论ID(true)
   */
  commentLike: (id) => {
    return request({
      url: `/api/ecosaas/portal/moments/comment/like?comment_id=${id}`,
      method: 'post'
    })
  },

  /**
   * 取消评论点赞(同事圈评论)
   * comment_id 评论ID(true)
   */
   commentUnlike: (id) => {
    return request({
      url: `/api/ecosaas/portal/moments/comment/unlike?comment_id=${id}`,
      method: 'post'
    })
  },

  /**
   * 创建评论(同事圈评论)
   * topic_id 动态ID(true)
   * comment_id 评论ID(false)
   * content 评论内容
   */
  pushComment: (params) => {
    return request({
      url: '/api/ecosaas/portal/moments/comment',
      method: 'post',
      data: {
        ...params
      }
    })
  },

  /**
   * 删除评论(同事圈评论)
   * id 评论ID(true)
   */
  deleteCommont: (id) => {
    return request({
      url: `/api/ecosaas/portal/moments/comment/${id}`,
      method: 'DELETE'
    })
  },

   /**
   * 点赞当前应用
   * topic_id 评论主题ID
   */
  pushApplyLike: (params) => {
    return request({
      url: `api/ecosaas/portal/moments/topic/like?topic_id=${params}`,
      method: 'post'
    })
  },

  /**
   * 取消点赞当前应用
   * topic_id 评论主题ID
   */
   pushApplyUnlike: (params) => {
    return request({
      url: `api/ecosaas/portal/moments/topic/unlike?topic_id=${params}`,
      method: 'post'
    })
  }
}