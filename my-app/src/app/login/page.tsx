import Login_Form from "./Login_Form";




export default function page(){
    return (
        <main className="w-full min-h-screen flex flex-col items-center py-20">
            <h1 className="text-3xl font-bold underline">
                Login Page
            </h1>
            <Login_Form />
        </main>
    )
}