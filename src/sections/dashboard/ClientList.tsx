'use client'

// material ui
import { List, Stack, Typography } from '@mui/material'

// import project
import MainCard from '@/components/MainCard'
import ClientItem from './ClientItem';

import { api } from '@/trpc/react'

const ClientList = () => {
  const { data: clients } = api.user.getClients.useQuery();

  return (
    <MainCard title="List Client" content={false}>
      <div style={{ height: 300, overflow: 'auto' }}>
        {clients?.length === 0 ? (
          <Stack justifyContent='center' alignItems='center' p={5}>
            <Typography variant="subtitle2">No Clients</Typography>
          </Stack>
        ) : (
          <List>
            {clients?.map((client) => <ClientItem key={client.id} client={client} />)}
          </List>
        )}
      </div>
    </MainCard>
  )
}

export default ClientList