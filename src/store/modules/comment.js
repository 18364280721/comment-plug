const comment = {
  data: {
    // 组件参数
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
  },
  mutations: {
    /**
     * 组件参数
     */
    // 应用场景
    PLUG_APPLICATION_SCENARIO (state, value) {
      state.plugApplicationScenario = value
    },
    // 使用场景
    PLUG_SCENE_CODE (state, value) {
      state.plugSceneCode = value
    },
    // 场景码
    PLUG_APP_CODE (state, value) {
      state.plugAppCode = value
    },
    // 语言环境
    PLUG_LANGUAGE (state, value) {
      state.plugLanguage = value
    },
    // 主题色
    PLUG_THEME_COLOR (state, value) {
      state.plugThemeColor = value
    },
    // token值
    PLUG_TENANT_TOKEN (state, value) {
      state.plugTenantToken = value
    },
    // 应用类型
    PLUG_APPLICATION_TYPE (state, value) {
      state.plugApplicationType = value
    },
    // 排序是否显示
    PLUG_SORT_STATE (state, value) {
      state.plugSortState = value
    },
    // 是否启用自定义评论框
    PLUG_CUSTOM_COMMENT_STATE (state, value) {
      state.plugCustomCommentState = value
    },
    // 是否启用自定义评论删除
    PLUG_CUSTOM_COMMENT_DELETE_STATE (state, value) {
      state.plugCustomCommentDeleteState = value
    },
    // 是否启用自定义评论图片查看
    PLUG_CUSTOM_COMMENT_PHOTO_SEE_STATE (state, value) {
      state.plugCustomCommentPhotoSeeState = value
    },
    // 评论文字最大数量
    PLUG_COMMENT_WORD_MAX (state, value) {
      state.plugCommentWordMax = value
    },
    // 评论图片最大数量
    PLUG_COMMENT_PHOTO_MAX (state, value) {
      state.plugCommentPhotoMax = value
    },
    // 回复文字最大数量
    PLUG_REPLY_WORD_MAX (state, value) {
      state.plugReplyWordMax = value
    },
    // 回复是否上传图片
    PLUG_REPLY_PHOTO_STATE (state, value) {
      state.plugReplyPhotoState = value
    },
    // 回复图片最大数量
    PLUG_REPLY_PHOTO_MAX (state, value) {
      state.plugReplyPhotoMax = value
    },
    // 页面评论框是否显示
    PLUG_WEB_COMMENT_PUBLISH (state, value) {
      state.plugWebCommentPublish = value
    },
    // web详情页悬浮框是否显示
    PLUG_WEB_FIXED_BOX_STATE (state, value) {
      state.plugWebFixedBoxState = value
    },
    // web详情页悬浮框点赞是否显示
    PLUG_WEB_FIXED_BOX_LIKE_STATE (state, value) {
      state.plugWebFixedBoxLikeState = value
    },
    // web详情页悬浮框点赞按钮名称
    PLUG_WEB_FIXED_BOX_LIKE_NAME (state, value) {
      state.plugWebFixedBoxLikeName = value
    },
    // web详情页悬浮框距离底部距离
    PLUG_WEB_FIXED_BOX_BOTTOM (state, value) {
      state.plugWebFixedBoxBottom = value
    },
    // web详情页悬浮框距离右侧距离
    PLUG_WEB_FIXED_BOX_RIGHT (state, value) {
      state.plugWebFixedBoxRight = value
    },
    // app详情页悬浮框是否显示
    PLUG_APP_FIXED_BOX_STATE (state, value) {
      state.plugAppFixedBoxState = value
    },
    // app详情页悬浮框点赞是否显示
    PLUG_APP_FIXED_BOX_LIKE_STATE (state, value) {
      state.plugAppFixedBoxLikeState = value
    },
    // 快捷入口
    PLUG_QUICK_ENTRANCE (state, value) {
      state.plugQuickEntrance = value
    },
    // 按钮类型
    PLUG_BUTTON_TYPE (state, value) {
      state.plugButtonType = value
    },
    // 按钮名称
    PLUG_BUTTON_NAME (state, value) {
      state.plugButtonName = value
    },
    // 按钮样式
    PLUG_BUTTON_STYLE (state, value) {
      state.plugButtonStyle = value
    },
    // iOS底部刘海
    PLUG_IOS_BOTTOM (state, value) {
      state.plugiOSBottom = value
    },

    /**
     * 评论数据
     */
    // TopicId
    PLUG_TOPIC_ID (state, value) {
      state.plugTopicId = value
    },
    // 回复ID
    PLUG_REPLY_COMMENT_ID (state, value) {
      state.plugReplyCommentId = value
    },
    // 详情 评论数量
    PLUG_COMMENT_COUNT: (state, value) => {
      state.plugCommentCount = value
    },
    // 详情 点赞数量
    PLUG_LIKE_COUNT: (state, value) => {
      state.plugLikeCount = value
    },
    // 详情 点赞状态
    PLUG_LIKE_STATE: (state, value) => {
      state.plugLikeState = value
    }
  },
  actions: {}
}

export default comment
