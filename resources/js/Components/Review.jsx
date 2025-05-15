import ReviewStars from "./ReviewStars";

export default function Review({ review }) {
    const datePlaced = new Date(review.created_at);
    const formattedDatePlaced = `${datePlaced.getDate()}-${
        datePlaced.getMonth() + 1
    }-${datePlaced.getFullYear()}`;

    return (
        <div className="bg-[#faf7f7] p-12">
            <div>
                <ReviewStars amount={review.rating} />
            </div>
            <h1 className="text-xl font-bold">
                {review.user.first_name} {review.user.last_name}
            </h1>
            <p>{review.description}</p>
            <p>
                Geplaatst op: <b>{formattedDatePlaced}</b>
            </p>
        </div>
    );
}
