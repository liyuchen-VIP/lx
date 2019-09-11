<template>
  <div class="cover_img">
    <!-- 上传图片 -->
    <!-- dialogVisible=true 弹窗默认不显示 -->
    <div class="img-btn" @click="getDialog">
      <!-- value 就是组件上传最后的值
      因为最后反馈给父组件的值就是图片地址-->
      <!-- 需要声明一个 return 中 value -->
      <!-- 如果父组件传数据就用父组件传的数据
      没有就用默认的本地图片-->
      <img :src="value || Default " alt />
    </div>
    <!-- 弹窗 -->
    <!-- dialogVisible 弹出框的显示与隐藏 -->
    <el-dialog :visible.sync="dialogVisible" class="w" width="700px">
      <!-- activeName  控制显示素材库还是上传图片 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" v-loading="loading" name="images">
          <div>
            <el-radio-group
              style="padding-bottom:20px"
              @change="collect"
              v-model="articlesForm.collect"
            >
              <el-radio-button label="false">全部</el-radio-button>
              <el-radio-button label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 图片列表 -->
          <div
            class="item-img"
            :class="{selected:selectedUrl===item.url}"
            @click="selected(item.url)"
            v-for=" item in images"
            :key="item.id"
          >
            <img :src="item.url" alt />
          </div>
          <!-- 分页 -->
          <!-- @current-change="changePage" 分页事件 -->
          <!-- :total="total"  数据总数  -->
          <!-- :page-size='articlesForm.per_page' 每页显示的数据数量 -->
          <el-pagination
            background
            @current-change="changePage"
            :current-page="articlesForm.page"
            layout="prev, pager, next"
            :total="total"
            :page-size="articlesForm.per_page"
            style="text-align: center"
          ></el-pagination>
        </el-tab-pane>

        <!-- 上传图片 -->
        <!-- :on-success="handloSuccess"  上传成功后做的事情 -->
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handloSuccess"
            :headers="headers"
            name="image"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>

      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="cofirmImg()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Default from '../assets/images/default.png'
export default {
  name: 'images',
  // 这里接收的 value 就是接收的封面的值
  // 不能有两个value所以得将下面的value注释掉
  // Default 是引入的本地资源封面默认图片 上面要用到所以得把 Default 在 data 下挂在才能使用
  props: ['value'],
  data () {
    return {
      // value: Default,
      // 上传图片头部
      Default,
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(window.sessionStorage.getItem('login')).token
      },
      // 加载等待
      loading: false,
      // 弹出框的显示与隐藏
      dialogVisible: false,
      //   默认显示素材库
      activeName: 'images',
      //   提取 全部和收藏 数据
      articlesForm: {
        //   默认显示全部
        collect: 'false',
        // 默认显示第一页
        page: 1,
        // 每页显示20条
        per_page: 8
      },
      // 图片上传地址
      imageUrl: null,
      // 接收封面素材库数据
      images: [],
      // 数据总数
      total: 0,
      // 选中的图片的ID
      selectedUrl: null
    }
  },
  methods: {
    // 点击将图片展示到封面
    cofirmImg () {
      if (this.activeName === 'images') {
        if (!this.selectedUrl) return this.$message.info('请选择图片')
        // this.value = this.selectedUrl
        this.$emit('input', this.selectedUrl)
      } else {
        if (!this.imageUrl === 'upload') {
          return this.$message.info('请上传图片')
        }
        // this.value = this.imageUrl
        this.$emit('input', this.imageUrl)
      }
      this.dialogVisible = false
    },
    // 上传成功后做的事情
    handloSuccess (res) {
      this.imageUrl = res.data.url
      console.log(res)
    },
    // 当前点击的图片
    selected (url) {
      // 给当前点击的图片 加上selected
      // :class="{ selected:条件 }"
      // 条件: 根据当前点击图片的ID 去匹配遍历的时候 一致的加  不一致的不加
      this.selectedUrl = url
      // console.log(this.selectedId)
    },
    // 切换收藏
    collect () {
      this.articlesForm.page = 1

      this.getImg()
    },
    // 分页事件
    changePage (newPage) {
      this.articlesForm.page = newPage
      this.getImg()
    },
    // 上传封面
    getDialog () {
      // 打开弹窗
      this.dialogVisible = true
      this.selectedId = null
      this.articlesForm.page = 1
      this.imageUrl = null
      this.selectedUrl = null
      // 获取数据
      this.getImg()
    },
    // 获取图片数据
    async getImg () {
      this.loading = true
      const {
        data: { data }
      } = await this.axios.get('user/images', { params: this.articlesForm })
      this.images = data.results
      this.total = data.total_count
      this.loading = false
    }
  }
}
</script>
<style scoped lang="less">
.cover_img {
  margin-right: 20px;
  width: 200px;
  height: 150px;
  display: inline-block;
}
.img-btn {
  width: 200px;
  height: 150px;
  margin-bottom: 1px;
  border: 1px dashed #d9d9d9;
  img {
    width: 100%;
    height: 100%;
  }
}
.item-img {
  width: 150px;
  height: 120px;
  border: 1px dashed #d9d9d9;
  display: inline-block;
  margin-right: 10px;
  position: relative;
  &.selected {
    &::before {
      // 一个和图片一样大小的背景
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
        no-repeat center / 60px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
