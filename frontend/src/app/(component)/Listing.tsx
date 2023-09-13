import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Listing } from '../interface';

export default function Listing({ item }: { item: Listing }) {
  return (
    <a href={item.pageUrl} target="_blank">
      <Box
        key={item.id}
        sx={{
          backgroundColor: 'white',
          transition: 'border 0.3s ease',
          '&:hover': {
            border: '3px solid black',
          },
        }}
        marginBottom={1}
        height={140}
        borderRadius={2}
        display={'flex'}
      >
        <Box
          component="img"
          sx={{
            height: 140,
            width: 110,
          }}
          alt="logo"
          src="/jobsdb-logo.png"
          padding={0.5}
          borderRadius={2}
        />
        <Box
          height={140}
          display={'flex'}
          flexDirection={'column'}
          padding={1}
          overflow={'hidden'}
          width={600}
        >
          <Box className="jobTitle">
            <u>
              <Typography variant="subtitle1">Job Title</Typography>
            </u>
            <Typography variant="h6">{item.jobTitle}</Typography>
          </Box>
          <Box marginTop={'auto'}>
            <u>
              <Typography variant="body2">Company</Typography>
            </u>
            <Typography variant="subtitle2">{item.company}</Typography>
          </Box>
        </Box>
        <Box
          height={140}
          display={'flex'}
          flexDirection={'column'}
          padding={1}
          width={200}
        >
          <Box marginTop={'auto'}>
            <u>
              <Typography variant="body2">Salary</Typography>
            </u>
            <Typography variant="subtitle2">
              {item.salaryMin} - {item.salaryMax} {item.currency}
            </Typography>
          </Box>
        </Box>
        <Box
          height={140}
          width={200}
          padding={1}
          display={'flex'}
          flexDirection={'column'}
        >
          <Box marginLeft={'auto'}>
            <Typography variant="body2">{item.postDate}</Typography>
          </Box>
          <Box marginTop={'auto'} marginLeft={'auto'}>
            <Typography variant="subtitle2">{item.industry}</Typography>
          </Box>
        </Box>
      </Box>
    </a>
  );
}
