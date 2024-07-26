<template>
  <div class="row justify-content-between">
    <div class="col-4">代辦事項資料</div>
    <div class="col-4 d-flex justify-content-end">
      <a href="#" class="btn btn-primary" @click="doadd">新增</a>
    </div>
  </div>
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
        <a href="#" class="btn btn-primary" @click="domodify(data)">修改</a>
        <a href="#" class="btn btn-primary" @click="dodelete(data)">刪除</a>
        <a href="#" class="btn btn-primary">完成</a>
      </div>
    </div>
  </div>

  <modifyModule ref="ModifyModuleRef" @update="updatedata"></modifyModule>
  <addModule ref="AddModuleRef" @add="adddata"></addModule>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import modifyModule from '../components/Module/modifymodule.vue'
import addModule from '@/components/Module/addmodule.vue'

const TodoData = ref(null)
const ModifyModuleRef = ref(null)
const AddModuleRef = ref(null)

async function callselect() {
  try {
    const res = (await axios.get('https://192.168.233.40/todo/api/Todo/Get')).data
    TodoData.value = res.returnData
  } catch (error) {
    console.error(error)
  }
}

function domodify(data) {
  ModifyModuleRef.value.setTempData(data)
  ModifyModuleRef.value.showModal()
}

async function dodelete(data) {
  try {
    const res = await axios.delete(`https://192.168.233.40/todo/api/Todo/Delete/${data.todoId}`)
    alert(res.data.returnMessage)
    callselect()
  } catch (error) {
    console.error(error)
  }
}

function doadd() {
  AddModuleRef.value.showModal()
}
async function updatedata(data) {
  try {
    const res = await axios.put(
      `https://192.168.233.40/todo/api/Todo/UpdateTodoContent/${data.todoId}`,
      data
    )
    ModifyModuleRef.value.hideModal()
    alert(res.data.returnMessage)
    callselect()
  } catch (error) {
    console.error(error)
  }
}

async function adddata(data) {
  try {
    const res = await axios.post('https://192.168.233.40/todo/api/Todo/InsertTodo', data)
    AddModuleRef.value.hideModal()
    alert(res.data.returnMessage)
    callselect()
  } catch (error) {
    console.error(error)
  }
}
onMounted(() => {
  callselect()
})
</script>

<style></style>
