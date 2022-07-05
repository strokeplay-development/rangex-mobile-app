import TopBar from "../../components/common/layout/bar/TopBar";
import TextInput from "../../components/common/layout/input/TextInput";
import { FlexForm, PageWithHeader } from "../../styles/common";
import ConfirmLink from "./ConfirmLink";

export default function LinkShop() {
    return (
        <PageWithHeader>
            <TopBar fix/>
            <h2 style={{margin: '8px 0 12px 0'}}>Enter shop signup code</h2>
            <FlexForm>
                <TextInput label="Code"/>
                <ConfirmLink/>
            </FlexForm>
        </PageWithHeader>
    )
}