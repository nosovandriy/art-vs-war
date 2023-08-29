export const handleCloseDropdown = (
  event: MouseEvent,
  menuRef: React.RefObject<HTMLDivElement>,
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const body = document.querySelector("body");

  if (
    !menuRef.current?.contains(event.target as Node) &&
    body?.contains(event.target as Node)
  ) {
    setIsMenuOpen(false);
  }
};