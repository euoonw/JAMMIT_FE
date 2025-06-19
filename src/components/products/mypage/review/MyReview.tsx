import ReviewList from './ReviewList';
import ReviewStatus from './ReviewStatus';

export default function MyReview() {
  return (
    <div className="pc:px-0 tab:px-4 flex flex-wrap items-start gap-5 px-3.5">
      <ReviewStatus />
      <ReviewList />
    </div>
  );
}
