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
    <template #info>
      <div class="info-wrapper">
        <h1>The Fefteen Game</h1>
        <p>Click on block to move it to empty spot near it</p>
        <p>final result must look like that:</p>
        <div class="outer">
          <div class="grid">
            <div class="info-block" v-for="item in 15">
              <div class="number">{{ item }}</div>
            </div>
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
.info-wrapper {
  text-align: center;
  padding: 10px;
  min-width: 200px;
  .outer {
    aspect-ratio: 1/1;
    border-radius: 5% ;
    border: 1px solid black;
    height: fit-content;
    width: fit-content;
    padding: 5px;
    margin: 0 auto;
    .grid{
      display: grid;
      grid-template-rows: 1fr 1fr 1fr 1fr;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 3px;
      .info-block{
        border: 1px solid black;
        border-radius: 5px;
        height: 40px;
        width: 40px;
        position: relative;
        .number{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
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
