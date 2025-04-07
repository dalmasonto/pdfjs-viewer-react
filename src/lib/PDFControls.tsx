import { PDFControlsProps } from './types';
import { Button, ControlsContainer, PageInfo } from './styled';

/**
 * Default PDF controls component
 * @param props Control props
 * @returns React element
 */
const PDFControls: React.FC<PDFControlsProps> = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  isPrevDisabled,
  isNextDisabled,
}) => {
  return (
    <ControlsContainer>
      <Button onClick={onPrevPage} disabled={isPrevDisabled}>
        Previous
      </Button>
      <Button onClick={onNextPage} disabled={isNextDisabled}>
        Next
      </Button>
      <PageInfo>
        Page: {currentPage} / {totalPages}
      </PageInfo>
    </ControlsContainer>
  );
};

export default PDFControls;
