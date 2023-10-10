import { ListingResponse } from '../../interface';
import Listing from './Listing';
import Pagination from '../../(component)/Pagination';
import Loading from '../../(component)/Loading';
import styles from './styles/ListingContainer.module.css';

async function getListing(page = 1): Promise<ListingResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/listing?page=${page}`,
    {
      next: { revalidate: 1000 },
    },
  );
  if (!res.ok) {
    throw new Error('Failed to fetch listing');
  }
  return res.json();
}

export default async function ListingContainer({ pageNo }: { pageNo: number }) {
  const listing = await getListing(pageNo);

  return (
    <>
      {listing === null ? (
        <Loading />
      ) : (
        <div className={styles['listing-container']}>
          <div className={styles['listing-list']}>
            {listing.items.map(item => (
              <Listing key={item.id} item={item} />
            ))}
          </div>
          <div className={styles['listing-pagination']}>
            <Pagination
              currentPage={pageNo}
              totalPages={listing.meta.totalPages}
              hrefBuilder={(pageNumber: number) => `/listing/${pageNumber}`}
            />
          </div>
        </div>
      )}
    </>
  );
}
