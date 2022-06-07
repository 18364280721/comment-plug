const comment = {
  data: {
    // 组件参数
    ecApplicationScenario: '', // 应用场景
    ecSceneCode: 0, // 使用场景
    ecAppCode: '', // 场景码
    ecLanguage: '', // 语言环境
    ecThemeColor: '', // 主题色
    ecTenantToken: '', // token值
    ecApplicationType: '', // 应用类型
    ecSortState: false, // 排序是否显示
    ecCustomCommentState: false, // 是否启用自定义评论框
    ecCustomCommentDeleteState: false, // 是否启用自定义评论删除
    ecCustomCommentPhotoSeeState: false, // 是否启用自定义评论图片查看
    ecCommentWordMax: 500, // 评论文字最大数量
    ecCommentPhotoMax: 9, // 评论图片最大数量
    ecReplyWordMax: 100, // 回复文字最大数量
    ecReplyPhotoState: false, // 回复是否上传图片
    ecReplyPhotoMax: 9, // 回复图片最大数量
    ecWebCommentPublish: false, // 页面评论框是否显示
    ecWebFixedBoxState: false, // web详情页悬浮框是否显示
    ecWebFixedBoxLikeState: true, // web详情页悬浮框点赞是否显示
    ecWebFixedBoxLikeName: '', // web详情页悬浮框点赞按钮名称
    ecWebFixedBoxBottom: 50, // web详情页悬浮框距离底部距离
    ecWebFixedBoxRight: 50, // web详情页悬浮框距离右侧距离
    ecAppFixedBoxState: false, // app详情页悬浮框是否显示
    ecAppFixedBoxLikeState: false, // app详情页悬浮框点赞是否显示
    ecQuickEntrance: 0, // 快捷入口
    ecButtonType: 0, // 按钮类型
    ecButtonName: '', // 按钮名称
    ecButtonStyle: {}, // 按钮样式
    eciOSBottom: 0, // iOS底部刘海
    // 评论数据
    ecTopicId: '', // topicId
    ecReplyCommentId: '', // 回复ID
    ecCommentCount: 0, // 详情 评论总数量
    ecLikeState: false, // 详情 点赞状态
    ecLikeCount: 0 // 详情 点赞数量
  },
  mutations: {
    /**
     * 组件参数
     */
    // 应用场景
    EC_APPLICATION_SCENARIO(state, value) {
      state.ecApplicationScenario = value
    },
    // 使用场景
    EC_SCENE_CODE(state, value) {
      state.ecSceneCode = value
    },
    // 场景码
    EC_APP_CODE(state, value) {
      state.ecAppCode = value
    },
    // 语言环境
    EC_LANGUAGE(state, value) {
      state.ecLanguage = value
    },
    // 主题色
    EC_THEME_COLOR(state, value) {
      state.ecThemeColor = value
    },
    // token值
    EC_TENANT_TOKEN(state, value) {
      state.ecTenantToken = value
    },
    // 应用类型
    EC_APPLICATION_TYPE(state, value) {
      state.ecApplicationType = value
    },
    // 排序是否显示
    EC_SORT_STATE(state, value) {
      state.ecSortState = value
    },
    // 是否启用自定义评论框
    EC_CUSTOM_COMMENT_STATE(state, value) {
      state.ecCustomCommentState = value
    },
    // 是否启用自定义评论删除
    EC_CUSTOM_COMMENT_DELETE_STATE(state, value) {
      state.ecCustomCommentDeleteState = value
    },
    // 是否启用自定义评论图片查看
    EC_CUSTOM_COMMENT_PHOTO_SEE_STATE(state, value) {
      state.ecCustomCommentPhotoSeeState = value
    },
    // 评论文字最大数量
    EC_COMMENT_WORD_MAX(state, value) {
      state.ecCommentWordMax = value
    },
    // 评论图片最大数量
    EC_COMMENT_PHOTO_MAX(state, value) {
      state.ecCommentPhotoMax = value
    },
    // 回复文字最大数量
    EC_REPLY_WORD_MAX(state, value) {
      state.ecReplyWordMax = value
    },
    // 回复是否上传图片
    EC_REPLY_PHOTO_STATE(state, value) {
      state.ecReplyPhotoState = value
    },
    // 回复图片最大数量
    EC_REPLY_PHOTO_MAX(state, value) {
      state.ecReplyPhotoMax = value
    },
    // 页面评论框是否显示
    EC_WEB_COMMENT_PUBLISH(state, value) {
      state.ecWebCommentPublish = value
    },
    // web详情页悬浮框是否显示
    EC_WEB_FIXED_BOX_STATE(state, value) {
      state.ecWebFixedBoxState = value
    },
    // web详情页悬浮框点赞是否显示
    EC_WEB_FIXED_BOX_LIKE_STATE(state, value) {
      state.ecWebFixedBoxLikeState = value
    },
    // web详情页悬浮框点赞按钮名称
    EC_WEB_FIXED_BOX_LIKE_NAME(state, value) {
      state.ecWebFixedBoxLikeName = value
    },
    // web详情页悬浮框距离底部距离
    EC_WEB_FIXED_BOX_BOTTOM(state, value) {
      state.ecWebFixedBoxBottom = value
    },
    // web详情页悬浮框距离右侧距离
    EC_WEB_FIXED_BOX_RIGHT(state, value) {
      state.ecWebFixedBoxRight = value
    },
    // app详情页悬浮框是否显示
    EC_APP_FIXED_BOX_STATE(state, value) {
      state.ecAppFixedBoxState = value
    },
    // app详情页悬浮框点赞是否显示
    EC_APP_FIXED_BOX_LIKE_STATE(state, value) {
      state.ecAppFixedBoxLikeState = value
    },
    // 快捷入口
    EC_QUICK_ENTRANCE(state, value) {
      state.ecQuickEntrance = value
    },
    // 按钮类型
    EC_BUTTON_TYPE(state, value) {
      state.ecButtonType = value
    },
    // 按钮名称
    EC_BUTTON_NAME(state, value) {
      state.ecButtonName = value
    },
    // 按钮样式
    EC_BUTTON_STYLE(state, value) {
      state.ecButtonStyle = value
    },
    // iOS底部刘海
    EC_IOS_BOTTOM(state, value) {
      state.eciOSBottom = value
    },
    
    /**
     * 评论数据
     */
    // TopicId
    EC_TOPIC_ID(state, value) {
      state.ecTopicId = value
    },
    // 回复ID
    EC_REPLY_COMMENT_ID(state, value) {
      state.ecReplyCommentId = value
    },
    // 详情 评论数量
    EC_COMMENT_COUNT: (state, value) => {
      state.ecCommentCount = value
    },
    // 详情 点赞数量
    EC_LIKE_COUNT: (state, value) => {
      state.ecLikeCount = value
    },
    // 详情 点赞状态
    EC_LIKE_STATE: (state, value) => {
      state.ecLikeState = value
    }
  },
  actions: {}
}

export default comment