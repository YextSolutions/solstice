import { CheckboxOption, CheckboxOptionCssClasses } from './renderCheckboxOption';

import classnames from 'classnames';
import { BoxingIcon } from './faceticons';
import classNames from 'classnames';

//prettier-ignore
interface ImageOptionProps {
  option: CheckboxOption,
  // TODO: rename here and other places it's referenced
  image?: (fill?: string) => JSX.Element,
  onClick: (isChecked: boolean) => void,
  selected?: boolean,
  customCssClasses?: CheckboxOptionCssClasses,
  isMobile?: boolean
}

const builtInCssClasses: CheckboxOptionCssClasses = {
  option:
    'flex flex-col sm:border-2 border-4 rounded-xl justify-center items-center py-2 px-2 sm:h-20 sm:w-20 h-40 w-40 sm:m-2',
  // optionInput:
  //   'w-3.5 h-3.5 form-checkbox cursor-pointer border border-gray-300 rounded-sm text-blue-600 focus:ring-blue-500',
  optionLabel: 'font-heading text-3xl sm:text-sm',
};

export default function renderImageOption({
  option,
  image,
  selected,
  onClick,
  customCssClasses,
  isMobile,
}: ImageOptionProps) {
  const cssClasses = { ...builtInCssClasses, ...customCssClasses };
  return (
    <div
      id={option.id}
      className={classnames(cssClasses.option, { 'border-black bg-gold text-black': selected })}
      key={option.id}
      onClick={() => onClick(true)}>
      {/* {image} */}
      <div className={classNames('', { 'h-18 my-2 w-24': isMobile })}>
        {/* h-18 my-2 w-24 */}
        {image ? image(selected ? 'black' : 'white') : BoxingIcon()}
      </div>
      <div className={cssClasses.optionLabel}>{option.label}</div>
      {/* <input
        type="checkbox"
        id={option.id}
        checked={selected}
        className={cssClasses.optionInput}
        onChange={(evt) => onClick(evt.target.checked)}
      /> */}
      {/* <label className={cssClasses.optionLabel} htmlFor={option.id}>
        {option.label}
      </label> */}
    </div>
  );
}