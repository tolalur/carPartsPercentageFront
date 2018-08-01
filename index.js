import { h, app } from "hyperapp"
import { test } from "./test"

const state = {
    count: 0
}

const actions = {
    getState: () => state => state,
    down: value => state => ({ count: state.count - value }),
    up: value => state => ({ count: state.count + value }),
    setTest: state => ({count: test})
}

const view = (state, actions) => (
    <div>
        <h1>{state.count}</h1>
        <button onclick={() => actions.down(1)}>-</button>
        <button onclick={() => actions.up(1)}>+</button>
        <button onclick={() => actions.setTest()}>+ +</button>
    </div>
)

app(state, actions, view, document.body);