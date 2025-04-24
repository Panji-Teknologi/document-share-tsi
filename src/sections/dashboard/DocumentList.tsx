'use client'

// material ui
import { List, Stack, Typography } from '@mui/material'

// import project
import MainCard from '@/components/MainCard'
import DocumentItem from './DocumentItem';

import { api } from '@/trpc/react'

const DocumentList = () => {
  const { data: documents } = api.document.getAll.useQuery();

  return (
    <MainCard title="List Document" content={false}>
      <div style={{ height: 300, overflow: 'auto' }}>
        {documents?.length === 0 ? (
          <Stack justifyContent='center' alignItems='center' p={5}>
            <Typography variant="subtitle2">No Documents</Typography>
          </Stack>
        ) : (
          <List>
            {documents?.map((document) => <DocumentItem key={document.id} document={document} />)}
          </List>
        )}
      </div>
    </MainCard>
  )
}

export default DocumentList