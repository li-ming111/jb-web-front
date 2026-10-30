<template>
  <el-table :data="tableData" style="width: 100%">
   
    <el-table-column  prop="username" label="姓名" />
    <el-table-column  prop="sex" label="性别" />
    <el-table-column  prop="age" label="年龄" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.row)">
          编辑
        </el-button>
        <el-popconfirm title="是否删除?"
          confirm-button-text="确定" 
          cancel-button-text="取消"
          @confirm="deleteHandler(scope.row.id)">
        <template #reference>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3,5,7]"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
</template>

<script  setup>
import axios from 'axios'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const tableData = ref([])
const total = ref(0)
//-----分页------------

const currentPage = ref(1)
const pageSize = ref(3)

const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val) => {
  show(currentPage,val)
}
const handleCurrentChange = (val) => {
  show(val,pageSize)
}


//显示函数
const show = () => {    
   axios.post('/api/show.do',{page1:currentPage.value,size1:pageSize.value}).then(res => {
     tableData.value = res.data.list
     total.value = res.data.totalCount
     console.log(res);
   })
}
//页面加载自动调用
onMounted(() => {
  show()
})
//删除
const deleteHandler = (id) => {
  console.log(id);
  axios.post('/api/delete.do',{flag:'delete',id:id})
  .then(() => {
    ElMessage({
      message: '删除成功',
      type: 'success',
    })
    show()
  })
}

const router = useRouter()
//编辑
const handleEdit = (row) => {
  router.push({
    path: '/save',
    state:{
      tuser:JSON.stringify(row)
    }
  })
}
</script>
