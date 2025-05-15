import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ReviewStars({ amount }) {
    return (
        <div>
            {Array.from({ length: amount }).map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500 text-xl"/>
            ))}
        </div>
    );
}
