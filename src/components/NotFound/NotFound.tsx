import SectionTitle from '@/components/SectionTitle/SectionTitle';
import { PATHS } from '@/helpers/paths';
import Button from '@mui/material/Button';

export const NotFound = () => {
  return (
    <div>
      <SectionTitle title="404 - Not Found" />
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
export default NotFound;
