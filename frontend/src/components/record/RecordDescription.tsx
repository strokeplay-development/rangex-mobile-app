import { useTheme } from "@emotion/react";
import { RecordPaperProps, RecordType } from ".";
import { StyledRecordDesc } from "./style";

const RecordDescription: React.FC<RecordPaperProps> = ({ recordData }) => {
    const $ = useTheme();

    switch (recordData.type) {
        case RecordType.PRACTICE:
            return (
                <StyledRecordDesc>
                    Your pracitce has finished!<br/>
                    You did <strong>{recordData.shotCount} Shots</strong> in this practice.
                </StyledRecordDesc>
            )

        case RecordType.NEW_RECORD:
            return (
                <StyledRecordDesc>
                    <b>New Record</b> “{recordData.dataType}” <strong>{recordData.distance}{recordData.digit}</strong>.
                </StyledRecordDesc>
            )

        case RecordType.SWING:
            return (
                <StyledRecordDesc>
                    You have saved your “{recordData.club}” <strong>{recordData.distance}{recordData.digit}</strong> swing motion.
                </StyledRecordDesc>
            )

        case RecordType.REGISTER:
            return (
                <StyledRecordDesc>
                    Have registered to “{recordData.shopName}".<br/>
                    You can enjoy all of rangex service from now on.
                </StyledRecordDesc>
            )

        default: return null;
    }
}

export default RecordDescription;