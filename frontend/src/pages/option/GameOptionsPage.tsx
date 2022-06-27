
import { Cached } from "@mui/icons-material";
import { IconButton, styled } from "@mui/material";
import SquareRadioButton from "../../components/common/button/SquareRadioButton";
import TopBar from "../../components/common/layout/bar/TopBar";
import { BottomFullButton, PageWithBlockSection } from "../../styles/common";
import OptionSelect from "../../components/common/layout/menu/OptionSelect";
import OptionSlider from "./OptionSlider";

const OptionSection = styled('section')`
    & h2 {
        margin-bottom: 24px;
    }

    & .option {
        margin-bottom: 24px;

        &:last-child {
            margin-bottom: 0;
        }

        & .option_label {
            display: block;
            margin-bottom: 8px;
            color: ${props => props.theme.fontColor.grey};

            &.has_unit {
                margin-bottom: 0;
            }
        }

        & .option_header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
`;

export default function GameOptionsPage() {
    const teeUnits = [25, 30, 35, 40, 45, 50, 55];

    const normalUnits = [
        { label: 'SOFT', value: 'soft' },
        { label: 'NORMAL', value: 'normal' },
        { label: 'HARD', value: 'hard' },
    ];
    
    const temperatureUnits = [
        { label: 'C', value: 'c' },
        { label: 'F', value: 'f' },
    ];
    
    const altitudeUnits = [
        { label: 'm', value: 'm' },
        { label: 'yd', value: 'yd' },
        { label: 'ft', value: 'ft' },
    ];

    const unitOptions = [
        { optionName: 'Speed', units: normalUnits },
        { optionName: 'Distance', units: normalUnits },
        { optionName: 'Green Distance', units: normalUnits }
    ];

    return (
        <PageWithBlockSection>
            <TopBar fix title="Game Options">
                <IconButton>
                    <Cached/>
                </IconButton>
            </TopBar>

            <OptionSection>
                <div className="option">
                    <div className="option_header">
                        <span className="option_label has_unit">Tee Height</span>
                        <OptionSelect menus={teeUnits}/>
                    </div>
                </div>
            </OptionSection>

            <OptionSection>
                <h2>Environment</h2>
                <div className="option">
                    <div className="option_header">
                        <span className="option_label has_unit">Temperature</span>
                        <SquareRadioButton
                            name="Temperature"
                            requisites={temperatureUnits}
                            stretch
                            small
                        />
                    </div>
                    <OptionSlider/>
                </div>
                <div className="option">
                    <div className="option_header">
                        <span className="option_label has_unit">Altitude</span>
                        <SquareRadioButton
                            name="Altitude"
                            requisites={altitudeUnits}
                            stretch
                            small
                        />
                    </div>
                    <OptionSlider/>
                </div>
                <div className="option">
                    <div className="option_header">
                        <span className="option_label has_unit">Humidity</span>
                    </div>
                    <OptionSlider/>
                </div>
                <div className="option">
                    <span className="option_label">Ground</span>
                    <SquareRadioButton
                        name="Ground"
                        requisites={normalUnits}
                        stretch
                    />
                </div>
            </OptionSection>

            <OptionSection>
                <h2>Unit</h2>
                {
                    unitOptions.map((option, idx) => (
                        <div className="option" key={idx}>
                            <span className="option_label">{option.optionName}</span>
                            <SquareRadioButton
                                key={option.optionName}
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