import ListingContainer from '../(component)/ListingContainer';

export default function Listing({ params }: { params: { pageNo: string } }) {
  return (
    <>
      <ListingContainer pageNo={parseInt(params.pageNo)} />
    </>
  );
}
