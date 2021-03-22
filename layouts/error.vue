<template>
  <div class="page-404">
    <h1>Page not found</h1>
  </div>
</template>

<script>
// import NotFound from '@/components/website/NotFound'

export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style src="./error.scss" scoped lang="scss"></style>
