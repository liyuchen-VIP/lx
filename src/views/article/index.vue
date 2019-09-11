<template>
  <div class="my-article">
    <!-- 筛选容器 -->
    <el-card class="screen">
      <div slot="header">
        <my-bread>
          <template>内容管理</template>
        </my-bread>
      </div>
      <el-form :model="screenForm" label-width="80px">
        <el-form-item label="状态：">
          <el-radio-group v-model="screenForm.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道：">
          <my-channel v-model="screenForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="时间：">
          <el-date-picker
            value-format="yyyy-MM-dd"
            size="small"
            @change="changeDate"
            v-model="screenForm.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sifting()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果容器 -->
    <el-card>
      <div slot="header">
        共查询到
        <span>{{total_count}}</span>条数据
      </div>
      <el-table :data="tableData">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image lazy style="width:100px;height:70px" :src="scope.row.cover.images[0]">
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" width="100px" height="70px" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0 " type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1 " type="warning">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2 " type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3 " type="danger">审核失败</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column prop label="操作">
          <template slot-scope="scope">
            <el-row>
              <el-button
                type="primary"
                plain
                icon="el-icon-edit"
                @click="goPub(scope.row.id)"
                circle
              ></el-button>
              <el-button
                type="danger"
                plain
                icon="el-icon-delete"
                @click="del(scope.row.id)"
                circle
              ></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- current-change  分页事件 页码切换时发生的事件
           :page-size 每页显示的条数
           :current-page 当前页
      total 总数量-->
      <el-pagination
        background
        @current-change="changePage"
        :page-size="screenForm.per_page"
        :current-page="screenForm.page"
        layout="prev, pager, next"
        :total="total_count"
        style="text-align: center"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      screenForm: {
        // 当前页
        page: 1,
        // 每页显示20条
        per_page: 10,
        // 标题状态
        status: null,
        // 频道数据
        channel_id: null,
        // 选择日期
        begin_pubdate: null,
        end_pubdate: null
      },

      //   日期数据
      tiem: [],
      // 查询结果数据
      tableData: [],
      // 总条数
      total_count: 0
    }
  },
  created () {
    // 调用查询结果数据
    this.gteArticles()
    this.get()
  },
  methods: {
    async get () {
      const a = await this.axios.get('statistics/followers')
      console.log(a)
    },
    // 跳转到文章编辑
    goPub (id) {
      // this.$router.push('/publish?id=' + id)
      this.$router.push({ path: '/publish', query: { id } })
    },
    // 删除文章
    del (id) {
      this.$confirm(' 是否删除该文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.axios.delete(`articles/${id}`)
        this.$message('删除成功')
        this.gteArticles()
      })
        .catch(() => {})
    },
    // 分页触发事件  newPage 新页码
    changePage (newPage) {
      // 新页码替换当前页码
      this.screenForm.page = newPage
      // 替换后重新调用查新结果
      this.gteArticles()
    },
    // 获取选择日期的两个值
    changeDate (values) {
      this.screenForm.begin_pubdate = values[0]
      this.screenForm.end_pubdate = values[1]
    },
    sifting () {
      // 筛选后替换成当前页  第一页
      this.screenForm.page = 1
      this.gteArticles()
    },

    // 获取查询结果数据
    async gteArticles () {
      const {
        data: { data }
      } = await this.axios.get('articles', { params: this.screenForm })
      this.tableData = data.results
      // 获取分页总条数
      this.total_count = data.total_count
    }
  }
}
</script>
<style scoped  lang="less">
.screen {
  margin-bottom: 20px;
}
</style>
