import { Cached } from "@mui/icons-material";
import { IconButton, LinearProgress, styled } from "@mui/material";
import SquareRadioButton from "../../components/common/button/SquareRadioButton";
import TopBar from "../../components/common/layout/bar/TopBar";
import { BottomFullButton, PageWithBlockSection } from "../../styles/common";
import OptionSelect from "../../components/common/layout/menu/OptionSelect";
import OptionSlider from "./OptionSlider";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchConfigs, fetchPracticeOptions } from "../../api/user";
import { useInputs, useSelect, useSliders } from "../../hooks";
import { PracticeOptions, UserConfig } from "../../types";
import { webviewPrint } from "../../utils";
import { useEffect } from "react";

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
    const nav = useNavigate();
    const units = useInputs();
    const sliders = useSliders();
    const teeHeight = useSelect();
    const { isLoading, data } = useQuery('Practice Options', () => fetchPracticeOptions());

    const teeUnits = [25, 30, 35, 40, 45, 50, 55];

    const normalUnits = [
        { label: 'SOFT', value: 0 },
        { label: 'NORMAL', value: 1 },
        { label: 'HARD', value: 2 },
    ];
    
    const temperatureUnits = [
        { label: 'C', value: 0 },
        { label: 'F', value: 1 },
    ];
    
    const altitudeUnits = [
        { label: 'm', value: 0 },
        { label: 'yd', value: 1 },
        { label: 'ft', value: 2 },
    ];

    const unitOptions = [
        { name: 'Speed', optionName: 'SpeedType', units: normalUnits },
        { name: 'Distance', optionName: 'DistanceType', units: normalUnits },
        { name: 'Green distance', optionName: 'GreenDistanceType', units: normalUnits }
    ];

    const onSave = () => {
        const practiceOptions = {
            ...sliders,
            ...units.value,
        };

        const userConfigs: UserConfig = {
            teeHeight: teeHeight.value as number,
            options: JSON.stringify(practiceOptions)
        }

        webviewPrint(userConfigs);
        nav(-1);
    }

    useEffect(() => {
        webviewPrint(data);
        if (data) {
            teeHeight.setValue(data.teeHeight);

            if (data.options) {
                const {
                    // Units
                    TemperatureType,
                    AltitudeType,
                    Hardness,
                    SpeedType,
                    DistanceType,
                    GreenDistanceType,

                    // Slider
                    Temperature,
                    Altitude,
                    Humidity,

                } = data.options as PracticeOptions;

                units.setValue({
                    TemperatureType,
                    AltitudeType,
                    Hardness,
                    SpeedType,
                    DistanceType,
                    GreenDistanceType,
                });

                sliders.setSliders({
                    Temperature,
                    Altitude,
                    Humidity,
                });
            }
        }
    }, [data]);


    if (isLoading) {
        return <LinearProgress/>
    }

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
                        <OptionSelect menus={teeUnits} defaultValue={teeHeight.value} onChange={teeHeight.onChange}/>
                    </div>
                </div>
            </OptionSection>

            <OptionSection>
                <h2>Environment</h2>
                <div className="option">
                    <div className="option_header">
                        <span className="option_label has_unit">Temperature</span>
                        <SquareRadioButton
                            name="TemperatureType"
                            requisites={temperatureUnits}
                            stretch
                            small
                            onChange={units.onChange}
                        />
                    </div>
                    <OptionSlider onChange={(_, value) => {
                        sliders.onChangSliders("Temperature", value);
                    }}/>
                </div>
                <div className="option">
                    <div className="option_header">
                        <span className="option_label has_unit">Altitude</span>
                        <SquareRadioButton
                            name="AltitudeType"
                            requisites={altitudeUnits}
                            stretch
                            small
                            onChange={units.onChange}
                        />
                    </div>
                    <OptionSlider onChange={(_, value) => {
                        sliders.onChangSliders("Altitude", value);
                    }}/>
                </div>
                <div className="option">
                    <div className="option_header">
                        <span className="option_label has_unit">Humidity</span>
                    </div>
                    <OptionSlider onChange={(_, value) => {
                        sliders.onChangSliders("Humidity", value);
                    }}/>
                </div>
                <div className="option">
                    <span className="option_label">Ground</span>
                    <SquareRadioButton
                        name="Hardness"
                        requisites={normalUnits}
                        stretch
                        onChange={units.onChange}
                    />
                </div>
            </OptionSection>

            <OptionSection>
                <h2>Unit</h2>
                {
                    unitOptions.map((option, idx) => (
                        <div className="option" key={idx}>
                            <span className="option_label">{option.name}</span>
                            <SquareRadioButton
                                key={option.optionName}
                                name={option.optionName}
                                requisites={option.units}
                                stretch
                                onChange={units.onChange}
                            />
                        </div>
                    ))
                }
            </OptionSection>

            <BottomFullButton onClick={onSave}>
                SAVE
            </BottomFullButton>
        </PageWithBlockSection>
    )
}