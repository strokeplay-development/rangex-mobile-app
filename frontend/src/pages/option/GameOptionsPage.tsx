
import { Cached } from "@mui/icons-material";
import { IconButton, styled } from "@mui/material";
import SquareRadioButton from "../../components/common/button/SquareRadioButton";
import TopBar from "../../components/common/layout/bar/TopBar";
import { BottomFullButton, PageWithBlockSection, PageWithHeader } from "../../styles/common";

const normalUnits = [
    {
        label: 'SOFT',
        value: 'soft'
    },
    {
        label: 'NORMAL',
        value: 'normal'
    },
    {
        label: 'HARD',
        value: 'hard'
    },
];

const OptionSection = styled('section')`
    & h2 {
        margin-bottom: 24px;
    }
    & .option {
        margin-bottom: 24px;

        &:last-child {
            margin-bottom: 0;
        }

        & span {
            display: block;
            margin-bottom: 8px;
            color: ${props => props.theme.fontColor.grey};
        }
    }
`;

const unitOptions = [
    {
        optionName: 'Speed',
        units: normalUnits
    },
    {
        optionName: 'Distance',
        units: normalUnits
    },
    {
        optionName: 'Green Distance',
        units: normalUnits
    }
]

export default function GameOptionsPage() {
    return (
        <PageWithBlockSection>
            <TopBar fix title="Game Options">
                <IconButton>
                    <Cached/>
                </IconButton>
            </TopBar>
            
            <OptionSection>
                <h2>Unit</h2>
                {
                    unitOptions.map(option => (
                        <div className="option">
                            <span>{option.optionName}</span>
                            <SquareRadioButton 
                                name={option.optionName}
                                requisites={option.units}
                                stretch
                            />
                        </div>
                    ))
                }
            </OptionSection>

            <OptionSection>
                <h2>Unit</h2>
                {
                    unitOptions.map(option => (
                        <div className="option">
                            <span>{option.optionName}</span>
                            <SquareRadioButton 
                                name={option.optionName}
                                requisites={option.units}
                                stretch
                            />
                        </div>
                    ))
                }
            </OptionSection>

            <BottomFullButton>
                SAVE
            </BottomFullButton>
        </PageWithBlockSection>
    )
}