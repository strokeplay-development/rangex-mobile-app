import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material";
import { MouseEventHandler, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { fetchConfigs, modifyConfigs } from "../../api/user";
import InfoModal from "../../components/common/help/InfoModal";
import TopBar from "../../components/common/layout/bar/TopBar";
import GridLayout from "../../components/common/layout/grid/GridLayout";
import SectionHeader from "../../components/common/layout/section/SectionHeader";
import { BottomFullButton, PageWithHeader, Section } from "../../styles/common";
import { BOOL } from "../../types";
import { ClubOptions } from "../../types/config";
import { webviewError, webviewPrint } from "../../utils";

/**
 * types
 */
interface ClubVisibility {
    id: number | string,
    club: string,
    visible: BOOL
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
            <h3 style={{ opacity: clubInfo.visible === 1 ? '100%' : '35%' }}>{clubInfo.club}</h3>
            {
                clubInfo.visible === 1
                ? <Visibility fontSize="small"/> 
                : <VisibilityOff fontSize="small" sx={{ opacity: '30%' }}/>
            }
        </VisibleSwitch>
    );
}

export default function ClubPage() {
    const nav = useNavigate();
    const { isLoading, data } = useQuery('fetchClubs', () => fetchConfigs('clubs'))

    // Woods
    const [woods, setWoods] = useState<ClubVisibility[]>([
        { id: 0, club: 'Driver', visible: 0 },
        { id: 1, club: 'Wood2', visible: 0 },
        { id: 2, club: 'Wood3', visible: 0 },
        { id: 3, club: 'Wood4', visible: 0 },
        { id: 4, club: 'Wood5', visible: 0 },
        { id: 24, club: 'Wood6', visible: 0 },
        { id: 5, club: 'Wood7', visible: 0 },
        { id: 25, club: 'Wood8', visible: 0 },
        { id: 26, club: 'Wood9', visible: 0 },
    ]);

    const toggleWood = (index: number) => {
        woods[index].visible = woods[index].visible === 0 ? 1 : 0;
        setWoods([...woods]);
    }

    // Hybrids
    const [hybrids, setHybrids] = useState<ClubVisibility[]>([
        { id: 27, club: 'Hybrid1', visible: 0 },
        { id: 28, club: 'Hybrid2', visible: 0 },
        { id: 6, club: 'Hybrid3', visible: 0 },
        { id: 7, club: 'Hybrid4', visible: 0 },
        { id: 8, club: 'Hybrid5', visible: 0 },
        { id: 29, club: 'Hybrid6', visible: 0 },
        { id: 9, club: 'Hybrid7', visible: 0 },
        { id: 30, club: 'Hybrid8', visible: 0 },
        { id: 31, club: 'Hybrid9', visible: 0 },
    ]);

    const toggleHybrid = (index: number) => {
        hybrids[index].visible = hybrids[index].visible === 0 ? 1 : 0;
        setHybrids([...hybrids]);
    }

    // Irons
    const [irons, setIrons] = useState<ClubVisibility[]>([
        { id: 32, club: 'Iron1', visible: 0 },
        { id: 10, club: 'Iron2', visible: 0 },
        { id: 11, club: 'Iron3', visible: 0 },
        { id: 12, club: 'Iron4', visible: 0 },
        { id: 13, club: 'Iron5', visible: 0 },
        { id: 14, club: 'Iron6', visible: 0 },
        { id: 15, club: 'Iron7', visible: 0 },
        { id: 16, club: 'Iron8', visible: 0 },
        { id: 17, club: 'Iron9', visible: 0 },
    ]);

    const toggleIron = (index: number) => {
        irons[index].visible = irons[index].visible === 0 ? 1 : 0;
        setIrons([...irons]);
    }

    // Wedges
    const [wedges, setWedges] = useState<ClubVisibility[]>([
        { id: 18, club: 'Wedge46(P)', visible: 0 },
        { id: 33, club: 'Wedge48', visible: 0 },
        { id: 34, club: 'Wedge50', visible: 0 },
        { id: 19, club: 'Wedge52', visible: 0 },
        { id: 20, club: 'Wedge54', visible: 0 },
        { id: 21, club: 'Wedge56(S)', visible: 0 },
        { id: 35, club: 'Wedge58', visible: 0 },
        { id: 22, club: 'Wedge60', visible: 0 },
        { id: 36, club: 'Wedge62', visible: 0 },
        { id: 37, club: 'Wedge64', visible: 0 },
    ]);

    const toggleWedge = (index: number) => {
        wedges[index].visible = wedges[index].visible === 0 ? 1 : 0;
        setWedges([...wedges]);
    }

    if (isLoading) {
        webviewPrint('클럽옵션 로딩중');
    }

    useEffect(() => {
        if (data) {
            setWoods(woods.map(wood => {
                wood.visible = data?.[wood.id];
                return wood;
            }));
    
            setHybrids(hybrids.map(hybrid => {
                hybrid.visible = data[hybrid.id];
                return hybrid;
            }));
    
            setIrons(irons.map(iron => {
                iron.visible = data[iron.id];
                return iron;
            }));
    
            setWedges(wedges.map(wedge => {
                wedge.visible = data[wedge.id];
                return wedge;
            }));
        }
    }, [data]);

    // Save
    const saveClubOptions = async () => {
        const clubsVisibilities = [
            ...woods,
            ...hybrids,
            ...irons,
            ...wedges
        ];

        const clubs: { [key: string]: BOOL } = {};

        for (const club of clubsVisibilities) {
            clubs[club.id] = club.visible;
        }

        try {
            const result = await modifyConfigs({
                clubs: JSON.stringify(clubs)
            });

            webviewPrint(result);
            nav(-1);
        } catch (error) {
            webviewError(error);
        }
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

            <BottomFullButton onClick={saveClubOptions}>Save</BottomFullButton>
        </PageWithHeader>
    )    
}