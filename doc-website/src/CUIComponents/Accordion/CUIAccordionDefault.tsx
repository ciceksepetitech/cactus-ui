import {
  Accordion,
  AccordionButton,
  AccordionContent,
  AccordionHeader,
} from '@ciceksepeti/cui-accordion';
import React from 'react';

import PreviewContainer from '../Containers/PreviewContainer/PreviewContainer';

function CUIAccordionDefault() {
  return (
    <PreviewContainer title="Accordion Default Preview">
      <Accordion>
        <AccordionHeader>
          <AccordionButton>Step 1</AccordionButton>
        </AccordionHeader>
        <AccordionContent>
          Step 1: Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book.
        </AccordionContent>
        <AccordionHeader>
          <AccordionButton disabled>Step 2</AccordionButton>
        </AccordionHeader>
        <AccordionContent>
          Step 2: Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book.
        </AccordionContent>
        <AccordionHeader>
          <AccordionButton>Step 3</AccordionButton>
        </AccordionHeader>
        <AccordionContent>
          Step 3: Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book.
        </AccordionContent>
      </Accordion>
    </PreviewContainer>
  );
}

export default CUIAccordionDefault;
