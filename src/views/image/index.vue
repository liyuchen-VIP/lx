<template>
  <div id="my-image">
    <el-card>
      <template slot="header">
        <my-bread>素材管理</my-bread>
      </template>
      <div class="btn">
        <!-- 单选按钮 -->
        <el-radio-group v-model="reqParams.collect" @change="seach()" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <!-- 添加素材 -->
        <el-button
          type="success"
          size="small"
          style="float:right"
          @click="dialogVisible  = true"
        >添加素材</el-button>
        <el-dialog title="素材列表" :visible.sync="dialogVisible" width="300px">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :headers="headers"
            name="image"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 图片 -->
      <div class="images" v-for="item in images" :key="item.id">
        <img :src="item.url" alt />
        <div>
          <!-- 收藏 -->
          <!-- 点击收藏 需要item的两个值  ID is_collected -->
          <span @click="collect(item)" class="el-icon-star-off" :class="{red:item.is_collected}"></span>
          <!-- 删除 -->
          <span class="el-icon-delete" @click="del(item)"></span>
        </div>m aaaaaaaaaaaaaa
      </div>
      <!-- 分页 -->
      <div>
        <el-pagination
          background
          v-if="total>reqParams.per_page"
          @current-change="changeImg"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          layout="prev, pager, next"
          :total="total"
          style="text-align: center"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(window.sessionStorage.getItem('login')).token
      },
      dialogVisible: false,
      reqParams: {
        // 默认隐藏对话框
        // 默认选择全部素材
        collect: 'false',
        page: 1,
        per_page: 16
      },
      // 图片上传地址
      imageUrl: null,
      // 素材列表
      images: [],
      // 分页总条数
      total: 0
    }
  },
  created () {
    this.getImage()
  },
  methods: {
    // 点击删除
    async del (item) {
      const data = await this.axios.delete('user/images/' + item.id)
      this.$message.success('删除成功')
      this.getImage()
      console.log(data)
    },
    // 点击收藏
    async collect (item) {
      const {
        data: { data }
      } = await this.axios.put('user/images/' + item.id, {
        // 取反
        collect: !item.is_collected
      })
      // 成功 切换类名 变成红色 提示信息
      this.$message.success('操作成功')
      // 点击取反
      item.is_collected = data.collect
    },
    // 上传成功后做的事情
    handleAvatarSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      this.imageUrl = ''
      this.dialogVisible = false
      this.getImage()
    },
    // 切换全部收藏
    seach () {
      this.reqParams.page = 1
      this.getImage()
    },
    // 分页事件
    changeImg (newImage) {
      this.reqParams.page = newImage
      this.getImage()
    },
    // 获取数据列表
    async getImage () {
      const {
        data: { data }
      } = await this.axios.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>
<style scoped lang="less">
.btn {
  margin-bottom: 20px;
}
.images {
  width: 180px;
  height: 180px;
  position: relative;
  display: inline-block;
  margin: 0 20px 20px 0;
  img {
    width: 100%;
    height: 100%;
  }
  div {
    width: 180px;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    bottom: 0px;
    color: #fff;
    line-height: 30px;
    text-align: center;
    span {
      margin: 0 20px;
      &.red {
        color: red;
      }
    }
  }
}
</style>
