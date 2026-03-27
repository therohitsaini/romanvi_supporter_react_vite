import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../config/api";




interface TopQuestion {
    label: string;
    value: number;
}

const TopQueries = () => {
    const [topQuery, setTopQuery] = useState<TopQuestion[]>([])
    const userId = localStorage.getItem("_user_Identy_v3")
    const getTopQuery = async () => {
        try {
            const response = await api.get(`/api/patner/admin/partner/top/user/questions/dashboard/${userId}`)
            console.log("___", response?.data)
            const { data } = response.data
            setTopQuery(data)
            // if(response)
        } catch (error) {
            console.log("error", error)
        }
    }
    useEffect(() => {
        if (userId) {
            getTopQuery()
        }
    }, [userId])
    console.log("topQuery", topQuery)
    return (
        <div className="bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#020617] p-5 rounded-2xl w-full max-w-sm shadow-md">

            <div className="flex justify-between items-center mb-4">
                <h2 className="text-white text-md font-semibold">
                    Top Queries
                </h2>
                <span className="text-green-400 text-sm">+60</span>
            </div>

            <div className="flex flex-col gap-3">
                {
                    topQuery?.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-[#0B0F19] px-4 py-1.5 rounded-lg hover:bg-[#111827] transition"
                        >
                            <div className="flex items-center gap-2 text-gray-300 text-sm">
                                <Search size={16} className="text-gray-500" />
                                {item.label}
                            </div>

                            <span className="text-white font-medium">
                                {item.value}
                            </span>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default TopQueries;