import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { getFontStyle, rem } from '@/theme/utils';
import ModalPortal from '@/components/modal/ModalPortal';

const StPopUp = styled.div`
  width: ${rem(252)};
  height: ${rem(319.75)};
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  button {
    border: transparent;
    background-color: transparent;
    margin: auto;
    color: var(--white);
    ${getFontStyle('ParagraphS')};
    width: ${rem(252)};
  }
  button:nth-child(1) {
    width: ${rem(180)};
  }
  button:nth-child(2) {
    width: ${rem(82)};
  }
  @media (min-width: 768px) {
    width: ${rem(328)};
    height: ${rem(407)};
    button {
      height: ${rem(36)};
    }
  }
  @media (min-width: 1920px) {
    width: ${rem(588)};
    height: ${rem(782.29)};

    button {
      height: ${rem(66)};
      ${getFontStyle('ParagraphL')};
    }
    button:nth-child(1) {
      width: ${rem(326)};
    }
    button:nth-child(2) {
      width: ${rem(190)};
    }
  }
`;

const StButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  button:nth-child(2) {
    border-left: 1px solid var(--gray400);
  }
`;

const Popup = ({ OnClose }) => {
  const VisitedBeforeDate = localStorage.getItem('VisitCookie');

  const VisitedNowDate = Math.floor(new Date().getDate());

  useEffect(() => {
    if (VisitedBeforeDate !== null) {
      if (VisitedBeforeDate === VisitedNowDate) {
        localStorage.removeItem('VisitCookie');
        OnClose(true);
      }

      if (VisitedBeforeDate !== VisitedNowDate) {
        OnClose(false);
      }
    }
  }, [VisitedBeforeDate]);

  const Dayclose = (e) => {
    if (OnClose) {
      OnClose(e);

      const expiry = new Date();

      const expiryDate = expiry.getDate() + 1;

      localStorage.setItem('VisitCookie', expiryDate);
    }
  };

  return (
    <ModalPortal>
      <StPopUp role="dialog">
        <picture>
          <source
            srcSet="src/assets/popup/desktop.png"
            media="(min-width:1920px)"
          />
          <source
            srcSet="src/assets/popup/tablet.png"
            media="(min-width:768px)"
          />
          <img
            src="src/assets/popup/mobile.png"
            alt="기대해 재미 가득한 라인업 광고 팝업"
          />
        </picture>
        <StButton>
          <button type="button" onClick={Dayclose}>
            오늘 하루 보지 않기
          </button>
          <button
            type="button"
            onClick={() => {
              OnClose(false);
            }}
          >
            닫기
          </button>
        </StButton>
      </StPopUp>
    </ModalPortal>
  );
};

export default Popup;
