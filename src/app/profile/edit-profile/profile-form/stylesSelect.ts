export const styles = {
  control: (provided: any) => ({
    ...provided,
    width: '100%',
    height: '48px',
    padding: '0 8px',
    border: 'none',
    borderRadius: '0',
    backgroundColor: '#1c1d1d',
    color: '#78797a',
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: '400',
    boxShadow: 'none',
    ':hover': {
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
  option: (provided: any, state: { isSelected: any }) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#1c1d1d' : '#3d3e3f',
    color: state.isSelected ? '#fff' : '#eff0f1',
    ':hover': {
      backgroundColor: '#1c1d1d',
      color: '#fff',
      cursor: 'pointer',
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    backgroundColor: '#1c1d1d',
    color: '#fff',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};
