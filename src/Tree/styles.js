import styled from 'styled-components';

export const WrapperEntry = styled.li`
  position: relative;
  list-style: none;
  display: flex;
  margin-left: ${({ isFirstLevel }) => isFirstLevel ? '0' : '22px'};
  /* // last entry -- right */
  &.last-entry {
    div {
      &::after {
        content: '';
        width: 0;
        border: none;
        display: none;
      }
    }
  }
  &::before {
    content: '';
    position: absolute;
    top: calc(48px / 2 + 1px);
    left: -11px;
    height: ${props => props.height};
    border-left: ${({ isFirstLevel, onlyChilren }) => isFirstLevel || onlyChilren ? `none` : `1px solid`};
  }
`;

export const WrapperBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 48px;
  padding: 0 22px;
  border-radius: 2px;
  font-size: 13px;
  color: ${({ theme }) => theme.darkMedium1};
  background: ${({ theme }) => theme.whitePrimary};
  margin-bottom: 12px;
  ${({ isFirstLevel }) =>
    isFirstLevel ? `box-shadow: 0 1px 5px 0 rgba(0,0,0,0.08); width: calc(25% - 22px);` : ''};
  border: 1px solid ${({ theme }) => theme.grayMedium2};
  ${({ isFirstLevel }) => isFirstLevel ? 'font-weight : 600' : '' };
  line-height: 20px;
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  img {
    width: 18px;
    margin-right: 21px;
    position: relative;
    bottom: 2px;
  }
  /* icon */
  i {
    font-size: 16px;
    color: ${({ theme }) => theme.darkMedium1};
    margin-right: 21px;
  }
  /* // left */
  &::before {
    content: '';
    width: 11px;
    border-top: ${({ theme, isFirstLevel }) => isFirstLevel ? 'none' : `1px solid ${theme.darkMedium2}`};
    position: absolute;
    left: -11px;
    top: 50%;
  }
  /* 
// right */
  &::after {
    content: '';
    width: 22px;
    border-top: 1px solid ${({ theme }) => theme.darkMedium2};
    position: absolute;
    right: -22px;
    top: 50%;
  }
  /* last entry -- right */
  &.last-entry {
    &::after {
      content: '';
      width: 0;
      border: none;
      display: none;
    }
  }
  &:hover {
  cursor: ${({ isFirstLevel }) => isFirstLevel ? 'default' : 'pointer'};
  }
`;

export const WrapperCategoryTree = styled.div`
  ul {
    list-style: none;
  }
  & > .branch {
    .branch {
      width: calc(75% + 22px);
      ${WrapperBox} {
        width: calc(100% / 3 - 22px);
      }
      .branch {
        width: calc((100% / 3) * 2 + 22px);
        ${WrapperBox} {
          width: calc(50% - 22px);
        }
        .branch {
          width: calc(50% + 22px);
          ${WrapperBox} {
            width: 100%;
          }
        }
      }
    }
  }
`;