import {
  Accordion,
  AccordionButton,
  AccordionContent,
  AccordionHeader,
} from '@ciceksepeti/cui-accordion';
import React, { useState } from 'react';

import PreviewContainer from '../Containers/PreviewContainer/PreviewContainer';

const initialState = [0, 2, 4];

function CUIAccordionIndexes() {
  const [expandedSections, setExpandedSections] = useState(initialState);

  const handleChange = (index) => {
    const newExpandedSections = expandedSections.includes(index)
      ? expandedSections.filter((i) => i !== index)
      : [...expandedSections, index];

    setExpandedSections(newExpandedSections);
  };

  return (
    <PreviewContainer title="Accordion Indexes Behavior Preview">
      <Accordion indexes={expandedSections} onChange={handleChange}>
        <AccordionHeader>
          <AccordionButton>Step 1</AccordionButton>
        </AccordionHeader>
        <AccordionContent>
          Step 1: Lorem Ipsum is simply dummy text of the printing and
          typesetting industry.
        </AccordionContent>
        <AccordionHeader>
          <AccordionButton disabled>Step 2</AccordionButton>
        </AccordionHeader>
        <AccordionContent>
          Step 2: Lorem Ipsum is simply dummy text of the printing and
          typesetting industry.
        </AccordionContent>
        <AccordionHeader>
          <AccordionButton>Step 3</AccordionButton>
        </AccordionHeader>
        <AccordionContent>
          Step 3: Lorem Ipsum is simply dummy text of the printing and
          typesetting industry.
        </AccordionContent>
        <AccordionHeader>
          <AccordionButton>Step 4</AccordionButton>
        </AccordionHeader>
        <AccordionContent>
          Step 4: Lorem Ipsum is simply dummy text of the printing and
          typesetting industry.
        </AccordionContent>
        <AccordionHeader>
          <AccordionButton>Step 5</AccordionButton>
        </AccordionHeader>
        <AccordionContent>
          Step 5: Lorem Ipsum is simply dummy text of the printing and
          typesetting industry.
        </AccordionContent>
      </Accordion>
    </PreviewContainer>
  );
}

export default CUIAccordionIndexes;
