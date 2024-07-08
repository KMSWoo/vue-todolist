<template>
  <div id="main" class="my-10 w-screen">
    <!-- 标题部分 -->
    <div id="title" class="flex flex-row justify-center items-end">
      <p class="text-2xl font-mono self-start">Just</p>
      <h1
        class="text-8xl font-sans antialiased font-bold text-center text-gray-400/80 uppercase ml-2"
      >
        {{ msg }}
      </h1>
      <p class="capitalize text-2xl font-mono">it</p>
    </div>
    <!-- 输入框部分 -->
    <div id="input" class="w-screen flex flex-row justify-center">
      <div class="w-1/2 flex flex-row">
        <!-- 添加的包装 div -->
        <div class="my-10 grow">
          <!-- 修改这里 -->
          <el-input
            v-model="input"
            size="big"
            @keyup.enter.native="addNewTodo(input)"
            placeholder="添加待办事项..."
            >我在这</el-input
          >
        </div>
        <div class="self-center">
          <el-button type="primary" @click="addNewTodo(input)">提交</el-button>
        </div>
      </div>
    </div>
    <!-- todo列表 -->
    <div class="w-1/2 mx-auto rounded-xl">
      <el-tabs v-model="activeTab" type="border-card" @tab-click="changeTab">
        <!-- 未完成列表 -->
        <el-tab-pane
          v-show="activeTab === 'undone'"
          name="undone"
          :label="labels[0]"
        >
          <p v-if="todos.length === 0">恭喜你，所有的Todo都已完成</p>
          <div
            v-for="todo in todos"
            :key="todo.id"
            class="mx-auto my-2 flex flex-row border-2 p-2 px-3 rounded-xl"
          >
            <div>
              <el-button
                size="small"
                type="success"
                icon="el-icon-check"
                plain
                circle
                @click="toggleComplete(todo.id)"
              ></el-button>
            </div>
            <p class="mx-3">{{ todo.title }}</p>
            <div class="ml-auto">
              <el-button
                size="small"
                type="danger"
                icon="el-icon-delete"
                circle
                @click="removeTodo(todo.id)"
              ></el-button>
            </div></div
        ></el-tab-pane>
        <!-- 已完成列表 -->
        <el-tab-pane
          v-show="activeTab === 'done'"
          name="done"
          :label="labels[1]"
        >
          <p v-if="dones.length === 0">目前没有完成的Todo!</p>
          <div
            v-for="todo in dones"
            :key="todo.id"
            class="mx-auto my-2 flex flex-row border-2 p-2 px-3 rounded-xl"
          >
            <div>
              <el-button
                size="small"
                type="success"
                icon="el-icon-check"
                plain
                circle
                @click="toggleComplete(todo.id)"
              ></el-button>
            </div>
            <p class="mx-3 line-through">{{ todo.title }}</p>
            <div class="ml-auto">
              <el-button
                size="small"
                type="danger"
                icon="el-icon-delete"
                circle
                @click="removeTodo(todo.id)"
              ></el-button>
            </div></div
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {
  getCompletedTodos,
  getIncompleteTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodoComplete,
} from '@/api/todo.js';

export default {
  name: 'TodoList',
  data() {
    return {
      activeTab: 'undone',
      input: '',
      msg: 'Todo',
      todos: [],
      dones: [],
      labels: ['进行中', '已完成'],
    };
  },
  created() {
    this.todos = getIncompleteTodos();
    this.dones = getCompletedTodos();
  },
  methods: {
    changeTab(tab, event) {
      // console.log(tab.index);
      console.log(tab.name);
    },
    addNewTodo(title, deadline) {
      if (title.trim() === '') {
        this.input = '';
        return false;
      }
      const newTodo = addTodo(title.trim(), deadline);
      this.todos.push(newTodo);
      this.input = '';
    },
    updateTodoItem(id, updates) {
      const updatedTodo = updateTodo(id, updates);
      if (updatedTodo) {
        const index = this.todos.findIndex((todo) => todo.id === id);
        this.todos.splice(index, 1, updatedTodo);
      }
    },
    removeTodo(id) {
      deleteTodo(id);
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.dones = this.dones.filter((done) => done.id !== id);
    },
    toggleComplete(id) {
      const updatedTodo = toggleTodoComplete(id);
      if (updatedTodo) {
        const index = this.todos.findIndex((todo) => todo.id === id);
        this.todos.splice(index, 1);
        this.dones.push(updatedTodo);
      }
    },
  },
};
</script>
