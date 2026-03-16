function LandingHome() {
    return (
        <div className="w-full w-full ">
            <div className="w-full  w-full  p-10 ">
                <div className="mt-10 text-center ">
                    <p className="text-blue-400 text-sm mb-4">
                        Talk Smarter, Connect Faster
                    </p>

                    <h1 className="text-4xl md:text-6xl font-semibold text-white leading-tight">
                        Effortless Communication, <br /> Powered by AI
                    </h1>

                    <p className="mt-6 max-w-2xl mx-auto text-gray-400">
                        Experience seamless interactions with intelligent AI that makes
                        conversations faster, clearer, and more natural.
                    </p>

                    <button className="mt-10 rounded-full bg-blue-600 px-8 py-3 text-white font-medium hover:bg-blue-500">
                        Try For Free →
                    </button>
                </div>


                <div className="relative mt-32 grid grid-cols-1 md:grid-cols-3 items-center gap-10">

                    {/* LEFT FEATURE */}
                    <div className="relative rounded-2xl border border-dashed border-blue-500/30 bg-white/5 p-8 text-center backdrop-blur-sm">
                        <h3 className="text-lg font-semibold text-white">
                            Create Stunning Image With AI
                        </h3>
                        <p className="mt-3 text-sm text-gray-400">
                            Simply type a description and generate stunning visuals instantly.
                        </p>

                        <div className="mt-6 flex justify-center">
                            <div className="h-12 w-12 rounded-full bg-blue-600/20 flex items-center justify-center text-xl">
                                🖼️
                            </div>
                        </div>
                    </div>

                    {/* CENTER AI CARD */}
                    <div className="relative z-10 rounded-[32px] border border-blue-500/40 bg-gradient-to-b from-blue-500/20 to-transparent p-5 text-center shadow-xl shadow-blue-500/20">

                        {/* AI BOT */}
                        <div className="mx-auto h-36 w-36 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-5xl text-white shadow-lg">
                            🤖
                        </div>

                        {/* CHAT */}
                        <div className="mt-8 space-y-3 text-left text-sm">
                            <div className="rounded-xl bg-white/10 p-3 text-gray-300">
                                <b className="text-white">User:</b> What is AI Chatbot? Please tell me now.
                            </div>
                            <div className="rounded-xl bg-blue-600/30 p-3 text-gray-200">
                                <b className="text-white">AI:</b> An AI chatbot is a smart virtual assistant that chats and answers instantly.
                            </div>
                        </div>

                        <button className="mt-8 rounded-full bg-blue-600 px-7 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500">
                            Try For Free →
                        </button>
                    </div>

                    {/* RIGHT FEATURE */}
                    <div className="relative rounded-2xl border border-dashed border-blue-500/30 bg-white/5 p-8 text-center backdrop-blur-sm">
                        <h3 className="text-lg font-semibold text-white">
                            Chat with any Document
                        </h3>
                        <p className="mt-3 text-sm text-gray-400">
                            Upload PDFs, docs, or links and get instant answers from AI.
                        </p>

                        <div className="mt-6 flex justify-center gap-3 text-xl">
                            📄 📊 🔗
                        </div>
                    </div>

                </div>


            </div>
        </div>

    );
}

export default LandingHome;
/* Feature Card Component */
function FeatureCard({ title, text }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <h3 className="text-white font-medium">{title}</h3>
            <p className="mt-3 text-sm text-gray-400">{text}</p>
        </div>
    );
}
