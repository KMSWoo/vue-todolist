<template>
  <div
    id="main"
    class="min-h-screen flex flex-col w-4/5 lg:w-1/2 mx-auto py-[2vh]"
  >
    <!-- 标题部分 -->
    <div id="title" class="flex flex-row justify-center h-[10vh] items-center">
      <p class="md:text-2xl text-lg font-mono self-start">Just</p>
      <h1
        class="lg:text-8xl text-5xl font-sans antialiased font-bold text-center text-gray-400/80 uppercase"
      >
        {{ msg }}
      </h1>
      <p class="capitalize lg:text-2xl text-lg font-mono self-end">it</p>
    </div>
    <!-- 输入框部分 -->
    <div
      id="input"
      class="md:h-[10vh] md:flex md:flex-row md:justify-center md:items-center md:static md:w-full fixed bottom-[2vh] w-4/5"
    >
      <div
        class="max-h-[10vh] flex flex-row w-full justify-center items-center"
      >
        <input
          class="w-full border-solid border-2 px-2 rounded-md h-[6vh] md:h-[5vh]"
          type="text"
          v-model="input"
          size="big"
          @keyup.enter="addNewTodo(input)"
          placeholder="添加待办事项..."
        />

        <el-button
          type="primary h-[6vh] md:h-[5vh]"
          size="medium"
          @click="addNewTodo(input)"
          >提交</el-button
        >
      </div>
    </div>
    <!-- todo列表 -->
    <div class="grow flex flex-col rounded-xl">
      <el-tabs
        v-model="activeTab"
        type="border-card"
        @tab-click="changeTab"
        class="grow"
      >
        <!-- 未完成列表 -->
        <el-tab-pane
          class="overflow-auto rounded-xl"
          v-show="activeTab === 'undone'"
          name="undone"
          :label="labels[0]"
        >
          <img
            v-show="todos.length === 0"
            id="lizhi"
            alt=""
            class="w-full rounded-xl max-h-[65vh]"
          />
          <div
            v-for="todo in todos"
            :key="todo.id"
            class="mx-auto flex flex-row border-2 p-2 px-3 rounded-xl"
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
            </div>
          </div>
        </el-tab-pane>
        <!-- 已完成列表 -->
        <el-tab-pane
          v-show="activeTab === 'done'"
          name="done"
          :label="labels[1]"
          class="overflow-auto grow"
        >
          <p v-if="dones.length === 0">目前没有完成的 Todo ！</p>
          <div
            v-for="todo in dones"
            :key="todo.id"
            class="mx-auto flex flex-row border-2 p-2 px-3 rounded-xl"
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
      imgUrl: '',
    };
  },
  created() {
    this.getFenxiangImg();
    this.todos = getIncompleteTodos();
    this.dones = getCompletedTodos();
  },
  methods: {
    async getFenxiangImg() {
      try {
        // 发送GET请求到API
        // herokuapp 比 https://api.031920.xyz/iciba快多了
        const response = await this.$axios.get(
          // eslint-disable-next-line comma-dangle
          // 'https://cors-anywhere.herokuapp.com/https://open.iciba.com/dsapi/'
          // eslint-disable-next-line comma-dangle
          'https://api.031920.xyz/iciba'
        );

        const data = response.data;

        // 提取fenxiang_img字段
        const fenxiangImg = data.fenxiang_img;

        // return fenxiangImg;
        document.getElementById('lizhi').src = fenxiangImg;
        console.log('Fenxiang Image URL:', fenxiangImg);
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    },
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
<style scoped>
/* >>> 换成 /deep/也可以 */
.el-tabs >>> .el-tabs__item {
  border-radius: 0.75rem 0 0 0;
}
.el-tabs >>> .el-tabs__header {
  border-radius: 0.75rem 0.75rem 0 0;
}
.el-tabs--top {
  border-radius: 0.75rem;
}
</style>
