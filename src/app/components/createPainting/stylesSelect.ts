export const stylesSelect = {
  control: (provided: any) => ({
    ...provided,
    width: '100%',
    minHeight: '48px',
    height: 'auto',
    padding: '0 8px',
    border: 'none',
    borderRadius: '0',
    backgroundColor: '#1c1d1d',
    color: '#78797a',
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: '400',
    ":hover": {
      cursor: 'pointer',
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#161717',
    color: '#78797a',
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: '400',
  }),
  option: (provided: any, state: { isSelected: any; }) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#1c1d1d' : '#3d3e3f',
    color: state.isSelected ? '#fff' : '#eff0f1',
    ":hover": {
      backgroundColor: '#1c1d1d',
      color: '#fff',
      cursor: 'pointer',
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    backgroundColor: '#1c1d1d',
    color: '#78797a',
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: 'transparent',
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: '#eff0f1',
    fontSize: '12px',
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    padding: 0,
    ":hover": {
      color: '#eff0f1',
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};
