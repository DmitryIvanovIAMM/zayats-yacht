import { renderHook } from '@testing-library/react';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock the dependencies before importing the hook
const mockToPath = jest.fn();
const mockGetSrcImageNameByStorageName = jest.fn();

jest.mock('@/helpers/paths', () => ({
  PATHS: {
    editPort: '/admin/ports/:id/edit',
  },
  toPath: (...args: any[]) => mockToPath(...args),
}));

jest.mock('@/utils/views', () => ({
  getSrcImageNameByStorageName: (storageName: string) => mockGetSrcImageNameByStorageName(storageName),
}));

jest.mock('@/components/AdminDashboard/ScheduleManagement/useScheduleColumns', () => ({
  iconButtonPaddingSx: { paddingLeft: '4px', paddingRight: '4px' },
}));

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, width, height, ...props }: any) {
    return <img src={src} alt={alt} width={width} height={height} {...props} />;
  };
});

// Mock MUI components for testing
jest.mock('@mui/material/IconButton', () => {
  return function MockIconButton({ children, onClick, href, disabled, 'data-testid': testId, component, sx, ...props }: any) {
    const Component = component || 'button';
    return (
      <Component
        onClick={onClick}
        href={href}
        disabled={disabled}
        data-testid={testId}
        style={sx}
        {...props}
      >
        {children}
      </Component>
    );
  };
});

jest.mock('@mui/icons-material/Edit', () => {
  return function MockEditIcon({ sx, color }: any) {
    return <span data-testid="edit-icon" style={sx} className={`color-${color}`}>edit</span>;
  };
});

jest.mock('@mui/icons-material/DeleteForever', () => {
  return function MockDeleteForeverIcon({ sx, color }: any) {
    return <span data-testid="delete-icon" style={sx} className={`color-${color}`}>delete</span>;
  };
});

jest.mock('@/components/Table/Filters/TextColumnFilter', () => {
  return function MockTextColumnFilter({ column }: any) {
    return <input data-testid="text-column-filter" placeholder={`Filter ${column?.id || 'column'}`} />;
  };
});

import { usePortsColumns } from './usePortsColumns';

