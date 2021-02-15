<template>
  <div ref="homePage" class="page-home">
    <div ref="diamonds" class="diamonds-container">
      <DiamondSvg
        v-for="(svg, i) in diamondsNumber"
        :key="i"
        class="diamond"
        :style="{display: showDiamonds ? 'block' : 'none'}"
        @mouseover="diamondHover"
        @mouseleave="diamondLeave"
      />
      <div
        :class="{hidden: showArtists}"
        @click="showArtistsBlock"
      >
        <h1 class="primary--text">
          Découvrez nos pépites
        </h1>
        <div class="arrow" />
        <!-- <ArrowSvg class="arrow" fill="#eee" /> -->
      </div>
    </div>
    <div class="artists-container" :class="{ 'showed': showArtists }">
      <Header :show="showHeader" :social-links="infos.socialLinks" is-home />
      <Artists :artists="artists" />
    </div>
  </div>
</template>

<script>
import Header from '~/components/common/Header'
import DiamondSvg from '~/assets/svg/pep-diamond.svg'
import Artists from '~/components/website/Artists'

export default {
  components: {
    Header,
    DiamondSvg,
    Artists
  },
  transition () {
    return {
      name: 'page',
      duration: 300
    }
  },
  async asyncData (context) {
    const artists = await context.app.$axios.$get('/artists')
    const infos = await context.app.$axios.$get('/infos')

    return { artists, infos }
  },
  data () {
    return {
      artists: [],
      infos: {},
      diamondsNumber: new Array(50),
      showDiamonds: false,
      showArtists: false,
      showHeader: false,
      showArrow: true
    }
  },
  mounted () {
    if (window.showArtists) {
      this.showArtists = true
      this.showArrow = false
    }
    this.initDiamonds()
    this.listenScroll()
  },
  methods: {
    listenScroll () {
      const listener = () => {
        if (!this.showArtists && !window.showArtists) {
          this.showArtistsBlock()
          window.removeEventListener('scroll', listener)
        }
      }

      window.addEventListener('scroll', listener)
    },
    showArtistsBlock () {
      this.showArtists = true
      window.showArtists = true

      setTimeout(() => {
        this.showArrow = false
      }, 300)
    },
    diamondHover ({ target }) {
      target.classList.add('hovered')
    },
    diamondLeave ({ target }) {
      target.classList.remove('hovered')
    },
    initDiamonds () {
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight
      const diamondsContainer = this.$refs.diamonds
      const diamonds = diamondsContainer.querySelectorAll('svg.diamond')

      diamonds.forEach((diamond) => {
        const left = Math.floor(Math.random() * (Math.floor(screenWidth) - 30))
        const bottom = Math.floor(Math.random() * ((screenHeight * 2) - screenHeight + 1) + screenHeight)
        const rotation = Math.floor(Math.random() * 360)

        diamond.style.left = `${left}px`
        diamond.style.bottom = `${bottom}px`
        diamond.style.transform = `rotate(${rotation}deg)`
      })

      this.showDiamonds = true

      setInterval(() => {
        diamonds.forEach((diamond) => {
          if (!diamond.classList.contains('hovered')) {
            diamond.style.bottom = `${parseInt(diamond.style.bottom, 10) - 3}px`

            if (parseInt(diamond.style.bottom) < -40) {
              diamond.style.bottom = `${screenHeight}px`
              diamond.style.left = `${Math.floor(Math.random() * Math.floor(screenWidth))}px`
            }
          }
        })
      }, 20)
    }
  }
}
</script>

<style src="./index.scss" lang="scss" scoped />
