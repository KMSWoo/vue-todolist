<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-input v-model="input" placeholder="新增待办事项..."></el-input>
    <el-button type="primary" round @click="addNewTodo(input)">添加</el-button>
    <ol>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.title }} <span @click="toggleComplete(todo.id)">X</span>
      </li>
    </ol>
    <hr>
    <ol>
      <li v-for="done in dones" :key="done.id">
        {{ done.title }} <span @click="removeTodo(done.id)">X</span>
      </li>
    </ol>
  </div>
</template>

<script>
import { getCompletedTodos, getIncompleteTodos, addTodo, updateTodo, deleteTodo, toggleTodoComplete } from '@/api/todo.js';

export default {
  name: 'TodoList',
  data () {
    return {
      input: '',
      msg: 'Todo',
      todos: [],
      dones: [],
    };
  },
  created () {
    this.todos = getIncompleteTodos();
    this.dones = getCompletedTodos();
  },
  methods: {
    addNewTodo (title, deadline) {
      const newTodo = addTodo(title, deadline);
      this.todos.push(newTodo);
      this.input = '';
    },
    updateTodoItem (id, updates) {
      const updatedTodo = updateTodo(id, updates);
      if (updatedTodo) {
        const index = this.todos.findIndex(todo => todo.id === id);
        this.todos.splice(index, 1, updatedTodo);
      }
    },
    removeTodo (id) {
      deleteTodo(id);
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    toggleComplete (id) {
      const updatedTodo = toggleTodoComplete(id);
      if (updatedTodo) {
        const index = this.todos.findIndex(todo => todo.id === id);
        this.todos.splice(index, 1);
        this.dones.push(updatedTodo);
      }
    },
  },
};
</script>
