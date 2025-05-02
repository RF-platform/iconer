import styled from "styled-components";

export const PageContainer = styled.div`
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const PageTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const LanguageSelector = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

export const SectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 24px;
`;

export const Section = styled.section`
  padding: 16px;
  border-radius: 8px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.text};
`;
