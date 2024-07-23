<template>
  <div v-for="data in TodoData" :key="data.todoId">
    <div class="card">
      <div class="card-header row">
        <div class="col-5">
          {{ data.name }}
        </div>
        <div v-if="data.isComplete == 'Y'" class="col-5 text-end">已完成</div>
        <div v-else class="col-5 text-end">未完成</div>
        <div v-if="data.completeTime" class="col-2">完成時間:{{ data.completeTime }}</div>
        <div v-else class="col-2">創立時間:{{ data.addTime }}</div>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ data.title }}</h5>
        <p class="card-text">{{ data.todoContent }}</p>
        <a href="#" class="btn btn-primary" @click="domodify">修改</a>
        <a href="#" class="btn btn-primary">刪除</a>
        <a href="#" class="btn btn-primary">完成</a>
      </div>
    </div>
  </div>
  <ModifyModule ref="ModifyModuleRef" :TodoData></ModifyModule>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import ModifyModule from '../components/Module/modifymodule.vue'

const TodoData = ref(null)
const ModifyModuleRef = ref(null)

async function callselect() {
  const res = (await axios.get('https://192.168.233.40/todo/api/Todo/Get')).data
  TodoData.value = res.returnData
}
function domodify() {
  ModifyModuleRef.value.setTempData(TodoData.value)
  ModifyModuleRef.value.showModal()
}
onMounted(() => {
  callselect()
  console.log(TodoData)
})
</script>

<style></style>
