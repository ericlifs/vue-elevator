const state = {
  currentFloor: 0,
  queue: [],
}

const getters = {
  currentFloor: state => state.currentFloor,
  isQueueEmpty: state => state.queue.length === 0,
  firstFromQueue: state => state.queue[0],
}

const actions = {
  queueRequest: ({ commit, getters }, floor) => {
    // As the queue is empty, the elevator can go directly to the selected floor
    if (getters.isQueueEmpty) {
      // Here it should start directly
    }

    // As the elevator is currently going to a floor, we must queue the request 
    if (floor !== getters.currentFloor && floor !== getters.firstFromQueue) {
      commit('queueRequest', floor)
    }
  }
}

const mutations = {
  queueRequest: (state, floor) => state.queue.push(floor)
}

export default {
  state,
  getters,
  actions,
  mutations
}