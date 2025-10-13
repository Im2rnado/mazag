import React, { useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient';
import TherapistCard from '@/components/TherapistCard';
import TherapistService from '@/services/TherapistService';
import { Therapist } from '@/types';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Therapists() {
    const [therapists, setTherapists] = useState<Therapist[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const list = await TherapistService.fetchAll();
                setTherapists(list);
            } catch (error) {
                console.error('Failed to load therapists:', error);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    const handleTherapistPress = (therapist: Therapist) => {
        // TODO: Navigate to therapist profile or booking screen
        console.log('Selected therapist:', therapist.name);
    };

    if (loading) {
        return (
            <ExpoLinearGradient
                colors={['#FFFFFF', '#E3F2FD']}
                style={{ flex: 1 }}
                locations={[0, 1]}
            >
                <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                    <View className="flex-1 justify-center items-center p-4">
                        <Text className="text-textStrong text-lg font-avenir">
                            Loading therapists...
                        </Text>
                    </View>
                </SafeAreaView>
            </ExpoLinearGradient>
        );
    }

    return (
        <ExpoLinearGradient
            colors={['#FFFFFF', '#E3F2FD']}
            style={{ flex: 1 }}
            locations={[0, 1]}
        >
            <SafeAreaView style={{ flex: 1 }} edges={['top']}>
                <View className="flex-1 p-6 pb-28">
                    <Text className="text-heading-main font-avenir-bold text-textStrong mb-4">
                        Therapists
                    </Text>
                    <FlatList
                        data={therapists}
                        keyExtractor={(t) => t.id}
                        renderItem={({ item }) => (
                            <TherapistCard
                                therapist={item}
                                onPress={() => handleTherapistPress(item)}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </SafeAreaView>
        </ExpoLinearGradient>
    );
}
