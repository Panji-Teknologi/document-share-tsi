'use client'

// material ui
import { List, Stack, Typography } from '@mui/material'

// import project
import MainCard from '@/components/MainCard'
import FolderItem from './FolderItem';

import { api } from '@/trpc/react'

const FolderList = () => {
  const { data: folders } = api.folder.getAll.useQuery();

  return (
    <MainCard title="List Folder/Project" content={false}>
      <div style={{ height: 300, overflow: 'auto' }}>
        {folders?.length === 0 ? (
          <Stack justifyContent='center' alignItems='center' p={5}>
            <Typography variant="subtitle2">No Auditor</Typography>
          </Stack>
        ) : (
          <List>
            {folders?.map((folder) => <FolderItem key={folder.id} folder={folder} />)}
          </List>
        )}
      </div>
    </MainCard>
  )
}

export default FolderList