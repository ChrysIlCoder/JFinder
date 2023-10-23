import { Text, View, SafeAreaView, ScrollView, VirtualizedList, ActivityIndicator, RefreshControl } from 'react-native'
import { Stack, useRouter, useGlobalSearchParams} from 'expo-router'
import { useCallback, useState } from 'react'

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components'
import { COLORS, icons, SIZES } from '../../constants'
import useFetch from '../../hook/useFetch'

const tabs = ["Info", "Requisiti", "Responsabilità"]

export default function JobDetails(){
    const params = useGlobalSearchParams()
    const router = useRouter()

    const { data, isLoading, error, refetch } = useFetch('job-details', {job_id: params.id})

    const [refreshing, setRefreshing] = useState(false)
    const [activeTab, setActiveTab] = useState(tabs[0])

    const onRefresh = useCallback(() => {
        refreshing(true)
        refetch()
        setRefreshing(false)
    }, [])

    function displayTabContent() {
        switch (activeTab) {
            case "Requisiti":
                return <Specifics 
                    title="Requisiti"
                    points={data[0].job_highlights?.Qualifications ?? ['Nessuna qualifica necessaria']}
                />
            case "Info":
                return <JobAbout 
                    info={data[0].job_description ?? "Nessun dato disponibile"}
                />
            case "Responsabilità":
                return <Specifics 
                title="Responsabilità"
                points={data[0].job_highlights?.Responsibilities ?? ['Nessuna responsabilità']}
            />
            default:
                break
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS. lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn 
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => router.back()}
                        />
                    ),
                    headerTitle: ""
                }}
            />

            <>
                <ScrollView showVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                    {isLoading ? <ActivityIndicator size="large" color={COLORS.primary}/>
                     : error ? <Text>Qualcosa è andato storto</Text> : data.length === 0 ?
                        <Text>Nessun dato disponibile</Text> : (
                            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                                <Company 
                                    companyLogo={data[0].employer_logo}
                                    jobTitle={data[0].job_title}
                                    companyName={data[0].employer_name}
                                    location={data[0].job_country}
                                />

                                <JobTabs 
                                    tabs={tabs}
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                />

                                {displayTabContent()}
                            </View>
                        )
                    }
                </ScrollView>

                <JobFooter url={data[0]?.job_google_link ?? 'https://carerrs.google.com/jobs/results'}/>
            </>
        </SafeAreaView>
    )
}