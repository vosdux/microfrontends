import { createEvent, createStore } from "effector";

const $counter = createStore(0);
export const plus = createEvent();

$counter.on(plus, (state) => state + 1);

export default $counter;