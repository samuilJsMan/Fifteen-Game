<template>
  <commonBG>
    <template #body>
      <div class="mainBody">
        <div class="outerGameSpace">
          <div class="innerGameSpace">
            <theBlock
              v-for="number in randArr"
              :key="number * Math.random()"
              :number="number"
            ></theBlock>
          </div>
        </div>
      </div>
    </template>
  </commonBG>
</template>

<script>
import theBlock from "./block.vue";
import commonBG from "./commonBG.vue";
import { useStore } from "vuex";
export default {
  components: { theBlock, commonBG },
  setup() {
    const store = useStore();
    store.dispatch(`randomise`);
    const randArr = store.getters.getRandArr;

    return {
      randArr,
    };
  },
};
</script>

<style lang="scss">
.mainBody {
  height: 100%;
  position: relative;
}
.innerGameSpace {
  position: absolute;
  aspect-ratio: 1 / 1;
  height: 95%;
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
  aspect-ratio: 1 / 1;
  height: fit-content;
  max-height: 85%;
  max-width: 85%;
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
