import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../../reduxToolKit/store/Store";
import Loader from "../Helper/Loader";

const ProtectedRoute = ({ children }:{ children: React.ReactNode }) => {
    const { isAuth, loading } = useSelector((state: RootState) => state.auth);

    if (loading) return <Loader />; 

    if (!isAuth) return <Navigate to="/login" />;

    return children;
};

export default ProtectedRoute;