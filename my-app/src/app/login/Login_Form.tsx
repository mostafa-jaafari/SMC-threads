


export default function Login_Form() {
    return (
        <main className="w-1/3">
            <button 
                className="flex items-center gap-2 border 
                    border-neutral-800 rounded-lg p-2 w-full
                    hover:bg-black cursor-pointer
                    bg-black/30">
                <svg width="20" height="20" viewBox="0 0 48 48" style={{ verticalAlign: 'middle', marginRight: 8 }}>
                    <g>
                        <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 32.9 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 3.1l6.4-6.4C34.5 5.1 29.6 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.3-4z"/>
                        <path fill="#34A853" d="M6.3 14.7l7 5.1C14.7 16.2 19 13 24 13c3.1 0 5.9 1.1 8.1 3.1l6.4-6.4C34.5 5.1 29.6 3 24 3c-7.2 0-13.4 4.1-16.7 10.1z"/>
                        <path fill="#FBBC05" d="M24 43c5.5 0 10.1-1.8 13.5-4.9l-6.2-5.1C29.6 34.7 27 36 24 36c-6.1 0-10.7-4.1-12.5-9.6l-7 5.4C6.6 39 14.7 43 24 43z"/>
                        <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.1 5.5-7.7 5.5-3.1 0-5.9-1.1-8.1-3.1l-6.4 6.4C13.5 42.9 18.4 45 24 45c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.3-4z"/>
                    </g>
                </svg>
                Login with Google
            </button>
            <div></div>
        </main>
    )
}