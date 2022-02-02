import { useAnswersState } from '@yext/answers-headless-react';
import { useState } from 'react';
import ClassFacets from './ClassFacets';
import MobileFilterButton from './MobileFilterButton';
import { Divider } from './StaticFilters';

export default function MobileFilterLayout() {
  const [isPopupUpOpen, setIsPopupOpen] = useState(false);

  const resultsCount = useAnswersState((state) => state.vertical.resultsCount);

  const toggleFilterPopup = () => {
    setIsPopupOpen(!isPopupUpOpen);
    if (document.body.style.overflow !== 'hidden') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  };

  return (
    <div>
      <MobileFilterButton onClick={() => toggleFilterPopup()} />
      {isPopupUpOpen && (
        <div className="fixed top-0 left-0 right-0 z-10 flex h-full w-full flex-col bg-black sm:top-0">
          <div>
            <div className="my-8 flex w-full justify-center font-heading text-2xl text-white">Filter</div>
            <Divider />
          </div>
          <ClassFacets isMobile />
          <div className="w-full bg-black">
            <div className="flex  w-full flex-col items-center pb-5	">
              <Divider customCssClasses={{ divider: 'w-full h-px bg-gray-200 mb-2' }} cssCompositionMethod="assign" />
              <div
                className="flex h-16 w-5/6 items-center justify-center rounded-3xl border-4 bg-black"
                onClick={() => toggleFilterPopup()}>
                <div className="text-center font-heading text-xl text-white">{`VIEW ${resultsCount} RESULTS`}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
