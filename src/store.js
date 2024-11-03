import { createStore } from "vuex";
export default createStore({
  state: {
    randArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0],
    isWin: false,
  },
  getters: {
    getRandArr(state) {
      return state.randArr;
    },
    getIsWin(state) {
      return state.isWin;
    },
  },
  mutations: {
    randomise(state) {
      for(let i=0; i<30; i++ ){
        const randOne=Math.floor(Math.random()*16)
        const randTwo=Math.floor(Math.random()*16)
        const temp=state.randArr[randOne]
        state.randArr[randOne]=state.randArr[randTwo]
        state.randArr[randTwo]=temp
      }
    },
    move(state, data) {
      const arr = state.randArr;
      const indexOfItem = arr.indexOf(data.item);
      const indexOfZero = arr.indexOf(0);
      if (
        arr[indexOfItem - 1] === 0 ||
        arr[indexOfItem + 1] === 0 ||
        arr[indexOfItem - 4] === 0 ||
        arr[indexOfItem + 4] === 0
      ) {
        if(arr[indexOfItem - 1] === 0){
          data.block.style.transform=`translate(-118%,0)`
        }else if(arr[indexOfItem + 1] === 0){
          data.block.style.transform=`translate(118%,0)`
        }else if(arr[indexOfItem - 4] === 0){
          data.block.style.transform=`translate(0,-118%)`
        }else{
          data.block.style.transform=`translate(0,118%)`
        }
        setTimeout(() => {
          arr[indexOfItem] = 0;
          arr[indexOfZero] = data.item;

          let win = true;
          for (let i in state.randArr) {
            if (i == 15) {
              continue;
            }
            if (i != state.randArr[i] - 1) {
              win = false;
              break;
            }
          }
          state.isWin = win;
        }, 200);
      }
    },
  },
  actions: {
    randomise(context) {
      context.commit(`randomise`);
    },
    move(context, data) {
      context.commit(`move`, data);
    },
  },
});
