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
  firstFromQueue: state => state.queue[0],
  status: state => state.status,
  queue: state => state.queue,
  processingRequest: state => state.processingRequest,
  isOnLazyState: state => state.status === ELEVATOR_STATUS.INITIAL || state.status === ELEVATOR_STATUS.TRAVEL_ENDED
}

let timeoutId = null;

const actions = {
  requestElevator: ({ dispatch, commit, getters }, floor) => {
    if (getters.isOnLazyState) {
      if (floor !== 0) {
        dispatch('goToFloor', floor)
      } else {
        commit('setStatus', ELEVATOR_STATUS.WAITING_FOR_INPUT)
      }

      return
    }

    if (!getters.queue.includes(floor)) {
      commit('addToQueue', floor)
    }
  },
  goToFloor: ({ commit }, floor) => {
    clearTimeout(timeoutId)

    commit('setStatus', ELEVATOR_STATUS.ON_TRAVEL)
    commit('goToFloor', floor)
  },
  processNextFromQueue: ({ commit, dispatch, getters }) => {
    const nextFloor = getters.firstFromQueue

    if (nextFloor !== undefined) {
      commit('removeFromQueue')
    }

    if (nextFloor !== getters.currentFloor) {
      dispatch('goToFloor', nextFloor || 0)

      if (!nextFloor) {
        commit('setStatus', ELEVATOR_STATUS.TRAVEL_ENDED)
      }
    }
  },
  onTravelEnded: ({ commit, dispatch, getters }, floor) => {
    if (getters.processingRequest || floor === 0) {
      const nextStatus = getters.firstFromQueue === floor
        ? ELEVATOR_STATUS.WAITING_FOR_INPUT
        : ELEVATOR_STATUS.TRAVEL_ENDED

      commit('setProcessingRequest', false)
      commit('setStatus', nextStatus)
      dispatch('processNextFromQueue')

      return 
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