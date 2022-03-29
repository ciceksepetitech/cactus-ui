import {
  AccordionButton,
  AccordionContent,
  AccordionHeader,
} from '@ciceksepeti/cui-accordion';
import { Accordion } from '@ciceksepeti/cui-accordion';
import React from 'react';

import RotatableArrow from './RotatableArrow';

type AccordionItemProps = {
  title: string;
  children: React.ReactNode;
};

function AccordionItem({ title, children }: AccordionItemProps) {
  return (
    <>
      <AccordionHeader id={title}>
        <AccordionButton className="accordion--btn">
          <RotatableArrow
            width={10}
            fill="#5c5c5c"
            className="accordion__icon"
          />
          <h3 className="accordion__title pl-15">{title.replace(/-/g, ' ')}</h3>
        </AccordionButton>
      </AccordionHeader>
      <AccordionContent className="accordion--content">
        {children}
      </AccordionContent>
    </>
  );
}

export { Accordion, AccordionItem };
