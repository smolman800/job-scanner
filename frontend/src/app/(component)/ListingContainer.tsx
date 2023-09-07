import Listing from './Listing';

export default function ListingContainer({ items }) {
  return (
    <div
      className="listing-list"
      style={{
        backgroundColor: 'grey',
        width: '70vw',
        height: '70vh',
        overflowY: 'scroll',
      }}
    >
      {items.map(item => (
        <Listing key={item.id} item={item} />
      ))}
    </div>
  );
}
