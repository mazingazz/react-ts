import { delay, put, takeEvery, ForkEffect } from "redux-saga/effects";

type ActionTypes = {
  type: string;
  r?: number | undefined;
};

type StateTypes = {
  number: number;
  diff: number;
};

// 액션 타입
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const INCREASE_ASYNC = "INCREASE_ASYNC";
const DECREASE_ASYNC = "DECREASE_ASYNC";

// 액션 생성 함수
export const increase = (r: number): ActionTypes => ({ type: INCREASE, r });
export const decrease = (): ActionTypes => ({ type: DECREASE });
export const increaseAsync = (): ActionTypes => ({ type: INCREASE_ASYNC });
export const decreaseAsync = (): ActionTypes => ({ type: DECREASE_ASYNC });

function* increaseSaga() {
  const r = 1;
  yield put(increase(r)); // put은 특정 액션을 디스패치 해줍니다.
}
function* decreaseSaga() {
  yield delay(1000); // 1초를 기다립니다.
  yield put(decrease()); // put은 특정 액션을 디스패치 해줍니다.
}

export function* counterSaga(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(INCREASE_ASYNC, increaseSaga); // 모든 INCREASE_ASYNC 액션을 처리
  yield takeEvery(DECREASE_ASYNC, decreaseSaga); // 가장 마지막으로 디스패치된 DECREASE_ASYNC 액션만을 처리
}
// 초깃값 (상태가 객체가 아니라 그냥 숫자여도 상관 없습니다.)
const initialState = {
  number: 0,
  diff: 1,
};

export default function counter(
  state = initialState,
  action: ActionTypes
): StateTypes {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        number: state.number + state.diff,
      };
    case DECREASE:
      return {
        ...state,
        number: state.number - state.diff,
      };
    default:
      return state;
  }
}
