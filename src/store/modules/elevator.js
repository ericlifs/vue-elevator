import ELEVATOR_STATUS from './elevator-status'

const state = {
  currentFloor: 0,
  processingRequest: false,
  status: ELEVATOR_STATUS.INITIAL,
  queue: [],
}

const getters = {
  currentFloor: state => state.currentFloor,
  isQueueEmpty: state => state.queue.length === 0,
  firstFromQueue: state => state.queue[0] || 0,
  status: state => state.status,
  queue: state => state.queue,
  processingRequest: state => state.processingRequest
}

let timeoutId = null;

const getNextStatus = floor => floor ? ELEVATOR_STATUS.ON_TRAVEL : ELEVATOR_STATUS.INITIAL

const actions = {
  requestElevator: ({ dispatch, commit, getters }, floor) => {
    if (getters.status === ELEVATOR_STATUS.INITIAL || getters.status === ELEVATOR_STATUS.TRAVEL_ENDED) {
      dispatch('goToFloor', floor)
      return
    }

    if (!getters.queue.includes(floor)) {
      commit('addToQueue', floor)
    }
  },
  goToFloor: ({ commit }, floor) => {
    clearTimeout(timeoutId)

    commit('goToFloor', floor)
    commit('setStatus', getNextStatus(floor))
  },
  processNextFromQueue: ({ commit, dispatch, getters }) => {
    const nextFloor = getters.firstFromQueue

    if (nextFloor) {
      commit('removeFromQueue')
    }

    commit('setStatus', getNextStatus(nextFloor))
    dispatch('goToFloor', nextFloor)
  },
  onTravelEnded: ({ commit, dispatch, getters }, floor) => {
    if (getters.processingRequest || !floor) {
      commit('setProcessingRequest', false)
      commit('setStatus', ELEVATOR_STATUS.TRAVEL_ENDED)

      return dispatch('processNextFromQueue')
    }

    commit('setStatus', ELEVATOR_STATUS.WAITING_FOR_INPUT)

    timeoutId = setTimeout(() => {
      dispatch('processNextFromQueue')
    }, 5000)
  },
  setProcessingRequest: ({ commit }, value) => {
    commit('setProcessingRequest', value)
  }
}

const mutations = {
  goToFloor: (state, floor) => state.currentFloor = floor,
  setStatus: (state, status) => state.status = status,
  addToQueue: (state, floor) => state.queue = [...state.queue, floor],
  setProcessingRequest: (state, value) => state.processingRequest = value,
  removeFromQueue: (state) => {
    const [, ...tail] = state.queue;
    state.queue = tail
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}