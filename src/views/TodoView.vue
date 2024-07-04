<template>
  <div class="about">
    <TodoListVue></TodoListVue>
  </div>
</template>
<script>
import TodoListVue from '../components/TodoList.vue';

export default {
  name: 'TodoView',
  components: {
    TodoListVue,
  },
};
</script>
