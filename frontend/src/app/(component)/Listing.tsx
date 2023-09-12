import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Listing } from '../interface';
import styles from './styles/Listing.module.css';

export default function Listing({ item }: { item: Listing }) {
  return (
    <a href={item.pageUrl} target="_blank">
      <Box className={styles['listing']} key={item.id}>
        <Box className={styles['listing__logo']}>
          <img src="/jobsdb-logo.png" />
        </Box>
        <Box className={styles['listing__titleCompany']}>
          <Box className="jobTitle">
            <u>
              <Typography variant="subtitle1">Job Title</Typography>
            </u>
            <Typography variant="h6">{item.jobTitle}</Typography>
          </Box>
          <Box className={styles['listing__titleCompany--company']}>
            <u>
              <Typography variant="body2">Company</Typography>
            </u>
            <Typography variant="subtitle2">{item.company}</Typography>
          </Box>
        </Box>
        <Box className={styles['listing__salary']}>
          <Box className={styles['listing__salary--salary']}>
            <u>
              <Typography variant="body2">Salary</Typography>
            </u>
            <Typography variant="subtitle2">
              {item.salaryMin} - {item.salaryMax} {item.currency}
            </Typography>
          </Box>
        </Box>
        <Box className={styles['listing__dateIndustry']}>
          <Box className={styles['listing__dateIndustry--date']}>
            <Typography variant="body2">{item.postDate}</Typography>
          </Box>
          <Box className={styles['listing__dateIndustry--industry']}>
            <Typography variant="subtitle2">{item.industry}</Typography>
          </Box>
        </Box>
      </Box>
    </a>
  );
}
