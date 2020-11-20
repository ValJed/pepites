<template>
  <div class="page-home">
    <div ref="diamonds" class="diamonds-container">
      <DiamondSvg
        v-for="(svg, i) in diamondsNumber"
        :key="i"
        class="diamond"
        :style="{display: showDiamonds ? 'block' : 'none'}"
        @mouseover="diamondHover"
        @mouseleave="diamondLeave"
      />
      <div @click="scrollDown">
        <span class="primary--text">Découvrez nos pépites</span>
        <ArrowSvg class="arrow" fill="#eee" />
      </div>
    </div>
    <v-container class="artists-container">
      <DiamondSvg class="logo" />
      <ul class="artists">
        <Artist
          v-for="artist in artists"
          :key="artist.name"
          :artist="artist"
        />
      </ul>
    </v-container>
  </div>
</template>

<script>
import ArrowSvg from '~/assets/svg/down-arrow.svg'
import DiamondSvg from '~/assets/svg/diamond.svg'
import Artist from '~/components/Artist'

export default {
  components: {
    ArrowSvg,
    DiamondSvg,
    Artist
  },
  data () {
    return {
      diamondsNumber: new Array(50),
      showDiamonds: false,
      // primaryColor: this.$vuetify.theme.themes.main.primary,
      artists: [
        {
          name: 'toto',
          content: 'salut les cons'
        },
        {
          name: 'tata',
          content: 'Ciao belle'
        },
        {
          name: 'tutu',
          content: 'Death pls, dth !'
        }
      ]
    }
  },
  mounted () {
    console.log('this.$vuetify ===> ', this.$vuetify.theme)
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
  },
  methods: {
    scrollDown () {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
    },
    diamondHover ({ target }) {
      target.classList.add('hovered')
    },
    diamondLeave ({ target }) {
      target.classList.remove('hovered')
    }
  }
}
</script>

<style src="./index.scss" lang="scss" scoped />