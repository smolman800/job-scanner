import styles from './styles/Listing.module.css';
import { Listing } from '../interface';

export default function Listing({ item }: { item: Listing }) {
  return (
    <a href={item.pageUrl} target="_blank">
      <div className={styles['listing']} key={item.id}>
        <div
          className={styles['listing__logo']}
          style={{
            height: '100%',
            width: '10%',
          }}
        >
          <img src="/shopee-logo.png" />
        </div>
        <div className={styles['listing__titleCompany']}>
          <div className="jobTitle">
            <u>
              <span>Job Title</span>
            </u>
            <br />
            <b>
              <span className={styles['listing__titleCompany--jobTitle']}>
                {item.jobTitle}
              </span>
            </b>
          </div>
          <div className={styles['listing__titleCompany--company']}>
            <u>
              <span>Company</span>
            </u>
            <br />
            <b>
              <span>{item.company}</span>
            </b>
          </div>
        </div>
        <div className={styles['listing__salary']}>
          <div className={styles['listing__salary--salary']}>
            <u>
              <span>Salary</span>
            </u>
            <br />
            <b>
              <span>
                {item.salaryMin} - {item.salaryMax} {item.currency}
              </span>
            </b>
          </div>
        </div>
        <div className={styles['listing__dateIndustry']}>
          <div className={styles['listing__dateIndustry--date']}>
            <span>{item.postDate}</span>
          </div>
          <div className={styles['listing__dateIndustry--industry']}>
            <b>
              <span>{item.industry}</span>
            </b>
          </div>
        </div>
      </div>
    </a>
  );
}
