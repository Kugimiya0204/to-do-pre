<template>
  <div
    class="row justify-content-between datatitle bg-primary-subtle d-flex justify-content-evenly mb-4"
  >
    <div class="col-4 titletext">代辦事項資料</div>
    <div class="col-4 d-flex justify-content-end">
      <a href="#" class="btn btn-primary btnsty myfont1" @click="doadd">新增</a>
    </div>
  </div>
  <div class="row d-flex reset">
    <div v-for="data in TodoData" :key="data.todoId" class="card datacard col-5">
      <div v-if="data.isComplete == 'Y'" class="card-header row bg-success-subtle">
        <div class="col-5 fs-3">
          <span
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="25"
              height="25"
              viewBox="0 0 48 48"
            >
              <path
                fill="#4caf50"
                d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
              ></path>
              <path
                fill="#ccff90"
                d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"
              ></path>
            </svg>
          </span>
          <span> 姓名: {{ data.name }} </span>
        </div>
        <div class="col-5 text-end">已完成</div>
        <div class="col-2">完成時間:{{ data.completeTime }}</div>
      </div>
      <div v-else class="card-header row">
        <div class="col-5 fs-3">姓名: {{ data.name }}</div>
        <div class="col-5 text-end">未完成</div>
        <div class="col-2">創立時間:{{ data.addTime }}</div>
      </div>
      <div class="card-body reset mt-3 mb-3">
        <h5 class="card-title fs-4 d-flex justify-content-center bg-warning-subtle reset">
          {{ data.title }}
        </h5>
        <p class="card-text mt-3">{{ data.todoContent }}</p>
        <div class="d-flex justify-content-end">
          <a href="#" class="btn btn-warning me-2 btnsty myfont1" @click="domodify(data)">修改</a>
          <a href="#" class="btn btn-danger me-2 btnsty myfont1" @click="dodelete(data)">刪除</a>
          <a
            v-if="data.isComplete == 'Y'"
            href="#"
            class="btn btn-secondary btnsty myfont1"
            disabled
            >完成</a
          >
          <a v-else href="#" class="btn btn-success btnsty myfont1" @click="dofinish(data)">完成</a>
        </div>
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
const env = import.meta.env.VITE_BASE_URL

async function callselect() {
  try {
    const res = (await axios.get(env + 'api/Todo/Get')).data
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
  const res = await axios.delete(env + `api/Todo/Delete/${data.todoId}`)
  alert(res.data.returnMessage)
  callselect()
}

function doadd() {
  AddModuleRef.value.showModal()
}

async function dofinish(data) {
  const req = {
    todoId: data.todoId,
    isComplete: 'Y'
  }
  const res = await axios.put(env + `api/Todo/UpdateTodoStatus/${data.todoId}`, req)
  alert(res.data.returnMessage)
  callselect()
}
async function updatedata(data) {
  const res = await axios.put(env + `api/Todo/UpdateTodoContent/${data.todoId}`, data)
  ModifyModuleRef.value.hideModal()
  alert(res.data.returnMessage)
  callselect()
}

async function adddata(data) {
  const res = await axios.post('https://192.168.233.40/todo/api/Todo/InsertTodo', data)
  AddModuleRef.value.hideModal()
  alert(res.data.returnMessage)
  callselect()
}

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)
onMounted(() => {
  callselect()
})
</script>

<style scoped>
.datacard {
  margin-left: 5%;
  margin-bottom: 2%;
  border: solid green 1px;
}
.btnsty {
  border: solid black 1px;
}
.titletext {
  font-weight: bolder;
  font-size: 25px;
}
.reset {
  margin: 0;
  padding: 0;
}
</style>
