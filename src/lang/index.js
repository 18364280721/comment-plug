import { createI18n } from 'vue-i18n'
import store from '@/store'
import zhLocale from './zh-CN.json'
import enLocale from './en-US.json'
import twLocale from './zh-TW.json'

export const i18n = createI18n({
  legacy: false, // 让 setup 函数可以通过 t 访问
  globalInjection: true, // 让 template 可以像 vue2 那样使用 $t 来访问
  locale: store.state.moduleComment.plugLanguage || 'zh-CN', // 默认语言为中文
  fallbackLocale: store.state.moduleComment.plugLanguage || 'zh-CN', // 没有其他语言的情况下默认中文
  messages: {
    zh: zhLocale,
    en: enLocale,
    tw: twLocale
  }
})

//导出语言切换使得在其他js文件中也能使用多语言
export function i18nText(val) {
  try {
    const { t } = i18n.global 
    return t(val)  
  } catch (error) {
    console.log(error);
  }
}