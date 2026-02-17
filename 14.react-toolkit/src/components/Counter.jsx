import { useDispatch, useSelector } from "react-redux"
import { increment, decrement, reset } from "../redux/features/counter/counterSlice"

const Counter = () => {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    return (
        <div>
            <h2>
                Counter Component
            </h2>
            <button onClick={() => dispatch(increment())}>increment</button>
            <span>{count}</span>
            <button onClick={() => dispatch(decrement())}>decrement</button>
            <button onClick={() => dispatch(reset())}>reset</button>
        </div>
    )
}

export default Counter