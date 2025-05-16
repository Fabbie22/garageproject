export default function DropdownForm({ children, ...props }) {
    return (
        <select
            {...props}
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
        >
            {children}
        </select>
    );
}
