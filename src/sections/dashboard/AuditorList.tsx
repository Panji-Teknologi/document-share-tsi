'use client'

// material ui
import { List, Stack, Typography } from '@mui/material'

// import project
import MainCard from '@/components/MainCard'
import AuditorItem from './AuditorItem';

import { api } from '@/trpc/react'

const AuditorList = () => {
  const { data: auditors } = api.user.getAuditors.useQuery();

  return (
    <MainCard title="List Auditor" content={false}>
      <div style={{ height: 300, overflow: 'auto' }}>
        {auditors?.length === 0 ? (
          <Stack justifyContent='center' alignItems='center' p={5}>
            <Typography variant="subtitle2">No Auditor</Typography>
          </Stack>
        ) : (
          <List>
            {auditors?.map((auditor) => <AuditorItem key={auditor.id} auditor={auditor} />)}
          </List>
        )}
      </div>
    </MainCard>
  )
}

export default AuditorList