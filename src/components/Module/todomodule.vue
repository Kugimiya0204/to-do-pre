<template>
  <div
    ref="exampleModalRef"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="false"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{{ title }}</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row g-2">
            <div v-if="tempData" class="row">
              <div class="form-floating mb-4">
                <input type="text" class="form-control" id="name" v-model="tempData.name" />
                <label for="name">姓名</label>
              </div>
              <div class="form-floating mb-4">
                <input type="text" class="form-control" id="title" v-model="tempData.title" />
                <label for="title">代辦標題</label>
              </div>
              <div class="form-floating">
                <textarea
                  type="text"
                  class="form-control"
                  id="context"
                  style="height: 300px"
                  v-model="tempData.todoContent"
                ></textarea>
                <label for="context">代辦內容</label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" @click="transdata">{{ buttontext }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'

const emits = defineEmits(['update', 'add'])

const exampleModalRef = ref(null)
const exampleModalObj = ref(null)
const tempData = ref(null)
const title = ref(null)
const buttontext = ref(null)
const dofunc = ref(null)

function showModal() {
  exampleModalObj.value.show()
}
function hideModal() {
  exampleModalObj.value.hide()
}

function setTempData(todo, data) {
  if (todo === 'add') {
    tempData.value = {
      name: null,
      title: null,
      todoContent: null
    }
    title.value = '新增代辦事項'
    dofunc.value = todo
    buttontext.value = '新增'
  } else if (todo === 'modify') {
    tempData.value = JSON.parse(JSON.stringify(data))
    title.value = '修改代辦事項'
    dofunc.value = todo
    buttontext.value = '修改'
  }
}

function transdata() {
  if (dofunc.value === 'add') {
    emits('add', tempData.value)
  } else if (dofunc.value === 'modify') {
    emits('update', tempData.value)
  }
}

defineExpose({
  showModal,
  hideModal,
  setTempData
})

onMounted(() => {
  exampleModalObj.value = new Modal(exampleModalRef.value)
})
</script>

<style></style>
