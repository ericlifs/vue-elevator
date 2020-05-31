import ELEVATOR_STATUS from './elevator-status'

const state = {
  currentFloor: 0,
  status: ELEVATOR_STATUS.INITIAL,
  queue: [],
}

const getters = {
  currentFloor: state => state.currentFloor,
  isQueueEmpty: state => state.queue.length === 0,
  firstFromQueue: state => state.queue[0] || 0,
  status: state => state.status,
  queue: state => state.queue
}

// let timeoutId = null;

const actions = {
  requestElevator: ({ dispatch, commit, getters }, floor) => {
    if (getters.status === ELEVATOR_STATUS.INITIAL) {
      dispatch('goToFloor', floor)
      return
    }

    if (!getters.queue.includes(floor)) {
      commit('addToQueue', floor)
    }
  },
  goToFloor: ({ commit }, floor, ) => {
    commit('goToFloor', floor)
    commit('setStatus', ELEVATOR_STATUS.ON_TRAVEL)
  },
  onTravelEnded: ({ commit }, floor) => {
    const nextStatus = floor ? ELEVATOR_STATUS.WAITING_FOR_INPUT : ELEVATOR_STATUS.INITIAL
    commit('setStatus', nextStatus)

    /*
    timeoutId = setTimeout(() => {
      const nextFloor = getters.firstFromQueue
      const nextStatus = nextFloor ? ELEVATOR_STATUS.ON_TRAVEL : ELEVATOR_STATUS.INITIAL

      commit('setStatus', nextStatus)
      dispatch('goToFloor', nextFloor)
    }, 5000)
    */
  }
}

const mutations = {
  goToFloor: (state, floor) => state.currentFloor = floor,
  setStatus: (state, status) => state.status = status,
  addToQueue: (state, floor) => state.queue = [...state.queue, floor]
}

export default {
  state,
  getters,
  actions,
  mutations
}