


interface ToggleButtonProps {
    setIsActive: (active: boolean) => void;
    isActive: boolean;
}
export function ToggleButton({ setIsActive, isActive }: ToggleButtonProps){
    
    const handleClick = () => {
        const newState = !isActive;
        setIsActive(newState);
    };
    return (
        <div
            onClick={handleClick}
            className={`relative flex-shrink-0 overflow-hidden cursor-pointer 
                w-18 h-9 p-0.5 rounded-full border flex items-center
                ${isActive ? "bg-white border-neutral-300" : "bg-neutral-800 border-neutral-700"}`}
        >
            <span 
                className={`h-8 w-8 rounded-full bg-neutral-900 absolute
                    ${isActive ? "left-9" : "left-1"}`}
            ></span>
        </div>
    )
}