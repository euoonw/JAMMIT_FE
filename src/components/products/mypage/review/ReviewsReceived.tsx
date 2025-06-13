import ReviewList from './ReviewList';
import ReviewStatus from './ReviewStatus';

export default function ReviewsReceived() {
  return (
    <div className="flex items-start gap-5">
      <ReviewStatus />
      <ReviewList />
    </div>
  );
}
