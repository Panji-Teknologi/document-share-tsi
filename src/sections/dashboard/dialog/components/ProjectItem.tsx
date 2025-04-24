import React, { useRef, useState } from 'react'

// material ui
import { TableRow, TableCell, Stack, Typography, Button } from '@mui/material'

// third-party
import { formatDistance, format } from 'date-fns'
import { id } from 'date-fns/locale/id'

// project import
import DialogDisconnectProject from '../DialogDisconnectProject'
import DialogAuditorsConnected from '../DialogAuditorsConnected'
import { api } from '@/trpc/react'

// assets
import { SyncDisabledRounded, ExpandMore } from '@mui/icons-material';

// types
import { FolderType, ProjectType } from '@/utils/types'

interface ProjectItemProps {
  folder: FolderType;
}

const ProjectItem = ({ folder }: ProjectItemProps) => {
  const anchorRef = useRef<any>(null);

  const [openDisconnectProject, setOpenDisconnectProject] = useState<boolean>(false);
  const [openAuditorsConnected, setOpenAuditorsConnected] = useState<boolean>(false);

  const { data } = api.project.getProject.useQuery({ folderId: folder?.id });
  const project = data && data[0] as ProjectType;

  const handleAuditorsConnected = () => {
    setOpenAuditorsConnected(true);
  };

  return (
    <TableRow key={folder?.id}>
      <TableCell>
        <Stack spacing={1} direction='row' alignItems='center'>
          <Typography variant='subtitle1'>
            {folder.name}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Typography>
          {formatDistance(folder.startDate, folder.endDate, {
            locale: id,
            includeSeconds: true,
          })}
        </Typography>
        <Typography variant='caption' color='GrayText'>
          {`${format(folder.startDate, 'dd MMM yyyy', { locale: id })} - ${format(folder.endDate, 'dd MMM yyyy', { locale: id })}`}
        </Typography>
      </TableCell>
      <TableCell>
        <Button
          variant='text'
          size='small'
          color='inherit'
          endIcon={project?.auditors?.length === 0 ? null : <ExpandMore />}
          ref={anchorRef}
          onClick={project?.auditors?.length === 0 ? undefined : handleAuditorsConnected}
        >
          {project?.auditors?.length}
        </Button>
      </TableCell>
      <TableCell align='right'>
        <Button
          variant='outlined'
          size='small'
          color='error'
          startIcon={<SyncDisabledRounded />}
          onClick={() => setOpenDisconnectProject(true)}
        >
          Disconnect
        </Button>
      </TableCell>

      <DialogDisconnectProject
        auditors={project?.auditors}
        projectId={String(project?.id)}
        openDisconnectUser={openDisconnectProject}
        setOpenDisconnectUser={setOpenDisconnectProject}
      />

      <DialogAuditorsConnected
        project={project}
        openAuditorsConnected={openAuditorsConnected}
        setOpenAuditorsConnected={setOpenAuditorsConnected}
      />
    </TableRow>
  )
}

export default ProjectItem