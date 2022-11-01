import { Cached } from "@mui/icons-material";
import { IconButton, LinearProgress, styled } from "@mui/material";
import SquareRadioButton from "../../components/common/button/SquareRadioButton";
import TopBar from "../../components/common/layout/bar/TopBar";
import { BottomFullButton, PageWithBlockSection } from "../../styles/common";
import OptionSelect from "../../components/common/layout/menu/OptionSelect";
import OptionSlider from "./OptionSlider";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchPracticeOptions, modifyConfigs } from "../../api/user";
import { useInputs, useSelect, useSliders } from "../../hooks";
import { PracticeOptions, UserConfig } from "../../types";
import { webviewError, webviewPrint } from "../../utils";
import { useEffect } from "react";
import { UNIT_ALTITUDE, UNIT_DISTANCE, UNIT_SPEED, UNIT_STRENGTH, UNIT_TEMPERATURE } from "../../constants/units";

interface OptionsSlider {
    [key: string]: number | undefined;
    Temperature?: number;
    Altitude?: number;
    Humidity?: number;
}

interface OptionsUnit {
    [key: string]: number | undefined;
    TemperatureType?: number;
    AltitudeType?: number;
    Hardness?: number;
    SpeedType?: number;
    DistanceType?: number;
    GreenDistanceType?: number;
}

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
    const teeHeight = useSelect();
    const units = useInputs<OptionsUnit>({});
    const sliders = useSliders<OptionsSlider>({});
    const { isLoading, data } = useQuery('PracticeOptions', () => fetchPracticeOptions());

    const teeUnits = [25, 30, 35, 40, 45, 50, 55];

    
    const temperatureUnits = [
        { label: UNIT_TEMPERATURE[0], value: 0 },
        { label: UNIT_TEMPERATURE[1], value: 1 },
    ];
    
    const altitudeUnits = [
        { label: UNIT_ALTITUDE[0], value: 0 },
        { label: UNIT_ALTITUDE[1], value: 1 },
        { label: UNIT_ALTITUDE[2], value: 2 },
    ];
    
    const hardnessUnits = [
        { label: UNIT_STRENGTH[0], value: 0 },
        { label: UNIT_STRENGTH[1], value: 1 },
        { label: UNIT_STRENGTH[2], value: 2 },
    ];

    const unitOptions = [
        { 
            name: 'Speed', 
            optionName: 'SpeedType', 
            units: [
                { label: UNIT_SPEED[0], value: 0 },
                { label: UNIT_SPEED[1], value: 1 },
                { label: UNIT_SPEED[2], value: 2 },
            ]
        },
        { 
            name: 'Distance', 
            optionName: 'DistanceType', 
            units: [
                { label: UNIT_DISTANCE[0], value: 0 },
                { label: UNIT_DISTANCE[1], value: 1 },
            ] 
        },
    ];

    const onSave = async () => {
        const practiceOptions = {
            ...units.value,
            ...sliders.sliders,
        };
        
        webviewPrint(practiceOptions);
        const userConfigs: UserConfig = {
            teeHeight: teeHeight.value as number,
            options: JSON.stringify(practiceOptions)
        }

        try {
            const result = await modifyConfigs(userConfigs);
            webviewPrint(result);
        } catch (error) {
            webviewError(error);
        }
        nav(-1);
    }

    useEffect(() => {
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
                
                {/* Temperature */}
                <div className="option">
                    <div className="option_header">
                        <span className="option_label has_unit">Temperature</span>
                        <SquareRadioButton
                            stretch
                            small
                            name="TemperatureType"
                            requisites={temperatureUnits}
                            onChange={units.onChange}
                            defaultValue={units.value.TemperatureType}
                        />
                    </div>
                    <OptionSlider 
                        defaultValue={sliders.sliders.Temperature}
                        onChange={(_, value) => {
                        sliders.onChangeSliders("Temperature", value);
                    }}/>
                </div>

                {/* Altitude */}
                <div className="option">
                    <div className="option_header">
                        <span className="option_label has_unit">Altitude</span>
                        <SquareRadioButton
                            name="AltitudeType"
                            requisites={altitudeUnits}
                            stretch
                            small
                            onChange={units.onChange}
                            defaultValue={units.value.AltitudeType}
                        />
                    </div>
                    <OptionSlider 
                        defaultValue={sliders.sliders.Altitude}
                        onChange={(_, value) => {
                        sliders.onChangeSliders("Altitude", value);
                    }}/>
                </div>

                {/* Humidity */}
                <div className="option">
                    <div className="option_header">
                        <span className="option_label has_unit">Humidity</span>
                    </div>
                    <OptionSlider 
                        defaultValue={sliders.sliders.Humidity}
                        onChange={(_, value) => {
                        sliders.onChangeSliders("Humidity", value);
                    }}/>
                </div>

                {/* Hardness */}
                <div className="option">
                    <span className="option_label">Hardness</span>
                    <SquareRadioButton
                        name="Hardness"
                        requisites={hardnessUnits}
                        stretch
                        onChange={units.onChange}
                        defaultValue={units.value.Hardness}
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
                                defaultValue={units.value[option.optionName]}
                                minInputCount={3}
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