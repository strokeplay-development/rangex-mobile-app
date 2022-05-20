import { useTheme } from "@mui/material";
import { RecordPaperProps, RecordType } from ".";
import { StyledEmblem } from "./style";

const RecordEmblem: React.FC<RecordPaperProps> = ({ recordData }) => {
    const $ = useTheme();
    
    switch (recordData.type) {
        case RecordType.PRACTICE:
            return (
                <StyledEmblem bgColor={$.recordColor.practice}>
                    <span>{recordData.shotCount}</span>
                    <small>회</small>
                </StyledEmblem>
            )

        case RecordType.NEW_RECORD:
            return (
                <StyledEmblem bgColor={$.recordColor.newRecord}>
                    <span>{recordData.distance}</span>
                    <small>{recordData.digit}</small>
                </StyledEmblem>
            )

        case RecordType.SWING:
            return (
                <StyledEmblem>
                    {
                        recordData.image
                        ? <img src={recordData.image} alt="record_logo" />
                        : <span>Blank</span>
                    }
                </StyledEmblem>
            )

        case RecordType.REGISTER:
            return (
                <StyledEmblem>
                    {
                        recordData.image
                        ? <img src={recordData.image} alt="record_logo" />
                        : <span>Blank</span>
                    }
                </StyledEmblem>
            )
    
        default: return null;
    }
}

export default RecordEmblem;