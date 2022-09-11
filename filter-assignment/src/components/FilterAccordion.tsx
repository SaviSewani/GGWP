import React, {useState} from 'react'
import { FilterDataModel } from '../model';
import styled from 'styled-components';
import { MdFilterList, MdRefresh } from 'react-icons/md';
import { AccordionItem } from './AccordionItem';

const Filter = styled.div`
  max-width: 100%;
  padding: 1rem 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  flex-direction: column;
`;

const FilterButton = styled.button`
  border: 1px solid #344054;
  border-radius: 8px;
  padding: 10px 20px;
  background: #16142B;
  font-weight: 600;
  font-size: 1em;
  color: #1967ff;
  width: 98px;
  height: 38px;
  display: flex;
  gap: 5px;
  &.filter__button--check {
    background: #1967ff;
    border: none;
    color: #fff;
  }
`;

const FilterWrapper = styled.div`
  background-color: #1D2939;
  border-radius: 14px;
  width: 100%;
  max-width: 383px;
  color: #fff;
  padding: 1.8rem;
  .label-wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }
  span.text {
    font-size: 1.3rem;
  }
`;

const ResetButton = styled.button`
  font-size: 1rem;
  font-weight: 600;
  color: #4785ff;
  background: none;
  border: none;
  display: flex;
  gap: 5px;
  cursor: pointer;
`;

const StyledSpan = styled.span``;

const StyledDiv = styled.div``;

const AccordionWrapper = styled.ul``;

const Tag = styled.button`
  border-radius: 8px;
  padding: 10px 20px;
  background: #1D2939;
  font-weight: 500;
  font-size: 1em;
  color: #fff;
  width: auto;
  height: 38px;
  display: flex;
  align-items: center;
`;

const TagValue = styled.span`
  padding: 0 0.5rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export const FilterAccordion: React.FC = () => {
    const filterData:FilterDataModel[] = [
        {
        id: "severityId",
        title: "Severity",
        optionType: "checkbox",
        options: [
            "Low",
            "Medium",
            "High"
        ],
        },
        {
        id: "timeId",
        title: "Time",
        optionType: "radio",
        options: [
            "Last 24 hours",
            "Last 72 hours",
            "Last week",
            "Last 6 months"
        ],
        },
    ];
    const [showFilter, setShowFilter] = useState<Boolean>(false);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [filterTags, setFilterTags] = useState<string[]>([]);
    const [severityTags, setSeverityTags] = useState<string[]>([]);
    const [timeTags, setTimeTags] = useState<string[]>([]);

    const btnOnClick = (idx: number) => {
      setCurrentIdx((currentValue) => (currentValue !== idx ? idx : -1));
    };

    const getSeverityFilters = (value: string[]) => {
      setSeverityTags(value);
    };

    const getTimeFilters = (value: string[]) => {
      setTimeTags(value);
    };

    const openCloseFiler = () => {
        setShowFilter(prevShowFilter => !prevShowFilter);
    };

    const resetHandler = () => {
      setSeverityTags([]);
      setTimeTags([]);
    };

    return (
          <Filter>
              <ButtonsWrapper>
                <FilterButton onClick={openCloseFiler} className={showFilter ? 'filter__button--check' : 'filter__button--uncheck'}>
                    <StyledSpan className='icon'><MdFilterList size={18}/></StyledSpan>
                    <StyledSpan>Filter</StyledSpan>
                </FilterButton>
                <StyledDiv>
                    {showFilter && severityTags.length > 0 && (
                      <Tag><StyledSpan>Severity: </StyledSpan>
                        {severityTags.map((tag, i, {length}) => (
                          <TagValue>
                            {tag}
                            {length - 1 === i ? "" : ","}
                          </TagValue>
                        ))}
                    </Tag>
                    )}
                </StyledDiv>
                <StyledDiv>
                    {showFilter && timeTags.length > 0 && (
                      <Tag><StyledSpan>Time: </StyledSpan>
                        {timeTags.map((tag) => (
                          <TagValue>{tag}</TagValue>
                        ))}
                    </Tag>
                    )}
                </StyledDiv>
              </ButtonsWrapper>
              {showFilter && (
                  <FilterWrapper>
                      <StyledDiv className='label-wrapper'>
                          <StyledSpan className='text'>Filter data by</StyledSpan>
                          <ResetButton onClick={resetHandler}>
                              <StyledSpan><MdRefresh size={16}/></StyledSpan>
                              <StyledSpan>Reset</StyledSpan>
                          </ResetButton>
                      </StyledDiv>
                      <AccordionWrapper>
                        {filterData.map((item, idx) => (
                          <AccordionItem
                            key={item.id}
                            data={item}
                            isOpen={idx === currentIdx}
                            btnOnClick={() => btnOnClick(idx)}
                            sendSeverityFilters={getSeverityFilters}
                            sendTimeFilters={getTimeFilters}
                          />
                        ))}
                      </AccordionWrapper>
                  </FilterWrapper>
              )}
          </Filter>
    )
}
