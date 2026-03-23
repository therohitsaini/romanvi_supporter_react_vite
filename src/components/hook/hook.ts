import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "../../reduxToolKit/store/Store";

// ✅ typed dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// ✅ typed selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;