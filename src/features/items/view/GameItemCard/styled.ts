import styled from "styled-components";

export const ItemCardWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const SkeletonWrapper = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 4px;
  overflow: hidden;
`;

export const ItemCardContainer = styled.div<{ $borderColor: string }>`
  width: 64px;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.card.background};
  border: 1px solid
    ${({ $borderColor }) =>
      $borderColor.replace("border-", "").replace("[", "").replace("]", "")};
  position: relative;
`;

export const ItemImageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const ItemImage = styled.div<{
  $spriteImage: string;
  $spriteX: number;
  $spriteY: number;
}>`
  width: 100%;
  height: 100%;
  background-image: url(${({ $spriteImage }) => $spriteImage});
  background-position: ${({ $spriteX, $spriteY }) =>
    `${$spriteX}px ${$spriteY}px`};
  background-repeat: no-repeat;
`;

export const ItemCount = styled.div`
  position: absolute;
  bottom: -1px;
  left: 4px;
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.card.text};
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  z-index: 1;
`;

export const ItemTooltip = styled.div<{
  $borderColor: string;
  $isVisible: boolean;
}>`
  position: absolute;
  left: 100%;
  top: 0;
  margin-left: 8px;
  width: max-content;
  min-width: 450px;
  max-width: 70vw;
  z-index: 50;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transform: scale(${({ $isVisible }) => ($isVisible ? 1 : 0.8)});
  transform-origin: left top;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  border: 1px solid
    ${({ $borderColor }) =>
      $borderColor.replace("border-", "").replace("[", "").replace("]", "")};
  background-color: ${({ theme }) => theme.colors.card.tooltip.background};
  color: ${({ theme }) => theme.colors.card.tooltip.text};
  padding: 8px 10px;
  font-family: sans-serif;
  pointer-events: ${({ $isVisible }) => ($isVisible ? "auto" : "none")};
`;

export const ItemTitle = styled.h2<{ $textColor: string }>`
  color: ${({ $textColor }) =>
    $textColor.replace("text-", "").replace("[", "").replace("]", "")};
  font-size: 14px;
  margin-bottom: 8px;
  text-align: center;
`;

export const ItemDataRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 8px;
`;

export const ItemLabel = styled.span`
  color: ${({ theme }) => theme.colors.card.label};
  font-size: 14px;
  width: 160px;
  text-align: right;
`;

export const ItemValue = styled.span<{ $textColor?: string }>`
  color: ${({ $textColor, theme }) =>
    $textColor
      ? $textColor.replace("text-", "").replace("[", "").replace("]", "")
      : theme.colors.card.text};
  font-size: 14px;
`;

export const SpecialEffectsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

export const SpecialEffectsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const UpgradeContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

export const UpgradesWrapper = styled.div`
  display: flex;
  margin-bottom: 4px;
`;

export const UpgradeImage = styled.img`
  width: 16px;
  height: 28px;
  object-fit: cover;
`;

export const UpgradeDescription = styled.p`
  font-size: 14px;
`;

export const TradeRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

export const TradeLabel = styled(ItemLabel)``;

export const TradeValue = styled.span<{ $tradeable: boolean }>`
  font-size: 14px;
  color: ${({ $tradeable, theme }) =>
    $tradeable ? theme.colors.card.tradeYes : theme.colors.card.tradeNo};
`;

export const TooltipItemImage = styled.div<{ $borderColor: string }>`
  width: 64px;
  height: 64px;
  position: absolute;
  top: 16px;
  right: 10px;
  background-color: ${({ theme }) => theme.colors.card.background};
  border: 1px solid
    ${({ $borderColor }) =>
      $borderColor.replace("border-", "").replace("[", "").replace("]", "")};
`;
