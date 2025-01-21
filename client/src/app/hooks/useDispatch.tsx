import { useAppDispatch } from "./rtkHooks"

export default function useDispatch() {
    const dispatch = useAppDispatch();
    return (
        {dispatch}
  )
}
