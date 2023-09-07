import styles from './styles/ListingContainer.module.css';
import Listing from './Listing';

export default function ListingContainer({ items }) {
  return (
    <div className={styles['listing-list']}>
      {items.map(item => (
        <Listing key={item.id} item={item} />
      ))}
    </div>
  );
}
