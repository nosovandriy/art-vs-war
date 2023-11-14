'use client';

import { Accordion, AccordionItem } from '@nextui-org/react';
import { useState } from 'react';

import { ArrowDownIcon } from '@/app/icons/iconArrowUp/icon-arrow-down';
import { Part1, Part2, Part3 } from './parts/parts';

import style from './packaging.module.scss';

const accordionStyles = {
  base: style.accordion,
  title: style.accordionTitle,
  trigger: style.accordionItem,
  content: [style.accordionTitle, style.content],
  indicator: style.indicator,
};

const Packaging = () => {
  const [isOpen, setIsOpen] = useState(false);

  const parts = [
    {
      option: 'Part I',
      component: <Part1 />,
    },
    {
      option: 'Part II',
      component: <Part2 />,
    },
    {
      option: 'Part III',
      component: <Part3 />,
    },
  ];

  return (
    <div className={style.packaging}>
      <span className={style.video} onClick={() => setIsOpen(!isOpen)}>
        Video instruction
      </span>
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
