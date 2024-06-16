export default function LoadingComponent() {
    return (
        <div className="h-screen relative flex justify-center items-center">
            <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-700"></div>
            <img src="/icon.png"  className="rounded-full h-16 w-16" />
        </div>
    )
} 