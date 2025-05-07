// import React, { useMemo } from 'react';
// import {
//   Activity,
//   activityTypesMapper,
//   convertUtcToZonedTime,
//   formatDateToMonthDayYearInLocale
// } from '@efacity/common';
// import { Box, Link } from '@mui/material';
// import { NavLink } from 'react-router-dom';
// import { PATHS, toPath } from '@efacity/routing';
// import ActivityRegistrationLinkWithCopier from '../../components/ActivityRegistrationLinkWithCopier/ActivityRegistrationLinkWithCopier';
// import { createColumnHelper } from '@tanstack/react-table';
// import { TextColumnFilter, ActivityTypeFilter } from '@efacity/table';
// import ActivitiesTableActionsCell from './ActivitiesTableActionsCell';
//
// const columnHelper = createColumnHelper<Activity>();
//
// export const useActivitiesColumns = (
//   orgId: string,
//   timeZone: string,
//   allowedCreateActivity: boolean,
//   allowedShareActivity: boolean,
//   handleCloneActivity: (activityId: string) => void,
//   handleDeleteActivityClick: (activityId: string, name: string) => void,
//   handleStartShareActivity: (activity: Activity) => void
// ) => {
//   return useMemo(
//     () => {
//       const columnsBase = [
//         columnHelper.accessor('name', {
//           header: 'Name',
//           cell: ({ row }) => (
//             <Box display="flex" alignItems="center" data-testid="activity-name-copier-cell">
//               <Link
//                 component={NavLink}
//                 to={toPath(PATHS.editActivity, {
//                   orgId: orgId,
//                   id: row.original._id
//                 })}
//                 underline={'none'}
//               >
//                 {row.original.name}
//               </Link>
//               &nbsp;&nbsp;
//               <ActivityRegistrationLinkWithCopier
//                 isEnabled={true}
//                 activityId={row.original._id}
//                 orgId={orgId}
//                 activityType={row.original.type}
//               />
//             </Box>
//           ),
//           meta: {
//             filter: (column) => <TextColumnFilter column={column} />
//           }
//         }),
//         columnHelper.accessor('type', {
//           header: 'Type',
//           cell: ({ row }) => {
//             return <div>{activityTypesMapper[row.original.type]}</div>;
//           },
//           enableColumnFilter: true,
//           meta: {
//             headerSx: { whiteSpace: 'nowrap', width: 170, maxWidth: 170 },
//             columnSx: { whiteSpace: 'nowrap', width: 170, maxWidth: 170 },
//             filter: (column) => <ActivityTypeFilter column={column} />
//           }
//         }),
//         columnHelper.accessor('createdAt', {
//           header: 'Created On',
//           cell: ({ getValue }) => {
//             return getValue() ? (
//               <Box whiteSpace="nowrap">
//                 {formatDateToMonthDayYearInLocale(convertUtcToZonedTime(getValue(), timeZone))}
//               </Box>
//             ) : (
//               <div></div>
//             );
//           },
//           enableColumnFilter: true,
//           meta: {
//             headerSx: { whiteSpace: 'nowrap', width: 123, maxWidth: 123 },
//             columnSx: { width: 123, maxWidth: 123 }
//           }
//         })
//       ];
//
//       if (allowedCreateActivity) {
//         return [
//           ...columnsBase,
//           {
//             header: '',
//             accessorFn: (row) => row,
//             id: 'actions-cell',
//             enableColumnFilter: false,
//             enableSorting: false,
//             cell: ({ row }) => {
//               return (
//                 <ActivitiesTableActionsCell
//                   activity={row.original}
//                   orgId={orgId}
//                   onShare={handleStartShareActivity}
//                   onClone={handleCloneActivity}
//                   onDelete={handleDeleteActivityClick}
//                   allowedShareActivity={allowedShareActivity}
//                 />
//               );
//             },
//             meta: {
//               headerSx: {
//                 width: allowedShareActivity ? 170 : 75,
//                 maxWidth: allowedShareActivity ? 170 : 75
//               },
//               columnSx: {
//                 width: allowedShareActivity ? 170 : 75,
//                 maxWidth: allowedShareActivity ? 170 : 75
//               }
//             }
//           }
//         ];
//       }
//       return columnsBase;
//     } /* eslint-disable-next-line react-hooks/exhaustive-deps */,
//     [
//       orgId,
//       allowedCreateActivity,
//       allowedShareActivity,
//       handleCloneActivity,
//       handleDeleteActivityClick
//     ]
//   );
// };
