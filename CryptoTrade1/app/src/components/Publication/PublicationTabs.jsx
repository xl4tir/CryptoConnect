import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import CommentList from './CommentList';
import RepostList from './RepostList'; // Import RepostList
import Loader from '../Loader';

export default function PublicationTabs({ post_id, updateTabs, setUpdateTabs }) {
  const [value, setValue] = React.useState('comments');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box color='text.primary' sx={{ width: '100%' }}>
        <Tabs className='text-white'
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', textTransform: 'none' }} value="comments" label="Comments" />
          <Tab sx={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', textTransform: 'none' }} value="reposts" label="Reposts" />
        </Tabs>
        <div className="flex w-full bg-white opacity-10 h-px " />
      </Box>
      <TabPanel sx={{ width: '100%', padding: '24px 0 24px 0' }} className='text-white' value="comments">
        <CommentList post_id={post_id} updateTabs={updateTabs} setUpdateTabs={setUpdateTabs} />
      </TabPanel>
      <TabPanel sx={{ width: '100%', padding: '24px 0 24px 0' }} className='text-white' value="reposts">
        <RepostList post_id={post_id} updateTabs={updateTabs} setUpdateTabs={setUpdateTabs} /> {/* Add RepostList */}
      </TabPanel>
    </TabContext>
  );
}
