<template>
  <el-form
    :label-position="labelPosition"
    label-width="auto"
    :model="form"
    style="max-width: 600px"
  >
    <el-form-item label="姓名" :label-position="itemLabelPosition">
      <el-input v-model="form.username" />
    </el-form-item>
    <el-form-item label="性别" :label-position="itemLabelPosition">
      <el-select v-model="form.sex" placeholder="Select" style="width: 240px">
        <el-option label="男" value="boy"/>
        <el-option label="女" value="girl"/>
    </el-select>
    </el-form-item>
    <el-form-item label="年龄" :label-position="itemLabelPosition">
      <el-input-number v-model="form.age" />
    </el-form-item>
  </el-form>
  <el-button type="primary" @click="saveOrUpdate">{{ form?.id?'修改':'保存' }}</el-button>
  <el-button type="info" @click="reset">取消</el-button>
</template>

<script setup>
import axios from 'axios'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'


const form = reactive({
  username: '',
  sex: 'boy',
  age: 1,
  flag:'add'
})

//const form = ref({})

//获取路由参数
let tuser = history.state.tuser
//判断
if(tuser){
    Object.assign(form,JSON.parse(tuser))
    form.flag = 'update'
}

//路由器
const router = useRouter()

const saveOrUpdate = () => {
  if(form.flag === 'add'){
    save()
  }else{
    update()
  }
}

//保存
const save = () => {
  axios.post('/api/save.do',form).then(res => {
     ElMessage({
      message: '保存成功',
      type: 'success',
    })
    router.push('/show')
  })
}
//更新
const update=()=>{
    axios.post('/api/update.do',form).then(res => {
     ElMessage({
      message: '更新成功',
      type: 'success',
    })
    router.push('/show')
  })
}
</script>
