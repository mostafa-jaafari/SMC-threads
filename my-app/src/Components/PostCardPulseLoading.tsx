export default function PostCardPulseLoading() {
    return (
        <main className="w-full flex items-start gap-4 p-6 border-b border-neutral-800">
            <div className="relative">
                <div className="w-10 h-10 rounded-full border bg-neutral-800 animate-pulse"></div>
                <span className="absolute bottom-0 right-0 bg-neutral-700 rounded-full w-4 h-4"></span>
            </div>
            
            <section className="w-full">
                <div className="flex items-center gap-1">
                    <div className="relative w-max">
                        <div className="h-5 w-24 bg-neutral-800 rounded animate-pulse"></div>
                    </div>
                    <div className="h-4 w-16 bg-neutral-800 rounded animate-pulse"></div>
                </div>
                
                <div className="mb-4 mt-2 h-4 w-3/4 bg-neutral-800 rounded animate-pulse"></div>
                
                <div className="w-full h-96 bg-neutral-800 rounded-2xl border border-neutral-800 animate-pulse"></div>
                
                <div className="w-full flex items-center gap-6 pt-4">
                    <span className="flex gap-1 items-center">
                        <div className="w-5 h-5 bg-neutral-800 rounded animate-pulse"></div>
                        <div className="w-4 h-4 bg-neutral-800 rounded animate-pulse"></div>
                    </span>
                    <div className="w-5 h-5 bg-neutral-800 rounded animate-pulse"></div>
                    <div className="w-5 h-5 bg-neutral-800 rounded animate-pulse"></div>
                    <div className="w-5 h-5 bg-neutral-800 rounded animate-pulse"></div>
                </div>
            </section>
            
            <div className="relative">
                <div className="w-6 h-6 bg-neutral-800 rounded animate-pulse"></div>
            </div>
        </main>
    )
}