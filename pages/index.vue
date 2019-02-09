<template>
  <v-layout
    column
    justify-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <h1 class="mb-3 title">CSS Selector Viewer</h1>
    </v-flex>
    <v-flex
      xs12
      sm8
      md6
    >
      <v-select
        :items="selectorsOptions"
        :value="selectedSelector"
        item-text="title"
        item-value="selector"
        @change="changeSelector"
        label="セレクタ"
      ></v-select>
      <v-text-field
        v-model="selector"
        box
        label="css selector"
        color="deep-purple"
      ></v-text-field>    
    </v-flex>    
    <v-flex xs12 v-if="presetSelector">
      <v-card color="blue-grey" class="white--text">
        <v-card-title primary-title>
          <div>
            <div class="headline">{{presetSelector.title}}</div>
            <span>{{presetSelector.point}}</span>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>    
    <v-flex
      xs12
      sm8
      md6
    >
      <div id="css-target-root" v-html="exapandHtml"/>
    </v-flex>
    <v-flex
      xs12
      sm8
      md6
      class="mt-4"
    >
      <div class="text-xs-center">        
        <v-text-field
          v-model="htmlString"
          label="html (emmet) "
          box
          color="deep-purple"
        ></v-text-field>
        <style v-html="`#css-target-root ${css}`" v-if="selector"></style>
        <p>セレクタの説明はこちらの<a href="https://webliker.info/css-selector-cheat-sheet/" target="_blank" rel="noopener">CSSセレクタのチートシート</a>の説明を使わせております。</p>
      </div>
    </v-flex>
    <v-flex
      xs12
      sm6
      md6
      class="mt-4"
    >
      <h2 class="mb-2">このサイトは、個人サポーターの方々によって成り立っています。</h2>
      <iframe src="https://poiit.me/yahsan2/embed/supporters" frameborder="0" height="140px" width="100%"></iframe>
      <a href="https://poiit.me/yahsan2/?utm_source=poiit&utm_medium=referral&utm_campaign=v1.0&utm_content=embed-banner" target="_blank" rel="noopener"><img style="display: block; max-width: 100%; width: 510px;" src="https://assets.poiit.me/yahsan2/ogp.jpeg"></a>
    </v-flex>
  </v-layout>
</template>

<style>
#css-target-root{
  background: #333;
  color: #fff;
  display: flex;
  flex-wrap: wrap;
  padding: 10px;  
}

[data-tag]{
  box-sizing: border-box;
  width: calc(50% - 20px);
  position: relative;
  padding: 10px;
  margin: 10px;
  border: 1px solid #fff;
  display: flex;
  flex-wrap: wrap;
  background: #455a64;
}
#css-target-root > [data-tag]{
  width: calc(100% - 20px);
}

[data-tag]:empty{
  padding: 20px;
}

@media screen and (max-width: 600px) {
  [data-tag]:empty{
    width: calc(100%);
    margin: 5px 0;
  }
}

[data-tag]:first-child:last-child{
  width: 100% ;
}

[data-tag]:before {
  content: attr(data-tag);
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  padding: 2px 5px;
  font-size: 10px;
  text-align: center;
  color: #455a64;
  background-color: #fff;
}
</style>


<script>
import htmlspecialchars from "htmlspecialchars"
import { parse, expand } from '@emmetio/expand-abbreviation'

import selectors from '~/data/selectors.json'

let metyaTEMPORAY = ''

export default {
  asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {    
    metyaTEMPORAY = {
      selector: query.selector,
      htmlString: query.html 
    }
  },
  data () {
    return {
      selectors: selectors,
      selector: 'div p',
      selectedSelector: 'div p',
      htmlString: 'div>(div>p+h3+p+p)+(section>p+h3+p+p)+(p>span+span+small+span)*2'
    }
  },
  computed: {
    presetSelector () {
      return this.selectors.filter((s) => s.selector.replace(' ', ' ') === this.selector.replace('  ', ' '))[0]
    },
    selectorsOptions () {
      return this.selectors.map((s)=>{
        return {
          title: `${s.title} (${s.selector})`,
          selector: s.selector
        }
      })
    },
    css () {
      return `${this.selector}{
        background-color: cyan !important;
        border-color: yellow !important;
      }`
    },
    exapandHtml () {
      try {
        const tree = parse(this.htmlString);
        tree.walk(node => { 
          node.setAttribute('data-tag', node.name)
        })
        return expand(tree)        
      } catch (error) {
        return 'HTML省略記法(Emmet)が正しくありません。'        
      }
    }
  },
  methods: {
    changeUrl (val) {
      window.history.pushState(null, `${this.selector} の CSSの見えかた`, `?selector=${encodeURIComponent(this.selector)}&html=${encodeURIComponent(this.htmlString)}`)
    },
    changeSelector (val) {
      this.selector = val
    }
  },
  watch: {
    selector () {
      this.changeUrl()
    },
    htmlString () {
      this.changeUrl()
    }
  },
  created () {
    if (metyaTEMPORAY.selector) {
      this.selector = metyaTEMPORAY.selector      
    }
    if (metyaTEMPORAY.htmlString) {
      this.htmlString = metyaTEMPORAY.htmlString
    }
   
  }
}
</script>
