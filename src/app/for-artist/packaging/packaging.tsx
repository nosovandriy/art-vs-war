'use client';

import { Accordion, AccordionItem } from '@nextui-org/react';
import { useState } from 'react';

import style from './packaging.module.scss';
import { ArrowDownIcon } from '@/app/icons/iconArrowUp/icon-arrow-down';

const accordionStyles = {
  base: style.accordion,
  title: style.accordionTitle,
  trigger: style.accordionItem,
  content: [style.accordionTitle, style.content],
  indicator: style.indicator,
};

const parts = [
  {
    option: 'Part 1',
    component: '<Transfers />',
  },
  {
    option: 'Part 2',
    component: '<Transfers />',
  },
  {
    option: 'Part 3',
    component: '<Transfers />',
  },
];

const Packaging = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={style.packaging}>
      <p className={style.video} onClick={() => setIsOpen(!isOpen)}>
        Video instruction
      </p>
      {isOpen && (
        <iframe
          className={style.iframe}
          src="https://www.youtube.com/embed/L3GTEBijMVc?si=L4LtPr-k3hg7t5Uc"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}
      <div className={style.accordionWrapper}>
        <Accordion>
          {parts.map(({ option, component }) => (
            <AccordionItem
              key={option}
              aria-label={option}
              title={option}
              classNames={accordionStyles}
              indicator={<ArrowDownIcon />}
            >
              {component}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Packaging;
