import { Grid, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SquareRadioButton from "../../components/common/button/SquareRadioButton";
import TopBar from "../../components/common/layout/bar/TopBar";
import TextInput from "../../components/common/layout/input/TextInput";
import DatePicker from "../../components/common/layout/picker/DatePicker";
import { BottomFullButton, InputLabel, PageWithHeader } from "../../styles/common";

const StyledField = styled('div')`
    display: flex;
    flex-direction: column;
    flex: 1;
`

const StyledForm = styled('form')`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 24px 0;
`;

export default function OptionalSignupPage() {
    const nav = useNavigate();

    const genderList = [
        {
            label: 'MALE',
            value: 'male'
        },
        {
            label: 'FEMALE',
            value: 'female'
        },
    ];

    const onCreateAccount = () => {
        nav('/home');
    }

    return (
        <PageWithHeader>
            <TopBar border fix title="Sign up">2/2</TopBar>

            <StyledForm>
                <StyledField>
                    <InputLabel>Gender</InputLabel>
                    <SquareRadioButton
                        name="Gender"
                        requisites={genderList}
                    />
                </StyledField>

                <StyledField>
                    <InputLabel>Birth Date</InputLabel>
                    <DatePicker/>
                </StyledField>

                {/* ADDRESS */}
                <Grid container rowSpacing={2}>
                    <Grid container item sx={{":first-of-type": { paddingTop: 0 }, gap: '8px'}}>
                        <StyledField>
                            <InputLabel>Zip Code</InputLabel>
                            <TextInput label="Zip code"/>
                        </StyledField>
                        <StyledField>
                            <InputLabel>Address1</InputLabel>
                            <TextInput label="Address1"/>
                        </StyledField>
                    </Grid>

                    <Grid container item>
                        <StyledField>
                            <InputLabel>Address2</InputLabel>
                            <TextInput label="Address2"/>
                        </StyledField>
                    </Grid>

                    <Grid container item sx={{":first-of-type": { paddingTop: 0 }, gap: '8px'}}>
                        <StyledField>
                            <InputLabel>City/Town</InputLabel>
                            <TextInput label="City/Town"/>
                        </StyledField>
                        <StyledField>
                            <InputLabel>State/Province</InputLabel>
                            <TextInput label="State/Province"/>
                        </StyledField>
                    </Grid>
                </Grid>

                <BottomFullButton onClick={onCreateAccount}>Create Account</BottomFullButton>
            </StyledForm>
        </PageWithHeader>
    );
}