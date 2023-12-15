import { CSSObjectWithLabel, DropdownIndicatorProps, GroupBase } from 'react-select';
import { Option } from 'react-google-places-autocomplete/build/types';

export const selectStyles = {
  control: (provided: CSSObjectWithLabel) => ({
    ...provided,
    backgroundColor: '#1C1D1D',
    outline: 'none',
    border: 'none',
    boxShadow: 'none',
    height: '48px',
    cursor: 'text',
  }),
  input: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: '#F9FAFB',
    fontSize: '16px',
  }),
  clearIndicator: (provided: CSSObjectWithLabel) => ({
    ...provided,
    display: 'none',
  }),
  indicatorSeparator: (provided: CSSObjectWithLabel) => ({
    ...provided,
    display: 'none',
  }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    backgroundColor: '#1C1D1D',
  }),
  dropdownIndicator: (
    base: CSSObjectWithLabel,
    state: DropdownIndicatorProps<Option, false, GroupBase<Option>>,
  ) => ({
    ...base,
    transition: 'all .2s ease',
    transform: state.isFocused ? 'rotate(180deg)' : 'none',
  }),
  singleValue: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: '#78797A',
    fontSize: '16px',
    fontFamily: 'var(--font-openSans)',
  }),
  placeholder: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: '#78797A',
    fontSize: '16px',
  }),
  option: (provided: CSSObjectWithLabel) => ({
    ...provided,
    cursor: 'pointer',
    backgroundColor: '#1C1D1D',
    '&:hover': {
      backgroundColor: '#EFF0F1',
    },
  }),
};
