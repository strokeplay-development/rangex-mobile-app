import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material";
import { MouseEventHandler, useState } from "react";
import InfoModal from "../../components/common/help/InfoModal";
import TopBar from "../../components/common/layout/bar/TopBar";
import GridLayout from "../../components/common/layout/grid/GridLayout";
import SectionHeader from "../../components/common/layout/section/SectionHeader";
import { BottomFullButton, PageWithHeader, Section } from "../../styles/common";

/**
 * types
 */
interface ClubVisibility {
    club: string,
    visible: boolean
}

/**
 * Styles
 */
const VisibleSwitch = styled('div')`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    background-color: ${props => props.theme.palette.background.paper};
    padding: 8px 12px;

    &.empty {
        background-color: transparent;
    }
`;

const ClubVisibleSwitch = (clubInfo: Partial<ClubVisibility> & {onClick: MouseEventHandler}) => {
    return (
        <VisibleSwitch onClick={clubInfo.onClick}>
            <h3 style={{ opacity: clubInfo.visible ? '100%' : '35%' }}>{clubInfo.club}</h3>
            {
                clubInfo.visible
                ? <Visibility fontSize="small"/> 
                : <VisibilityOff fontSize="small" sx={{ opacity: '30%' }}/>
            }
        </VisibleSwitch>
    );
}

export default function ClubPage() {
    // Woods
    const [woods, setWoods] = useState([
        { club: 'Driver', visible: true },
        { club: 'Wood2', visible: false },
        { club: 'Wood3', visible: false },
        { club: 'Wood4', visible: false },
        { club: 'Wood5', visible: false },
        { club: 'Wood6', visible: false },
        { club: 'Wood7', visible: false },
        { club: 'Wood8', visible: false },
        { club: 'Wood9', visible: false },
    ]);

    const toggleWood = (index: number) => {
        woods[index].visible = !woods[index].visible;
        setWoods([...woods]);
    }

    // Hybrids
    const [hybrids, setHybrids] = useState([
        { club: 'Hybrid1', visible: false },
        { club: 'Hybrid2', visible: false },
        { club: 'Hybrid3', visible: false },
        { club: 'Hybrid4', visible: false },
        { club: 'Hybrid5', visible: false },
        { club: 'Hybrid6', visible: false },
        { club: 'Hybrid7', visible: false },
        { club: 'Hybrid8', visible: false },
        { club: 'Hybrid9', visible: false },
    ]);

    const toggleHybrid = (index: number) => {
        hybrids[index].visible = !hybrids[index].visible;
        setHybrids([...hybrids]);
    }

    // Irons
    const [irons, setIrons] = useState([
        { club: 'Iron1', visible: false },
        { club: 'Iron2', visible: false },
        { club: 'Iron3', visible: false },
        { club: 'Iron4', visible: false },
        { club: 'Iron5', visible: false },
        { club: 'Iron6', visible: false },
        { club: 'Iron7', visible: false },
        { club: 'Iron8', visible: false },
        { club: 'Iron9', visible: false },
    ]);

    const toggleIron = (index: number) => {
        irons[index].visible = !irons[index].visible;
        setIrons([...irons]);
    }

    // Wedges
    const [wedges, setWedges] = useState([
        { club: 'Wedge46(P)', visible: false },
        { club: 'Wedge48', visible: false },
        { club: 'Wedge50', visible: false },
        { club: 'Wedge52', visible: false },
        { club: 'Wedge54', visible: false },
        { club: 'Wedge56(S)', visible: false },
        { club: 'Wedge58', visible: false },
        { club: 'Wedge60', visible: false },
        { club: 'Wedge62', visible: false },
        { club: 'Wedge64', visible: false },
    ]);

    const toggleWedge = (index: number) => {
        wedges[index].visible = !wedges[index].visible;
        setWedges([...wedges]);
    }

    return (
        <PageWithHeader className="no_horizon_padding">
            <TopBar fix title="Clubs Visibility">
                <InfoModal title="Clubs Visibility">
                    dfklnasdkfm; dfkm sd;f kedfe4r4mfd; dfk findkd fd45 5fm ddf5 dfklnas dkfm; df5 dsd;fkemfd; fddfdfkefindkfm dfdfklnasdkfm; dfkm sd;fkemfd; dfkefindkfm dfdfklnasdkfm; dfkm sd;fkemfd; dfkefindkfm dfdfklnasdkfm; dfkm sd;fkemfd; dfkefindkfm df
                </InfoModal>
            </TopBar>

            <Section>
                <SectionHeader title="Wood"/>
                <GridLayout
                    dataLength={woods.length} 
                    cols={2}
                    emptyElement={<VisibleSwitch className="empty" key={'wood_empty'}/>}
                >
                    {
                        woods.map((wood, idx) => (                    
                            <ClubVisibleSwitch 
                                onClick={() => toggleWood(idx)} 
                                club={wood.club} 
                                visible={wood.visible}
                                key={idx}
                            />
                        ))
                    }
                </GridLayout>
            </Section>

            <Section>
                <SectionHeader title="Hybrid"/>
                <GridLayout
                    dataLength={hybrids.length} 
                    cols={2}
                    emptyElement={<VisibleSwitch className="empty" key={'hybrid_empty'}/>}
                >
                    {
                        hybrids.map((hybrid, idx) => (                    
                            <ClubVisibleSwitch 
                                onClick={() => toggleHybrid(idx)} 
                                club={hybrid.club} 
                                visible={hybrid.visible}
                                key={idx}
                            />
                        ))
                    }
                </GridLayout>
            </Section>

            <Section>
                <SectionHeader title="Iron"/>
                <GridLayout
                    dataLength={irons.length} 
                    cols={2}
                    emptyElement={<VisibleSwitch className="empty" key={'iron_empty'}/>}
                >
                    {
                        irons.map((iron, idx) => (                    
                            <ClubVisibleSwitch 
                                onClick={() => toggleIron(idx)} 
                                club={iron.club} 
                                visible={iron.visible}
                                key={idx}
                            />
                        ))
                    }
                </GridLayout>
            </Section>

            <Section>
                <SectionHeader title="Wedge"/>
                <GridLayout
                    dataLength={wedges.length} 
                    cols={2}
                >
                    {
                        wedges.map((wedge, idx) => (                    
                            <ClubVisibleSwitch 
                                onClick={() => toggleWedge(idx)} 
                                club={wedge.club} 
                                visible={wedge.visible}
                                key={idx}
                            />
                        ))
                    }
                </GridLayout>
            </Section>

            <BottomFullButton>Save</BottomFullButton>
        </PageWithHeader>
    )    
}