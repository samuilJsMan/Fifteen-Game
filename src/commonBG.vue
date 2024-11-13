<template>
  <div class="body">
    <div ref="BG">
      <div class="background1 bg"></div>
      <div class="background2 bg"></div>
      <div class="background3 bg"></div>
      <div class="background4 bg"></div>
      <div class="background5 bg"></div>
    </div>
    <div class="wrapper">
      <slot name="body"></slot>
      <div class="endScreen" ref="endScreen">
        <div class="insideText">
          <div class="text" ref="text"></div>
          <div class="score" ref="scoreRef">*Score there*</div>
        </div>
      </div>
      <div class="info_button" @click="showInfo = true"></div>
      <div class="settings_button" @click="showSettings"></div>
      <div
        class="info-backdrop"
        @click="showInfo = false"
        v-if="showInfo"
      ></div>
      <transition>
        <div class="info" v-if="showInfo">
          <slot name="info"></slot>
        </div>
      </transition>
      <div class="settings_screen" @click="hideSettings" ref="settingsScreen">
        <div class="settings_screen_menue" @click.stop>
          <div class="delete_score" @click="forDelete">Delete score</div>
          <div class="colorBG" ref="buttonsBG">
            <div class="colorBG1 BG" @click="change(0)"></div>
            <div class="colorBG2 BG" @click="change(1)"></div>
            <div class="colorBG3 BG" @click="change(2)"></div>
            <div class="colorBG4 BG" @click="change(3)"></div>
            <div class="colorBG5 BG" @click="change(4)"></div>
          </div>
          <slot name="settings"></slot>
          <div class="more" @click="GitHubPage">See other author works</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from "vue";
