<template>
  <!-- :value="value" 绑定的是父组件传进来的值  -->
  <!-- @change="fn"  该方法是把父组件传进来的值返回给父组件 实现双向绑定 -->
  <el-select :value="value" @change="fn" size="small">
    <!--
                  指定 key 作为唯一标识
                  label 看到的文字
                  value 文字的值
    -->
    <el-option v-for=" item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>f
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  // 接收父组件传进来的频道id值
  props: ['value'],
  data () {
    return {
      //   频道数据
      channelOptions: []
    }
  },
  created () {
    this.getChannel()
  },
  methods: {
    // channel事件默认会传进来一个参数  该参数是当前选中的值
    fn (value) {
      // 子传父  通过 this.$emit('自定义事件', value---参数)
      // 把值传给父组件
      this.$emit('input', value)
    },
    // 获取频道下拉数据
    async getChannel () {
      const {
        data: { data }
      } = await this.axios.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>
<style scoped lang="less">
</style>
