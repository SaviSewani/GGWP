import React, { ChangeEventHandler, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FilterDataModel } from '../model';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';

const AccordionItemWrapper = styled.li`
  background: #101828;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  display: flex;
  align-item: center;
  flex-direction: column;
  margin-top: 1.5rem;
`;

const AccordionHeading = styled.h2`
  width: 100%;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  background: none;
  border: none;
  margin: 0;
`;

const AccordionHeader = styled.button`
  background: inherit;
  display: flex;
  align-items: center;
  width: 100%;
  border: none;
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  color: #fff;
  position: relative;
  span.icon {
    position: absolute;
    right: 0;
    height: 18px;
  }
`;

const AccordionContentWrapper = styled.div`
  transition: height 0.2s ease-in-out;
  overflow: hidden;
`;

const AccordionContent = styled.div`
  padding-top: 1.5rem;
  li {
    margin-bottom: 0.5rem;
    span {
      margin-left: 0.2rem;
    }
  }
`;

const IconSpan = styled.span`
`;

const StyledUl = styled.ul``;

const StyledLi = styled.li``;

const StyledSpan = styled.span``;

const StyledInput = styled.input``;

const Form = styled.form``;

export const AccordionItem = ({
    key,
    data,
    isOpen,
    btnOnClick,
    sendSeverityFilters,
    sendTimeFilters,
  }: {
    key: string;
    data: FilterDataModel;
    isOpen: boolean;
    btnOnClick: () => void;
    sendSeverityFilters: any;
    sendTimeFilters: any;
  }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const [severityFilters, setSeverityFilters] = useState<string[]>([]);
    const [timeFilters, setTimeFilters] = useState<string[]>([]);

    useEffect(() => {
        if (isOpen) {
          const contentEl = contentRef.current as HTMLDivElement;
          setHeight(contentEl.scrollHeight);
        } else {
          setHeight(0);
        }
    }, [isOpen]);

    const handleSeverityChange = (value: string, event: any) => {
      if(event.target.checked){
        setSeverityFilters([...severityFilters, value])
      } else {
        const updatedSeveritFilters  = severityFilters.filter((item) => !(item === value));
        setSeverityFilters(updatedSeveritFilters);
      }
    };

    const handleTimeChange = (value: string) => {
      setTimeFilters([value])
    };

    useEffect(() => {
      sendSeverityFilters(severityFilters);
    }, [severityFilters]);

    useEffect(() => {
      sendTimeFilters(timeFilters);
    }, [timeFilters]);
    
  return (
    <AccordionItemWrapper className={`${isOpen ? 'active' : ''}`}>
      <AccordionHeading>
        <AccordionHeader onClick={btnOnClick}>
          {data.title}
          {isOpen ? (
            <IconSpan className='icon'><HiChevronUp color='#4785ff' size={20}/></IconSpan>
          ) : (
            <IconSpan className='icon'><HiChevronDown color='#4785ff' size={20}/></IconSpan>
          )}
        </AccordionHeader>
      </AccordionHeading>
      <AccordionContentWrapper style={{ height }}>
        <AccordionContent ref={contentRef}>
            <Form>
                <StyledUl>
                  {data.options.map((filterItem) => {
                    return (
                      <StyledLi key={`${filterItem}Key`}>
                          {data.optionType === 'radio' && (
                            <StyledInput 
                            value={filterItem} 
                            type="radio"
                            name="filter-option" 
                            onChange={() => handleTimeChange(filterItem)}></StyledInput>
                          )}
                          {data.optionType === 'checkbox' && (
                            <StyledInput 
                            value={filterItem} 
                            type="checkbox"
                            name="filters" 
                            onChange={(e: any) => handleSeverityChange(filterItem, e)}></StyledInput>
                          )}
                          <StyledSpan>{filterItem}</StyledSpan>
                      </StyledLi>
                    );
                  })}
                </StyledUl>
            </Form>
        </AccordionContent>
      </AccordionContentWrapper>
    </AccordionItemWrapper>
  )
}
