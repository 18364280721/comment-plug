<template>
  <comment
  applicationScenario="web"
  :language="language"></comment>
</template>

<script setup>
import { ref } from 'vue'
import comment from './index.vue'

let language = ref('')
console.log(language)
setTimeout(() => {
  language.value = 'zh_TW'
}, 5000)
</script>

<style>

</style>