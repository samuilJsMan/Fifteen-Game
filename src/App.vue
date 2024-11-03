<template>
  <div class="mainBody">
    <div class="outerGameSpace">
      <div class="innerGameSpace">
        <theBlock v-for="number in randArr" :key="number*Math.random()" :number="number"></theBlock>
      </div>
    </div>
  </div>
</template>

<script>
import theBlock from "./block.vue";
import {useStore} from 'vuex'
import {watch,computed} from 'vue'
export default {
  components: { theBlock },
  setup(){
    console.log(0)
    const store = useStore()
    store.dispatch(`randomise`)
    const randArr=store.getters.getRandArr
    const win =computed(()=>store.getters.getIsWin)
  
    watch(win,(value)=>{
      if(value){
        console.log(`win`)
      }
    })
    
    return{
      randArr
    }
  }
};
</script>

<style lang="scss">
.mainBody {
  height: 100%;
  position: relative;
}
.innerGameSpace {
  position: absolute;
  width: 95%;
  aspect-ratio: 1 / 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-rows: 22% 22% 22% 22%;
  grid-template-columns: 22% 22% 22% 22%;
  grid-gap: 4%;
}
.outerGameSpace {
  position: absolute;
  position: relative;
  width: 65%;
  aspect-ratio: 1 / 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  border-radius: 15px;
}

* {
  padding: 0;
  margin: 0;
  border: 0;
}
*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
:focus,
:active {
  outline: none;
}
a:focus,
a:active {
  outline: none;
}
nav,
footer,
header,
aside {
  display: block;
}
html,
body {
  height: 100%;
  width: 100%;
  font-size: 100%;
  line-height: 1;
  font-size: 14px;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
</style>
