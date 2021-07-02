import * as S from './popover.style'
export default function Popover({ active, children }) {
  return (
    <>
      {active && (
        <S.Drawer>
          <S.PopoverArrow />
          <S.PopoverContent>{children}</S.PopoverContent>
        </S.Drawer>
      )}
    </>
  )
}
