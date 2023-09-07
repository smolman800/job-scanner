import styles from './styles/ListingContainer.module.css';
import Listing from './Listing';
import { Listing as ListingType } from '../interface';

export default function ListingContainer({ items }: { items: ListingType[] }) {
  return (
    <div className={styles['listing-list']}>
      {items.map(item => (
        <Listing key={item.id} item={item} />
      ))}
    </div>
  );
}
