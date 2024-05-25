import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import Typography from '@mui/material/Typography';

import CommentList from '../CommentList';

export default function PublicationTabs({publicationId}) {
  const [value, setValue] = React.useState('comments');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext  value={value}>
      <Box color='text.primary' sx={{ width: '100%' }}>
        <Tabs className='text-white'
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
          aria-label="secondary tabs example"

        >
          <Tab value="comments" label="Comments" />
          <Tab value="reposts" label="Reposts" />
        </Tabs>
      </Box>
      <TabPanel sx={{width: '100%'}} className='text-white' value="comments" >
        <CommentList publicationId={publicationId} />
      </TabPanel>
      <TabPanel className='text-white' value="reposts">Reposts</TabPanel>
    </TabContext>
  );
}