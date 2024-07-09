<template>
  <div id="main" class="my-[2.5svh] lg:mt-[5svh] w-screen">
    <!-- 标题部分 -->
    <div id="title" class="flex flex-row justify-center items-end">
      <p class="lg:text-2xl text-lg font-mono self-start">Just</p>
      <h1
        class="lg:text-8xl text-5xl font-sans antialiased font-bold text-center text-gray-400/80 uppercase"
      >
        {{ msg }}
      </h1>
      <p class="capitalize lg:text-2xl text-lg font-mono">it</p>
    </div>
    <!-- 输入框部分 -->
    <div
      id="input"
      class="w-screen flex flex-row justify-center my-[1svh] md:my-[2.5svh]"
    >
      <div class="w-4/5 lg:w-1/2 flex flex-row md:static fixed bottom-10">
        <div class="grow">
          <input
            class="w-full h-full border-solid border-2 px-2 rounded-md"
            type="text"
            v-model="input"
            size="big"
            @keyup.enter.native="addNewTodo(input)"
            placeholder="添加待办事项..."
          />
        </div>
        <div class="self-center">
          <el-button type="primary" @click="addNewTodo(input)">提交</el-button>
        </div>
      </div>
    </div>
    <!-- todo列表 -->
    <div class="w-4/5 lg:w-1/2 mx-auto">
      <el-tabs v-model="activeTab" type="border-card" @tab-click="changeTab">
        <!-- 未完成列表 -->
        <el-tab-pane
          class="overflow-auto h-[60svh] rounded-xl"
          v-show="activeTab === 'undone'"
          name="undone"
          :label="labels[0]"
        >
          <p v-if="todos.length === 0">目前还没有任何 Todo ！</p>
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
                @click="toggleComplete(todo.id, activeTab)"
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
          class="overflow-auto h-[60svh]"
        >
          <p v-if="dones.length === 0">目前没有完成的 Todo ！</p>
          <div
            v-for="todo in dones"
            :key="todo.id"
            class="mx-auto my-2 flex flex-row border-2 p-2 px-3 rounded-xl"
          >
            <div>
              <el-button
                size="small"
                type="success"
                icon="el-icon-top-left"
                plain
                circle
                @click="toggleComplete(todo.id, activeTab)"
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
    revokeTodo(id) {},
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
    toggleComplete(id, activeTab) {
      const updatedTodo = toggleTodoComplete(id);
      if (updatedTodo) {
        if (activeTab === 'undone') {
          const index = this.todos.findIndex((todo) => todo.id === id);
          this.todos.splice(index, 1);
          this.dones.push(updatedTodo);
        } else {
          const index = this.dones.findIndex((done) => done.id === id);
          this.dones.splice(index, 1);
          this.todos.push(updatedTodo);
        }
      }
    },
  },
};
</script>
