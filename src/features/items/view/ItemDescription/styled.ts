import styled from "styled-components";

export const ItemDescriptionContainer = styled.div`
  margin-top: 16px;
`;

export const DescriptionTitle = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.card.label};
  width: 160px;
  text-align: right;
`;

export const DescriptionText = styled.p`
  font-size: 14px;
  max-width: 400px;
  color: ${({ theme }) => theme.colors.text};
`;