import { useStore } from "vuex";
export default {
  emits: ["deleteScore"],
  setup(_, context) {
    const settingsScreen = ref(null);
    const BG = ref(null);
    const buttonsBG = ref(null);
    const store = useStore();
    const ended = computed(() => store.getters.isEnded);
    const result = computed(() => store.getters.getResult);
    const score = computed(() => store.getters.getScore);
    const text = ref(null);
    const endScreen = ref(null);
    const scoreRef = ref(null);
    const showInfo = ref(false);

    watch(ended, () => {
      if (ended.value === false) {
        return;
      }
      text.value.innerHTML = result.value;
      if (localStorage.records < score) {
        localStorage.setItem(`records`, score.value);
      }
      setTimeout(() => {
        endScreen.value.style.transition = `0.5s`;
        endScreen.value.style.opacity = `1`;
        endScreen.value.style.visibility = `visible`;
      }, 10);
      setTimeout(() => {
        endScreen.value.style.opacity = `0`;
        endScreen.value.style.visibility = `hidden`;
      }, 2000);
      scoreRef.value.innerHTML = `Score: ${score.value}`;
    });

    if (!localStorage.records) {
      localStorage.setItem(`records`, 0);
    }

    if (!localStorage.background) {
      localStorage.setItem(`background`, 0);
    }

    function showSettings() {
      settingsScreen.value.style.display = `block`;
      setTimeout(() => {
        settingsScreen.value.style.transition = `0.3s`;
        settingsScreen.value.style.opacity = `1`;
      });
    }

    onMounted(() => {
      BG.value.children[localStorage.background].style.opacity = `1`;
      buttonsBG.value.children[localStorage.background].classList.add(`chosen`);
    });

    function hideSettings() {
      settingsScreen.value.style.transition = `0.3s`;
      settingsScreen.value.style.opacity = `0`;
      setTimeout(() => {
        settingsScreen.value.style.display = `none`;
      }, 300);
    }
    function forDelete() {
      if (localStorage.records) {
        localStorage.setItem(`records`, 0);
      }
      context.emit(`deleteScore`);
    }
    function GitHubPage() {
      window.open("https://github.com/samuilJsMan", "_blank");
    }
    function change(x) {
      for (let i of BG.value.children) {
        i.style.cssText = `
		      opacity: 0;
		      z-index: 0;
		      transition: opacity 1s;
		      `;
      }
      BG.value.children[x].style.cssText = `
		    opacity: 1;
		    z-index: -1;
		    transition: opacity 0s;
		    `;
      for (let i of buttonsBG.value.children) {
        i.classList.remove(`chosen`);
      }
      buttonsBG.value.children[x].classList.add(`chosen`);
      localStorage.background = x;
    }
    return {
      showSettings,
      settingsScreen,
      hideSettings,
      forDelete,
      GitHubPage,
      BG,
      buttonsBG,
      change,
      ended,
      text,
      endScreen,
      scoreRef,
      showInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
.v-enter-from{
  opacity: 0;
}

.v-leave-to{
  opacity: 0;
}

.v-enter-to{
  opacity: 1;
}

.v-leave-from{
  opacity: 1;
}

.v-enter-active{
  transition: opacity 0.4s;
}

.v-leave-active{
  transition: opacity 0.4s;
}
.body {
  height: 100%;
}
body {
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .background1 {
    background: linear-gradient(135deg, #52d38e 0%, #0f69bd 100%);
    opacity: 0;
  }
  .background2 {
    background: linear-gradient(135deg, #f2d6ac 0%, #ea5455 100%);
    opacity: 0;
  }
  .background3 {
    background: linear-gradient(135deg, #56ccf2 0%, #144bcc 100%);
    opacity: 0;
  }
  .background4 {
    background: linear-gradient(135deg, #f2d6ac 0%, #f76b1c 100%);
    opacity: 0;
  }
  .background5 {
    background: rgb(179, 132, 207);
    opacity: 0;
  }
  overflow: hidden;
  touch-action: none;
  user-select: none;
  position: relative;
  -webkit-tap-highlight-color: transparent;
  .wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    .info {
      position: absolute;
      top: 40px;
      right: 90px;
      height: fit-content;
      width: fit-content;
      padding: 5px;
      background: rgba(255, 255, 255,0.5);
      border: 1px solid black;
      border-radius: 10px 0 10px 10px;
    }
    .info-backdrop {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
    }
    .endScreen {
      visibility: hidden;
      transition-property: opacity;
      opacity: 0;
      width: 100%;
      height: 200px;
      max-height: 16%;
      background: rgb(244, 245, 198);
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 2;
      transform: translate(-50%, -50%);
      border-top: 5px solid grey;
      border-bottom: 5px solid grey;
      .insideText {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        .text {
          margin-bottom: 10px;
          font-size: 50px;
        }
        .score {
          font-size: 50px;
          font-weight: 400;
        }
      }
    }
  }
  .settings_button {
    width: 40px;
    height: 40px;
    background-color: rgb(255, 255, 255);
    background-image: url("https://www.svgrepo.com/show/491069/settings.svg");
    background-size: 75%;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 50%;
    position: absolute;
    opacity: 0.2;
    top: 10px;
    right: 10px;
    transition: 0.3s;
  }
  .settings_button:hover {
    transform: rotate(90deg);
    opacity: 1;
  }
  .info_button {
    width: 40px;
    height: 40px;
    background-color: rgb(255, 255, 255);
    background-image: url("https://t4.ftcdn.net/jpg/02/81/19/31/240_F_281193138_h1GS7sfJ3WuOngca5soMRZETJXTmDeJk.jpg");
    background-size: 75%;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 50%;
    position: absolute;
    opacity: 0.2;
    top: 10px;
    right: 55px;
    transition: 0.5s;
  }
  .info_button:hover {
    transform: rotate(360deg);
    opacity: 1;
  }
  .settings_screen {
    display: none;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    opacity: 0;
    transition: 0.3s;
    .settings_screen_menue {
      background: rgb(244, 245, 198);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: fit-content;
      width: 330px;
      border-radius: 20px;
      padding: 20px;
      .delete_score {
        width: 100%;
        height: 50px;
        background: rgb(48, 134, 219);
        font-size: 30px;
        padding: 10px 0 0 0;
        margin: 0 auto;
        border-radius: 10px;
        text-align: center;
      }
      .delete_score:hover {
        background: rgb(227, 122, 61);
      }
      .colorBG {
        display: flex;
        justify-content: space-between;
        height: 50px;
        width: 100%;
        margin-top: 10px;
        .colorBG1 {
          background: linear-gradient(135deg, #52d38e 0%, #0f69bd 100%);
        }
        .colorBG2 {
          background: linear-gradient(135deg, #f2d6ac 0%, #ea5455 100%);
        }
        .colorBG3 {
          background: linear-gradient(135deg, #56ccf2 0%, #144bcc 100%);
        }
        .colorBG4 {
          background: linear-gradient(135deg, #f2d6ac 0%, #f76b1c 100%);
        }
        .colorBG5 {
          background: rgb(179, 132, 207);
        }
        .chosen {
          border: 3px solid rgba(145, 230, 76, 1);
          opacity: 1;
        }
      }
      .BG {
        opacity: 0.8;
        height: 100%;
        width: 50px;
        display: inline-block;
        border-radius: 10px;
        transition: 0.5s;
        transition-property: opacity;
      }
      .BG:hover {
        opacity: 1;
      }
      .more {
        background: #3086db;
        height: 50px;
        font-size: 25px;
        margin-top: 10px;
        text-align: center;
        border-radius: 10px;
        padding-top: 12px;
        transition: 0.3s;
      }
      .more:hover {
        background: #e37a3d;
      }
    }
  }
  .settings_screen_open {
    opacity: 1;
    display: block;
    transition: 0.3s;
  }
}
</style>
