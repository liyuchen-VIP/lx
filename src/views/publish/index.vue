<template>
  <div class="my-publish">
    <el-card>
      <!-- header -->
      <template slot="header">
        <my-bread>{{articleId?'修改文章':'发布文章'}}</my-bread>
      </template>
      <el-form :model="articlesForm" label-width="80px">
        <el-form-item label="标题：">
          <el-input v-model="articlesForm.title" style="width:350px"></el-input>
        </el-form-item>

        <el-form-item label="内容：">
          <quill-editor v-model="articlesForm.content" class="q" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articlesForm.cover.type" @change="changeType">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div v-if="articlesForm.cover.type === 1">
            <images v-model="articlesForm.cover.images[0]"></images>
          </div>
          <div v-if="articlesForm.cover.type === 3">
            <images v-model="articlesForm.cover.images[0]"></images>
            <images v-model="articlesForm.cover.images[1]"></images>
            <images v-model="articlesForm.cover.images[2]"></images>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articlesForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
          <el-button type="primary" @click="publish(false)">发表</el-button>
          <el-button @click="publish(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="success" @click="edit(false)">发表</el-button>
          <el-button @click="edit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: { quillEditor },
  data () {
    return {
      // 传进来的的文章Id
      articleId: null,
      // 单选框默认选择单选
      articlesForm: {
        // 标题
        title: '',
        // 内容
        content: '',
        // 封面图片
        cover: {
          type: 1,
          images: []
        },
        // 频道列表
        channel_id: null
      },
      cover: {
        type: '',
        images: ''
      },
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }]
          ]
        }
      }
    }
  },
  created () {
    // 获取传进来的路由护数据
    this.articleId = this.$route.query.id
    // 获取传进来的文章详情
    // 检测到有ID值在进行调用填充
    this.articleId && this.getArticle(this.articleId)
  },
  methods: {
    // 获取文章详情
    async getArticle (id) {
      const { data: { data } } = await this.axios.get('articles/' + id)
      // 重新填充修改
      this.articlesForm = data
    },
    // 发表文章 草稿切换
    async publish (draft) {
      await this.axios.post('articles?draft=' + draft, this.articlesForm)
      this.$message.success(draft ? '存入草稿成功' : '发表文章成功')
      this.$router.push('/article')
    },
    // 修改文章 草稿切换
    async edit (draft) {
      await this.axios.put(`articles/${this.articleId}?draft=${draft}`, this.articlesForm)
      this.$message.success(draft ? '修改草稿成功' : '修改文章成功')
      this.$router.push('/article')
    },
    // 切换选择封面样式是 清楚已选择的图片
    changeType () {
      this.articlesForm.cover.images = []
    }
  }
}
</script>
<style scoped lang="less">
</style>
