<template>
  <transition>
    <div
      :class="{ block: true, invisible: number == 0 }"
      @click="move"
      ref="block"
    >
      <div>{{ number ? number : null }}</div>
    </div>
  </transition>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
export default {
  props: [`number`],
  setup(props) {
    const block = ref(null);
    const store = useStore();

    function move(){
      if (props.number.value !== 0) {
        store.dispatch(`move`, {item:props.number,block:block.value});
      }
    }

    return {
      move,
      block,
    };
  },
};
</script>

<style lang="scss" scoped>
.block {
  height: 100%;
  width: 100%;
  border-radius: 10%;
  position: relative;
  border: 1px solid black;
  transition: transform 0.2s;
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 25px;
  }
}
.invisible {
  background: transparent;
  color: transparent;
  border: none;
}
</style>
