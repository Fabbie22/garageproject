import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Star({ filled, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`text-2xl transition-colors ${
                filled ? "text-yellow-400" : "text-gray-300"
            }`}
            aria-label="Star"
        >
            <FontAwesomeIcon icon={faStar} />
        </button>
    );
}
