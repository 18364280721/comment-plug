<template>
  <comment
    application-scenario="web"
    :language="language" />
</template>

<script setup name="demo">
import { ref } from 'vue'
import comment from './index.vue'

const language = ref('')
setTimeout(() => {
  language.value = 'zh_TW'
}, 5000)
</script>

<style>

</style>