describe('usePortsColumns', () => {
  const mockHandleStartDeletePort = jest.fn();
  const defaultProps = {
    handleStartDeletePort: mockHandleStartDeletePort,
    isUpdating: false,
  };

  const mockPortData = {
    _id: 'port123',
    portName: 'Miami',
    destinationName: 'Florida',
    imageFileName: 'miami.jpg',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockToPath.mockReturnValue('/admin/ports/port123/edit');
    mockGetSrcImageNameByStorageName.mockReturnValue('/images/miami.jpg');
  });

  it('returns correct number of columns', () => {
    const { result } = renderHook(() => usePortsColumns(defaultProps));
    
    expect(result.current).toHaveLength(4);
  });

  it('returns columns with correct structure and IDs', () => {
    const { result } = renderHook(() => usePortsColumns(defaultProps));
    const columns = result.current;

    expect(columns[0]._id).toBe('portName');
    expect(columns[1]._id).toBe('destinationName');
    expect(columns[2]._id).toBe('imageFileName');
    expect(columns[3]._id).toBe('actions-cell');
  });

  it('configures port name column correctly', () => {
    const { result } = renderHook(() => usePortsColumns(defaultProps));
    const portNameColumn = result.current[0];

    expect(portNameColumn.header).toBe('Port Name');
    expect(portNameColumn.accessor).toBe('portName');
    expect(portNameColumn.accessorKey).toBe('portName');
    expect(portNameColumn.meta.columnSx).toEqual({ verticalAlign: 'top' });
    expect(typeof portNameColumn.meta.filter).toBe('function');
  });

  it('renders port name cell correctly', () => {
    const { result } = renderHook(() => usePortsColumns(defaultProps));
    const portNameColumn = result.current[0];
    
    render(portNameColumn.cell({ row: { original: mockPortData } }));
    
    expect(screen.getByTestId('ports-port-name')).toHaveTextContent('Miami');
  });

  it('configures destination name column correctly', () => {
    const { result } = renderHook(() => usePortsColumns(defaultProps));
    const destinationColumn = result.current[1];

    expect(destinationColumn.header).toBe('Destination Name');
    expect(destinationColumn.accessor).toBe('destinationName');
    expect(destinationColumn.accessorKey).toBe('destinationName');
    expect(destinationColumn.meta.headerSx).toEqual({ display: { xs: 'none', sm: 'table-cell', md: 'table-cell' } });
    expect(destinationColumn.meta.columnSx).toEqual({ 
      display: { xs: 'none', sm: 'table-cell', md: 'table-cell' }, 
      verticalAlign: 'top' 
    });
  });

  it('renders destination name cell correctly', () => {
    const { result } = renderHook(() => usePortsColumns(defaultProps));
    const destinationColumn = result.current[1];
    
    render(destinationColumn.cell({ row: { original: mockPortData } }));
    
    expect(screen.getByTestId('ports-destination-name')).toHaveTextContent('Florida');
  });

  it('configures image column correctly', () => {
    const { result } = renderHook(() => usePortsColumns(defaultProps));
    const imageColumn = result.current[2];

    expect(imageColumn.header).toBe('Image');
    expect(imageColumn.accessor).toBe('imageFileName');
    expect(imageColumn.accessorKey).toBe('imageFileName');
    expect(imageColumn.enableSorting).toBe(false);
    expect(imageColumn.enableColumnFilter).toBe(false);
    expect(imageColumn.meta.headerSx).toEqual({ width: '130px' });
    expect(imageColumn.meta.columnSx).toEqual({ verticalAlign: 'top', width: '130px' });
  });

  it('renders image cell correctly', () => {
    const { result } = renderHook(() => usePortsColumns(defaultProps));
    const imageColumn = result.current[2];
    
    render(imageColumn.cell({ row: { original: mockPortData } }));
    
    expect(screen.getByTestId('ports-image-file-name')).toBeInTheDocument();
    expect(mockGetSrcImageNameByStorageName).toHaveBeenCalledWith('miami.jpg');
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/images/miami.jpg');
    expect(image).toHaveAttribute('alt', 'Image of Miami');
    expect(image).toHaveAttribute('width', '100');
    expect(image).toHaveAttribute('height', '100');
  });

  it('configures actions column correctly', () => {
    const { result } = renderHook(() => usePortsColumns(defaultProps));
    const actionsColumn = result.current[3];

    expect(actionsColumn.header).toBe('');
    expect(actionsColumn.accessorKey).toBe('actions-cell');
    expect(actionsColumn.enableSorting).toBe(false);
    expect(actionsColumn.meta.headerSx).toEqual({ width: '80px', maxWidth: '80px' });
    expect(actionsColumn.meta.columnSx).toEqual({ width: '80px', maxWidth: '80px' });
  });

  it('renders actions cell with edit and delete buttons', () => {
    const { result } = renderHook(() => usePortsColumns(defaultProps));
    const actionsColumn = result.current[3];
    
    render(actionsColumn.cell({ row: { original: mockPortData } }));
    
    expect(screen.getByTestId('port-edit-button')).toBeInTheDocument();
    expect(screen.getByTestId('port-delete-button')).toBeInTheDocument();
    expect(screen.getByTestId('edit-icon')).toBeInTheDocument();
    expect(screen.getByTestId('delete-icon')).toBeInTheDocument();
  });

  it('edit button has correct href and calls toPath', () => {
    const { result } = renderHook(() => usePortsColumns(defaultProps));
    const actionsColumn = result.current[3];
    
    render(actionsColumn.cell({ row: { original: mockPortData } }));
    
    const editButton = screen.getByTestId('port-edit-button');
    expect(editButton).toHaveAttribute('href', '/admin/ports/port123/edit');
    expect(mockToPath).toHaveBeenCalledWith('/admin/ports/:id/edit', { id: 'port123' });
  });

  it('delete button calls handleStartDeletePort when clicked', () => {
    const { result } = renderHook(() => usePortsColumns(defaultProps));
    const actionsColumn = result.current[3];
    
    render(actionsColumn.cell({ row: { original: mockPortData } }));
    
    const deleteButton = screen.getByTestId('port-delete-button');
    fireEvent.click(deleteButton);
    
    expect(mockHandleStartDeletePort).toHaveBeenCalledWith('port123');
  });

  it('disables buttons when isUpdating is true', () => {
    const propsWithUpdating = { ...defaultProps, isUpdating: true };
    const { result } = renderHook(() => usePortsColumns(propsWithUpdating));
    const actionsColumn = result.current[3];
    
    render(actionsColumn.cell({ row: { original: mockPortData } }));
    
    const editButton = screen.getByTestId('port-edit-button');
    const deleteButton = screen.getByTestId('port-delete-button');
    
    expect(editButton).toHaveAttribute('disabled');
    expect(deleteButton).toHaveAttribute('disabled');
  });

  it('applies correct styling to action buttons', () => {
    const { result } = renderHook(() => usePortsColumns(defaultProps));
    const actionsColumn = result.current[3];
    
    render(actionsColumn.cell({ row: { original: mockPortData } }));
    
    const editButton = screen.getByTestId('port-edit-button');
    const deleteButton = screen.getByTestId('port-delete-button');
    
    expect(editButton).toHaveStyle('padding-left: 4px; padding-right: 4px');
    expect(deleteButton).toHaveStyle('padding-left: 4px; padding-right: 4px');
  });

  it('memoizes columns properly - same reference when dependencies unchanged', () => {
    const { result, rerender } = renderHook(() => usePortsColumns(defaultProps));
    const initialColumns = result.current;
    
    // Rerender with same props
    rerender();
    const secondColumns = result.current;
    
    expect(initialColumns).toBe(secondColumns);
  });

  it('creates new columns when handleStartDeletePort changes', () => {
    const { result, rerender } = renderHook(
      (props) => usePortsColumns(props),
      { initialProps: defaultProps }
    );
    const initialColumns = result.current;
    
    // Rerender with different handleStartDeletePort
    const newHandleStartDeletePort = jest.fn();
    rerender({ ...defaultProps, handleStartDeletePort: newHandleStartDeletePort });
    const newColumns = result.current;
    
    expect(initialColumns).not.toBe(newColumns);
  });

  it('has filter functions for filterable columns', () => {
    const { result } = renderHook(() => usePortsColumns(defaultProps));
    const columns = result.current;
    
    // Check that port name column has a filter function
    expect(typeof columns[0].meta?.filter).toBe('function');
    
    // Check that destination name column has a filter function  
    expect(typeof columns[1].meta?.filter).toBe('function');
    
    // Check that image column has a filter function (even though filtering is disabled)
    expect(typeof columns[2].meta?.filter).toBe('function');
    
    // Check that actions column doesn't have a filter function
    expect(columns[3].meta?.filter).toBeUndefined();
  });

  it('handles missing row data gracefully', () => {
    const { result } = renderHook(() => usePortsColumns(defaultProps));
    const portNameColumn = result.current[0];
    
    render(portNameColumn.cell({ row: { original: { portName: null } } }));
    
    expect(screen.getByTestId('ports-port-name')).toHaveTextContent('');
  });

  it('handles different image file formats', () => {
    const s3ImageData = {
      ...mockPortData,
      imageFileName: 'https://s3.amazonaws.com/bucket/image.jpg'
    };
    
    mockGetSrcImageNameByStorageName.mockReturnValue('https://s3.amazonaws.com/bucket/image.jpg');
    
    const { result } = renderHook(() => usePortsColumns(defaultProps));
    const imageColumn = result.current[2];
    
    render(imageColumn.cell({ row: { original: s3ImageData } }));
    
    expect(mockGetSrcImageNameByStorageName).toHaveBeenCalledWith('https://s3.amazonaws.com/bucket/image.jpg');
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://s3.amazonaws.com/bucket/image.jpg');
  });
});