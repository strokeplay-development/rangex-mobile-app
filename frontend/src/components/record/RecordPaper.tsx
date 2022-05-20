import { RecordPaperProps } from "."
import RecordDescription from "./RecordDescription";
import RecordEmblem from "./RecordEmblem";
import { RecordLayout } from "./style";

const RecordPaper: React.FC<RecordPaperProps> = ({ recordData }) => {
    return (
        <RecordLayout>
            <dl>
                {/* 날짜 */}
                <dt>{recordData.date}</dt>
                {/* 기록 */}
                <dd>
                    <RecordDescription recordData={recordData}/>
                </dd>
            </dl>
            {/* 이미지 */}
            <RecordEmblem recordData={recordData}/>
        </RecordLayout>
    );
}

export default RecordPaper