import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import PublicationsList from './PublicationsList';


export default function PublicationTabs({ userProfile }) {
  const [value, setValue] = React.useState('publications');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box color='text.primary' sx={{ width: '100%', padding: '0%' }}>
        <Tabs className='text-white text-base'
          value={value}
          onChange={handleChange}

          textColor="inherit"
          indicatorColor="secondary"
          aria-label="secondary tabs example"

        >
          <Tab sx={{ fontSize: '14px', textTransform: 'none' }} value="publications" label="Publications" />
          <Tab sx={{ fontSize: '14px', textTransform: 'none' }} value="comments" label="Comments" />
          <Tab sx={{ fontSize: '14px', textTransform: 'none' }} value="reactions" label="Reactions" />

        </Tabs>
        <div className="flex w-full bg-white opacity-10 h-px " />

      </Box>

      <TabPanel sx={{ width: '100%', padding: '24px 0 24px 0' }} className='text-white' value="publications" >
        <PublicationsList userProfile={userProfile} />
      </TabPanel>
      <TabPanel sx={{ width: '100%' }} className='text-white' value="comments" >
        CommentsList
        {/* <CommentsList publicationId={publicationId} /> */}
      </TabPanel>
      <TabPanel sx={{ width: '100%' }} className='text-white' value="reactions" >
        Reactions
      </TabPanel>

    </TabContext>

  );
}