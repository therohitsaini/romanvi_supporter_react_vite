export const formatData = (apiData: any[]) => {
    return apiData.map((item) => {
        const day = new Date(item.date).toLocaleDateString("en-US", {
            weekday: "short",
        });

        return {
            date: day,   // Mon, Tue...
            chats: item.chats,
            users: item.users,
        };
    });
};