import React from 'react';

import { ICardProps } from './interfaces';

function HeaderTableCards({ data }: ICardProps) {
  const headerData = Object?.keys(data?.links);
  return (
    <div className="header-cards d-flex-wrap">
      {headerData?.map((key, index) => {
        const platforms = data?.links[key];

        return (
          <div className="header-cards__wrapper" key={index}>
            <a
              href={platforms?.link}
              target="_blank"
              className={`header-cards__link ${
                headerData.length > 3 && 'link--divide'
              }`}
              rel="noreferrer"
            >
              <div
                className={`header-cards__img-wrapper ${
                  platforms?.subtitle === 'NPM' && 'isNPM'
                }`}
              >
                <img
                  src={platforms?.logo}
                  alt="web3consorcium"
                  className="max-w1"
                />
              </div>
              <div className="header-cards__card">
                <span className="header-cards__card--title">
                  {platforms?.title}
                </span>
                <small className="header-cards__card--type">
                  {platforms?.subtitle}
                </small>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default HeaderTableCards;
