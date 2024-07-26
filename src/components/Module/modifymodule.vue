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
          <h1 class="modal-title fs-5" id="exampleModalLabel">修改Data</h1>
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
              <div class="form-floating">
                <input type="text" class="form-control" v-model="tempData.name" />
                <label for="floatingInputGrid">名字</label>
              </div>
              <div class="form-floating">
                <input type="text" class="form-control" v-model="tempData.title" />
                <label for="floatingInputGrid">標題</label>
              </div>
              <div class="form-floating">
                <input type="text" class="form-control" v-model="tempData.todoContent" />
                <label for="floatingInputGrid">內容</label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn" @click="transdata">修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'

const emits = defineEmits(['update'])

const exampleModalRef = ref(null)
const exampleModalObj = ref(null)
const tempData = ref(null)

function showModal() {
  exampleModalObj.value.show()
}
function hideModal() {
  exampleModalObj.value.hide()
}

function setTempData(data) {
  tempData.value = JSON.parse(JSON.stringify(data))
  console.log(tempData.value)
}

function transdata() {
  emits('update', tempData.value)
}

defineExpose({
  showModal,
  hideModal,
  setTempData
})

onMounted(() => {
  exampleModalObj.value = new bootstrap.Modal(exampleModalRef.value)
})
</script>

<style></style>
