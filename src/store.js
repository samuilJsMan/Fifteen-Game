import { createStore } from "vuex";
export default createStore({
  state: {
    randArr: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0],
    ended: false,
    result:`win`,
    score:0
  },
  getters: {
    getRandArr(state) {
      return state.randArr;
    },
    isEnded(state) {
      return state.ended;
    },
    getResult(state){
      return state.result
    },
    getScore(state){
      return state.score
    }
  },
  mutations: {
    randomise(state) {
      function rand(){
          for(let i=0; i<30; i++ ){
          const randOne=Math.floor(Math.random()*16)
          const randTwo=Math.floor(Math.random()*16)
          const temp=state.randArr[randOne]
          state.randArr[randOne]=state.randArr[randTwo]
          state.randArr[randTwo]=temp
        }
        const reduced=state.randArr.reduce((acc,i,ind)=>{
          state.randArr.slice(ind+1).forEach((item)=>{
            if(item<i&&i!==0&&item!==0){
              acc++}
          })
          return acc
        },0)
        if(reduced%2===Math.floor(state.randArr.indexOf(0)/4)%2){
         rand()
        }
      }
      rand()
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
        state.score++
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

          let condition = true;
          for (let i in state.randArr) {
            if (i == 15) {
              continue;
            }
            if (i != state.randArr[i] - 1) {
              condition = false;
              break;
            }
          }
          state.ended = condition;
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
