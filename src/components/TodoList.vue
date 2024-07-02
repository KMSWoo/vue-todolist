<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button type="primary" round>主要按钮</el-button>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    msg: String
  }
}
</script>
