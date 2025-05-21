import SectionTitle from '@/components/SectionTitle/SectionTitle';
import { PATHS } from '@/helpers/paths';
import Button from '@mui/material/Button';

export interface ErrorProps {
  error: string;
}

export const Error = ({ error }: ErrorProps) => {
  return (
    <div>
      <SectionTitle title={error} />
      <div style={{ textAlign: 'center' }}>
        <Button
          href={PATHS.landing}
          variant={'contained'}
          sx={{ backgroundColor: 'secondary.dark' }}
          size={'large'}
        >
          Main page
        </Button>
      </div>
    </div>
  );
};
export default Error;
