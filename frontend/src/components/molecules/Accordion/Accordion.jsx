import React from "react";
import * as RadixAccordion from "@radix-ui/react-accordion"; 
import { FaChevronDown } from "react-icons/fa";
import classNames from "classnames";
import style from  './style.module.css';

function AppAccordion({ contents}) { 
  return (
    <RadixAccordion.Root
    className={style.AccordionRoot}
    type="single" defaultValue="item" collapsible>
      {contents.map((cont, idx) => (
        <RadixAccordion.Item
          value={cont.question} 
          key={idx}
          className={style.AccordionItem}
        >
          <AccordionTrigger className="text-xl">{cont.question}</AccordionTrigger>
          <AccordionContent>{cont.answer}</AccordionContent>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
}

const AccordionTrigger = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <RadixAccordion.Header className={style.AccordionHeader}>
      <RadixAccordion.Trigger
        className={classNames(`${style.AccordionTrigger}`, className)}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <FaChevronDown className={style.AccordionChevron} aria-hidden />
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  )
);

const AccordionContent = React.forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <RadixAccordion.Content
      className={classNames(`${style.AccordionContent}`, className)}
      {...props}
      ref={forwardedRef}
    >
      <div className={style.AccordionContentText}>{children}</div>
    </RadixAccordion.Content>
  )
);

export default AppAccordion;
